"use client";

import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import {
    AlertTriangle,
    ArrowRight,
    CheckCircle2,
    FileText,
} from "lucide-react";
import type {
    ChairAssistantDocumentType,
    ChairAssistantGraduateLevel,
} from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    chairAssistantAcceptedFileExtensions,
    chairAssistantChairs,
    chairAssistantDocumentDefinitions,
    chairAssistantGraduateLevelOptions,
    chairAssistantMaxFileSize,
    turkishCities,
} from "@/lib/chair-assistant";

type FileNamesState = Partial<Record<ChairAssistantDocumentType, string>>;

const inputClassName =
    "h-12 rounded-2xl border-slate-200 bg-white px-4 text-base text-slate-900 shadow-none transition-colors duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

const textareaClassName =
    "min-h-[136px] resize-y rounded-2xl border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-none transition-colors duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

const selectClassName =
    "h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 shadow-none outline-none transition-colors duration-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200";

function SectionShell({
    step,
    title,
    description,
    children,
}: {
    step: string;
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <section className="rounded-[32px] border border-slate-200 bg-[#f8fbff]">
            <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                        {step}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        {title}
                    </h3>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                    {description}
                </p>
            </div>
            <div className="space-y-6 px-5 py-5 sm:px-7 sm:py-6">
                {children}
            </div>
        </section>
    );
}

function FieldLabel({
    htmlFor,
    children,
}: {
    htmlFor: string;
    children: ReactNode;
}) {
    return (
        <label
            htmlFor={htmlFor}
            className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700"
        >
            {children}
        </label>
    );
}

function FieldGroup({
    htmlFor,
    label,
    children,
}: {
    htmlFor: string;
    label: string;
    children: ReactNode;
}) {
    return (
        <div className="space-y-2.5">
            <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
            {children}
        </div>
    );
}

