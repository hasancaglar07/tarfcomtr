'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'

import { getDefaultImage, resolveImageSrc } from '@/lib/images'
import type { PopupContent } from '@/lib/popup-content'
import {
  isPopupExternalHref,
  normalizePopupContent,
  resolvePopupHref,
} from '@/lib/popup-content'

type HomePopupProps = {
  locale: string
  popup?: PopupContent | null
}

const OPEN_DELAY_MS = 800

export function HomePopup({ locale, popup }: HomePopupProps) {
  const config = useMemo(() => normalizePopupContent(popup), [popup])
  const href = useMemo(
    () => (config ? resolvePopupHref(locale, config) : null),
    [config, locale],
  )
  const [isOpen, setIsOpen] = useState(false)
  const [sessionDismissed, setSessionDismissed] = useState(false)

  useEffect(() => {
    setSessionDismissed(false)
  }, [config, locale])

  useEffect(() => {
    if (sessionDismissed) return
    if (!config?.enabled || !config.imageUrl || !href) {
      setIsOpen(false)
      return
    }

    const timeout = window.setTimeout(() => {
      setIsOpen(true)
    }, OPEN_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [config, href, sessionDismissed])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSessionDismissed(true)
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  const dismissPopup = () => {
    setSessionDismissed(true)
    setIsOpen(false)
  }

  if (!config?.enabled || !config.imageUrl || !href || !isOpen) {
    return null
  }

  const image = (
    <div className="relative aspect-[3/4] w-full overflow-hidden">
      <Image
        src={resolveImageSrc(config.imageUrl, getDefaultImage())}
        alt="TARF ana sayfa popup görseli"
        fill
        priority
        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
      />
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      onClick={dismissPopup}
    >
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity" />

      <div
        className="relative w-full max-w-sm overflow-hidden rounded-[32px] bg-slate-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={dismissPopup}
          aria-label="Popup kapat"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:bg-white hover:text-black hover:border-white"
        >
          <X className="h-4 w-4" />
        </button>

        {isPopupExternalHref(href) ? (
          <a href={href} className="block" aria-label="Popup bağlantısını aç">
            {image}
          </a>
        ) : (
          <Link href={href} className="block" aria-label="Popup bağlantısını aç">
            {image}
          </Link>
        )}
      </div>
    </div>
  )
}
