import type { Metadata } from 'next'
import { normalizeLocale, isSupportedLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import { PageTransition } from '@/components/ui/page-transition'
import { buildPageMetadata } from '@/lib/seo'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const normalizedLocale = normalizeLocale(locale)
  const direction = normalizedLocale === 'ar' ? 'rtl' : 'ltr'

  return (
    <div lang={normalizedLocale} dir={direction}>
      <PageTransition>{children}</PageTransition>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata({ locale })
}
