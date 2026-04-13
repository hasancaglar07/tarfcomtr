import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { format } from "date-fns";
import { renderToBuffer } from "@react-pdf/renderer";

import { ChairAssistantApplicationPdf } from "@/components/pdf/chair-assistant-application-pdf";
import { authOptions } from "@/lib/auth";
import {
    chairAssistantDocumentDefinitions,
    chairAssistantStatusLabels,
    formatChairAssistantChair,
    getChairAssistantQuestionAnswers,
    slugifyFilePart,
} from "@/lib/chair-assistant";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(
    _request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    },
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
        }

        const { id } = await params;
        const application = await prisma.chairAssistantApplication.findUnique({
            where: { id },
            include: {
                documents: true,
            },
        });

        if (!application) {
            return NextResponse.json(
                { error: "Başvuru bulunamadı" },
                { status: 404 },
            );
        }

        const documentMap = new Map(
            application.documents.map((document) => [document.type, document]),
        );
        const questions = getChairAssistantQuestionAnswers(application);

        const pdfDocument = ChairAssistantApplicationPdf({
            createdAtLabel: format(application.createdAt, "dd.MM.yyyy HH:mm"),
            statusLabel: chairAssistantStatusLabels[application.status],
            candidateName: application.fullName,
            chairLabel: formatChairAssistantChair(application.chair),
            email: application.email,
            phone: application.phone,
            city: application.city,
            adminNote: application.adminNote,
            questions,
            documents: chairAssistantDocumentDefinitions.map((definition) => ({
                label: definition.label,
                fileName:
                    documentMap.get(definition.type)?.fileName ||
                    "Belge yüklenmedi",
            })),
        });

        const pdfBuffer = await renderToBuffer(pdfDocument);

        const candidateSlug = slugifyFilePart(application.fullName) || "aday";
        const fileName = `tarf-kursu-asistani-basvurusu-${candidateSlug}.pdf`;

        return new Response(new Uint8Array(pdfBuffer), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("[chair-assistant-pdf] generation error", error);
        return NextResponse.json(
            { error: "PDF oluşturulurken bir hata oluştu." },
            { status: 500 },
        );
    }
}
