'use client'

import type { Post } from '@/lib/api'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Animate, AnimatedCard } from '@/components/ui/animate'
import { motion } from 'framer-motion'
import { useShouldReduceMotion } from '@/lib/hooks/use-reduced-motion'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

type EventPost = Post & { is_featured?: boolean | null }

interface EventsCarouselProps {
  locale: string
  upcomingEvents?: EventPost[]
  pastEvents?: EventPost[]
}

const defaultContent = {
  tr: {
    title: 'Etkinlikler',
    subtitle: 'Yaklaşan eğitim etkinlikleri ve seminerler',
    details: 'Detaylar',
    no_events: 'Henüz etkinlik eklenmedi.',
    featured: 'Öne Çıkan'
  },
  en: {
    title: 'Events',
    subtitle: 'Upcoming educational events and seminars',
    details: 'Details',
    no_events: 'No events available yet.',
    featured: 'Featured'
  },
  ar: {
    title: 'الفعاليات',
    subtitle: 'الأحداث والندوات التعليمية القادمة',
    details: 'التفاصيل',
    no_events: 'لا توجد أحداث متاحة حتى الآن.',
    featured: 'مميز'
  }
}

export function EventsCarousel({ locale, upcomingEvents, pastEvents }: EventsCarouselProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en
  const shouldReduceMotion = useShouldReduceMotion(768)
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(3)
  const [sliderGap, setSliderGap] = useState(16)
  const [isMobileStack, setIsMobileStack] = useState(false)

  const upcoming = Array.isArray(upcomingEvents) ? upcomingEvents : []
  const past = Array.isArray(pastEvents) ? pastEvents : []
  const selectedEvents = activeTab === 'past' ? past : upcoming

  useEffect(() => {
    if (typeof window === 'undefined') return

    const determineItems = () => {
      const width = window.innerWidth
      if (width < 768) return { items: 1, gap: 12, stack: true }
      if (width < 1024) return { items: 2, gap: 16, stack: false }
      if (width < 1280) return { items: 3, gap: 18, stack: false }
      return { items: 4, gap: 20, stack: false }
    }

    const updateItems = () => {
      const next = determineItems()
      setItemsToShow(next.items)
      setSliderGap(next.gap)
      setIsMobileStack(Boolean(next.stack))
      setCurrentIndex(0)
    }

    updateItems()
    window.addEventListener('resize', updateItems)

    return () => {
      window.removeEventListener('resize', updateItems)
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    if (activeTab === 'past' && past.length === 0 && upcoming.length > 0) {
      setActiveTab('upcoming')
    }
  }, [activeTab, past.length, upcoming.length])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab, itemsToShow])

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <section className="py-14">
        <div className="container text-center">
          <p className="text-muted-foreground">{content.no_events}</p>
        </div>
      </section>
    )
  }

  const effectiveItemsToShow = Math.max(1, itemsToShow)
  const maxIndex = Math.max(0, selectedEvents.length - effectiveItemsToShow)
  const canScrollLeft = !shouldReduceMotion && currentIndex > 0
  const canScrollRight = !shouldReduceMotion && currentIndex < maxIndex
  const showNavigation =
    !shouldReduceMotion && !isMobileStack && selectedEvents.length > effectiveItemsToShow

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => Math.max(0, prev - 1))
    }
  }

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => Math.min(maxIndex, prev + 1))
    }
  }

  return (
    <section className="py-12 overflow-hidden">
      <div className="container">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v === 'upcoming' ? 'upcoming' : 'past')}
          className="w-full"
        >
          {/* Header (centered) + Navigation */}
          <div className="relative mb-10">
            <Animate variant="slideUp" className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {activeTab === 'past'
                  ? locale === 'tr'
                    ? 'Gerçekleşen etkinlikler ve seminerler'
                    : locale === 'ar'
                      ? 'الفعاليات والندوات السابقة'
                      : 'Past events and seminars'
                  : content.subtitle}
              </p>
            </Animate>

            {showNavigation && selectedEvents.length > 0 && (
              <Animate variant="fadeIn" delay={0.15}>
                <div className="mt-6 flex justify-center gap-2 md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    className="rounded-full shadow-lg disabled:opacity-50"
                    aria-label={locale === 'tr' ? 'Önceki' : locale === 'ar' ? 'السابق' : 'Previous'}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollRight}
                    disabled={!canScrollRight}
                    className="rounded-full shadow-lg disabled:opacity-50"
                    aria-label={locale === 'tr' ? 'Sonraki' : locale === 'ar' ? 'التالي' : 'Next'}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </Animate>
            )}
          </div>

          {/* Tabs under title (centered) */}
          <div className="flex justify-center mb-12">
            <TabsList className="inline-flex h-auto p-1 bg-secondary/50 backdrop-blur-sm flex-wrap gap-2">
              <TabsTrigger
                value="past"
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
              >
                {locale === 'tr'
                  ? 'Gerçekleşen Etkinlikler'
                  : locale === 'ar'
                    ? 'الفعاليات السابقة'
                    : 'Past Events'}
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
              >
                {locale === 'tr'
                  ? 'Yaklaşan Etkinlikler'
                  : locale === 'ar'
                    ? 'الفعاليات القادمة'
                    : 'Upcoming Events'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Carousel */}
          <Animate variant="fadeIn" delay={0.3}>
            <div className="relative">
              <div className={shouldReduceMotion ? '-mx-4 px-4' : 'overflow-hidden'}>
                {selectedEvents.length === 0 ? (
                  <div className="text-center text-muted-foreground py-10">
                    {locale === 'tr'
                      ? 'Henüz etkinlik eklenmedi.'
                      : locale === 'ar'
                        ? 'لا توجد أحداث متاحة حتى الآن.'
                        : 'No events available yet.'}
                  </div>
                ) : isMobileStack ? (
                  <div className="grid gap-4">
                    {selectedEvents.map((event) => (
                      <EventCard key={event.id} event={event} content={content} locale={locale} />
                    ))}
                  </div>
                ) : shouldReduceMotion ? (
                  <div
                    className="flex overflow-x-auto pb-4 snap-x snap-mandatory gap-0"
                    style={{ paddingRight: `${sliderGap}px`, WebkitOverflowScrolling: 'touch' }}
                  >
                    {selectedEvents.map((event) => (
                      <div
                        key={event.id}
                        className="snap-start flex-shrink-0"
                        style={{
                          minWidth: `calc(100% - ${sliderGap}px)`,
                        }}
                      >
                        <EventCard event={event} content={content} locale={locale} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    className="flex"
                    animate={{
                      x: `-${currentIndex * (100 / effectiveItemsToShow)}%`
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    style={{ gap: `${sliderGap}px` }}
                  >
                    {selectedEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        className="flex-shrink-0"
                        style={{
                          width: `calc((100% - ${(effectiveItemsToShow - 1) * sliderGap}px) / ${effectiveItemsToShow})`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <EventCard event={event} content={content} locale={locale} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </Animate>

          {/* Dots Indicator */}
          {!shouldReduceMotion && selectedEvents.length > effectiveItemsToShow && selectedEvents.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(1, selectedEvents.length - effectiveItemsToShow + 1) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Tabs>
      </div>
    </section>
  )
}

function EventCard({
  event,
  content,
  locale,
}: {
  event: EventPost
  content: typeof defaultContent[keyof typeof defaultContent]
  locale: string
}) {
  return (
    <AnimatedCard className="h-full">
      <Card className="group hover:shadow-2xl transition-all duration-300 h-full">
        {/* Event Image */}
        <Link href={`/${locale}/events/${event.slug}`}>
          <div className="relative w-full overflow-hidden rounded-t-lg aspect-[3/2] sm:aspect-[16/10] max-h-56 sm:max-h-64">
            {event.featured_image ? (
              <Image
                src={resolveImageSrc(event.featured_image, getDefaultImage())}
                alt={event.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-primary/50" />
              </div>
            )}

            {/* Featured Badge */}
            {event.is_featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground shadow-lg">
                  {content.featured}
                </Badge>
              </div>
            )}

            {/* Date Badge */}
            {event.event_date && (
              <div className="absolute top-3 left-3">
                <div className="bg-background/95 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg">
                  <div className="text-2xl font-bold text-primary">
                    {new Date(event.event_date).getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase">
                    {new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>

        <CardContent className="p-4 space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            <Link href={`/${locale}/events/${event.slug}`}>
              {event.title}
            </Link>
          </h3>

          {/* Event Details */}
          <div className="space-y-2 text-sm text-muted-foreground">
            {event.event_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{event.event_time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>

          {/* Excerpt */}
          {event.excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.excerpt}
            </p>
          )}

          {/* CTA Button */}
          <Button variant="outline" size="sm" className="w-full mt-2" asChild>
            <Link href={`/${locale}/events/${event.slug}`}>
              {content.details}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}
