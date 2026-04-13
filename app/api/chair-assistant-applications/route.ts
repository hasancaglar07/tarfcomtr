import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import {
    ChairAssistantChair,
    ChairAssistantDocumentType,
    ChairAssistantGraduateLevel,
} from "@prisma/client";
import nodemailer from "nodemailer";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import {
    chairAssistantDocumentDefinitions,
    chairAssistantMaxFileSize,
    formatChairAssistantChair,
    formatChairAssistantDocumentType,
    formatChairAssistantGraduateLevel,
    isChairAssistantMimeTypeAllowed,
    sanitizeUploadFileName,
} from "@/lib/chair-assistant";

export const runtime = "nodejs";

const fieldLabels: Record<string, string> = {
    fullName: "Ad Soyad",
    phone: "Telefon No",
    email: "E-posta",
    city: "İkamet Ettiğiniz Şehir",
    profession: "Mesleği",
    chair: "Kürsü Seçimi",
    undergraduateInfo: "Lisans Mezuniyeti",
    graduateLevel: "Aktif Lisansüstü Program",
    mastersProgram: "Yüksek Lisans Programı",
    doctorateProgram: "Doktora Programı",
    academicFields: "Akademik Çalışma Alanları",
    thesisTopic: "Araştırma Başlığı / Alanı",
    previousWork: "Önceki Çalışmalar",
    motivation: "Katılım Motivasyonu",
    weeklyAvailability: "Haftalık Zaman",
    referenceOneFirstName: "Referans 1 Adı",
    referenceOneLastName: "Referans 1 Soyadı",
    referenceOnePhone: "Referans 1 Telefon",
    referenceOneProfession: "Referans 1 Mesleği",
    referenceTwoFirstName: "Referans 2 Adı",
    referenceTwoLastName: "Referans 2 Soyadı",
    referenceTwoPhone: "Referans 2 Telefon",
    referenceTwoProfession: "Referans 2 Mesleği",
    accuracyDeclarationAccepted: "Bilgilerin Doğruluğu Beyanı",
    kvkkAccepted: "KVKK Onayı",
};

const schema = z
    .object({
        fullName: z.string().min(1).max(120),
        phone: z.string().min(1).max(40),
        email: z.string().email().max(120),
        city: z.string().min(1).max(120),
        profession: z.string().min(1).max(120),
        chair: z.nativeEnum(ChairAssistantChair),
        undergraduateInfo: z.string().min(1).max(240),
        graduateLevel: z.nativeEnum(ChairAssistantGraduateLevel),
        mastersProgram: z.string().max(320).optional(),
        doctorateProgram: z.string().max(320).optional(),
        academicFields: z.string().min(1).max(2000),
        thesisTopic: z.string().min(1).max(2000),
        previousWork: z.string().min(1).max(3000),
        motivation: z.string().min(1).max(3000),
        weeklyAvailability: z.string().min(1).max(160),
        referenceOneFirstName: z.string().min(1).max(120),
        referenceOneLastName: z.string().min(1).max(120),
        referenceOnePhone: z.string().min(1).max(40),
        referenceOneProfession: z.string().min(1).max(120),
        referenceTwoFirstName: z.string().min(1).max(120),
        referenceTwoLastName: z.string().min(1).max(120),
        referenceTwoPhone: z.string().min(1).max(40),
        referenceTwoProfession: z.string().min(1).max(120),
        accuracyDeclarationAccepted: z.literal(true),
        kvkkAccepted: z.literal(true),
    })
    .superRefine((value, ctx) => {
        if (
            value.graduateLevel === ChairAssistantGraduateLevel.yuksek_lisans &&
            (!value.mastersProgram || value.mastersProgram.trim().length === 0)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["mastersProgram"],
                message: "Yüksek lisans program bilginizi giriniz.",
            });
        }

        if (
            value.graduateLevel === ChairAssistantGraduateLevel.doktora &&
            (!value.doctorateProgram ||
                value.doctorateProgram.trim().length === 0)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["doctorateProgram"],
                message: "Doktora program bilginizi giriniz.",
            });
        }
    });

