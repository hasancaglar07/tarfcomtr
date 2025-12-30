import { api, listPublishedPostSlugs } from '@/lib/api'
import { Button } from '@/components/ui/button'
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

export const revalidate = 3600

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
    const { service, child_services } = await getService(slug, locale)

    return (
      <>
        <main className="relative min-h-screen overflow-hidden bg-white">
          {/* Global Background Pattern */}
          <div
            className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
            aria-hidden="true"
          />

          {/* Nav / Breadcrumb Area */}
          <div className="relative z-20 pt-28 pb-6 md:pt-36">
            <div className="container">
              <Button
                asChild
                variant="ghost"
                className="group pl-0 hover:bg-transparent hover:text-primary transition-colors"
              >
                <Link href={`/${locale}/services`}>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 border border-slate-200 group-hover:border-primary/20 group-hover:bg-primary/5 mr-2 transition-all">
                    <ArrowLeft className="h-4 w-4" />
                  </div>
                  <span className="font-semibold text-slate-600 group-hover:text-primary">
                    {locale === 'tr' ? 'Programlara Dön' : locale === 'ar' ? 'العودة إلى البرامج' : 'Back to services'}
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Content */}
          <section className="relative z-10 pb-8 md:pb-12">
            <div className="container">
              <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] items-start">

                {/* Title & Info */}
                <div className="space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                    <Layers className="h-3.5 w-3.5" />
                    {service.category?.name || 'Program'}
                  </span>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    {service.title}
                  </h1>

                  <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed max-w-2xl">
                    {service.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 pt-2">
                    <div className="flex items-center gap-2 rounded-full bg-white/60 border border-slate-200 px-4 py-2 backdrop-blur-sm">
                      <Calendar className="h-4 w-4 text-primary" />
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

                {/* Hero Image */}
                {service.featured_image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_30px_60px_rgba(0,0,0,0.1)]">
                    <Image
                      src={resolveImageSrc(service.featured_image, getDefaultImage())}
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    {/* Inner highlighting border */}
                    <div className="absolute inset-0 rounded-[32px] ring-1 ring-inset ring-black/5" />
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Main Content Layout */}
          <div className="relative z-10 container pb-24">
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

              {/* Content Column */}
              <article className="relative overflow-hidden rounded-[40px] border border-white/80 bg-white/80 p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.02)] backdrop-blur-xl">
                <div
                  className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                    prose-p:text-slate-600 prose-p:leading-loose
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                    prose-li:text-slate-600
                    prose-img:rounded-[24px] prose-img:shadow-lg"
                  dangerouslySetInnerHTML={{ __html: service.content ?? service.content_raw ?? service.excerpt ?? '' }}
                />
              </article>

              {/* Sidebar Column */}
              <div className="space-y-6">

                {/* Summary Widget */}
                <div className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-xl transition hover:border-primary/20 hover:shadow-lg">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {locale === 'tr' ? 'Program Özeti' : locale === 'ar' ? 'ملخص البرنامج' : 'Program summary'}
                  </h3>
                  <ul className="space-y-4">
                    {service.category?.name && (
                      <li className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-slate-500 font-medium">{locale === 'tr' ? 'Kategori' : locale === 'ar' ? 'الفئة' : 'Category'}</span>
                        <span className="text-sm font-bold text-slate-800 bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">{service.category.name}</span>
                      </li>
                    )}
                    {service.author?.name && (
                      <li className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-slate-500 font-medium">{locale === 'tr' ? 'Uzman' : locale === 'ar' ? 'خبير' : 'Expert'}</span>
                        <span className="text-sm font-bold text-slate-800">{service.author.name}</span>
                      </li>
                    )}
                    {service.updated_at && (
                      <li className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                        <span className="text-sm text-slate-500 font-medium">{locale === 'tr' ? 'Son güncelleme' : locale === 'ar' ? 'آخر تحديث' : 'Last update'}</span>
                        <time dateTime={service.updated_at} className="text-sm font-bold text-slate-800">
                          {new Date(service.updated_at).toLocaleDateString(locale, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Sub-modules Widget */}
                {child_services && child_services.length > 0 && (
                  <div className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/60 p-6 shadow-sm backdrop-blur-xl">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-primary" />
                      {locale === 'tr' ? 'Alt Modüller' : locale === 'ar' ? 'الوحدات الفرعية' : 'Sub modules'}
                    </h3>
                    <ul className="space-y-2">
                      {child_services.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={`/${locale}/services/${child.slug}`}
                            className="flex items-center justify-between rounded-xl bg-white/50 p-3 transition-all hover:bg-white hover:shadow-md hover:scale-[1.02] border border-transparent hover:border-slate-100"
                          >
                            <span className="text-sm font-medium text-slate-700 line-clamp-1">{child.title}</span>
                            <ArrowLeft className="h-3 w-3 rotate-180 text-primary opacity-50" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA Widget */}
                <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 shadow-xl text-center">
                  {/* Decorative */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
                  <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />

                  <div className="relative z-10 space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md">
                      <Sparkles className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-bold text-white leading-tight">
                      {locale === 'tr' ? 'Programı kurumunuza özelleştirin' : locale === 'ar' ? 'خصص البرنامج لمنظمتك' : 'Customize for your organisation'}
                    </h3>

                    <p className="text-sm font-medium text-slate-400">
                      {locale === 'tr'
                        ? 'İletişime geçerek değerlendirme atölyesi planlayın.'
                        : locale === 'ar'
                          ? 'تواصل معنا لترتيب ورشة تقييم.'
                          : 'Contact us to plan a scoping workshop.'}
                    </p>

                    <Button
                      size="lg"
                      className="w-full rounded-full bg-white text-slate-900 font-bold hover:bg-slate-50 transition-transform hover:scale-105"
                      asChild
                    >
                      <Link href={`/${locale}/contact`}>
                        {locale === 'tr' ? 'İletişime Geç' : locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
                      </Link>
                    </Button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </>
    )
  } catch {
    notFound()
  }
}
