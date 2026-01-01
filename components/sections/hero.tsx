'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Play, MapPin, Sparkles, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { AnimatePresence, motion } from 'framer-motion'
import type { Post } from '@/lib/api'
import { useShouldReduceMotion } from '@/lib/hooks/use-reduced-motion'

interface HeroProps {
  locale: string
  data?: {
    eyebrow?: string | null
    title?: string | null
    subtitle?: string | null
    primary_cta_label?: string | null
    primary_cta_href?: string | null
    tertiary_cta_label?: string | null
    tertiary_cta_href?: string | null
    background_image?: string | null
    headlineSlides?: Array<{ title: string; subtitle: string }> | null
    stats?: Array<{
      value: string
      label: string
    }> | null
    video_cover?: string | null
    video_url?: string | null
    video_cover_2?: string | null
    video_url_2?: string | null
    video_url_3?: string | null
    video_url_4?: string | null
    video_url_5?: string | null
  } | null
  events?: Post[] | null
}

const defaultContent = {
  tr: {
    eyebrow: 'Tarf Düşünce Enstitüsü',
    title: 'Bilim, teknoloji ve irfanı bir araya getirerek geleceği inşa ediyoruz',
    subtitle:
      'TARF olarak profesyonel eğitim ve danışmanlık hizmetleri sunuyoruz. Uzman kadromuzla kaliteli eğitim programları ve danışmanlık hizmetleri.',
    primary_cta_label: 'TARF Ekosistemine Katılın',
    primary_cta_href: '/tr/contact',
    tertiary_cta_label: 'Tanıtım Filmi',
    tertiary_cta_href: '/tr/videos',
    stats: [
      { value: '6+', label: 'Ana Hizmet' },
      { value: '15+', label: 'Aktif Proje' },
      { value: '100+', label: 'Etkinlik' },
      { value: '500+', label: 'Katılımcı' },
    ],
  },
  en: {
    eyebrow: 'Tarf Think Tank Institute',
    title: 'Building the future by bringing together science, technology and wisdom',
    subtitle:
      'TARF provides professional education and consulting services. Quality education programs and consulting services with our expert staff.',
    primary_cta_label: 'Join TARF Ecosystem',
    primary_cta_href: '/en/contact',
    tertiary_cta_label: 'Watch Showreel',
    tertiary_cta_href: '/en/videos',
    stats: [
      { value: '6+', label: 'Main Services' },
      { value: '15+', label: 'Active Projects' },
      { value: '100+', label: 'Events' },
      { value: '500+', label: 'Participants' },
    ],
  },
  ar: {
    eyebrow: 'معهد تارف للفكر',
    title: 'بناء المستقبل من خلال الجمع بين العلم والتكنولوجيا والحكمة',
    subtitle:
      'يقدم TARF خدمات التعليم والاستشارات المهنية. برامج تعليمية عالية الجودة وخدمات استشارية مع فريقنا الخبير.',
    primary_cta_label: 'انضم إلى نظام TARF',
    primary_cta_href: '/ar/contact',
    tertiary_cta_label: 'شاهد الفيلم التعريفي',
    tertiary_cta_href: '/ar/videos',
    stats: [
      { value: '6+', label: 'الخدمات الرئيسية' },
      { value: '15+', label: 'المشاريع النشطة' },
      { value: '100+', label: 'الفعاليات' },
      { value: '500+', label: 'المشاركون' },
    ],
  },
}

