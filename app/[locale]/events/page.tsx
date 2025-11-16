import { api } from '@/lib/api'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Clock3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'events', pathSegments: ['events'] })
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const [events, settings] = await Promise.all([
    api.getEvents(locale),
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
          {events.length === 0 ? (
            <div className="text-center text-muted-foreground">
              {locale === 'tr' ? 'Henüz planlanmış etkinlik bulunmuyor.' : locale === 'ar' ? 'لا توجد فعاليات مجدولة بعد.' : 'No upcoming events yet.'}
            </div>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {events.map((event) => (
                <StaggerItem key={event.id}>
                  <AnimatedCard className="h-full">
                    <Card className="overflow-hidden group h-full">
                  <div className="grid gap-6 p-6 lg:grid-cols-[120px_1fr]">
                    <div className="flex flex-col items-center justify-center rounded-2xl border bg-muted text-center shadow-inner">
                      <div className="text-3xl font-bold text-primary">
                        {event.event_date ? new Date(event.event_date).getDate() : '--'}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">
                        {event.event_date ? new Date(event.event_date).toLocaleDateString(locale, { month: 'short' }) : ''}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {event.category && (
                        <Badge variant="outline">{event.category.name}</Badge>
                      )}
                      <Link href={`/${locale}/events/${event.slug}`} className="text-2xl font-semibold hover:text-primary transition-colors">
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
                          {locale === 'tr' ? 'Detayları Gör' : locale === 'ar' ? 'عرض التفاصيل' : 'View details'}
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
        </div>
      </main>
      <Footer locale={locale} settings={settings} />
    </>
  )
}
