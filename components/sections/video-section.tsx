'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Post } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Animate, StaggerContainer } from '@/components/ui/animate'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

type Video = Post

interface VideoSectionProps {
  locale: string
  featuredVideo?: Video | null
  videos: Video[]
}

const defaultContent = {
  tr: {
    title: 'Eğitim ve Teknoloji Videoları',
    subtitle: 'Konferanslar, atölyeler ve eğitim içeriklerimiz şık bir premium deneyimle keşfedilebilir.',
    view_all: 'Tüm Videoları İzle',
    no_videos: 'Henüz video eklenmedi.',
    by: 'Yükleyen',
    watch: 'İzle',
    highlights: [
      {
        title: 'Geleceği Kodluyoruz',
        description: 'Yenilikçi dijital çözümler geliştiren Ar-Ge ve teknoloji merkezi.'
      },
      {
        title: 'Bilim ve İrfan',
        description: 'Fikir üretimi ve araştırmayı odağına alan içerikler.'
      },
      {
        title: 'Topluluk Programları',
        description: 'Akademi, düşünce enstitüsü ve teknoloji topuluklarını bir araya getiren vizyon.'
      }
    ]
  },
  en: {
    title: 'Education and Technology Videos',
    subtitle: 'Conferences, workshops and educational content presented in a premium carousel experience.',
    view_all: 'Watch All Videos',
    no_videos: 'No videos available yet.',
    by: 'By',
    watch: 'Watch',
    highlights: [
      {
        title: 'Coding the Future',
        description: 'Our R&D hub where innovative digital solutions are prototyped.'
      },
      {
        title: 'Science & Wisdom',
        description: 'Stories that prioritize research, learning and intellectual depth.'
      },
      {
        title: 'Community Programs',
        description: 'Academy, think tank and technology circles under one ecosystem.'
      }
    ]
  },
  ar: {
    title: 'فيديوهات التعليم والتكنولوجيا',
    subtitle: 'اكتشف المؤتمرات وورش العمل والمحتوى التعليمي عبر تجربة منزلقة مميزة.',
    view_all: 'شاهد جميع الفيديوهات',
    no_videos: 'لا توجد مقاطع فيديو متاحة حتى الآن.',
    by: 'بواسطة',
    watch: 'شاهد',
    highlights: [
      {
        title: 'نبرمج المستقبل',
        description: 'مركز البحث والتطوير الذي يبتكر حلولاً رقمية متقدمة.'
      },
      {
        title: 'العلم والإلهام',
        description: 'قصص تركّز على البحث والإبداع والمعرفة.'
      },
      {
        title: 'برامج المجتمع',
        description: 'الأكاديمية ومعهد الفكر والتقنية ضمن منظومة واحدة.'
      }
    ]
  }
} as const

function getYouTubeVideoId(url?: string | null): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const buildVideoMeta = (video: Video) => {
  const videoId = getYouTubeVideoId(video.youtube_url)
  const featured = resolveImageSrc(video.featured_image, '')
  const thumbnail =
    featured ||
    (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : getDefaultImage())
  return { videoId, thumbnail }
}

