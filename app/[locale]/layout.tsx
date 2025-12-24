import type { Metadata } from 'next'
import { normalizeLocale, isSupportedLocale } from '@/lib/i18n'
import { notFound } from 'next/navigation'
import { PageTransition } from '@/components/ui/page-transition'
import { buildPageMetadata } from '@/lib/seo'
import { api } from '@/lib/api'
import { listContentPageSlugs, listPublishedSlugs } from '@/lib/content-store'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

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
  const [settings, contentPageSlugs, publishedPageSlugs] = await Promise.all([
    api.getSettings(normalizedLocale),
    listContentPageSlugs(),
    listPublishedSlugs(),
  ])

  return (
    <div lang={normalizedLocale} dir={direction}>
      <Header
        locale={normalizedLocale}
        settings={settings}
        contentPageSlugs={contentPageSlugs}
        publishedPageSlugs={publishedPageSlugs}
      />
      <PageTransition>{children}</PageTransition>
      <Footer
        locale={normalizedLocale}
        settings={settings}
        contentPageSlugs={contentPageSlugs}
        publishedPageSlugs={publishedPageSlugs}
      />
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
