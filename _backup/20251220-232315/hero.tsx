'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, ShieldCheck, MapPin, Sparkles, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { BrandMarquee } from '@/components/sections/brand-marquee'
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

  const currentHeroVideo = heroVideos[heroVideoIndex]
  const heroVideoId = currentHeroVideo ? getYouTubeVideoId(currentHeroVideo.youtube_url) : null
  const heroVideoCover =
    currentHeroVideo?.cover ||
    (heroVideoId ? `https://img.youtube.com/vi/${heroVideoId}/maxresdefault.jpg` : content.background_image)
  const heroVideoLink = currentHeroVideo?.youtube_url || (content.tertiary_cta_href as string) || '#'
  const hasMultipleHeroVideos = heroVideos.length > 1

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="container relative z-10 pt-10 pb-16 lg:pt-14 lg:pb-22">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <StaggerContainer className="min-w-0 space-y-8">
              <StaggerItem>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mx-auto lg:mx-0">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  {content.eyebrow}
                </div>
              </StaggerItem>

            <StaggerItem>
              <div className="space-y-5 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left text-balance">
                <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[56px]">
                  {content.title || defaultContent.en.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {content.subtitle || defaultContent.en.subtitle}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col gap-4 sm:flex-row items-center sm:items-start justify-center sm:justify-start">
                <Link href={(content.primary_cta_href as string) || '#'}>
                  <Button size="lg">
                    {content.primary_cta_label || 'Başla'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={(content.tertiary_cta_href as string) || '#'}>
                  <Button size="lg" variant="outline" className="bg-white/80">
                    <Play className="mr-2 h-4 w-4" />
                    {content.tertiary_cta_label || 'Videoyu İzle'}
                  </Button>
                </Link>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="w-full rounded-[28px] border border-primary/15 bg-gradient-to-br from-white/95 via-white/90 to-amber-50/80 p-5 shadow-[0_26px_80px_rgba(15,23,42,0.16)] sm:p-6">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto sm:text-xs sm:tracking-[0.22em]"
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

            <Animate variant="slideInRight">
              <div className="relative">
                <div className="absolute -inset-6 hidden rounded-[40px] bg-gradient-to-tr from-primary/30 to-amber-200/30 blur-2xl lg:block" />
                <div className="relative rounded-[32px] border border-border bg-card/80 p-6 shadow-2xl backdrop-blur">
                  <div className="rounded-[26px] border border-border/70 bg-muted/30 p-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-primary/10">
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
                            <Image src={heroVideoCover} alt={currentHeroVideo?.title || 'Hero visual'} fill className="object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-amber-50 to-white">
                              <Sparkles className="h-16 w-16 text-primary" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            {heroVideoId ? (
                              <button
                                type="button"
                                onClick={() => setHeroVideoPlaying(true)}
                                className="rounded-full bg-white/90 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-primary shadow-2xl transition hover:bg-white"
                              >
                                <span className="flex items-center gap-2">
                                  <Play className="h-5 w-5" />
                                  {locale === 'tr' ? 'Oynat' : locale === 'ar' ? 'تشغيل' : 'Play'}
                                </span>
                              </button>
                            ) : (
                              <Link href={heroVideoLink} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="rounded-full bg-white/90 text-primary hover:bg-white">
                                  <Play className="mr-2 h-5 w-5" />
                                  {locale === 'tr' ? 'Oynat' : locale === 'ar' ? 'تشغيل' : 'Play'}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                          {locale === 'tr' ? 'TARF Ekosistemi' : locale === 'ar' ? 'نظام TARF' : 'TARF Ecosystem'}
                        </p>
                        <p className="text-lg font-semibold text-foreground leading-snug line-clamp-2 min-h-[3.1rem]">
                          {currentHeroVideo?.title}
                        </p>
                      </div>
                      {hasMultipleHeroVideos && (
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setHeroVideoIndex((prev) => (prev - 1 + heroVideos.length) % heroVideos.length)}
                            className="rounded-full border border-border/60 bg-background/70 p-2 text-muted-foreground transition hover:text-primary"
                            aria-label="Önceki video"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setHeroVideoIndex((prev) => (prev + 1) % heroVideos.length)}
                            className="rounded-full border border-border/60 bg-background/70 p-2 text-muted-foreground transition hover:text-primary"
                            aria-label="Sonraki video"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <div className="hidden gap-2 md:flex">
                            {heroVideos.map((video, index) => (
                              <button
                                key={video.id}
                                type="button"
                                onClick={() => setHeroVideoIndex(index)}
                                className={`h-1.5 w-6 rounded-full transition ${
                                  index === heroVideoIndex ? 'bg-primary' : 'bg-border hover:bg-primary/60'
                                }`}
                                aria-label={`Video ${index + 1}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 p-4 shadow-lg">
                        <p className="text-xs font-semibold text-primary">
                          {locale === 'tr' ? 'Geleceği Kodluyoruz' : locale === 'ar' ? 'نبرمج المستقبل' : 'Coding the Future'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'tr'
                            ? 'Yenilikçi dijital çözümler geliştiren Ar-Ge ve teknoloji merkezi'
                            : locale === 'ar'
                            ? 'مركز البحث والتطوير والتكنولوجيا الذي يطور حلولاً رقمية مبتكرة'
                            : 'R&D and technology center developing innovative digital solutions'}
                        </p>
                      </div>
                      <div className="rounded-2xl border border-dashed border-border/70 bg-white/60 p-4 shadow-lg">
                        <p className="text-xs font-semibold text-primary">
                          {locale === 'tr' ? 'Bilim ve İrfan' : locale === 'ar' ? 'العلم والمعرفة' : 'Science and Wisdom'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'tr'
                            ? 'Fikir üretimi ve araştırmayı öncelikli hedef olarak belirleyen platform'
                            : locale === 'ar'
                            ? 'منصة تحدد إنتاج الأفكار والبحث كهدف أساسي'
                            : 'Platform prioritizing idea generation and research'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Animate>
          </div>
        </div>
      </section>
      <div className="-mt-12">
        <BrandMarquee locale={locale} variant="overlay" />
      </div>
    </>
  )
}

function HeroEventsMarquee({ locale, events }: { locale: string; events: Post[] }) {
  const shouldReduceMotion = useShouldReduceMotion(768)
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
