import { api } from '@/lib/api'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { ApplicationForm } from '@/components/forms/application-form'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'contact', pathSegments: ['contact'] })
}

type ContactCopy = {
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroBody: string
  emailLabel: string
  phoneLabel: string
  addressLabel: string
  plusCodeLabel: string
  directions: string
  formTitle: string
  formSubtitle: string
  typeLabel: string
  applicationTypes: string[]
  placeholders: {
    name: string
    email: string
    phone: string
    company: string
    topic: string
    message: string
  }
  submit: string
  mapTitle: string
  mapBody: string
}

const localizedContent: Record<'tr' | 'en' | 'ar', ContactCopy> = {
  tr: {
    heroEyebrow: 'TARF Akademi',
    heroTitle: 'Bilim, teknoloji ve etik ekseninde ortaklık kurun',
    heroSubtitle:
      'TARF, gençleri üretken kılan çok katmanlı teknoloji ekosistemi. Formu doldurun, 24 saat içinde yol haritamızı paylaşalım.',
    heroBody:
      'Bilimsel araştırma, yazılım teknolojileri, dergi ve teknoloji takımları aynı çatı altında. İhtiyacınızı anlatın; Ankara stüdyomuzdan hibrit görüşme ayarlayalım ve sprint bazlı planımızı sizinle paylaşalım.',
    emailLabel: 'E-posta',
    phoneLabel: 'Telefon',
    addressLabel: 'Adres',
    plusCodeLabel: 'Plus kodu',
    directions: 'Yol tarifi al',
    formTitle: 'Başvuru formu',
    formSubtitle: 'Ekibimiz 24 saat içinde dönüş yapar.',
    typeLabel: 'Başvuru Türü',
    applicationTypes: [
      'Etkinlik Başvurusu',
      'Eğitim / Program Başvurusu',
      'Yazılım Geliştirme / Teknik Danışmanlık',
      'Kariyer / Staj',
      'İşbirliği / Partnerlik',
      'Basın & Medya',
      'Genel Soru / Diğer',
    ],
    placeholders: {
      name: 'Adınız Soyadınız',
      email: 'E-posta adresiniz',
      phone: 'Telefon numaranız',
      company: 'Kurum / Şirket',
      topic: 'Talep konusu',
      message: 'TARF ile neyi başarmak istiyorsunuz?',
    },
    submit: 'Gönder',
    mapTitle: 'TARF Ankara merkezi',
    mapBody: 'Program tasarımları ve hibrit görüşmeler Ankara stüdyosunda planlanır.',
  },
  en: {
    heroEyebrow: 'TARF Academy',
    heroTitle: 'Co-create the TARF learning ecosystem',
    heroSubtitle:
      'We unite science, software, ethics, and community impact. Share your request—expect a tailored plan within 24 hours.',
    heroBody:
      'From research labs to software teams and publications, TARF shapes future talent. Tell us about your challenge, we will arrange a hybrid session from our Ankara studio and deliver a sprint-ready roadmap.',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    plusCodeLabel: 'Plus code',
    directions: 'Get directions',
    formTitle: 'Application form',
    formSubtitle: 'We reply within 24 hours.',
    typeLabel: 'Application Type',
    applicationTypes: [
      'Event Application',
      'Training / Program Application',
      'Software / Technical Consulting',
      'Career / Internship',
      'Partnership / Collaboration',
      'Press & Media',
      'General Inquiry / Other',
    ],
    placeholders: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      company: 'Organization',
      topic: 'Topic',
      message: 'What will we build together?',
    },
    submit: 'Send',
    mapTitle: 'TARF Ankara hub',
    mapBody: 'Strategy workshops and hybrid sessions run from our Ankara studio.',
  },
  ar: {
    heroEyebrow: 'أكاديمية تاراف',
    heroTitle: 'انضم إلى منظومة TARF للعلم والتقنية',
    heroSubtitle:
      'نمزج العلوم والتقنية والقيم لبناء جيل منتج. شارك احتياجك لنرسل خطة واضحة خلال 24 ساعة.',
    heroBody:
      'تجمع TARF بين البحث العلمي، فرق البرمجة، المجلة الرقمية وتجارب الميدان. شارك رؤيتك لنحدد موعداً هجينا من استوديو أنقرة ونبني خريطة طريق سريعة.',
    emailLabel: 'البريد الإلكتروني',
    phoneLabel: 'الهاتف',
    addressLabel: 'العنوان',
    plusCodeLabel: 'رمز بلس',
    directions: 'الحصول على الاتجاهات',
    formTitle: 'نموذج التقديم',
    formSubtitle: 'نرد خلال 24 ساعة.',
    typeLabel: 'نوع الطلب',
    applicationTypes: [
      'طلب فعالية',
      'طلب تدريب / برنامج',
      'استشارة برمجية / تقنية',
      'وظيفة / تدريب',
      'شراكة / تعاون',
      'إعلام / صحافة',
      'استفسار عام',
    ],
    placeholders: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      company: 'الجهة / الشركة',
      topic: 'موضوع الطلب',
      message: 'ما الذي نحققه معاً؟',
    },
    submit: 'إرسال',
    mapTitle: 'مركز TARF في أنقرة',
    mapBody: 'تعقد الورش والجلسات الهجينة من استوديو أنقرة.',
  },
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type ContactCopyOverride = Partial<ContactCopy> & {
  placeholders?: Partial<ContactCopy['placeholders']>
  applicationTypes?: string[]
}

