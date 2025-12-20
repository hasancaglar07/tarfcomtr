import { api } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'

type EventsPageProps = {
  locale: string
  pastPage?: number
}

const buildPastPageHref = (locale: string, page: number) =>
  page <= 1 ? `/${locale}/events` : `/${locale}/events/page/${page}`

export async function EventsPage({ locale, pastPage = 1 }: EventsPageProps) {
  const safePage = Number.isFinite(pastPage) && pastPage > 0 ? Math.floor(pastPage) : 1
  const pastPerPage = 12

  const [upcomingEvents, pastEvents, settings] = await Promise.all([
    api.getUpcomingEvents(locale),
    api.getPastEvents(locale, safePage, pastPerPage),
    api.getSettings(locale),
  ])

  const pageTitle = {
    tr: 'Etkinlik Takvimi',
    en: 'Events Calendar',
    ar: 'روزنامة الفعاليات',
  }

  const pageDescription = {
    tr: 'Zirve, seminer ve öğrenme oturumlarını keşfedin',
    en: 'Explore summits, seminars and learning sessions',
    ar: 'اكتشف القمم والندوات وجلسات التعلم',
  }

  const sectionLabels = {
    tr: {
      upcoming: 'Planlanan Etkinlikler',
      past: 'Gerçekleşen Etkinlikler',
      noUpcoming: 'Henüz planlanmış etkinlik bulunmuyor.',
      noPast: 'Henüz gerçekleşmiş etkinlik bulunmuyor.',
      page: 'Sayfa',
      prev: 'Önceki',
      next: 'Sonraki',
    },
    en: {
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noUpcoming: 'No upcoming events yet.',
      noPast: 'No past events yet.',
      page: 'Page',
      prev: 'Previous',
      next: 'Next',
    },
    ar: {
      upcoming: 'الفعاليات القادمة',
      past: 'الفعاليات السابقة',
      noUpcoming: 'لا توجد فعاليات مجدولة بعد.',
      noPast: 'لا توجد فعاليات سابقة بعد.',
      page: 'الصفحة',
      prev: 'السابق',
      next: 'التالي',
    },
  }
  const labels = sectionLabels[locale as keyof typeof sectionLabels] || sectionLabels.en

  return (
    <>
      <Header locale={locale} settings={settings} />
      <main className="min-h-screen">
        <section className="bg-slate-900 text-white py-16">
          <div className="container">
            <Animate variant="slideUp" className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-wide">
                <Calendar className="h-4 w-4" />
                TARF Events
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
              </h1>
              <p className="text-lg text-white/80 max-w-3xl">
                {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
              </p>
            </Animate>
          </div>
        </section>

        <div className="container py-16">
          <div className="space-y-16">
            <section className="space-y-6">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-bold">{labels.upcoming}</h2>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="text-center text-muted-foreground">{labels.noUpcoming}</div>
              ) : (
                <StaggerContainer className="grid gap-8 md:grid-cols-2">
                  {upcomingEvents.map((event) => (
                    <StaggerItem key={event.id}>
                      <AnimatedCard className="h-full">
                        <Card className="overflow-hidden group h-full">
                          <div className="grid gap-6 p-6 lg:grid-cols-[120px_1fr]">
                            <div className="flex flex-col items-center justify-center rounded-2xl border bg-muted text-center shadow-inner">
                              <div className="text-3xl font-bold text-primary">
                                {event.event_date ? new Date(event.event_date).getDate() : '--'}
                              </div>
                              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                {event.event_date
                                  ? new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })
                                  : ''}
                              </div>
                            </div>
                            <div className="space-y-3">
                              {event.category && <Badge variant="outline">{event.category.name}</Badge>}
                              <Link
                                href={`/${locale}/events/${event.slug}`}
                                className="text-2xl font-semibold hover:text-primary transition-colors"
                              >
                                {event.title}
                              </Link>
                              <p className="text-sm text-muted-foreground line-clamp-3">{event.excerpt}</p>
                              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                              <Button variant="secondary" className="w-full" asChild>
                                <Link href={`/${locale}/events/${event.slug}`}>
                                  {locale === 'tr'
                                    ? 'Detayları Gör'
                                    : locale === 'ar'
                                      ? 'عرض التفاصيل'
                                      : 'View details'}
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </Card>
                      </AnimatedCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </section>

            <section className="space-y-6">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <h2 className="text-2xl md:text-3xl font-bold">{labels.past}</h2>
                {pastEvents.total > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {labels.page} {pastEvents.page} / {pastEvents.totalPages}
                  </p>
                ) : null}
              </div>

              {pastEvents.total === 0 ? (
                <div className="text-center text-muted-foreground">{labels.noPast}</div>
              ) : (
                <>
                  <StaggerContainer className="grid gap-8 md:grid-cols-2">
                    {pastEvents.items.map((event) => (
                      <StaggerItem key={event.id}>
                        <AnimatedCard className="h-full">
                          <Card className="overflow-hidden group h-full">
                            <div className="grid gap-6 p-6 lg:grid-cols-[120px_1fr]">
                              <div className="flex flex-col items-center justify-center rounded-2xl border bg-muted text-center shadow-inner">
                                <div className="text-3xl font-bold text-primary">
                                  {event.event_date ? new Date(event.event_date).getDate() : '--'}
                                </div>
                                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                                  {event.event_date
                                    ? new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })
                                    : ''}
                                </div>
                              </div>
                              <div className="space-y-3">
                                {event.category && <Badge variant="outline">{event.category.name}</Badge>}
                                <Link
                                  href={`/${locale}/events/${event.slug}`}
                                  className="text-2xl font-semibold hover:text-primary transition-colors"
                                >
                                  {event.title}
                                </Link>
                                <p className="text-sm text-muted-foreground line-clamp-3">{event.excerpt}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                                <Button variant="secondary" className="w-full" asChild>
                                  <Link href={`/${locale}/events/${event.slug}`}>
                                    {locale === 'tr'
                                      ? 'Detayları Gör'
                                      : locale === 'ar'
                                        ? 'عرض التفاصيل'
                                        : 'View details'}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </AnimatedCard>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  {pastEvents.totalPages > 1 ? (
                    <div className="flex items-center justify-between pt-6">
                      <div className="text-sm text-muted-foreground">
                        {labels.page} {pastEvents.page} / {pastEvents.totalPages}
                      </div>
                      <div className="flex gap-2">
                        {pastEvents.page > 1 ? (
                          <Button variant="outline" asChild>
                            <Link href={buildPastPageHref(locale, pastEvents.page - 1)}>
                              {labels.prev}
                            </Link>
                          </Button>
                        ) : null}
                        {pastEvents.page < pastEvents.totalPages ? (
                          <Button variant="outline" asChild>
                            <Link href={buildPastPageHref(locale, pastEvents.page + 1)}>
                              {labels.next}
                            </Link>
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} settings={settings} />
    </>
  )
}
