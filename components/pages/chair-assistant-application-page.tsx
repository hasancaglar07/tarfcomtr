import { ArrowRight, BriefcaseBusiness } from "lucide-react";

import { ChairAssistantApplicationForm } from "@/components/forms/chair-assistant-application-form";
import {
    chairAssistantChairs,
    chairAssistantRequestedDocuments,
} from "@/lib/chair-assistant";

const chairAssistantResponsibilities = [
    "Uzmanlık alanındaki ulusal ve uluslararası sempozyum, kongre, çalıştay ve benzeri organizasyonları takip etmek; güncel ilmî ve düşünsel gelişmeleri izlemek.",
    "Kürsü Başkanı ve araştırmacılarla koordineli çalışmak; gerektiğinde ortak süreçlere destek vermek.",
    "Verilen araştırma, içerik üretimi, organizasyon ve raporlama görevlerini zamanında yerine getirmek.",
    "Kitap, rapor, broşür, makale ve analiz çalışmalarına katkı sunmak; gerektiğinde hazırlık ve takip süreçlerini yürütmek.",
    "Çevrim içi ve yüz yüze eğitim, seminer, atölye ve konferansların planlanması ve yürütülmesine katkı sağlamak.",
    "Enstitünün diğer birimleriyle uyum içinde çalışmak; ortak proje ve faaliyetlerde aktif rol almak.",
    "Sosyal medya ve dijital platformlar için nitelikli içerik üretmek; planlama, hazırlık ve yayımlama süreçlerini takip etmek.",
];

export function ChairAssistantApplicationPage() {
    return (
        <main className="bg-white text-slate-900">
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-36">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                                <BriefcaseBusiness className="h-4 w-4" />
                                Tarf Düşünce Enstitüsü
                            </span>

                            <div className="space-y-3">
                                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                                    <span className="block">
                                        TARF DÜŞÜNCE ENSTİTÜSÜ
                                    </span>
                                    <span className="mt-1 block">
                                        Kürsü Asistan Alımı
                                    </span>
                                </h1>
                                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                                    TARF Düşünce Enstitüsü bünyesindeki
                                    kürsüler için akademik niteliği güçlü,
                                    araştırma süreçlerine katkı sunabilecek
                                    kürsü asistanları alınacaktır. İlan
                                    detaylarını inceleyip tek form üzerinden
                                    başvurunuzu tamamlayabilirsiniz.
                                </p>
                            </div>
                        </div>

                        <article className="max-w-4xl space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-8">
                            <div className="space-y-2">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                                    Pozisyon Çerçevesi
                                </p>
                                <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-[2rem]">
                                    Asistanlardan Beklenen Görev ve
                                    Sorumluluklar
                                </h2>
                            </div>

                            <ul className="space-y-3 pl-5 text-sm leading-7 text-slate-700 sm:text-base marker:text-sky-600 list-disc">
                                {chairAssistantResponsibilities.map(
                                    (responsibility) => (
                                        <li key={responsibility}>
                                            {responsibility}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </article>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                                    Kürsü
                                </p>
                                <ul className="mt-4 space-y-2 text-base leading-7 text-slate-900">
                                    {chairAssistantChairs.map((chair) => (
                                        <li key={chair.value}>
                                            - {chair.shortLabel}
                                        </li>
                                    ))}
                                </ul>
                            </article>

                            <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                                    Belge
                                </p>
                                <ul className="mt-4 space-y-2 text-base leading-7 text-slate-900">
                                    {chairAssistantRequestedDocuments.map(
                                        (document) => (
                                            <li key={document}>
                                                - {document}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </article>
                        </div>

                        <a
                            href="#basvuru-formu"
                            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                        >
                            Başvuru Formu
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </section>

            <section id="basvuru-formu" className="bg-[#f8fbff]">
                <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-16">
                    <div className="mb-8 space-y-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
                            TARF Düşünce Enstitüsü
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-[2rem]">
                            Kürsü Asistan Başvuru Formu
                        </h2>
                        <p className="text-sm leading-7 text-slate-600 sm:text-base">
                            Zorunlu alanları doldurunuz.
                        </p>
                    </div>

                    <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-8">
                        <ChairAssistantApplicationForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