const mergeCopy = (base: ContactCopy, override?: unknown): ContactCopy => {
  if (!isRecord(override)) return base
  const overrideCopy = override as ContactCopyOverride

  const placeholdersOverride = isRecord(overrideCopy.placeholders)
    ? (overrideCopy.placeholders as Partial<ContactCopy['placeholders']>)
    : undefined
  const mergedPlaceholders: ContactCopy['placeholders'] = {
    ...base.placeholders,
    ...(typeof placeholdersOverride?.name === 'string' ? { name: placeholdersOverride.name } : {}),
    ...(typeof placeholdersOverride?.email === 'string' ? { email: placeholdersOverride.email } : {}),
    ...(typeof placeholdersOverride?.phone === 'string' ? { phone: placeholdersOverride.phone } : {}),
    ...(typeof placeholdersOverride?.company === 'string' ? { company: placeholdersOverride.company } : {}),
    ...(typeof placeholdersOverride?.topic === 'string' ? { topic: placeholdersOverride.topic } : {}),
    ...(typeof placeholdersOverride?.message === 'string' ? { message: placeholdersOverride.message } : {}),
  }

  const mergedApplicationTypes =
    Array.isArray(overrideCopy.applicationTypes) &&
    overrideCopy.applicationTypes.every((item) => typeof item === 'string')
      ? (overrideCopy.applicationTypes as ContactCopy['applicationTypes'])
      : base.applicationTypes

  return {
    ...base,
    ...(typeof overrideCopy.heroEyebrow === 'string' ? { heroEyebrow: overrideCopy.heroEyebrow } : {}),
    ...(typeof overrideCopy.heroTitle === 'string' ? { heroTitle: overrideCopy.heroTitle } : {}),
    ...(typeof overrideCopy.heroSubtitle === 'string' ? { heroSubtitle: overrideCopy.heroSubtitle } : {}),
    ...(typeof overrideCopy.heroBody === 'string' ? { heroBody: overrideCopy.heroBody } : {}),
    ...(typeof overrideCopy.emailLabel === 'string' ? { emailLabel: overrideCopy.emailLabel } : {}),
    ...(typeof overrideCopy.phoneLabel === 'string' ? { phoneLabel: overrideCopy.phoneLabel } : {}),
    ...(typeof overrideCopy.addressLabel === 'string' ? { addressLabel: overrideCopy.addressLabel } : {}),
    ...(typeof overrideCopy.plusCodeLabel === 'string' ? { plusCodeLabel: overrideCopy.plusCodeLabel } : {}),
    ...(typeof overrideCopy.directions === 'string' ? { directions: overrideCopy.directions } : {}),
    ...(typeof overrideCopy.formTitle === 'string' ? { formTitle: overrideCopy.formTitle } : {}),
    ...(typeof overrideCopy.formSubtitle === 'string' ? { formSubtitle: overrideCopy.formSubtitle } : {}),
    ...(typeof overrideCopy.typeLabel === 'string' ? { typeLabel: overrideCopy.typeLabel } : {}),
    ...(typeof overrideCopy.submit === 'string' ? { submit: overrideCopy.submit } : {}),
    ...(typeof overrideCopy.mapTitle === 'string' ? { mapTitle: overrideCopy.mapTitle } : {}),
    ...(typeof overrideCopy.mapBody === 'string' ? { mapBody: overrideCopy.mapBody } : {}),
    placeholders: mergedPlaceholders,
    applicationTypes: mergedApplicationTypes,
  }
}

