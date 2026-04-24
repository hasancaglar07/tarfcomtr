import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ChairAssistantDocumentType } from "@prisma/client";

import { updateChairAssistantApplicationAction } from "@/app/admin/ozel-basvurular/actions";
import { Badge } from "@/components/ui/badge";
import {
    chairAssistantDocumentDefinitions,
    chairAssistantStatusColors,
    chairAssistantStatusLabels,
    chairAssistantStatusOptions,
    formatChairAssistantChair,
    getChairAssistantQuestionAnswers,
} from "@/lib/chair-assistant";
import { prisma } from "@/lib/prisma";

export default async function SpecialApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const application = await prisma.chairAssistantApplication.findUnique({
        where: { id },
        include: {
            documents: true,
        },
    });

    if (!application) {
        notFound();
    }

    const documentMap = new Map(
        application.documents.map((document) => [document.type, document]),
    );
    const answers = getChairAssistantQuestionAnswers(application);

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                            Özel Başvurular
                        </p>
                        <h1 className="text-3xl font-semibold">
                            {application.fullName}
                        </h1>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                            <span>
                                {format(
                                    application.createdAt,
                                    "dd.MM.yyyy HH:mm",
                                )}
                            </span>
                            <span>•</span>
                            <span>
                                {formatChairAssistantChair(application.chair)}
                            </span>
                            <span>•</span>
                            <span>{application.city}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/admin/ozel-basvurular"
                            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
                        >
                            Listeye dön
                        </Link>
                        <a
                            href={`/api/admin/chair-assistant-applications/${application.id}/pdf`}
                            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
                        >
                            PDF indir
                        </a>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                                    Başvuru Formu
                                </p>
                                <h2 className="text-xl font-semibold">
                                    Cevaplar
                                </h2>
                            </div>
                            <Badge
                                variant="outline"
                                className={`text-[11px] ${chairAssistantStatusColors[application.status]}`}
                            >
                                {chairAssistantStatusLabels[application.status]}
                            </Badge>
                        </div>

                        <div className="grid gap-4">
                            {answers.map((question) => (
                                <div
                                    key={question.label}
                                    className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                                >
                                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                                        {question.label}
                                    </p>
                                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-100">
                                        {question.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                                Takip
                            </p>
                            <h2 className="mt-2 text-xl font-semibold">
                                Durum ve admin notu
                            </h2>

                            <form
                                action={updateChairAssistantApplicationAction}
                                className="mt-5 space-y-3"
                            >
                                <input
                                    type="hidden"
                                    name="id"
                                    value={application.id}
                                />
                                <input
                                    type="hidden"
                                    name="redirectTo"
                                    value={`/admin/ozel-basvurular/${application.id}`}
                                />
                                <select
                                    name="status"
                                    defaultValue={application.status}
                                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                                >
                                    {chairAssistantStatusOptions.map(
                                        (status) => (
                                            <option key={status} value={status}>
                                                {
                                                    chairAssistantStatusLabels[
                                                        status
                                                    ]
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                                <textarea
                                    name="adminNote"
                                    defaultValue={application.adminNote || ""}
                                    placeholder="Admin notu"
                                    className="min-h-[140px] w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                                />
                                <button
                                    type="submit"
                                    className="w-full rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-orange-400"
                                >
                                    Kaydet
                                </button>
                            </form>
                        </section>

                        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                                Yüklenen Evraklar
                            </p>
                            <h2 className="mt-2 text-xl font-semibold">
                                Belgeler
                            </h2>

                            <div className="mt-5 space-y-3">
                                {chairAssistantDocumentDefinitions.map(
                                    (definition) => {
                                        const document = documentMap.get(
                                            definition.type,
                                        );
                                        return (
                                            <div
                                                key={definition.type}
                                                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
                                            >
                                                <p className="text-sm font-semibold text-slate-100">
                                                    {definition.label}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {document?.fileName ||
                                                        "Belge yüklenmemiş"}
                                                </p>
                                                {document &&
                                                definition.type ===
                                                    ChairAssistantDocumentType.portrait_photo ? (
                                                    <div className="mt-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
                                                        <Image
                                                            src={`/api/admin/chair-assistant-applications/${application.id}/documents/${definition.type}?inline=1`}
                                                            alt={`${application.fullName} vesikalık fotoğrafı`}
                                                            width={320}
                                                            height={426}
                                                            unoptimized
                                                            className="h-auto w-full object-cover"
                                                        />
                                                    </div>
                                                ) : null}
                                                {document ? (
                                                    <a
                                                        href={`/api/admin/chair-assistant-applications/${application.id}/documents/${definition.type}`}
                                                        className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
                                                    >
                                                        Dosyayı indir
                                                    </a>
                                                ) : null}
                                            </div>
                                        );
                                    },
                                )}
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}