async function sendMail({
    to,
    subject,
    text,
}: {
    to: string;
    subject: string;
    text: string;
}) {
    if (
        !process.env.SMTP_HOST ||
        !process.env.SMTP_PORT ||
        !process.env.SMTP_USER ||
        !process.env.SMTP_PASS
    ) {
        console.warn(
            "[chair-assistant-application] SMTP bilgileri eksik, mail gönderilmedi",
        );
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        subject,
        text,
    });
}

function readText(formData: FormData, key: string) {
    return formData.get(key)?.toString().trim() || "";
}

function readOptionalText(formData: FormData, key: string) {
    const value = formData.get(key)?.toString().trim();
    return value && value.length > 0 ? value : undefined;
}

function ensureFile(formData: FormData, type: ChairAssistantDocumentType) {
    const entry = formData.get(type);
    if (!entry || !(entry instanceof File) || entry.size === 0) {
        return { file: null } as const;
    }

    const fileName = entry.name?.toLowerCase() || "";
    const extensionAllowed = /\.(pdf|jpg|jpeg)$/.test(fileName);
    if (!isChairAssistantMimeTypeAllowed(entry.type) && !extensionAllowed) {
        return {
            error: `${formatChairAssistantDocumentType(type)} yalnızca PDF veya JPG olabilir.`,
        } as const;
    }

    if (entry.size > chairAssistantMaxFileSize) {
        return {
            error: `${formatChairAssistantDocumentType(type)} en fazla 10 MB olabilir.`,
        } as const;
    }

    return { file: entry } as const;
}

function formatReferenceLine(
    firstName: string,
    lastName: string,
    phone: string,
    profession?: string,
) {
    return `${firstName} ${lastName} - ${phone}${profession ? ` (${profession})` : ""}`;
}

function getFieldLabel(field: string) {
    const documentLabel = chairAssistantDocumentDefinitions.find(
        (document) => document.type === field,
    )?.label;
    return documentLabel ?? fieldLabels[field] ?? field;
}

function buildIssueMessage(
    issue: z.ZodIssue,
    label: string,
) {
    if (issue.code === z.ZodIssueCode.too_small && issue.type === "string") {
        return `${label} alanı zorunludur.`;
    }

    if (
        issue.code === z.ZodIssueCode.invalid_string &&
        issue.validation === "email"
    ) {
        return "Geçerli bir e-posta adresi giriniz.";
    }

    if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return `${label} alanında geçerli bir seçim yapınız.`;
    }

    if (issue.code === z.ZodIssueCode.invalid_literal) {
        return `${label} onayı zorunludur.`;
    }

    if (issue.code === z.ZodIssueCode.too_big && issue.type === "string") {
        return `${label} alanı en fazla ${issue.maximum} karakter olabilir.`;
    }

    if (issue.code === z.ZodIssueCode.custom && issue.message) {
        return issue.message;
    }

    if (issue.message) {
        return issue.message;
    }

    return `${label} alanı hatalıdır.`;
}

function normalizeValidationErrors(error: z.ZodError) {
    const mapped = error.errors.map((issue) => {
        const field = String(issue.path[0] ?? "form");
        const label = getFieldLabel(field);

        return {
            field,
            label,
            message: buildIssueMessage(issue, label),
        };
    });

    return mapped.filter(
        (item, index, array) =>
            array.findIndex(
                (entry) =>
                    entry.field === item.field &&
                    entry.message === item.message,
            ) === index,
    );
}

