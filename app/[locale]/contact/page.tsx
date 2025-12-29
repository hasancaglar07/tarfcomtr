import { api } from '@/lib/api'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { ApplicationForm } from '@/components/forms/application-form'

export const revalidate = 3600

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

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
    formSubtitle: '',
    typeLabel: 'Başvuru Türü',
    applicationTypes: [
      'Düşünce Enstitüsü',
      'Akademi',
      'Yazılım Geliştirme',
      'Sertifika Programlarına Katılım',
      'Konferanslara Katılım',
      'Çalıştaylara Katılım',
      'Kariyer / Staj',
      'Basın / Medya / Dergi',
      'Genel Soru / Diğer',
    ],
    placeholders: {
      name: 'Adınız Soyadınız',
      email: 'E-posta adresiniz',
      phone: 'Telefon numaranız',
      company: 'Kurum / Şirket / Okul',
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
    formSubtitle: '',
    typeLabel: 'Application Type',
    applicationTypes: [
      'Think Tank Institute',
      'Academy',
      'Software Development',
      'Certificate Programs Participation',
      'Conference Participation',
      'Workshop Participation',
      'Career / Internship',
      'Press / Media / Journal',
      'General Inquiry / Other',
    ],
    placeholders: {
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      company: 'Organization / School',
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
    formSubtitle: '',
    typeLabel: 'نوع الطلب',
    applicationTypes: [
      'معهد الفكر',
      'الأكاديمية',
      'تطوير البرمجيات',
      'المشاركة في برامج الشهادات',
      'المشاركة في المؤتمرات',
      'المشاركة في ورش العمل',
      'وظيفة / تدريب',
      'الصحافة / الإعلام / المجلة',
      'استفسار عام / أخرى',
    ],
    placeholders: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      company: 'الجهة / الشركة / المدرسة',
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
  const contactPhone = settings.contact_phone?.trim() || ''
  const contactAddress =
    settings.contact_address || `${fallbackContact.addressLine1}\n${fallbackContact.addressLine2}`
  const mapUrl = settings.contact_map_url || fallbackContact.mapUrl
  const plusCode = fallbackContact.plusCode
  const sanitizedPhone = contactPhone.replace(/\s+/g, '')
  const showPhone = contactPhone.length > 0

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Global Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
        aria-hidden="true"
      />

      <section className="relative z-10 pt-32 lg:pt-40 pb-20">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-24 items-start">

            {/* Left Column: Hero Content & Contact Info */}
            <div className="space-y-12">
              {/* Hero Text Area */}
              <div className="space-y-6 relative">
                <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {copy.heroEyebrow}
                </div>

                <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-[1.1]">
                  {copy.heroTitle}
                </h1>
                <p className="text-xl font-medium text-slate-600 leading-relaxed">
                  {copy.heroSubtitle}
                </p>
                <p className="text-lg text-slate-500 leading-relaxed font-normal">
                  {copy.heroBody}
                </p>
              </div>

              {/* Contact Cards Grid */}
              <div className="space-y-4">
                {/* Email Card */}
                <a href={`mailto:${contactEmail}`} className="group flex items-center gap-5 rounded-[24px] border border-white/60 bg-white/40 p-5 shadow-sm transition-all hover:bg-white/80 hover:border-white hover:shadow-lg hover:-translate-y-1 backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{copy.emailLabel}</p>
                    <p className="text-base font-bold text-slate-900 break-all">{contactEmail}</p>
                  </div>
                </a>

                {/* Phone Card */}
                {showPhone && (
                  <a href={`tel:${sanitizedPhone}`} className="group flex items-center gap-5 rounded-[24px] border border-white/60 bg-white/40 p-5 shadow-sm transition-all hover:bg-white/80 hover:border-white hover:shadow-lg hover:-translate-y-1 backdrop-blur-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{copy.phoneLabel}</p>
                      <p className="text-base font-bold text-slate-900">{contactPhone}</p>
                    </div>
                  </a>
                )}

                {/* Address Card */}
                <div className="group flex items-start gap-5 rounded-[24px] border border-white/60 bg-white/40 p-5 shadow-sm transition-all hover:bg-white/80 hover:border-white hover:shadow-lg backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">{copy.addressLabel}</p>
                    <p className="text-base font-bold text-slate-900 leading-snug whitespace-pre-line">{contactAddress}</p>
                  </div>
                </div>
              </div>

              {/* Map Link Card (Compact) */}
              <div className="inline-flex flex-wrap items-center gap-4 p-1">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-slate-900 hover:shadow-xl"
                >
                  {copy.directions}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <div className="bg-white/50 px-4 py-2 rounded-full border border-white/60 text-xs font-bold text-slate-500 uppercase tracking-wider backdrop-blur-sm">
                  {copy.plusCodeLabel}: <span className="text-slate-800">{plusCode}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form (Prominent) */}
            <div className="relative isolate lg:sticky lg:top-32">

              {/* Animated Attention Grabbing Border/Glow */}
              {/* Grand Rotating Border Beam & Glow */}
              <div className="absolute -inset-[2px] rounded-[52px] overflow-hidden pointer-events-none">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] animate-[spin_6s_linear_infinite] opacity-70"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0 300deg, #fbbf24 330deg, #ea580c 360deg)' }}
                />
              </div>
              <div className="absolute -inset-[2px] rounded-[52px] bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 opacity-20 blur-xl animate-pulse pointer-events-none" />

              <div className="relative rounded-[48px] border border-white/80 bg-white/90 p-8 md:p-10 shadow-[0_40px_100px_rgba(234,88,12,0.15)] backdrop-blur-3xl">
                {/* Badge */}
                <div className="absolute top-8 right-8 hidden sm:block">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-700 border border-orange-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    {locale === 'tr' ? 'Hızlı Başvuru' : 'Fast Track'}
                  </span>
                </div>

                <div className="mb-8 pr-12">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">{copy.formTitle}</h2>
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
                    kvkkLabel:
                      locale === 'tr'
                        ? 'Kişisel verilerimin işlenmesine ilişkin'
                        : locale === 'ar'
                          ? 'فيما يتعلق بمعالجة بياناتي الشخصية'
                          : 'Regarding the processing of my personal data, I have read and accept the',
                    kvkkLinkText:
                      locale === 'tr'
                        ? 'KVKK Aydınlatma Metni'
                        : locale === 'ar'
                          ? 'نص إشعار KVKK'
                          : 'KVKK Privacy Notice',
                    kvkkLink: `/${locale}/kvkk-aydinlatma-metni`,
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