export function VideoSection({ locale, videos }: VideoSectionProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const curatedVideos = useMemo(() => {
    const combined = [...videos]
    const seen = new Set<string>()
    return combined.filter((video) => {
      const id = getYouTubeVideoId(video.youtube_url ?? '')
      if (!id) return true
      if (seen.has(id)) return false
      seen.add(id)
      return true
    })
  }, [videos])

  useEffect(() => {
    if (curatedVideos.length <= 1 || playingIndex !== null) return
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % curatedVideos.length)
    }, 9000)
    return () => clearInterval(interval)
  }, [curatedVideos.length, playingIndex])

  useEffect(() => {
    setPlayingIndex(null)
  }, [currentVideoIndex])

  if (curatedVideos.length === 0) {
    return (
      <section className="py-20 bg-[#f8f3ed] text-[#2c1a0f]">
        <div className="container text-center">
          <p className="text-[#2c1a0f]/70">{content.no_videos}</p>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const goToNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % curatedVideos.length)
  }

  const goToPrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + curatedVideos.length) % curatedVideos.length)
  }

  const currentVideo = curatedVideos[currentVideoIndex]
  const { videoId, thumbnail } = buildVideoMeta(currentVideo)
  const highlights = content.highlights || []
  const hasMultipleVideos = curatedVideos.length > 1

  return (
    <section className="bg-gradient-to-b from-[#fdf8f3] to-[#f6efe6] py-24">
      <div className="container">
        <Animate variant="fadeIn">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#c98535]">TARF Studio</p>
            <h2 className="mt-3 text-3xl font-semibold text-[#1f1307] md:text-4xl">{content.title}</h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-[#715c49] md:text-lg">{content.subtitle}</p>
          </div>
        </Animate>

        <Animate variant="slideUp" delay={0.2}>
          <Card className="relative mt-12 overflow-hidden rounded-[38px] border-0 bg-gradient-to-br from-[#fff5ea] via-[#fae8ce] to-[#f3d7b3] p-8 shadow-[0_45px_90px_rgba(176,129,72,0.28)]">
          {hasMultipleVideos && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 mx-auto h-40 w-40 rounded-full bg-white/30 blur-[100px]" />
              <div className="absolute bottom-0 right-10 h-32 w-32 rounded-full bg-[#f7c36a]/40 blur-[70px]" />
            </div>
          )}

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] border border-white/40 bg-[#020202]/40 shadow-[0_35px_90px_rgba(0,0,0,0.3)]">
                {playingIndex === currentVideoIndex && videoId ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={currentVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={currentVideo.title}
                        fill
                        sizes="(min-width: 1024px) 56vw, 94vw"
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/30 to-white/5">
                        <Play className="h-16 w-16 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {videoId && (
                      <button
                        type="button"
                        onClick={() => setPlayingIndex(currentVideoIndex)}
                        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full bg-white/95 px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#261000] shadow-2xl transition hover:scale-105"
                      >
                        <Play className="h-4 w-4 fill-[#261000]" />
                        {content.watch}
                      </button>
                    )}
                  </>
                )}
              </div>

              {hasMultipleVideos && (
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-[#362110] shadow-[0_10px_25px_rgba(187,138,77,0.35)] transition hover:translate-y-0.5"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Geri
                  </button>
                  <div className="flex gap-2">
                    {curatedVideos.map((video, index) => (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => setCurrentVideoIndex(index)}
                        className={`h-2 w-8 rounded-full transition ${
                          index === currentVideoIndex ? 'bg-[#e17a2c]' : 'bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Video ${index + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-4 py-2 text-sm font-semibold text-[#362110] shadow-[0_10px_25px_rgba(187,138,77,0.35)] transition hover:translate-y-0.5"
                  >
                    İleri
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-7 rounded-[30px] bg-white/55 p-8 text-[#1d1209] shadow-[0_35px_90px_rgba(255,255,255,0.35)] backdrop-blur-md">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.5em] text-[#c98b41]">Programlar</p>
                <h3 className="text-3xl font-semibold leading-tight">{currentVideo.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-[#5e493a]">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(currentVideo.created_at)}</span>
                  </div>
                  {currentVideo.author?.name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{currentVideo.author.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {videoId && (
                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full rounded-2xl bg-[#1f1307] text-white hover:bg-[#2c1a0f]"
                    asChild
                  >
                    <Link
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content.watch}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl border-[#1f1307]/20 text-[#1f1307] hover:bg-[#1f1307]/5"
                    onClick={() => setPlayingIndex(currentVideoIndex)}
                  >
                    Playerı aç
                  </Button>
                </div>
              )}

              {highlights.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {highlights.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-[#f4dac1] bg-white/80 p-4 shadow-[0_15px_35px_rgba(227,183,133,0.25)]"
                    >
                      <p className="text-sm font-semibold text-[#c47221]">{item.title}</p>
                      <p className="mt-1 text-xs text-[#6d5645]">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          </Card>
        </Animate>

        {hasMultipleVideos && (
          <StaggerContainer className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {curatedVideos.map((video, index) => {
              const { thumbnail: thumb } = buildVideoMeta(video)
              const isActive = index === currentVideoIndex
              return (
                <button
                  key={video.id}
                  type="button"
                  onClick={() => setCurrentVideoIndex(index)}
                  className={`group flex items-center gap-3 rounded-3xl border px-4 py-3 text-left transition ${
                    isActive
                      ? 'border-[#c47221]/60 bg-white shadow-[0_20px_45px_rgba(199,114,33,0.25)]'
                      : 'border-transparent bg-white/70 hover:border-[#c47221]/30 hover:bg-white'
                  }`}
                >
                  <div className="relative h-16 w-20 overflow-hidden rounded-2xl bg-[#f5d6b5]">
                    {thumb ? (
                      <Image
                        src={thumb}
                        alt={video.title}
                        fill
                        sizes="120px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Play className="h-5 w-5 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute bottom-1 left-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-[#271103]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-semibold leading-tight line-clamp-2 ${isActive ? 'text-[#1f1307]' : 'text-[#6b5647]'}`}>
                      {video.title}
                    </p>
                    <span className="text-xs text-[#a0856c]">{formatDate(video.created_at)}</span>
                  </div>
                </button>
              )
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
