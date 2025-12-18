'use client'

import { useEffect, useRef } from 'react'

import { useAdminToast, type AdminToastKind } from '@/components/admin/admin-toast-provider'

export type ActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

type ActionToastProps = {
  state?: ActionState
  initial?: { kind?: AdminToastKind; message?: string }
}

export function ActionToast({ state, initial }: ActionToastProps) {
  const { showToast } = useAdminToast()
  const lastState = useRef<ActionState | undefined>(undefined)

  // Handle live state changes
  useEffect(() => {
    if (!state) return
    if (state === lastState.current) return
    lastState.current = state
    if (state.status === 'success') {
      showToast('success', state.message || 'Başarıyla kaydedildi')
    } else if (state.status === 'error') {
      showToast('error', state.message || 'Kaydedilirken bir hata oluştu')
    }
  }, [showToast, state])

  // Backwards-compatible initial toast (prefer using query-string toast handled by provider).
  useEffect(() => {
    if (!initial?.message) return
    showToast(initial.kind || 'success', initial.message)
  }, [initial?.kind, initial?.message, showToast])

  return null
}