export function ChairAssistantApplicationForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [graduateLevel, setGraduateLevel] = useState<
        ChairAssistantGraduateLevel | ""
    >("");
    const [fileNames, setFileNames] = useState<FileNamesState>({});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/chair-assistant-applications", {
                method: "POST",
                body: formData,
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(
                    payload?.error ||
                        "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
                );
            }

            setSuccess(true);
            setGraduateLevel("");
            setFileNames({});
            form.reset();
        } catch (submitError) {
            setError(
                submitError instanceof Error
                    ? submitError.message
                    : "Başvuru gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (
        type: ChairAssistantDocumentType,
        file: File | null,
    ) => {
        setFileNames((prev) => ({
            ...prev,
            [type]: file?.name || "",
        }));
    };

    if (success) {
        return (
            <SectionShell
                step="Bölüm 6"
                title="Başvurunuz başarı ile alınmıştır."
                description="Formunuz sisteme kaydedildi. Gerekli görülmesi halinde sizinle telefon veya e-posta üzerinden iletişime geçilecektir."
            >
                <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="h-6 w-6" />
                        </span>
                        <div className="space-y-2">
                            <h4 className="text-xl font-semibold tracking-tight text-slate-950">
                                TARF Düşünce Enstitüsü Kürsü Asistan Başvurunuz
                                Alındı
                            </h4>
                            <p className="text-sm leading-7 text-slate-600">
                                Başvuru bilgileriniz ve yüklediğiniz evraklar
                                başarıyla kaydedildi. Değerlendirme süreci
                                tamamlandığında sizinle iletişime geçilecektir.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionShell>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <SectionShell
                step="Bölüm 1"
                title="Kişisel Bilgiler"
                description="Ad soyad, telefon, e-posta ve ikamet ettiğiniz şehir bilgilerini eksiksiz giriniz."
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <FieldGroup htmlFor="fullName" label="ADI SOYADI">
                        <Input
                            id="fullName"
                            name="fullName"
                            required
                            placeholder="Ad Soyad"
                            className={inputClassName}
                        />
                    </FieldGroup>

                    <FieldGroup htmlFor="phone" label="TELEFON NO">
                        <Input
                            id="phone"
                            name="phone"
                            required
                            placeholder="05xx xxx xx xx"
                            className={inputClassName}
                        />
                    </FieldGroup>

                    <FieldGroup htmlFor="email" label="E-POSTA">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="ornek@eposta.com"
                            className={inputClassName}
                        />
                    </FieldGroup>

                    <FieldGroup htmlFor="city" label="İKAMET ETTİĞİNİZ ŞEHİR">
                        <select
                            id="city"
                            name="city"
                            required
                            defaultValue=""
                            className={selectClassName}
                        >
                            <option value="" disabled>
                                Şehir seçiniz
                            </option>
                            {turkishCities.map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </FieldGroup>

                    <FieldGroup htmlFor="profession" label="MESLEĞİ">
                        <Input
                            id="profession"
                            name="profession"
                            required
                            placeholder="Mesleğiniz"
                            className={inputClassName}
                        />
                    </FieldGroup>
                </div>
            </SectionShell>

            <SectionShell
                step="Bölüm 2"
                title="Başvuru Yapmak İstediğiniz Kürsü"
                description="Başvuru yapmak istediğiniz kürsüyü aşağıdaki listeden seçiniz."
            >
                <FieldGroup htmlFor="chair" label="KÜRSÜ SEÇİMİ">
                    <select
                        id="chair"
                        name="chair"
                        required
                        defaultValue=""
                        className={selectClassName}
                    >
                        <option value="" disabled>
                            Kürsü seçiniz
                        </option>
                        {chairAssistantChairs.map((chair) => (
                            <option key={chair.value} value={chair.value}>
                                {chair.shortLabel}
                            </option>
                        ))}
                    </select>
                </FieldGroup>
            </SectionShell>

            <SectionShell
                step="Bölüm 3"
                title="Akademik Geçmiş ve Uzmanlık"
                description="Akademik geçmişinizi, lisansüstü programınızı ve uzmanlık alanlarınızı bu bölümde paylaşınız."
            >
                <div className="grid gap-5">
                    <FieldGroup
                        htmlFor="undergraduateInfo"
                        label="LİSANS MEZUNİYETİ"
                    >
                        <Input
                            id="undergraduateInfo"
                            name="undergraduateInfo"
                            required
                            placeholder="Bölüm ve üniversite bilgisi"
                            className={inputClassName}
                        />
                    </FieldGroup>

                    <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">
                            AKTİF LİSANSÜSTÜ PROGRAM
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {chairAssistantGraduateLevelOptions.map(
                                (option) => {
                                    const isSelected =
                                        graduateLevel === option.value;
                                    return (
                                        <label
                                            key={option.value}
                                            className={`cursor-pointer rounded-2xl border px-4 py-4 transition-colors duration-200 ${
                                                isSelected
                                                    ? "border-sky-500 bg-sky-50"
                                                    : "border-slate-200 bg-white hover:border-sky-300"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="graduateLevel"
                                                value={option.value}
                                                checked={isSelected}
                                                onChange={() =>
                                                    setGraduateLevel(
                                                        option.value,
                                                    )
                                                }
                                                className="sr-only"
                                                required
                                            />
                                            <span className="text-sm font-semibold text-slate-900">
                                                {option.label}
                                            </span>
                                        </label>
                                    );
                                },
                            )}
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <FieldGroup
                            htmlFor="mastersProgram"
                            label="YÜKSEK LİSANS"
                        >
                            <Input
                                id="mastersProgram"
                                name="mastersProgram"
                                placeholder="Program ve üniversite bilgisi"
                                className={inputClassName}
                            />
                        </FieldGroup>

                        <FieldGroup htmlFor="doctorateProgram" label="DOKTORA">
                            <Input
                                id="doctorateProgram"
                                name="doctorateProgram"
                                placeholder="Program ve üniversite bilgisi"
                                className={inputClassName}
                            />
                        </FieldGroup>
                    </div>

                    <FieldGroup
                        htmlFor="academicFields"
                        label="AKADEMİK ÇALIŞMA ALANLARINIZ NELERDİR?"
                    >
                        <Textarea
                            id="academicFields"
                            name="academicFields"
                            required
                            placeholder="Çalışma alanlarınızı ve uzmanlaştığınız başlıkları yazınız."
                            className={textareaClassName}
                        />
                    </FieldGroup>

                    <FieldGroup
                        htmlFor="thesisTopic"
                        label="YOĞUNLAŞTIĞINIZ ARAŞTIRMA BAŞLIĞI YA DA ALANI"
                    >
                        <Textarea
                            id="thesisTopic"
                            name="thesisTopic"
                            required
                            placeholder="Tez konunuz veya yoğunlaştığınız araştırma alanı"
                            className={textareaClassName}
                        />
                    </FieldGroup>

                    <FieldGroup
                        htmlFor="previousWork"
                        label="DAHA ÖNCE YER ALDIĞINIZ AKADEMİK, SOSYAL VEYA KURUMSAL ÇALIŞMALAR"
                    >
                        <Textarea
                            id="previousWork"
                            name="previousWork"
                            required
                            placeholder="Yer aldığınız çalışmalar, projeler veya görevler"
                            className={textareaClassName}
                        />
                    </FieldGroup>
                </div>
            </SectionShell>

            <SectionShell
                step="Bölüm 4"
                title="Motivasyon ve Referanslar"
                description="Başvuru gerekçenizi, haftalık zaman planınızı ve referans bilgilerinizi giriniz."
            >
                <div className="grid gap-5">
                    <FieldGroup
                        htmlFor="motivation"
                        label="BAŞVURDUĞUNUZ KÜRSÜYE NEDEN KATILMAK İSTİYORSUNUZ?"
                    >
                        <Textarea
                            id="motivation"
                            name="motivation"
                            required
                            placeholder="Başvuru motivasyonunuzu yazınız."
                            className={textareaClassName}
                        />
                    </FieldGroup>

                    <FieldGroup
                        htmlFor="weeklyAvailability"
                        label="KÜRSÜ ÇALIŞMALARINA HAFTALIK NE KADAR ZAMAN AYIRABİLİRSİNİZ?"
                    >
                        <Input
                            id="weeklyAvailability"
                            name="weeklyAvailability"
                            required
                            placeholder="Örn. Haftada 8-10 saat"
                            className={inputClassName}
                        />
                    </FieldGroup>

                    <div className="grid gap-5 lg:grid-cols-2">
                        <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">
                                REFERANS - 1
                            </p>
                            <div className="mt-4 grid gap-4">
                                <FieldGroup
                                    htmlFor="referenceOneFirstName"
                                    label="ADI"
                                >
                                    <Input
                                        id="referenceOneFirstName"
                                        name="referenceOneFirstName"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceOneLastName"
                                    label="SOYADI"
                                >
                                    <Input
                                        id="referenceOneLastName"
                                        name="referenceOneLastName"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceOnePhone"
                                    label="TELEFON"
                                >
                                    <Input
                                        id="referenceOnePhone"
                                        name="referenceOnePhone"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceOneProfession"
                                    label="MESLEĞİ"
                                >
                                    <Input
                                        id="referenceOneProfession"
                                        name="referenceOneProfession"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                            </div>
                        </div>

                        <div className="rounded-[28px] border border-slate-200 bg-white p-5">
                            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">
                                REFERANS - 2
                            </p>
                            <div className="mt-4 grid gap-4">
                                <FieldGroup
                                    htmlFor="referenceTwoFirstName"
                                    label="ADI"
                                >
                                    <Input
                                        id="referenceTwoFirstName"
                                        name="referenceTwoFirstName"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceTwoLastName"
                                    label="SOYADI"
                                >
                                    <Input
                                        id="referenceTwoLastName"
                                        name="referenceTwoLastName"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceTwoPhone"
                                    label="TELEFON"
                                >
                                    <Input
                                        id="referenceTwoPhone"
                                        name="referenceTwoPhone"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                                <FieldGroup
                                    htmlFor="referenceTwoProfession"
                                    label="MESLEĞİ"
                                >
                                    <Input
                                        id="referenceTwoProfession"
                                        name="referenceTwoProfession"
                                        required
                                        className={inputClassName}
                                    />
                                </FieldGroup>
                            </div>
                        </div>
                    </div>
                    <p className="px-1 text-sm font-medium text-slate-500">
                        * Farklı iki referans girilmelidir.
                    </p>
                </div>
            </SectionShell>

            <SectionShell
                step="Bölüm 5"
                title="Evrak Yükleme"
                description={`Belgeleri isterseniz PDF veya JPG formatında ekleyebilirsiniz. Her dosya en fazla ${Math.round(
                    chairAssistantMaxFileSize / (1024 * 1024),
                )} MB olabilir.`}
            >
                <div className="space-y-4">
                    {chairAssistantDocumentDefinitions.map((document) => (
                        <div
                            key={document.type}
                            className="rounded-[28px] border border-slate-200 bg-white p-4 sm:p-5"
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 shrink-0 text-slate-400" />
                                        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-700">
                                            {document.label}
                                        </p>
                                    </div>
                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {document.helper}
                                    </p>
                                    <p className="mt-1 text-xs leading-6 text-slate-400">
                                        {fileNames[document.type]
                                            ? `Seçilen dosya: ${fileNames[document.type]}`
                                            : ""}
                                    </p>
                                </div>

                                <div className="sm:w-[280px]">
                                    <input
                                        id={document.type}
                                        name={document.type}
                                        type="file"
                                        accept={
                                            chairAssistantAcceptedFileExtensions
                                        }
                                        onChange={(event) =>
                                            handleFileChange(
                                                document.type,
                                                event.currentTarget
                                                    .files?.[0] || null,
                                            )
                                        }
                                        className="block w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-sky-800"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionShell>

            <SectionShell
                step="Bölüm 6"
                title="Onay ve Gönderim"
                description="Başvurunuz gönderilmeden önce beyan ve KVKK onayının tamamlanması gerekir."
            >
                <div className="space-y-4">
                    <label className="flex items-start gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                        <input
                            type="checkbox"
                            name="accuracyDeclarationAccepted"
                            required
                            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-sky-600"
                        />
                        <span>
                            Verdiğim bilgilerin doğru olduğunu beyan ediyorum.
                        </span>
                    </label>

                    <label className="flex items-start gap-3 rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                        <input
                            type="checkbox"
                            name="kvkkAccepted"
                            required
                            className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-sky-600"
                        />
                        <span>
                            Kişisel verilerimin işlenmesine ilişkin{" "}
                            <Link
                                href="/tr/kvkk-aydinlatma-metni"
                                target="_blank"
                                className="font-semibold text-slate-900 underline decoration-sky-400 underline-offset-4"
                            >
                                KVKK Aydınlatma Metni
                            </Link>{" "}
                            ’ni okudum ve kabul ediyorum.
                        </span>
                    </label>

                    {error ? (
                        <div className="flex items-start gap-3 rounded-[24px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    ) : null}

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-14 w-full rounded-full bg-emerald-500 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        <span className="flex items-center gap-2">
                            {loading
                                ? "Başvuru gönderiliyor…"
                                : "Başvuruyu gönder"}
                            {!loading ? (
                                <ArrowRight className="h-5 w-5" />
                            ) : null}
                        </span>
                    </Button>
                </div>
            </SectionShell>
        </form>
    );
}
