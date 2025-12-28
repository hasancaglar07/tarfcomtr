import { api } from '@/lib/api'
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

  const [upcomingEvents, pastEvents] = await Promise.all([
    api.getUpcomingEvents(locale),
    api.getPastEvents(locale, safePage, pastPerPage),
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
    <main className="relative min-h-screen overflow-hidden">
      {/* Global Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-28 pb-10 lg:pt-36 lg:pb-20 space-y-12">
        {/* Premium Header Section */}
        <Animate variant="fadeIn">
          <div className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-2xl md:px-12 md:py-16">
            {/* Ambient Orbs */}
            <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[80px]" />
            <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]" />

            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                <Calendar className="h-4 w-4" />
                <span>TARF Events</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
              </h1>
              <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
                {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
              </p>
            </div>
          </div>
        </Animate>

        <div className="space-y-20">
          {/* Upcoming Events Section */}
          <section className="space-y-8">
            <div className="flex items-end justify-between gap-4 px-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{labels.upcoming}</h2>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/30 p-12 text-center text-lg text-slate-500">
                {labels.noUpcoming}
              </div>
            ) : (
              <StaggerContainer className="grid gap-8 md:grid-cols-2">
                {upcomingEvents.map((event) => (
                  <StaggerItem key={event.id}>
                    <AnimatedCard className="h-full">
                      <Link href={`/${locale}/events/${event.slug}`} className="group block h-full">
                        <div className="relative h-full flex flex-col sm:flex-row gap-6 p-6 rounded-[32px] border border-white/40 bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white/80">
                          {/* Date Box */}
                          <div className="shrink-0 flex sm:flex-col items-center justify-center gap-1 sm:w-24 sm:h-auto rounded-2xl bg-white border border-white/50 shadow-sm p-4 text-center">
                            <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
                              {event.event_date ? new Date(event.event_date).getDate() : '--'}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">
                              {event.event_date
                                ? new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })
                                : ''}
                            </span>
                          </div>

                          <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex items-center gap-2">
                              {event.category && (
                                <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-transparent">
                                  {event.category.name}
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {event.title}
                            </h3>

                            <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed">
                              {event.excerpt}
                            </p>

                            <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 pt-2">
                              {event.event_time && (
                                <span className="inline-flex items-center gap-1.5">
                                  <Clock3 className="h-4 w-4 text-primary/70" />
                                  {event.event_time}
                                </span>
                              )}
                              {event.location && (
                                <span className="inline-flex items-center gap-1.5">
                                  <MapPin className="h-4 w-4 text-primary/70" />
                                  {event.location}
                                </span>
                              )}
                            </div>

                            <div className="pt-4">
                              <span className="inline-flex items-center text-sm font-bold text-primary group-hover:underline decoration-2 underline-offset-4">
                                {locale === 'tr' ? 'Detayları Gör' : locale === 'ar' ? 'عرض التفاصيل' : 'View details'}
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </section>

          {/* Past Events Section */}
          <section className="space-y-8">
            <div className="flex items-end justify-between gap-4 px-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">{labels.past}</h2>
              {pastEvents.total > 0 && (
                <span className="text-sm font-medium text-slate-500 bg-white/50 px-3 py-1 rounded-full border border-white/40">
                  {labels.page} {pastEvents.page} / {pastEvents.totalPages}
                </span>
              )}
            </div>

            {pastEvents.total === 0 ? (
              <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/30 p-12 text-center text-lg text-slate-500">
                {labels.noPast}
              </div>
            ) : (
              <>
                <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.items.map((event) => (
                    <StaggerItem key={event.id}>
                      <AnimatedCard className="h-full">
                        <Link href={`/${locale}/events/${event.slug}`} className="group block h-full">
                          <div className="h-full flex flex-col p-6 rounded-[32px] border border-white/40 bg-white/40 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-md hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-4">
                              <div className="text-center rounded-xl bg-slate-100 px-3 py-2 min-w-[3.5rem]">
                                <div className="text-xl font-bold text-slate-900 leading-none">
                                  {event.event_date ? new Date(event.event_date).getDate() : '--'}
                                </div>
                                <div className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                                  {event.event_date
                                    ? new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })
                                    : ''}
                                </div>
                              </div>
                              {event.category && (
                                <Badge variant="outline" className="border-slate-200 text-slate-500 text-[10px] uppercase tracking-wider">
                                  {event.category.name}
                                </Badge>
                              )}
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {event.title}
                            </h3>

                            <p className="text-sm text-slate-500 line-clamp-3 mb-4 flex-1">
                              {event.excerpt}
                            </p>

                            <div className="flex items-center text-xs font-medium text-slate-400">
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      </AnimatedCard>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                {pastEvents.totalPages > 1 && (
                  <div className="flex items-center justify-between pt-8 border-t border-slate-200/50">
                    <div className="text-sm font-medium text-slate-500">
                      {labels.page} {pastEvents.page} / {pastEvents.totalPages}
                    </div>
                    <div className="flex gap-3">
                      {pastEvents.page > 1 && (
                        <Button variant="outline" asChild className="rounded-full bg-white/50 border-white/60 hover:bg-white">
                          <Link href={buildPastPageHref(locale, pastEvents.page - 1)}>
                            {labels.prev}
                          </Link>
                        </Button>
                      )}
                      {pastEvents.page < pastEvents.totalPages && (
                        <Button variant="outline" asChild className="rounded-full bg-white/50 border-white/60 hover:bg-white">
                          <Link href={buildPastPageHref(locale, pastEvents.page + 1)}>
                            {labels.next}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
