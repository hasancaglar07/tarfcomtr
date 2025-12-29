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
        <main className="relative min-h-screen overflow-hidden">
          {/* Global Background Pattern */}
          <div
            className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
            aria-hidden="true"
          />

          <div className="container relative z-10 pt-28 pb-10 lg:pt-36 lg:pb-20 space-y-8">
            {/* Navigation Bar */}
            <div className="flex items-center justify-between px-4">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild className="hover:bg-white/20 -ml-4 md:ml-0 rounded-full">
                  <Link href={`/${locale}/events`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Etkinliklere Dön' : locale === 'ar' ? 'العودة إلى الفعاليات' : 'Back to events'}
                  </Link>
                </Button>
              </Animate>
              <Animate variant="fadeIn" delay={0.15}>
                <Button variant="outline" className="rounded-full bg-white/40 border-white/40 hover:bg-white/60">
                  <Share2 className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Paylaş' : locale === 'ar' ? 'شارك' : 'Share'}
                </Button>
              </Animate>
            </div>

            <StaggerContainer>
              <StaggerItem>
                {/* Grand Unified Hero Card */}
                <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/40 bg-gradient-to-br from-white/80 via-white/50 to-white/30 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.1),0_20px_50px_rgba(15,23,42,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-3xl group/card">
                  {/* Noise Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                  {/* Decorative Shine */}
                  <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />

                  <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center">

                    {/* Left Side: Event Details */}
                    <div className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left justify-center">
                      <div className="space-y-6">
                        {/* Featured / Category Badge */}
                        <div className="flex justify-center lg:justify-start gap-3">
                          {event.category && (
                            <Badge className="bg-white/50 hover:bg-white/80 text-foreground border-white/40 backdrop-blur-md shadow-sm px-4 py-1 text-xs uppercase tracking-widest rounded-full">
                              {event.category.name}
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent filter drop-shadow-sm">
                          {event.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-lg font-medium text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                          {event.excerpt}
                        </p>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                          {event.event_date && (
                            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Calendar className="h-5 w-5" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {locale === 'tr' ? 'Tarih' : 'Date'}
                                </div>
                                <div className="text-sm font-bold text-slate-800">
                                  {new Date(event.event_date).toLocaleDateString(locale, {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  })}
                                </div>
                              </div>
                            </div>
                          )}

                          {event.event_time && (
                            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Clock3 className="h-5 w-5" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {locale === 'tr' ? 'Saat' : 'Time'}
                                </div>
                                <div className="text-sm font-bold text-slate-800">
                                  {event.event_time}
                                </div>
                              </div>
                            </div>
                          )}

                          {event.location && (
                            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <MapPin className="h-5 w-5" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {locale === 'tr' ? 'Konum' : 'Location'}
                                </div>
                                <div className="text-sm font-bold text-slate-800 line-clamp-1 max-w-[150px]">
                                  {event.location}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
                        {(() => {
                          const eventDate = event.event_date ? new Date(event.event_date) : null
                          const isPastEvent = eventDate ? eventDate < new Date() : false

                          if (isPastEvent) {
                            return (
                              <div className="rounded-full bg-slate-200 px-8 py-4 text-base font-bold text-slate-500 cursor-not-allowed border border-slate-300">
                                {locale === 'tr' ? 'Etkinlik Gerçekleşti' : locale === 'ar' ? 'انتهى الحدث' : 'Event Completed'}
                              </div>
                            )
                          }

                          return (
                            <Link href={`/${locale}/contact`}>
                              <Button size="lg" className="relative overflow-hidden rounded-full px-10 h-14 text-lg font-bold shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_20px_60px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300 group/btn bg-gradient-to-r from-amber-500 to-orange-600 border-0 text-white">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:animate-shimmer" />
                                <span className="relative flex items-center gap-2">
                                  {locale === 'tr' ? 'Kayıt Ol' : locale === 'ar' ? 'سجل الآن' : 'Register Now'}
                                </span>
                              </Button>
                            </Link>
                          )
                        })()}
                      </div>
                    </div>

                    {/* Right Side: Visual / Map */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-[32px] bg-slate-100 shadow-2xl ring-1 ring-white/20 group/video aspect-video sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
                        {event.featured_image ? (
                          <Image
                            src={resolveImageSrc(event.featured_image, getDefaultImage())}
                            alt={event.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/video:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <Calendar className="h-20 w-20 text-slate-300" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Content Body */}
            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              {/* Main Content */}
              <div className="space-y-8">
                <Animate variant="slideUp" delay={0.2}>
                  <Card className="overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-8 md:p-12 shadow-lg backdrop-blur-xl">
                    <div
                      className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                        prose-p:text-slate-600 prose-p:leading-relaxed
                        prose-li:text-slate-600
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: event.content ?? event.content_raw ?? event.excerpt ?? '' }}
                    />

                    {/* Multimedia Embeds */}
                    {(event.youtube_url || event.audio_url) && (
                      <div className="mt-12 grid gap-8">
                        {event.youtube_url && (
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                            <iframe
                              src={event.youtube_url.replace('watch?v=', 'embed/')}
                              title={event.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full aspect-video"
                            />
                          </div>
                        )}
                        {event.audio_url && (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                            <p className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                              {locale === 'tr' ? 'Ses Kaydı' : 'Audio Recording'}
                            </p>
                            <audio controls className="w-full">
                              <source src={event.audio_url} />
                            </audio>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </Animate>

                {/* Gallery */}
                {event.gallery && event.gallery.length > 0 && (
                  <Animate variant="slideUp" delay={0.3}>
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-slate-900 px-2">
                        {locale === 'tr' ? 'Etkinlik Galerisi' : locale === 'ar' ? 'معرض الحدث' : 'Event Gallery'}
                      </h2>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {event.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/40 shadow-md group">
                            <Image
                              src={resolveImageSrc(img, getDefaultImage())}
                              alt={`Gallery ${idx}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </Animate>
                )}
              </div>

              {/* Sidebar: Related Events */}
              <div className="space-y-6">
                {related_events && related_events.length > 0 && (
                  <Animate variant="slideInRight" delay={0.4}>
                    <h3 className="text-xl font-bold text-slate-900 px-2 mb-4">
                      {locale === 'tr' ? 'İlginizi Çekebilir' : locale === 'ar' ? 'قد يعجبك' : 'You Might Like'}
                    </h3>
                    <div className="space-y-4">
                      {related_events.map((related) => (
                        <Link href={`/${locale}/events/${related.slug}`} key={related.id} className="block group">
                          <div className="flex gap-4 p-4 rounded-3xl bg-white/40 hover:bg-white/60 border border-white/40 shadow-sm backdrop-blur-md transition-all">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
                              {related.featured_image ? (
                                <Image
                                  src={resolveImageSrc(related.featured_image, getDefaultImage())}
                                  alt={related.title}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-110"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <Calendar className="h-8 w-8 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                                {related.category?.name}
                              </p>
                              <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {related.title}
                              </h4>
                              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(related.created_at).toLocaleDateString(locale)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Animate>
                )}
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
