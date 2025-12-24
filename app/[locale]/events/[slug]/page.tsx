import { api, listPublishedPostSlugs } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Calendar, MapPin, Clock3, Share2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'
import { cache } from 'react'
import { PostType } from '@prisma/client'

const getEvent = cache((slug: string, locale: string) => api.getEvent(slug, locale))

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPostSlugs(PostType.event)
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
    const { event } = await getEvent(slug, locale)
    return buildPageMetadata({
      locale,
      title: event.seo_title || event.title,
      description: event.seo_description || event.excerpt,
      pathSegments: ['events', slug],
      image: event.og_image || event.featured_image,
      type: 'article',
      publishedTime: event.created_at,
      modifiedTime: event.updated_at,
      keywords: [event.location || '', event.category?.name || ''].filter(
        (keyword): keyword is string => Boolean(keyword)
      ),
    })
  } catch {
    return buildPageMetadata({ locale, page: 'events', pathSegments: ['events'] })
  }
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const { event, related_events } = await getEvent(slug, locale)

    return (
      <>
        <main className="min-h-screen">
          <div className="border-b">
            <div className="container py-4 flex items-center justify-between">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/events`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Etkinliklere Dön' : locale === 'ar' ? 'العودة إلى الفعاليات' : 'Back to events'}
                  </Link>
                </Button>
              </Animate>
              <Animate variant="fadeIn" delay={0.15}>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Paylaş' : locale === 'ar' ? 'شارك' : 'Share'}
                </Button>
              </Animate>
            </div>
          </div>

          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16">
            <div className="container grid gap-8 lg:grid-cols-[2fr_1fr]">
              <Animate variant="slideUp" className="space-y-4">
                {event.category && (
                  <Badge className="w-fit" variant="secondary">
                    {event.category.name}
                  </Badge>
                )}
                <h1 className="text-4xl font-bold">{event.title}</h1>
                <p className="text-lg text-muted-foreground">{event.excerpt}</p>
                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  {event.event_date && (
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.event_date).toLocaleDateString(locale, {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                  {event.event_time && (
                    <span className="inline-flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {event.event_time}
                    </span>
                  )}
                  {event.location && (
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  )}
                </div>
              </Animate>

              <Animate variant="slideInRight" delay={0.2}>
                <Card className="p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">
                  {locale === 'tr' ? 'Bilet ve kayıt' : locale === 'ar' ? 'التذاكر والتسجيل' : 'Tickets & registration'}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {locale === 'tr'
                    ? 'Kontenjan sınırlıdır. Katılım için lütfen kayıt formunu doldurun.'
                    : locale === 'ar'
                      ? 'الأماكن محدودة. يرجى ملء نموذج التسجيل للمشاركة.'
                      : 'Seats are limited. Please fill the registration form to secure your spot.'}
                </p>
                <Button className="w-full" asChild>
                  <Link href={`/${locale}/contact`}>
                    {locale === 'tr' ? 'Kayıt Formu' : locale === 'ar' ? 'نموذج التسجيل' : 'Registration form'}
                  </Link>
                </Button>
                </Card>
              </Animate>
            </div>
          </section>

          {event.featured_image && (
            <div className="container py-10">
              <Animate variant="scaleUp" delay={0.3}>
                <div className="relative h-[420px] w-full overflow-hidden rounded-3xl">
                  <Image
                    src={resolveImageSrc(event.featured_image, getDefaultImage())}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Animate>
            </div>
          )}

          {event.gallery && event.gallery.length > 0 && (
            <div className="container pb-10">
              <Animate variant="slideUp" delay={0.35}>
                <h2 className="text-xl font-semibold mb-4">
                  {locale === 'tr' ? 'Galeri' : locale === 'ar' ? 'معرض الصور' : 'Gallery'}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {event.gallery.map((img) => (
                    <div key={img} className="relative h-48 w-full overflow-hidden rounded-2xl border border-slate-200/10">
                      <Image
                        src={resolveImageSrc(img, getDefaultImage())}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </Animate>
            </div>
          )}

          <div className="container pb-16 space-y-12">
            <Animate variant="fadeIn" delay={0.4}>
              <Card className="p-8 md:p-12">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: event.content ?? event.content_raw ?? event.excerpt ?? '' }}
                />

                {(event.youtube_url || event.audio_url) && (
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {event.youtube_url && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-primary">
                          {locale === 'tr' ? 'Video' : locale === 'ar' ? 'فيديو' : 'Video'}
                        </p>
                        <div className="aspect-video overflow-hidden rounded-xl border bg-black/60">
                          <iframe
                            src={event.youtube_url.replace('watch?v=', 'embed/')}
                            title={event.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="h-full w-full"
                          />
                        </div>
                      </div>
                    )}
                    {event.audio_url && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-primary">
                          {locale === 'tr' ? 'Podcast / Ses' : locale === 'ar' ? 'بودكاست / صوت' : 'Podcast / Audio'}
                        </p>
                        <div className="rounded-xl border bg-muted/40 p-4">
                          <audio controls className="w-full">
                            <source src={event.audio_url} />
                            {locale === 'tr'
                              ? 'Tarayıcınız audio etiketini desteklemiyor.'
                              : locale === 'ar'
                                ? 'المتصفح لا يدعم تشغيل الصوت.'
                                : 'Your browser does not support the audio element.'}
                          </audio>
                          <div className="mt-2 text-xs text-muted-foreground break-all">
                            {event.audio_url}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </Animate>

            {related_events && related_events.length > 0 && (
              <div>
                <Animate variant="slideUp" delay={0.5}>
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'tr' ? 'Diğer Etkinlikler' : locale === 'ar' ? 'فعاليات أخرى' : 'Other events'}
                  </h2>
                </Animate>
                <StaggerContainer className="grid gap-6 md:grid-cols-3">
                  {related_events.map((related) => (
                    <StaggerItem key={related.id}>
                      <Card className="p-5">
                      <p className="text-sm text-primary/80 mb-1">{related.category?.name}</p>
                      <h3 className="font-semibold mb-2 line-clamp-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {related.excerpt}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${locale}/events/${related.slug}`}>
                          {locale === 'tr' ? 'İncele' : locale === 'ar' ? 'اعرض' : 'View'}
                        </Link>
                      </Button>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>
        </main>
      </>
    )
  } catch {
    notFound()
  }
}
