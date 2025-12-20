import { api, listPublishedPostSlugs } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Calendar, Layers, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'
import { cache } from 'react'
import { PostType } from '@prisma/client'

const getService = cache((slug: string, locale: string) => api.getService(slug, locale))

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPostSlugs(PostType.service)
    return posts.map((post) => ({ locale: post.locale, slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const { service } = await getService(slug, locale)
    return buildPageMetadata({
      locale,
      title: service.title,
      description: service.excerpt,
      pathSegments: ['services', slug],
      image: service.featured_image,
      type: 'article',
      publishedTime: service.created_at,
      modifiedTime: service.updated_at,
      keywords: [service.category?.name || '', service.author?.name || ''].filter(
        (keyword): keyword is string => Boolean(keyword)
      ),
    })
  } catch {
    return buildPageMetadata({ locale, page: 'services', pathSegments: ['services'] })
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const [{ service, child_services }, settings] = await Promise.all([
      getService(slug, locale),
      api.getSettings(locale),
    ])

    return (
      <>
        <Header locale={locale} settings={settings} />
        <main className="min-h-screen">
          <div className="border-b">
            <div className="container py-4">
              <Button asChild variant="ghost">
                <Link href={`/${locale}/services`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Programlara Dön' : locale === 'ar' ? 'العودة إلى البرامج' : 'Back to services'}
                </Link>
              </Button>
            </div>
          </div>

          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16">
            <div className="container space-y-6">
              <div className="space-y-4 max-w-4xl">
                <Badge className="w-fit" variant="secondary">
                  <Layers className="h-4 w-4 mr-2" />
                  {service.category?.name || 'Program'}
                </Badge>
                <h1 className="text-4xl font-bold">{service.title}</h1>
                <p className="text-lg text-muted-foreground">{service.excerpt}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={service.created_at}>
                      {new Date(service.created_at).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {service.featured_image && (
            <div className="container py-8">
              <div className="relative h-80 w-full overflow-hidden rounded-3xl">
                <Image
                  src={resolveImageSrc(service.featured_image, getDefaultImage())}
                  alt={service.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          <div className="container py-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <Card className="p-8">
              <div
                className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: service.content ?? service.content_raw ?? service.excerpt ?? '' }}
              />
            </Card>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {locale === 'tr' ? 'Program Özeti' : locale === 'ar' ? 'ملخص البرنامج' : 'Program summary'}
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {service.category?.name && (
                    <li className="flex items-center justify-between">
                      <span>{locale === 'tr' ? 'Kategori' : locale === 'ar' ? 'الفئة' : 'Category'}</span>
                      <span className="font-semibold text-foreground">{service.category.name}</span>
                    </li>
                  )}
                  {service.author?.name && (
                    <li className="flex items-center justify-between">
                      <span>{locale === 'tr' ? 'Uzman' : locale === 'ar' ? 'خبير' : 'Expert'}</span>
                      <span className="font-semibold text-foreground">{service.author.name}</span>
                    </li>
                  )}
                  {service.updated_at && (
                    <li className="flex items-center justify-between">
                      <span>{locale === 'tr' ? 'Son güncelleme' : locale === 'ar' ? 'آخر تحديث' : 'Last update'}</span>
                      <time dateTime={service.updated_at} className="font-semibold text-foreground">
                        {new Date(service.updated_at).toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </time>
                    </li>
                  )}
                </ul>
              </Card>

              <Card className="p-6 bg-primary text-primary-foreground">
                <div className="space-y-3">
                  <Sparkles className="h-6 w-6" />
                  <h3 className="text-xl font-semibold">
                    {locale === 'tr' ? 'Programı kurumunuza özelleştirin' : locale === 'ar' ? 'خصص البرنامج لمنظمتك' : 'Customize for your organisation'}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {locale === 'tr'
                      ? 'İletişime geçerek değerlendirme atölyesi planlayın.'
                      : locale === 'ar'
                        ? 'تواصل معنا لترتيب ورشة تقييم.'
                        : 'Contact us to plan a scoping workshop.'}
                  </p>
                  <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/${locale}/contact`}>
                      {locale === 'tr' ? 'İletişime Geç' : locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
                    </Link>
                  </Button>
                </div>
              </Card>

              {child_services && child_services.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    {locale === 'tr' ? 'Alt Modüller' : locale === 'ar' ? 'الوحدات الفرعية' : 'Sub modules'}
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {child_services.map((child) => (
                      <li key={child.id} className="flex items-center justify-between">
                        <span className="line-clamp-1">{child.title}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/${locale}/services/${child.slug}`}>
                            {locale === 'tr' ? 'Detay' : locale === 'ar' ? 'تفاصيل' : 'Detail'}
                          </Link>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </main>
        <Footer locale={locale} settings={settings} />
      </>
    )
  } catch {
    notFound()
  }
}