const getYouTubeVideoId = (url?: string | null) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function Hero({ locale, data, events }: HeroProps) {
  const content = {
    ...(defaultContent[locale as keyof typeof defaultContent] || defaultContent.en),
    ...data,
  }
  const shouldReduceHeadlineMotion = useShouldReduceMotion(0)

  const headlineSlides = useMemo(() => {
    const rawSlides = Array.isArray(content.headlineSlides) ? content.headlineSlides : []
    const cleaned = rawSlides
      .map((slide) => ({
        title: slide?.title?.trim() || '',
        subtitle: slide?.subtitle?.trim() || '',
      }))
      .filter((slide) => slide.title || slide.subtitle)
    if (cleaned.length > 0) {
      return cleaned
    }
    return [
      {
        title: content.title || defaultContent.en.title,
        subtitle: content.subtitle || defaultContent.en.subtitle,
      },
    ]
  }, [content.headlineSlides, content.subtitle, content.title])

  const upcomingEvents = useMemo(() => {
    const list = Array.isArray(events) ? events : []
    return list
      .filter((e) => Boolean(e?.event_date))
      .slice(0, 8)
  }, [events])

  const marqueeLabels = {
    tr: { title: 'Planlanan Etkinlikler', all: 'Tümü', empty: 'Henüz planlanmış etkinlik yok.' },
    en: { title: 'Upcoming Events', all: 'All', empty: 'No upcoming events yet.' },
    ar: { title: 'الفعاليات القادمة', all: 'الكل', empty: 'لا توجد فعاليات مجدولة بعد.' },
  }
  const labels = marqueeLabels[locale as keyof typeof marqueeLabels] || marqueeLabels.en

  const heroVideos = useMemo(() => {
    const fallbackVideos = [
      {
        id: 'hero-1',
        title: 'TARF Ekosistemi · Bilim ve Teknoloji Yolculuğu',
        youtube_url: 'https://www.youtube.com/watch?v=Qt6oaPhToZ4',
        cover: null,
      },
      {
        id: 'hero-2',
        title: 'Geleceğe Dair Eğitim Vizyonu',
        youtube_url: 'https://www.youtube.com/watch?v=Dn0_mblycJw&t=812s',
        cover: null,
      },
    ]

    const customVideos = [
      content.video_url ? { id: 'hero-custom-1', title: content.title || 'Tanıtım Filmi', youtube_url: content.video_url, cover: content.video_cover || null } : null,
      content.video_url_2 ? { id: 'hero-custom-2', title: content.title || 'Tanıtım Filmi 2', youtube_url: content.video_url_2, cover: content.video_cover_2 || null } : null,
      content.video_url_3 ? { id: 'hero-custom-3', title: content.title || 'Tanıtım Filmi 3', youtube_url: content.video_url_3, cover: null } : null,
      content.video_url_4 ? { id: 'hero-custom-4', title: content.title || 'Tanıtım Filmi 4', youtube_url: content.video_url_4, cover: null } : null,
      content.video_url_5 ? { id: 'hero-custom-5', title: content.title || 'Tanıtım Filmi 5', youtube_url: content.video_url_5, cover: null } : null,
    ].filter(Boolean) as Array<{ id: string; title: string; youtube_url: string; cover: string | null }>

    const combined = customVideos.length > 0 ? customVideos : fallbackVideos
    const seen = new Set<string>()
    const unique = combined.filter((video) => {
      const id = getYouTubeVideoId(video.youtube_url)
      if (!id) return true
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })

    return unique.slice(0, 5)
  }, [
    content.title,
    content.video_cover,
    content.video_cover_2,
    content.video_url,
    content.video_url_2,
    content.video_url_3,
    content.video_url_4,
    content.video_url_5,
  ])

  const [heroVideoIndex, setHeroVideoIndex] = useState(0)
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false)
  const [headlineIndex, setHeadlineIndex] = useState(0)

  useEffect(() => {
    if (heroVideos.length <= 1 || heroVideoPlaying) return
    const timer = setInterval(() => {
      setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [heroVideos.length, heroVideoPlaying])

  useEffect(() => {
    if (heroVideoIndex >= heroVideos.length) {
      setHeroVideoIndex(0)
    }
  }, [heroVideoIndex, heroVideos.length])

  useEffect(() => {
    setHeroVideoPlaying(false)
  }, [heroVideoIndex])

  useEffect(() => {
    if (shouldReduceHeadlineMotion || headlineSlides.length <= 1) return
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlineSlides.length)
    }, 4800)
    return () => clearInterval(timer)
  }, [headlineSlides.length, shouldReduceHeadlineMotion])

  useEffect(() => {
    if (headlineIndex >= headlineSlides.length) {
      setHeadlineIndex(0)
    }
  }, [headlineIndex, headlineSlides.length])

  const currentHeroVideo = heroVideos[heroVideoIndex]
  const heroVideoId = currentHeroVideo ? getYouTubeVideoId(currentHeroVideo.youtube_url) : null
  const heroVideoCover =
    currentHeroVideo?.cover ||
    (heroVideoId ? `https://img.youtube.com/vi/${heroVideoId}/maxresdefault.jpg` : content.background_image)
  const heroVideoLink = currentHeroVideo?.youtube_url || (content.tertiary_cta_href as string) || '#'
  const hasMultipleHeroVideos = heroVideos.length > 1
  const activeHeadline = headlineSlides[headlineIndex] || headlineSlides[0]

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container relative z-10 pt-24 pb-10 lg:pt-28 lg:pb-20">
          <StaggerContainer>
            <StaggerItem>
              {/* Ambient Background Orbs */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-[20%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-primary/20 blur-[120px]"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -90, 0],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-[20%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-amber-500/10 blur-[100px]"
                />
              </div>

              {/* Split Hero Section - Two Independent Cards */}
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-stretch relative z-10">

                {/* Left Card: Content */}
                <div
                  className="group/card relative z-10 overflow-hidden rounded-2xl md:rounded-[32px] border border-white/80 bg-white/90 p-5 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(234,88,12,0.15)] backdrop-blur-3xl flex flex-col justify-center"


                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  {/* Spotlight Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)'
                    }}
                  />

                  {/* Inner Content */}
                  <div className="relative z-10 flex flex-col gap-6 sm:gap-8 min-h-[400px] lg:min-h-[500px] justify-center">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`${headlineIndex}-${activeHeadline?.title}`}
                        className="flex flex-col gap-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="space-y-6">
                          {/* Premium Badge */}
                          <div className="flex justify-center lg:justify-start">
                            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-[0_2px_10px_rgba(249,115,22,0.1)] backdrop-blur-md">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                              </span>
                              {locale === 'tr' ? 'Öne Çıkan' : locale === 'ar' ? 'متميز' : 'Featured'}
                            </span>
                          </div>

                          {/* Title */}
                          <h1 className="text-4xl font-black leading-[1.1] tracking-tight bg-[linear-gradient(110deg,#0f172a,45%,#334155,55%,#0f172a)] bg-[length:200%_100%] animate-text-shimmer bg-clip-text text-transparent sm:text-5xl lg:text-6xl xl:text-[4.5rem] filter drop-shadow-sm text-center lg:text-left">
                            {activeHeadline?.title || content.title || defaultContent.en.title}
                          </h1>

                          {/* Subtitle - Dynamic Sizing */}
                          {(() => {
                            const subt = activeHeadline?.subtitle || content.subtitle || defaultContent.en.subtitle || '';
                            const len = subt.length;
                            const sizeClass = len > 300
                              ? 'text-xs sm:text-sm lg:text-base'
                              : len > 150
                                ? 'text-sm sm:text-base lg:text-lg'
                                : 'text-base sm:text-lg lg:text-xl';

                            return (
                              <p className={`${sizeClass} font-medium text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left`}>
                                {subt}
                              </p>
                            );
                          })()}
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2">
                          {headlineSlides.length > 1 && (
                            <div className="flex gap-2" aria-hidden="true">
                              {headlineSlides.map((_, index) => (
                                <button
                                  key={`headline-dot-${index}`}
                                  onClick={() => setHeadlineIndex(index)}
                                  className={`h-2 rounded-full transition-all duration-500 ${index === headlineIndex ? 'w-8 bg-primary' : 'w-2 bg-slate-300'
                                    }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Card: Video */}
                <div
                  className="group/card relative z-10 overflow-hidden rounded-2xl md:rounded-[32px] border border-white/80 bg-white/90 p-5 sm:p-10 shadow-[0_20px_50px_rgba(234,88,12,0.15)] backdrop-blur-3xl flex flex-col justify-center"


                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                >
                  {/* Spotlight Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.4), transparent 40%)'
                    }}
                  />

                  <div className="relative z-10 w-full">
                    <div className="relative overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl ring-1 ring-white/10 group/video aspect-video w-full">
                      <div className="absolute inset-0 z-0">
                        {heroVideoPlaying && heroVideoId ? (
                          <iframe
                            className="h-full w-full"
                            src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&rel=0&modestbranding=1`}
                            title={currentHeroVideo?.title || 'Hero video'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <>
                            {heroVideoCover ? (
                              <Image
                                src={heroVideoCover}
                                alt={currentHeroVideo?.title || 'Hero visual'}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover/video:scale-105"
                              />
                            ) : (
                              <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                                <Sparkles className="h-16 w-16 text-white/20" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              {heroVideoId ? (
                                <button
                                  type="button"
                                  onClick={() => setHeroVideoPlaying(true)}
                                  className="group/play relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all hover:scale-110 hover:bg-white/20"
                                >
                                  <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_ease-in-out_infinite]" />
                                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                                    <Play className="h-6 w-6 ml-1 fill-current" />
                                  </div>
                                </button>
                              ) : (
                                <Link href={heroVideoLink} target="_blank" rel="noopener noreferrer">
                                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-transform hover:scale-110">
                                    <Play className="h-6 w-6 ml-1 fill-current" />
                                  </div>
                                </Link>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Unique Video Controls / Title */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                      <div className="flex-1 min-w-0 text-center sm:text-left w-full sm:w-auto">
                        <h3 className="text-lg font-bold text-slate-800 truncate px-4 sm:px-0">
                          {currentHeroVideo?.title}
                        </h3>
                        <div className="mt-2 flex gap-1 justify-center sm:justify-start">
                          <span className="h-1.5 w-16 rounded-full bg-primary/20">
                            <span className="block h-full w-2/3 bg-primary rounded-full relative overflow-hidden">
                              <span className="absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                            </span>
                          </span>
                        </div>
                      </div>

                      {hasMultipleHeroVideos && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setHeroVideoIndex((prev) => (prev - 1 + heroVideos.length) % heroVideos.length)}
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length)}
                            className="p-3 rounded-full bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
      <div className="mt-6 lg:-mt-8">
        <div className="container">
          <StaggerContainer className="min-w-0 space-y-6 lg:space-y-8">
            <StaggerItem>
              <div className="w-full rounded-[20px] sm:rounded-[28px] border border-primary/15 bg-gradient-to-br from-white/95 via-white/90 to-amber-50/80 p-4 sm:p-5 shadow-[0_26px_80px_rgba(15,23,42,0.16)] lg:p-6">
                <div className="flex flex-col items-center gap-3 pb-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <span className="text-balance text-sm font-semibold uppercase tracking-[0.14em] text-foreground sm:text-base sm:tracking-[0.25em]">
                      {labels.title}
                    </span>
                  </div>
                  <Link
                    href={`/${locale}/events`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl hover:bg-slate-900 sm:w-auto sm:text-xs sm:tracking-[0.22em] border-0"
                  >
                    {labels.all}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {upcomingEvents.length > 0 ? (
                  <HeroEventsMarquee locale={locale} events={upcomingEvents} />
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-white/80 p-5 text-center shadow-sm sm:p-6">
                    <p className="text-sm text-muted-foreground sm:text-base">{labels.empty}</p>
                  </div>
                )}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </>
  )
}

function HeroEventsMarquee({ locale, events }: { locale: string; events: Post[] }) {
  const shouldReduceMotion = useShouldReduceMotion(0)
  const displayEvents = Array.isArray(events) ? events : []

  return (
    <div
      className="hero-events-marquee relative w-full max-w-full rounded-3xl border border-primary/15 bg-gradient-to-r from-white/95 via-white to-amber-50/85 py-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl overflow-hidden"
      style={
        shouldReduceMotion
          ? undefined
          : {
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }
      }
    >
      {shouldReduceMotion ? (
        <div className="grid gap-3 px-4 sm:grid-cols-2 sm:px-5">
          {displayEvents.slice(0, 4).map((event) => (
            <Link
              key={`m-${event.id}`}
              href={`/${locale}/events/${event.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-white/95 p-3 shadow-md transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg"
            >
              <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {event.event_date
                  ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(
                    new Date(event.event_date),
                  )
                  : '--'}
              </span>
              <div className="min-w-0">
                <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">
                  {event.title}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{event.location || '-'}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex w-max items-center gap-3 px-4 sm:gap-4 sm:px-5 hero-events-marquee-track">
          <div className="flex items-center gap-3 pr-3">
            {displayEvents.map((event) => (
              <Link
                key={`a-${event.id}`}
                href={`/${locale}/events/${event.slug}`}
                className="group flex h-12 shrink-0 items-center gap-3 rounded-full border border-border/70 bg-white/90 px-4 shadow-md transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:h-14 sm:px-5"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:px-3.5 sm:py-1.5 sm:text-sm">
                    {event.event_date
                      ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(
                        new Date(event.event_date),
                      )
                      : '--'}
                  </span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="max-w-[220px] truncate text-sm font-semibold text-foreground group-hover:text-primary sm:max-w-[300px] sm:text-base">
                    {event.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="max-w-[200px] truncate sm:max-w-[260px]">{event.location || '-'}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 pr-3" aria-hidden="true">
            {displayEvents.map((event) => (
              <Link
                key={`b-${event.id}`}
                href={`/${locale}/events/${event.slug}`}
                tabIndex={-1}
                className="group flex h-12 shrink-0 items-center gap-3 rounded-full border border-border/70 bg-white/90 px-4 shadow-md transition hover:-translate-y-1 hover:bg-white hover:shadow-lg sm:h-14 sm:px-5"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:px-3.5 sm:py-1.5 sm:text-sm">
                    {event.event_date
                      ? new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(
                        new Date(event.event_date),
                      )
                      : '--'}
                  </span>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="max-w-[220px] truncate text-sm font-semibold text-foreground group-hover:text-primary sm:max-w-[300px] sm:text-base">
                    {event.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                    <MapPin className="h-4 w-4" />
                    <span className="max-w-[200px] truncate sm:max-w-[260px]">{event.location || '-'}</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
