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
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      onClick={dismissActive}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" />

      {/* Popup Container - Matching Hero Card Style */}
      <div
        className="relative w-full max-w-[400px] overflow-hidden rounded-[32px] border border-white/80 bg-white/95 p-5 shadow-[0_40px_100px_rgba(234,88,12,0.25)] backdrop-blur-3xl animate-in fade-in zoom-in-95 duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Spotlight Effect (Static match to hero hover) */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

        {/* Header with Hero-style Badge */}
        <div className="relative flex items-center justify-between gap-3 px-1 pt-1 pb-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-[0_2px_10px_rgba(249,115,22,0.1)] backdrop-blur-md">
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
            className="group flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Poster Image Container */}
        <div className="relative">
          <Link href={`/${locale}/events/${active.slug}`} className="block group/image">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[24px] border border-slate-100 bg-slate-50 shadow-lg">
              <Image
                src={resolveImageSrc(active.featured_image, getDefaultImage())}
                alt={active.title}
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="object-cover transition-transform duration-500 group-hover/image:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label={content.prev}
                className="absolute -left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/90 text-slate-700 shadow-lg transition-transform hover:scale-110 hover:bg-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label={content.next}
                className="absolute -right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white bg-white/90 text-slate-700 shadow-lg transition-transform hover:scale-110 hover:bg-white"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-center">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-slate-900">
            {active.title}
          </h3>

          <div className="flex justify-center gap-3">
            <Link
              href={`/${locale}/events/${active.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
            >
              {content.cta}
            </Link>
          </div>

          {hasMultiple && (
            <div className="flex justify-center gap-1.5 pt-1">
              {posters.map((_, dotIndex) => (
                <button
                  key={`poster-dot-${dotIndex}`}
                  type="button"
                  onClick={() => setIndex(dotIndex)}
                  aria-label={`${dotIndex + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === index
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