const fallbackContact = {
  addressLine1: 'Aşağı Öveçler MH 1324. CD No:63',
  addressLine2: 'Dikmen, 06460 Çankaya/Ankara',
  plusCode: 'VRVG+G2 Çankaya, Ankara',
  phone: '+90 312 283 00 00',
  email: 'bilgi@verenel.org.tr',
  mapUrl:
    'https://www.google.com/maps/place/VERENEL+DERNE%C4%9E%C4%B0/@39.8937501,32.7488323,13z/data=!4m22!1m15!4m14!1m6!1m2!1s0x14d345001edf907f:0x11169b63277c4f7!2zVkVSRU5FTCBERVJORcSexLA!2m2!1d32.82505!2d39.8937501!1m6!1m2!1s0x14d345001edf907f:0x11169b63277c4f7!2zQcWfYcSfxLEgw5Z2ZcOnbGVyLCAxMzI0LiBDZC4gTm86NjMsIDA2NDYwIMOHYW5rYXlhL0Fua2FyYQ!2m2!1d32.82505!2d39.8937501!3m5!1s0x14d345001edf907f:0x11169b63277c4f7!8m2!3d39.8937501!4d32.82505!16s%2Fg%2F11y74p7_vw?hl=tr&entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D',
} as const

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const settings = await api.getSettings(locale)

  const rawContactContent = settings.contact_content
  const overrideCopy =
    rawContactContent && typeof rawContactContent === 'object'
      ? ((rawContactContent as Record<string, unknown>)[locale] as Record<string, unknown> | undefined) ||
        (rawContactContent as Record<string, unknown>)
      : undefined
  const copy = mergeCopy(
    localizedContent[locale as keyof typeof localizedContent] || localizedContent.en,
    overrideCopy,
  )
  const contactEmail = settings.contact_email || fallbackContact.email
  const contactPhone = settings.contact_phone || fallbackContact.phone
  const contactAddress =
    settings.contact_address || `${fallbackContact.addressLine1}\n${fallbackContact.addressLine2}`
  const mapUrl = settings.contact_map_url || fallbackContact.mapUrl
  const plusCode = fallbackContact.plusCode
  const sanitizedPhone = contactPhone.replace(/\s+/g, '')

  return (
    <>
      <Header locale={locale} settings={settings} />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f6fbff] via-white to-[#eef2ff] text-slate-900">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-[url('/assets/2112.jpg')] bg-cover bg-center bg-no-repeat opacity-25 mix-blend-soft-light"
            style={{ transform: 'scale(1.1)' }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-[#f6fbff]/85 to-white" />
          <div
            className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-primary/35 blur-3xl opacity-70 animate-[spin_30s_linear_infinite]"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 right-[-10%] h-[460px] w-[460px] rounded-full bg-emerald-200/60 blur-[150px] opacity-80 animate-pulse"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/3 right-1/4 h-32 w-32 rounded-full border border-white/60 opacity-50 animate-spin"
            aria-hidden="true"
          />
        </div>
        <section className="relative py-24">
          <div className="container space-y-16">
            <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-sm backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-primary/70 animate-ping" aria-hidden="true" />
                  {copy.heroEyebrow}
                </div>
                <div className="space-y-4 text-slate-700">
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">{copy.heroTitle}</h1>
                  <p className="text-lg text-slate-600">{copy.heroSubtitle}</p>
                  <p className="text-slate-500">{copy.heroBody}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-primary/80">{copy.formTitle}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{copy.formSubtitle}</p>
                    <span className="text-sm text-slate-500">{copy.heroSubtitle}</span>
                  </div>
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl">
                    <p className="text-xs uppercase tracking-[0.35em] text-primary/80">{copy.mapTitle}</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 whitespace-pre-line">{contactAddress}</p>
                    <span className="text-sm text-slate-500">{copy.mapBody}</span>
                  </div>
                </div>
                <Card className="relative overflow-hidden border-white/70 bg-white/90 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                  <div
                    className="absolute -top-20 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute -bottom-16 left-0 h-48 w-48 rounded-full bg-emerald-100/80 blur-3xl"
                    aria-hidden="true"
                  />
                  <div className="relative grid gap-6 md:grid-cols-2">
                    <div className="group flex items-start gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{copy.emailLabel}</p>
                        <a href={`mailto:${contactEmail}`} className="text-lg font-semibold text-slate-900">
                          {contactEmail}
                        </a>
                      </div>
                    </div>
                    <div className="group flex items-start gap-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{copy.phoneLabel}</p>
                        <a href={`tel:${sanitizedPhone}`} className="text-lg font-semibold text-slate-900">
                          {contactPhone}
                        </a>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex gap-4 rounded-2xl border border-dashed border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{copy.addressLabel}</p>
                        <p className="text-lg font-semibold text-slate-900 whitespace-pre-line">{contactAddress}</p>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-dashed border-slate-200/80 px-4 py-2 text-xs font-medium text-slate-500">
                        {copy.plusCodeLabel}: {plusCode}
                      </span>
                      <a
                        href={mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary/90 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-primary"
                      >
                        {copy.directions}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
              <Card className="relative overflow-hidden border-white/70 bg-white/95 p-8 shadow-[0_40px_120px_rgba(67,89,113,0.18)] backdrop-blur">
                <div
                  className="absolute -top-16 right-4 h-44 w-44 rounded-full bg-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-12 left-12 h-36 w-36 rounded-full bg-amber-100/70 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative space-y-1">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{copy.formTitle}</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{copy.formSubtitle}</h2>
                </div>
                <ApplicationForm
                  copy={{
                    typeLabel: copy.typeLabel,
                    applicationTypes: copy.applicationTypes,
                    placeholders: copy.placeholders,
                    submit: copy.submit,
                    successTitle:
                      locale === 'tr'
                        ? 'Başvurunuz alındı'
                        : locale === 'ar'
                          ? 'تم استلام طلبك'
                          : 'Your application has been received',
                    successBody:
                      locale === 'tr'
                        ? 'En kısa sürede dönüş yapacağız.'
                        : locale === 'ar'
                          ? 'سنعاود الاتصال بك في أقرب وقت.'
                          : 'We will get back to you soon.',
                    errorTitle:
                      locale === 'tr'
                        ? 'Gönderim hatası'
                        : locale === 'ar'
                          ? 'خطأ في الإرسال'
                          : 'Submission error',
                    errorBody:
                      locale === 'tr'
                        ? 'Lütfen alanları kontrol edip tekrar deneyin.'
                        : locale === 'ar'
                          ? 'يرجى التحقق من الحقول وإعادة المحاولة.'
                          : 'Please check the fields and try again.',
                  }}
                />
              </Card>
            </div>

            <Card className="relative overflow-hidden border-white/70 bg-white/90 p-8 shadow-[0_40px_120px_rgba(67,89,113,0.18)] backdrop-blur">
              <div
                className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-emerald-200/30 blur-[120px] opacity-80 animate-[spin_40s_linear_infinite]"
                aria-hidden="true"
              />
              <div className="relative flex flex-wrap items-center gap-6">
                <div className="space-y-3 min-w-[260px]">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{copy.mapTitle}</p>
                  <p className="text-2xl font-semibold text-slate-900 whitespace-pre-line">{contactAddress}</p>
                  <p className="text-sm text-slate-500">{copy.mapBody}</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    {copy.directions}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                  <span className="rounded-full border border-dashed border-slate-200/80 px-4 py-2 text-xs font-medium text-slate-500">
                    {plusCode}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer locale={locale} settings={settings} />
    </>
  )
}
