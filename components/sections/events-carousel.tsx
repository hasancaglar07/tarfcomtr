'use client'

import type { Post } from '@/lib/api'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useRef, useCallback } from 'react'
import { Animate, AnimatedCard } from '@/components/ui/animate'
import { motion } from 'framer-motion'
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
    featured: 'Öne Çıkan',
    see_all: 'Tüm Etkinlikleri Gör'
  },
  en: {
    title: 'Events',
    subtitle: 'Upcoming educational events and seminars',
    details: 'Details',
    no_events: 'No events available yet.',
    featured: 'Featured',
    see_all: 'See All Events'
  },
  ar: {
    title: 'الفعاليات',
    subtitle: 'الأحداث والندوات التعليمية القادمة',
    details: 'التفاصيل',
    no_events: 'لا توجد أحداث متاحة حتى الآن.',
    featured: 'مميز',
    see_all: 'مشاهدة جميع الفعاليات'
  }
}

export function EventsCarousel({ locale, upcomingEvents, pastEvents }: EventsCarouselProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en
  const [activeTab, setActiveTab] = useState<'past' | 'upcoming'>('past')
  const [itemsToShow, setItemsToShow] = useState(4)
  const [sliderGap, setSliderGap] = useState(20)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const upcoming = Array.isArray(upcomingEvents) ? upcomingEvents : []
  const past = Array.isArray(pastEvents) ? pastEvents : []
  const selectedEvents = activeTab === 'past' ? past : upcoming

  const maxIndex = Math.max(0, selectedEvents.length - itemsToShow)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const determineItems = () => {
      const width = window.innerWidth
      if (width < 768) return { items: 1, gap: 12 }
      if (width < 1024) return { items: 2, gap: 16 }
      if (width < 1280) return { items: 3, gap: 18 }
      return { items: 4, gap: 20 }
    }

    const updateItems = () => {
      const next = determineItems()
      setItemsToShow(next.items)
      setSliderGap(next.gap)
      setCurrentIndex(0)
    }

    updateItems()
    window.addEventListener('resize', updateItems)

    return () => {
      window.removeEventListener('resize', updateItems)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'past' && past.length === 0 && upcoming.length > 0) {
      setActiveTab('upcoming')
    }
  }, [activeTab, past.length, upcoming.length])

  useEffect(() => {
    setCurrentIndex(0)
  }, [activeTab])

  // Scroll to current index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cardWidth = container.scrollWidth / selectedEvents.length
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    })
  }, [selectedEvents.length])

  useEffect(() => {
    scrollToIndex(currentIndex)
  }, [currentIndex, scrollToIndex])

  // Auto-scroll
  useEffect(() => {
    if (isPaused || selectedEvents.length <= itemsToShow) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [isPaused, selectedEvents.length, itemsToShow, maxIndex])

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  if (upcoming.length === 0 && past.length === 0) {
    return (
      <section className="py-14">
        <div className="container text-center">
          <p className="text-muted-foreground">{content.no_events}</p>
        </div>
      </section>
    )
  }

  const showNavigation = selectedEvents.length > itemsToShow

  return (
    <section
      className="py-4 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v === 'upcoming' ? 'upcoming' : 'past')}
          className="w-full"
        >
          {/* Header (centered) + Navigation */}
          <div className="relative mb-4">
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
          </div>

          {/* Tabs under title (centered) */}
          <div className="flex justify-center mb-6">
            <TabsList className="inline-flex h-auto p-1 bg-secondary/50 backdrop-blur-sm flex-wrap gap-2">
              <TabsTrigger
                value="past"
                className="px-4 py-2 data-[state=active]:bg-slate-950 data-[state=active]:text-white rounded-full transition-colors"
              >
                {locale === 'tr'
                  ? 'Gerçekleşen Etkinlikler'
                  : locale === 'ar'
                    ? 'الفعاليات السابقة'
                    : 'Past Events'}
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className="px-4 py-2 data-[state=active]:bg-slate-950 data-[state=active]:text-white rounded-full transition-colors"
              >
                {locale === 'tr'
                  ? 'Yaklaşan Etkinlikler'
                  : locale === 'ar'
                    ? 'الفعاليات القادمة'
                    : 'Upcoming Events'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Carousel with Side Navigation */}
          <Animate variant="fadeIn" delay={0.3}>
            <div className="relative px-0 md:px-12 group/carousel">
              {/* Desktop Navigation Arrows on Sides */}
              {showNavigation && (
                <>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={scrollLeft}
                      disabled={currentIndex === 0}
                      className="rounded-full h-12 w-12 shadow-xl bg-background/95 border-primary/20 hover:scale-110 hover:bg-primary hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={scrollRight}
                      disabled={currentIndex >= maxIndex}
                      className="rounded-full h-12 w-12 shadow-xl bg-background/95 border-primary/20 hover:scale-110 hover:bg-primary hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </>
              )}

              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
                style={{
                  gap: `${sliderGap}px`,
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                {selectedEvents.length === 0 ? (
                  <div className="w-full text-center text-muted-foreground py-10">
                    {locale === 'tr'
                      ? 'Henüz etkinlik eklenmedi.'
                      : locale === 'ar'
                        ? 'لا توجد أحداث متاحة حتى الآن.'
                        : 'No events available yet.'}
                  </div>
                ) : (
                  selectedEvents.map((event, index) => (
                    <div
                      key={event.id}
                      className="snap-start flex-shrink-0"
                      style={{
                        width: itemsToShow === 1
                          ? 'calc(100vw - 64px)'
                          : `calc((100% - ${(itemsToShow - 1) * sliderGap}px) / ${itemsToShow})`,
                        minWidth: itemsToShow === 1 ? '260px' : undefined
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="h-full"
                      >
                        <EventCard event={event} content={content} locale={locale} index={index} />
                      </motion.div>
                    </div>
                  ))
                )}
              </div>

              {/* Mobile Navigation fallback (centered buttons) */}
              {showNavigation && (
                <div className="flex justify-center gap-4 mt-6 md:hidden">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollLeft}
                    disabled={currentIndex === 0}
                    className="rounded-full h-10 w-10 shadow-lg bg-background/95 disabled:opacity-30"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollRight}
                    disabled={currentIndex >= maxIndex}
                    className="rounded-full h-10 w-10 shadow-lg bg-background/95 disabled:opacity-30"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </Animate>

          {/* Dots Indicator */}
          {showNavigation && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 hover:bg-primary/50'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Bar: See All */}
          <div className="flex flex-col items-center gap-6 mt-6">
            {/* See All Button */}
            <Animate variant="slideUp" delay={0.4}>
              <Link href={`/${locale}/events`}>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 h-auto text-base font-semibold border-slate-200 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all group"
                >
                  {content.see_all}
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </Animate>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

function EventCard({
  event,
  content,
  locale,
  index = 0,
}: {
  event: EventPost
  content: typeof defaultContent[keyof typeof defaultContent]
  locale: string
  index?: number
}) {
  return (
    <AnimatedCard className="h-full">
      <div className="group relative h-full flex flex-col overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-white/80 via-white/50 to-white/30 shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1),inset_0_0_0_1px_rgba(255,255,255,0.8)] hover:-translate-y-1">

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        {/* Decorative Shine */}
        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

        {/* Event Image */}
        <Link href={`/${locale}/events/${event.slug}`} className="relative block z-10 w-full aspect-[3/2] sm:aspect-[16/10] overflow-hidden m-2 rounded-[24px] mb-0">
          {event.featured_image ? (
            <Image
              src={resolveImageSrc(event.featured_image, getDefaultImage())}
              alt={event.title}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-amber-50 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-primary/30" />
            </div>
          )}

          {/* Overlay Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

          {/* Featured Badge */}
          {event.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                <Sparkles className="h-3 w-3 fill-amber-400 text-amber-400" />
                {content.featured}
              </span>
            </div>
          )}

          {/* Date Badge - Floating Style */}
          {event.event_date && (
            <div className="absolute top-3 left-3">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/90 p-2 text-center shadow-lg backdrop-blur-md min-w-[3.5rem]">
                <span className="text-xl font-black text-slate-800 leading-none">
                  {new Date(event.event_date).getDate()}
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                  {new Date(event.event_date).toLocaleDateString(locale, { month: 'short' })}
                </span>
              </div>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="space-y-3 flex-1">
            {/* Title */}
            <h3 className="font-bold text-lg leading-tight line-clamp-2 text-slate-800 group-hover:text-primary transition-colors">
              <Link href={`/${locale}/events/${event.slug}`}>
                {event.title}
              </Link>
            </h3>

            {/* Metadata */}
            <div className="flex flex-col gap-1.5 text-xs font-medium text-slate-500">
              {event.event_date && (
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="w-3 h-3 text-primary" />
                  </div>
                  <span>{new Date(event.event_date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="w-3 h-3 text-primary" />
                  </div>
                  <span className="line-clamp-1">{event.location}</span>
                </div>
              )}
            </div>

            {/* Excerpt */}
            {event.excerpt && (
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed opacity-80">
                {event.excerpt}
              </p>
            )}
          </div>

          {/* Premium CTA Button */}
          <div className="mt-5 pt-4 border-t border-slate-200/50">
            <Link href={`/${locale}/events/${event.slug}`} className="block">
              <Button className="w-full rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300 transition-all group/btn">
                {content.details}
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedCard>
  )
}
