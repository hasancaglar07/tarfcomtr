import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react'

import { ChairAssistantApplicationForm } from '@/components/forms/chair-assistant-application-form'
import {
  chairAssistantChairs,
  chairAssistantPageTitle,
  chairAssistantRequestedDocuments,
  chairAssistantResponsibilities,
} from '@/lib/chair-assistant'

const summaryItems = [
  {
    label: 'Kürsü',
    value: `${chairAssistantChairs.length} farklı alan`,
    description: 'Her kürsü için 1 asistan alınacaktır.',
  },
  {
    label: 'Belge',
    value: `${chairAssistantRequestedDocuments.length} opsiyonel evrak`,
    description: 'İsterseniz başvuru sırasında belge ekleyebilirsiniz.',
  },
  {
    label: 'Süreç',
    value: 'Esnek başvuru',
    description: 'İsterseniz yalnızca form ile, isterseniz belge ekleyerek ilerleyebilirsiniz.',
  },
] as const

const applicationNotes = [
  'Formu evrak yüklemeden de gönderebilirsiniz; belgeleri sonradan ayrıca paylaşabilirsiniz.',
  'Aynı aday, dilerse farklı kürsüler için ayrı başvuru gönderebilir.',
  'Belge yüklerseniz okunaklı ve güncel dosyalar değerlendirme sürecini hızlandırır.',
] as const

export function ChairAssistantApplicationPage() {
  return (
    <main className="bg-sky-50 text-slate-900">
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20 lg:pt-36">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Tarf Düşünce Enstitüsü
                </span>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {chairAssistantPageTitle}
                </h1>
                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                  TARF Düşünce Enstitüsü bünyesindeki kürsüler için akademik niteliği güçlü,
                  araştırma süreçlerine katkı sunabilecek kürsü asistanları alınacaktır. İlan
                  detaylarını inceleyip tek form üzerinden başvurunuzu tamamlayabilirsiniz.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {summaryItems.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                      {item.value}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {applicationNotes.map((note) => (
                  <div key={note} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>

              <a
                href="#basvuru-formu"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Başvuru formuna geç
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <aside className="rounded-[28px] border border-sky-200 bg-sky-50 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                Başvuru Özeti
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Yapı
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Başvurunuzu yalnızca form ile gönderebilir, isterseniz belge de ekleyebilirsiniz.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Belgeler
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Lisans diploması, öğrenci belgesi, dil sonucu, akademik özgeçmiş ve adli
                    sicil belgesini opsiyonel olarak yükleyebilirsiniz.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Süreç
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    Başvurunuzu form ile hemen tamamlayabilir, belgelerinizi isterseniz aynı anda
                    ekleyebilirsiniz.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-sky-50">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
              Kürsüler
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
              Başvuru yapılabilecek alanlar
            </h2>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              Aşağıdaki kürsülerin her biri için 1 asistan alınacaktır. Her kartta ilgili kürsüye
              özgü temel akademik şartları görebilirsiniz.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {chairAssistantChairs.map((chair, index) => (
              <article
                key={chair.value}
                className="rounded-[28px] border border-slate-200 bg-white p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Kürsü {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                      {chair.label}
                    </h3>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                    1 asistan
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {chair.requirements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                      <GraduationCap className="mt-1 h-4 w-4 shrink-0 text-sky-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Opsiyonel Evraklar
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Başvuruya ekleyebileceğiniz belgeler
                  </h2>
                </div>
              </div>

              <ol className="mt-6 space-y-3">
                {chairAssistantRequestedDocuments.map((item, index) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-[28px] border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Görev ve Sorumluluklar
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                    Asistandan beklenen çalışma çerçevesi
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {chairAssistantResponsibilities.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-700">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="basvuru-formu" className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-16">
          <div className="space-y-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-700">
              Başvuru Formu
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              TARF DÜŞÜNCE ENSTİTÜSÜ KÜRSÜ ASİSTANI BAŞVURU FORMU
            </h2>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Formu tek oturumda tamamlamanız önerilir. Metin alanlarını doldurup başvurunuzu
              hemen gönderebilir, isterseniz belge de ekleyebilirsiniz.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 text-left">
              <ClipboardCheck className="h-5 w-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">1. Formu doldurun</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Kişisel, akademik ve motivasyon bilgilerinizi eksiksiz girin.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 text-left">
              <FileText className="h-5 w-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">2. İsterseniz belge ekleyin</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Belgelerinizi PDF veya JPG formatında opsiyonel olarak sisteme ekleyin.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-4 text-left">
              <ShieldCheck className="h-5 w-5 text-sky-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">3. Onayı verin</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Beyan ve KVKK onayını tamamladıktan sonra gönderim yapın.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-slate-200 bg-white p-5 sm:p-8">
            <ChairAssistantApplicationForm />
          </div>
        </div>
      </section>
    </main>
  )
}
