import { api } from '@/lib/api'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Layers, ArrowRight, Sparkles } from 'lucide-react'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

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
  return buildPageMetadata({ locale, page: 'services', pathSegments: ['services'] })
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const services = await api.getServices(locale)

  const categories = Array.from(
    new Set(services.map((service) => service.category?.name).filter(Boolean) as string[])
  )

  const pageTitle = {
    tr: 'Program Kataloğu',
    en: 'Programs & Services',
    ar: 'البرامج والخدمات',
  }

  const pageDescription = {
    tr: 'Kurumsal dönüşüme yön veren eğitim ve danışmanlık paketleri',
    en: 'Education and consultancy suites that drive institutional transformation',
    ar: 'حزم التعليم والاستشارات التي تقود التحول المؤسسي',
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-white">
        {/* Global Background Pattern */}
        <div
          className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
          aria-hidden="true"
        />

        {/* Hero Section */}
        <section className="relative z-10 pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="container relative text-center">
            {/* Ambient Background Orbs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <Animate variant="slideUp" className="relative space-y-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                  <Layers className="h-3.5 w-3.5" />
                  {locale === 'tr' ? 'TARF Akademi Portföyü' : locale === 'ar' ? 'محفظة تاراف' : 'TARF portfolio'}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                  {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
                </h1>

                <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
                </p>
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-slate-200 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </Animate>
          </div>
        </section>

        {/* Services Grid */}
        <div className="relative z-10 container pb-24">
          {services.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-[32px] border border-dashed border-slate-300 bg-white/50">
              <p className="text-lg font-medium text-slate-500">
                {locale === 'tr' ? 'Henüz hizmet eklenmedi.' : locale === 'ar' ? 'لا توجد خدمات بعد.' : 'No services available yet.'}
              </p>
            </div>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <StaggerItem key={service.id}>
                  <Link href={`/${locale}/services/${service.slug}`} className="group block h-full">
                    <article className="relative flex flex-col h-full overflow-hidden rounded-[32px] border border-white/80 bg-white/60 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(234,88,12,0.15)] hover:border-white">

                      {/* Image Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] bg-slate-100">
                        {service.featured_image ? (
                          <Image
                            src={resolveImageSrc(service.featured_image, getDefaultImage())}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                            <Layers className="h-12 w-12" />
                          </div>
                        )}
                        {/* Overlay Gradient on Image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Category Badge on Image */}
                        {service.category && (
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-900 shadow-sm backdrop-blur-md">
                              {service.category.name}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-1 flex-col gap-4 p-6">
                        <div className="space-y-2">
                          <h2 className="text-xl font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                            {service.title}
                          </h2>
                          <p className="text-sm font-medium leading-relaxed text-slate-500 line-clamp-3">
                            {service.excerpt}
                          </p>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-primary/70 transition-colors">
                            {locale === 'tr' ? 'İncele' : locale === 'ar' ? 'عرض' : 'Explore'}
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all group-hover:bg-primary group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        {/* CTA Section */}
        <section className="relative z-10 pb-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-[40px] bg-slate-900 px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px] opacity-60" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-[100px] opacity-40" />

              <div className="relative z-10 mx-auto max-w-2xl text-center space-y-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white shadow-inner backdrop-blur-md mb-2">
                  <Sparkles className="h-8 w-8" />
                </div>

                <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                  {locale === 'tr'
                    ? 'Size özel bir program tasarlayalım'
                    : locale === 'ar'
                      ? 'دعنا نصمم برنامجًا خاصًا بك'
                      : 'Let us design a tailor-made program'}
                </h2>

                <p className="text-lg font-medium text-slate-300 leading-relaxed">
                  {locale === 'tr'
                    ? 'İhtiyaçlarınıza göre kısa süreli workshoplardan kapsamlı dönüşüm yolculuklarına kadar çözümler sunuyoruz.'
                    : locale === 'ar'
                      ? 'نقدم حلولًا تتراوح من ورش العمل القصيرة إلى رحلات التحول الشاملة وفقًا لاحتياجاتك.'
                      : 'From short workshops to full transformation journeys, we match your needs end-to-end.'}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="h-14 rounded-full bg-white px-8 text-base font-bold text-slate-900 transition-transform hover:scale-105 hover:bg-slate-50"
                    asChild
                  >
                    <Link href={`/${locale}/contact`}>
                      {locale === 'tr' ? 'Uzmanla görüş' : locale === 'ar' ? 'تحدث مع خبير' : 'Talk to an expert'}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-full border-white/20 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href={`/${locale}/faq`}>
                      {locale === 'tr' ? 'Sık sorulan sorular' : locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently asked questions'}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
