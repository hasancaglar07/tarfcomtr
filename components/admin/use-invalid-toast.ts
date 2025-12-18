'use client'

import { useCallback, useRef, type FormEvent } from 'react'

import { useAdminToast } from '@/components/admin/admin-toast-provider'

function labelForElement(element: HTMLElement) {
  const id = (element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).id
  if (!id) return null
  const label = document.querySelector(`label[for="${CSS.escape(id)}"]`)
  const text = label?.textContent?.trim()
  return text && text.length > 0 ? text : null
}

export function useInvalidToast() {
  const { showToast } = useAdminToast()
  const lastAt = useRef(0)

  return useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      // Prevent browser-native tooltip; we show our own modal.
      e.preventDefault()

      const now = Date.now()
      if (now - lastAt.current < 400) return
      lastAt.current = now

      const target = e.target as unknown
      if (!(target instanceof HTMLElement)) {
        showToast('error', 'Lütfen zorunlu alanları kontrol edin.')
        return
      }

      const label = labelForElement(target)
      const hasValidity =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement

      if (hasValidity && target.validity.valueMissing) {
        showToast('error', label ? `"${label}" zorunludur.` : 'Lütfen zorunlu alanları doldurun.')
        return
      }

      const validationMessage = hasValidity ? target.validationMessage : ''

      if (label) {
        showToast('error', `"${label}" alanını kontrol edin.`)
        return
      }

      showToast('error', validationMessage || 'Lütfen zorunlu alanları kontrol edin.')
    },
    [showToast],
  )
}
