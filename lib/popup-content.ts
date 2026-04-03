import { normalizeLocale } from '@/lib/i18n'

export const popupTargetModes = ['internal', 'url'] as const

export type PopupTargetMode = (typeof popupTargetModes)[number]

export type PopupContent = {
  enabled: boolean
  imageUrl: string
  targetMode: PopupTargetMode
  targetValue: string
}

export const defaultPopupContent: PopupContent = {
  enabled: false,
  imageUrl: '',
  targetMode: 'internal',
  targetValue: '',
}

export function normalizePopupContent(value: unknown): PopupContent | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const record = value as Record<string, unknown>
  return {
    enabled: Boolean(record.enabled),
    imageUrl: typeof record.imageUrl === 'string' ? record.imageUrl.trim() : '',
    targetMode: record.targetMode === 'url' ? 'url' : 'internal',
    targetValue: typeof record.targetValue === 'string' ? record.targetValue.trim() : '',
  }
}

export function resolvePopupHref(
  locale: string,
  popup: Pick<PopupContent, 'targetMode' | 'targetValue'>,
): string | null {
  const targetValue = popup.targetValue.trim()
  if (!targetValue) return null

  if (popup.targetMode === 'url') {
    return targetValue
  }

  const normalizedLocale = normalizeLocale(locale)
  if (targetValue === '/') {
    return `/${normalizedLocale}`
  }

  return `/${normalizedLocale}${targetValue}`
}

export function buildPopupFingerprint(
  locale: string,
  popup: Pick<PopupContent, 'imageUrl' | 'targetMode' | 'targetValue'>,
) {
  return [
    normalizeLocale(locale),
    popup.imageUrl.trim(),
    popup.targetMode,
    popup.targetValue.trim(),
  ].join('::')
}

export function isPopupExternalHref(href: string) {
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  )
}

export function isValidPopupManualUrl(value: string) {
  return (
    value.startsWith('/') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  )
}
