import { api } from '@/lib/api'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Layers, ArrowRight, Sparkles } from 'lucide-react'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

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
  const [services, settings] = await Promise.all([
    api.getServices(locale),
    api.getSettings(locale),
  ])

  const categories = Array.from(
    new Set(services.map((service) => service.category?.name).filter(Boolean) as string[])
  )

  const pageTitle = {
    tr: 'Program ve Hizmetler',
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
      <Header locale={locale} settings={settings} />
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
          <div className="container text-center">
            <Animate variant="slideUp" className="space-y-6">
              <div className="flex flex-col items-center gap-3">
                <Badge className="w-fit" variant="secondary">
                  <Layers className="h-4 w-4 mr-2" />
                  {locale === 'tr' ? 'TARF Akademi Portföyü' : locale === 'ar' ? 'محفظة تاراف' : 'TARF portfolio'}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold">
                  {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                  {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
                </p>
              </div>

              {categories.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border bg-background px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </Animate>
          </div>
        </section>

        <div className="container py-16">
          {services.length === 0 ? (
            <div className="text-center text-muted-foreground">
              {locale === 'tr' ? 'Henüz hizmet eklenmedi.' : locale === 'ar' ? 'لا توجد خدمات بعد.' : 'No services available yet.'}
            </div>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <StaggerItem key={service.id}>
                  <AnimatedCard className="h-full">
                    <Card className="overflow-hidden flex flex-col h-full">
                  {service.featured_image && (
                    <div className="relative h-56 w-full">
                      <Image
                        src={resolveImageSrc(service.featured_image, getDefaultImage())}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex items-center gap-2">
                      {service.category && (
                        <Badge variant="outline">{service.category.name}</Badge>
                      )}
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        TARF
                      </span>
                    </div>
                    <Link href={`/${locale}/services/${service.slug}`} className="text-2xl font-semibold hover:text-primary transition-colors">
                      {service.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {service.excerpt}
                    </p>
                    <Button className="mt-auto w-full" variant="secondary" asChild>
                      <Link href={`/${locale}/services/${service.slug}`}>
                        {locale === 'tr' ? 'Detayları Gör' : locale === 'ar' ? 'عرض التفاصيل' : 'View details'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                      </Button>
                    </div>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container">
            <Animate variant="fadeIn" className="flex flex-col gap-6 text-center">
              <Sparkles className="mx-auto h-8 w-8" />
              <h2 className="text-3xl font-bold">
              {locale === 'tr'
                ? 'Size özel bir program tasarlayalım'
                : locale === 'ar'
                  ? 'دعنا نصمم برنامجًا خاصًا بك'
                  : 'Let us design a tailor-made program'}
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto">
              {locale === 'tr'
                ? 'İhtiyaçlarınıza göre kısa süreli workshoplardan kapsamlı dönüşüm yolculuklarına kadar çözümler sunuyoruz.'
                : locale === 'ar'
                  ? 'نقدم حلولًا تتراوح من ورش العمل القصيرة إلى رحلات التحول الشاملة وفقًا لاحتياجاتك.'
                  : 'From short workshops to full transformation journeys, we match your needs end-to-end.'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/${locale}/contact`}>
                  {locale === 'tr' ? 'Uzmanla görüş' : locale === 'ar' ? 'تحدث مع خبير' : 'Talk to an expert'}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground" asChild>
                <Link href={`/${locale}/faq`}>
                  {locale === 'tr' ? 'Sık sorulan sorular' : locale === 'ar' ? 'الأسئلة الشائعة' : 'Frequently asked questions'}
                </Link>
                </Button>
              </div>
            </Animate>
          </div>
        </section>
      </main>
      <Footer locale={locale} settings={settings} />
    </>
  )
}
