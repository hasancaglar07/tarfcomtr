'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type ToastKind = 'success' | 'error' | 'info'

type Toast = {
  id: string
  kind: ToastKind
  message: string
}

export type ActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

type ActionToastProps = {
  state?: ActionState
  initial?: { kind?: ToastKind; message?: string }
}

const defaultText: Record<ToastKind, string> = {
  success: 'Başarıyla kaydedildi',
  error: 'Kaydedilirken bir hata oluştu',
  info: 'Bilgilendirme',
}

const styleMap: Record<ToastKind, string> = {
  success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-50',
  error: 'border-red-500/50 bg-red-500/10 text-red-50',
  info: 'border-slate-500/60 bg-slate-800/80 text-slate-50',
}

export function ActionToast({ state, initial }: ActionToastProps) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const lastState = useRef<ActionState | undefined>(undefined)

  const pushToast = (kind: ToastKind, message?: string) => {
    const text = message?.trim() || defaultText[kind]
    if (!text) return
    const id = crypto.randomUUID ? crypto.randomUUID() : `${kind}-${Date.now()}`
    setToasts((prev) => [...prev, { id, kind, message: text }])
    // Auto dismiss after 4.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4500)
  }

  // Handle live state changes
  useEffect(() => {
    if (!state) return
    if (state === lastState.current) return
    lastState.current = state
    if (state.status === 'success') {
      pushToast('success', state.message)
    } else if (state.status === 'error') {
      pushToast('error', state.message)
    }
  }, [state])

  // Handle initial toast passed from search params
  useEffect(() => {
    if (!initial?.message) return
    pushToast(initial.kind || 'success', initial.message)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('toast')
      url.searchParams.delete('toastType')
      window.history.replaceState(null, '', url.toString())
    }
  }, [initial?.kind, initial?.message])

  const visible = useMemo(() => toasts, [toasts])

  if (visible.length === 0) return null

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-80 flex-col gap-2">
      {visible.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto overflow-hidden rounded-xl border px-4 py-3 shadow-2xl backdrop-blur ${
            styleMap[toast.kind]
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {toast.kind === 'success'
                  ? 'Başarılı'
                  : toast.kind === 'error'
                    ? 'Hata'
                    : 'Bilgi'}
              </p>
              <p className="text-sm leading-relaxed text-slate-100">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="rounded-md border border-white/10 px-2 py-1 text-xs font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/10"
            >
              Kapat
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
