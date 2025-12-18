'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { AdminModal } from '@/components/admin/admin-modal'

export type AdminToastKind = 'success' | 'error' | 'info'

type AdminToast = {
  kind: AdminToastKind
  message: string
}

type AdminToastContextValue = {
  showToast: (kind: AdminToastKind, message: string) => void
}

const AdminToastContext = createContext<AdminToastContextValue | null>(null)

function titleFor(kind: AdminToastKind) {
  if (kind === 'success') return 'İşlem başarılı'
  if (kind === 'error') return 'İşlem başarısız'
  return 'Bilgilendirme'
}

function clearToastQueryParams() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  url.searchParams.delete('toast')
  url.searchParams.delete('toastType')
  window.history.replaceState(null, '', url.toString())
}

export function AdminToastProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const [toast, setToast] = useState<AdminToast | null>(null)
  const lastShownKey = useRef<string | null>(null)

  const showToast = useCallback((kind: AdminToastKind, message: string) => {
    const trimmed = message.trim()
    if (!trimmed) return
    const key = `${kind}:${trimmed}`
    if (lastShownKey.current === key) return
    lastShownKey.current = key
    setToast({ kind, message: trimmed })
  }, [])

  const close = useCallback(() => setToast(null), [])

  useEffect(() => {
    if (!toast) return
    if (toast.kind !== 'success') return
    const id = window.setTimeout(() => setToast(null), 4500)
    return () => window.clearTimeout(id)
  }, [toast])

  // Read toast from query string (redirect sonrası kullanıcıya görünür feedback).
  const queryToast = searchParams.get('toast')
  const queryToastType = searchParams.get('toastType')
  const queryKey = useMemo(() => {
    if (!queryToast) return null
    const kind: AdminToastKind =
      queryToastType === 'error' ? 'error' : queryToastType === 'info' ? 'info' : 'success'
    return `${kind}:${queryToast}`
  }, [queryToast, queryToastType])

  const lastQueryKey = useRef<string | null>(null)
  useEffect(() => {
    if (!queryKey) return
    if (lastQueryKey.current === queryKey) return
    lastQueryKey.current = queryKey

    const [kind, ...rest] = queryKey.split(':')
    const message = rest.join(':')
    showToast(kind as AdminToastKind, message)
    clearToastQueryParams()
  }, [queryKey, showToast])

  const value = useMemo<AdminToastContextValue>(() => ({ showToast }), [showToast])

  return (
    <AdminToastContext.Provider value={value}>
      {children}
      <AdminModal
        open={Boolean(toast)}
        onClose={close}
        title={toast ? titleFor(toast.kind) : undefined}
        dismissible
        closeLabel="Kapat"
        footer={
          <button
            type="button"
            onClick={close}
            className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition ${
              toast?.kind === 'error'
                ? 'border-red-500/50 text-red-100 hover:bg-red-500/10'
                : toast?.kind === 'success'
                  ? 'border-emerald-500/40 text-emerald-100 hover:bg-emerald-500/10'
                  : 'border-slate-700 text-slate-100 hover:border-slate-500'
            }`}
          >
            Kapat
          </button>
        }
      >
        <p className="text-sm leading-relaxed text-slate-200">{toast?.message}</p>
      </AdminModal>
    </AdminToastContext.Provider>
  )
}

export function useAdminToast() {
  const ctx = useContext(AdminToastContext)
  if (!ctx) {
    throw new Error('useAdminToast must be used within AdminToastProvider')
  }
  return ctx
}

