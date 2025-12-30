'use client'

import { useEffect, useMemo, useState } from 'react'
import type { Post } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

type EventPosterPopupProps = {
  locale: string
  events?: Post[]
}

const LAST_ID_KEY = 'tarf_event_poster_last_id_v1'
const OPEN_DELAY_MS = 800

const labels = {
  tr: {
    badge: 'Etkinlik Afişi',
    cta: 'Detayları Gör',
    close: 'Kapat',
    next: 'Sonraki',
    prev: 'Önceki',
  },
  en: {
    badge: 'Event Poster',
    cta: 'View Details',
    close: 'Close',
    next: 'Next',
    prev: 'Previous',
  },
  ar: {
    badge: 'ملصق فعالية',
    cta: 'عرض التفاصيل',
    close: 'إغلاق',
    next: 'التالي',
    prev: 'السابق',
  },
} as const

export function EventPosterPopup({ locale, events = [] }: EventPosterPopupProps) {
  const posters = useMemo(() => events.filter((event) => event.featured_image), [events])
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [lastSeenId, setLastSeenId] = useState<string | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [sessionDismissed, setSessionDismissed] = useState(false)

  useEffect(() => {
    try {
      const storedId = window.localStorage.getItem(LAST_ID_KEY)
      setLastSeenId(storedId || null)
    } catch {
      setLastSeenId(null)
    } finally {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady || sessionDismissed) return
    if (posters.length === 0) {
      setIsOpen(false)
      return
    }
    const timeout = window.setTimeout(() => {
      setIsOpen(true)
    }, OPEN_DELAY_MS)
    return () => window.clearTimeout(timeout)
  }, [isReady, sessionDismissed, posters.length])

  useEffect(() => {
    if (!isReady || posters.length === 0) return
    let nextIndex = 0
    if (lastSeenId) {
      const lastIndex = posters.findIndex((event) => event.id === lastSeenId)
      if (lastIndex >= 0) {
        nextIndex = (lastIndex + 1) % posters.length
      }
    }
    setIndex(nextIndex)
  }, [isReady, posters, lastSeenId])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (index >= posters.length) {
      setIndex(0)
    }
  }, [index, posters.length])

  if (!isOpen || posters.length === 0) return null

  const content = labels[locale as keyof typeof labels] || labels.en
  const active = posters[index]
  const hasMultiple = posters.length > 1
  const next = () => setIndex((prev) => (prev + 1) % posters.length)
  const prev = () => setIndex((prev) => (prev - 1 + posters.length) % posters.length)

  const dismissActive = () => {
    if (!active?.id) {
      setIsOpen(false)
      return
    }
    try {
      window.localStorage.setItem(LAST_ID_KEY, active.id)
      setLastSeenId(active.id)
    } catch {
      // ignore storage errors
    }
    setSessionDismissed(true)
    setIsOpen(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={dismissActive}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" />

      {/* Popup Container */}
      <div
        className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-[32px] bg-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300 ring-1 ring-white/10"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Main Image Area - Full Cover */}
        <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full">
          <Link href={`/${locale}/events/${active.slug}`} className="block h-full w-full group/image">
            <Image
              src={resolveImageSrc(active.featured_image, getDefaultImage())}
              alt={active.title}
              fill
              className="object-cover transition-transform duration-700 group-hover/image:scale-105"
              priority
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/10" />

            {/* Top Bar (Floating) */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {content.badge}
              </span>

              <button
                type="button"
                onClick={dismissActive}
                aria-label={content.close}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-95 hover:bg-white hover:text-black hover:border-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </Link>

          {/* Navigation Arrows (Floating Sides) */}
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label={content.prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white/70 backdrop-blur-sm border border-white/10 transition-all hover:bg-white hover:text-black hover:scale-110 sm:left-4 sm:h-10 sm:w-10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label={content.next}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white/70 backdrop-blur-sm border border-white/10 transition-all hover:bg-white hover:text-black hover:scale-110 sm:right-4 sm:h-10 sm:w-10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Bottom Content Area (Overlay) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 flex flex-col items-center text-center space-y-4">

            {/* Title */}
            <Link href={`/${locale}/events/${active.slug}`} className="block">
              <h3 className="line-clamp-2 text-xl sm:text-2xl font-black leading-tight text-white drop-shadow-md">
                {active.title}
              </h3>
            </Link>

            {/* Action Button */}
            <Link
              href={`/${locale}/events/${active.slug}`}
              className="inline-flex h-11 w-full sm:w-auto min-w-[160px] items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95"
            >
              {content.cta}
            </Link>

            {/* Pagination Dots */}
            {hasMultiple && (
              <div className="flex justify-center gap-1.5 pt-1">
                {posters.map((_, dotIndex) => (
                  <button
                    key={`poster-dot-${dotIndex}`}
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setIndex(dotIndex); }}
                    aria-label={`${dotIndex + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${dotIndex === index
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
