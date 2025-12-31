export const SUPPORTED_LOCALES = ['tr', 'en', 'ar'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export function isSupportedLocale(locale?: string | null): locale is SupportedLocale {
  if (!locale) return false
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

export function normalizeLocale(locale?: string | null): SupportedLocale {
  return isSupportedLocale(locale) ? (locale as SupportedLocale) : 'tr'
}

export function getDisplayLocale(locale?: string | null): string {
  return normalizeLocale(locale)
}

export const localizeHref = (locale: string, href?: string) => {
  if (!href) return '#'
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }
  if (href.startsWith('/')) {
    return `/${locale}${href}`
  }
  if (href.startsWith('#')) {
    return href
  }
  return `/${locale}/${href}`
}
