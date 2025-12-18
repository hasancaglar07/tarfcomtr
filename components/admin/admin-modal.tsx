'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type AdminModalProps = {
  open: boolean
  title?: string
  description?: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
  closeLabel?: string
  dismissible?: boolean
}

export function AdminModal({
  open,
  title,
  description,
  onClose,
  children,
  footer,
  closeLabel = 'Kapat',
  dismissible = true,
}: AdminModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [dismissible, onClose, open])

  const content = useMemo(() => {
    if (!open) return null
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => (dismissible ? onClose() : undefined)}
        />
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
          {(title || description) && (
            <div className="border-b border-slate-800 px-5 py-4">
              {title && <h2 className="text-base font-semibold text-slate-100">{title}</h2>}
              {description && (
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{description}</p>
              )}
            </div>
          )}

          {children ? <div className="px-5 py-4">{children}</div> : null}

          <div className="flex items-center justify-end gap-2 border-t border-slate-800 px-5 py-3">
            {footer ?? (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                {closeLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }, [children, closeLabel, description, dismissible, footer, onClose, open, title])

  if (!mounted) return null
  return createPortal(content, document.body)
}