export async function POST(request: Request) {
    let applicationId: string | null = null;

    try {
        const formData = await request.formData();
        const parsed = schema.safeParse({
            fullName: readText(formData, "fullName"),
            phone: readText(formData, "phone"),
            email: readText(formData, "email"),
            city: readText(formData, "city"),
            profession: readText(formData, "profession"),
            chair: readText(formData, "chair"),
            undergraduateInfo: readText(formData, "undergraduateInfo"),
            graduateLevel: readText(formData, "graduateLevel"),
            mastersProgram: readOptionalText(formData, "mastersProgram"),
            doctorateProgram: readOptionalText(formData, "doctorateProgram"),
            academicFields: readText(formData, "academicFields"),
            thesisTopic: readText(formData, "thesisTopic"),
            previousWork: readText(formData, "previousWork"),
            motivation: readText(formData, "motivation"),
            weeklyAvailability: readText(formData, "weeklyAvailability"),
            referenceOneFirstName: readText(formData, "referenceOneFirstName"),
            referenceOneLastName: readText(formData, "referenceOneLastName"),
            referenceOnePhone: readText(formData, "referenceOnePhone"),
            referenceOneProfession: readText(formData, "referenceOneProfession"),
            referenceTwoFirstName: readText(formData, "referenceTwoFirstName"),
            referenceTwoLastName: readText(formData, "referenceTwoLastName"),
            referenceTwoPhone: readText(formData, "referenceTwoPhone"),
            referenceTwoProfession: readText(formData, "referenceTwoProfession"),
            accuracyDeclarationAccepted:
                formData.get("accuracyDeclarationAccepted")?.toString() ===
                "on",
            kvkkAccepted: formData.get("kvkkAccepted")?.toString() === "on",
        });

        if (!parsed.success) {
            const validationErrors = normalizeValidationErrors(parsed.error);
            return NextResponse.json(
                {
                    error: "Başvuru alınamadı. Eksik veya hatalı alanlar var.",
                    validationErrors,
                },
                { status: 400 },
            );
        }

        const files = chairAssistantDocumentDefinitions.map((definition) => {
            const result = ensureFile(formData, definition.type);
            return { type: definition.type, result };
        });

        const fileErrors = files
            .filter((entry) => "error" in entry.result)
            .map((entry) => {
                const result = entry.result;
                return {
                    field: entry.type,
                    label: getFieldLabel(entry.type),
                    message:
                        "error" in result
                            ? result.error
                            : "Dosya doğrulaması başarısız.",
                };
            });

        if (fileErrors.length > 0) {
            return NextResponse.json(
                {
                    error:
                        "Başvuru alınamadı. Evrak alanlarında düzeltilmesi gereken noktalar var.",
                    validationErrors: fileErrors,
                },
                { status: 400 },
            );
        }

        const hasUploads = files.some(
            (entry) => entry.result.file instanceof File,
        );
        if (hasUploads && !process.env["yeni_blob_READ_WRITE_TOKEN"]) {
            return NextResponse.json(
                { error: "Dosya yükleme servisi hazır değil." },
                { status: 500 },
            );
        }

        const data = parsed.data;
        const graduateProgramInfo =
            [
                data.mastersProgram
                    ? `Yüksek Lisans: ${data.mastersProgram}`
                    : null,
                data.doctorateProgram
                    ? `Doktora: ${data.doctorateProgram}`
                    : null,
            ]
                .filter(Boolean)
                .join("\n") || null;

        const created = await prisma.chairAssistantApplication.create({
            data: {
                fullName: data.fullName,
                phone: data.phone,
                email: data.email,
                city: data.city,
                profession: data.profession,
                chair: data.chair,
                undergraduateInfo: data.undergraduateInfo,
                graduateLevel: data.graduateLevel,
                mastersProgram: data.mastersProgram || null,
                doctorateProgram: data.doctorateProgram || null,
                graduateProgramInfo,
                academicFields: data.academicFields,
                thesisTopic: data.thesisTopic,
                previousWork: data.previousWork,
                motivation: data.motivation,
                weeklyAvailability: data.weeklyAvailability,
                languageScore: null,
                contribution: null,
                attendanceCommitment: null,
                additionalNotes: null,
                referenceOneFirstName: data.referenceOneFirstName,
                referenceOneLastName: data.referenceOneLastName,
                referenceOnePhone: data.referenceOnePhone,
                referenceOneProfession: data.referenceOneProfession,
                referenceTwoFirstName: data.referenceTwoFirstName,
                referenceTwoLastName: data.referenceTwoLastName,
                referenceTwoPhone: data.referenceTwoPhone,
                referenceTwoProfession: data.referenceTwoProfession,
                accuracyDeclarationAccepted: data.accuracyDeclarationAccepted,
                kvkkAccepted: data.kvkkAccepted,
            },
        });

        applicationId = created.id;

        const uploadedDocuments = [];

        for (const entry of files) {
            const file = "file" in entry.result ? entry.result.file : null;

            if (!file) {
                continue;
            }

            const safeName =
                file.name && file.name.trim().length > 0
                    ? sanitizeUploadFileName(file.name.trim())
                    : `${entry.type}-${randomUUID()}`;

            const blob = await put(
                `chair-assistant-applications/${created.id}/${entry.type}/${safeName}`,
                file,
                {
                    access: "public",
                    token: process.env["yeni_blob_READ_WRITE_TOKEN"],
                    contentType: file.type || undefined,
                    addRandomSuffix: true,
                    cacheControlMaxAge: 60 * 60 * 24 * 365,
                },
            );

            uploadedDocuments.push({
                type: entry.type,
                url: blob.url,
                fileName: file.name || safeName,
                mimeType: file.type || null,
                size: file.size || null,
            });
        }

        if (uploadedDocuments.length > 0) {
            await prisma.chairAssistantApplicationDocument.createMany({
                data: uploadedDocuments.map((document) => ({
                    applicationId: created.id,
                    ...document,
                })),
            });
        }

        if (process.env.INFO_EMAIL) {
            try {
                await sendMail({
                    to: process.env.INFO_EMAIL,
                    subject: `Yeni Kürsü Asistan Başvurusu: ${data.fullName}`,
                    text: [
                        `Başvuru No: ${created.id}`,
                        `Ad Soyad: ${data.fullName}`,
                        `Telefon: ${data.phone}`,
                        `E-posta: ${data.email}`,
                        `Şehir: ${data.city}`,
                        `Meslek: ${data.profession}`,
                        `Kürsü: ${formatChairAssistantChair(data.chair)}`,
                        `Lisans Bilgisi: ${data.undergraduateInfo}`,
                        `Aktif Lisansüstü Seviye: ${formatChairAssistantGraduateLevel(data.graduateLevel)}`,
                        `Yüksek Lisans: ${data.mastersProgram || "-"}`,
                        `Doktora: ${data.doctorateProgram || "-"}`,
                        `Akademik Alanlar: ${data.academicFields}`,
                        `Tez / Araştırma Başlığı: ${data.thesisTopic}`,
                        `Önceki Çalışmalar: ${data.previousWork}`,
                        `Katılma Nedeni: ${data.motivation}`,
                        `Haftalık Zaman: ${data.weeklyAvailability}`,
                        `Referans 1: ${formatReferenceLine(
                            data.referenceOneFirstName,
                            data.referenceOneLastName,
                            data.referenceOnePhone,
                            data.referenceOneProfession,
                        )}`,
                        `Referans 2: ${formatReferenceLine(
                            data.referenceTwoFirstName,
                            data.referenceTwoLastName,
                            data.referenceTwoPhone,
                            data.referenceTwoProfession,
                        )}`,
                        "",
                        "Yüklenen Evraklar:",
                        ...(uploadedDocuments.length > 0
                            ? uploadedDocuments.map(
                                  (document) =>
                                      `- ${formatChairAssistantDocumentType(document.type)}: ${document.fileName}`,
                              )
                            : ["- Evrak eklenmedi"]),
                    ].join("\n"),
                });
            } catch (mailError) {
                console.error(
                    "[chair-assistant-application] mail error",
                    mailError,
                );
            }
        }

        return NextResponse.json({ success: true, id: created.id });
    } catch (error) {
        if (applicationId) {
            await prisma.chairAssistantApplication
                .delete({ where: { id: applicationId } })
                .catch(() => null);
        }

        console.error("[chair-assistant-application] submit error", error);
        return NextResponse.json(
            { error: "Başvuru kaydedilemedi." },
            { status: 500 },
        );
    }
}
