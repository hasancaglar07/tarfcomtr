import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContentPageView } from '@/components/content/content-page'
import { api } from '@/lib/api'
import { getPublishedContentPage } from '@/lib/content-store'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const joinSlug = (segments?: string[]) => (segments && segments.length > 0 ? segments.join('/') : '')

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pageSlug: string[] }>
}): Promise<Metadata> {
  const { pageSlug, locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const slug = joinSlug(pageSlug)
  const page = await getPublishedContentPage(slug)
  if (!page) {
    return buildPageMetadata({ locale })
  }
  return buildPageMetadata({
    locale,
    title: page.seo.title,
    description: page.seo.description,
    pathSegments: pageSlug,
  })
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ locale: string; pageSlug: string[] }>
}) {
  const { locale: rawLocale, pageSlug } = await params
  const locale = normalizeLocale(rawLocale)
  const slug = joinSlug(pageSlug)
  if (slug === 'dergi') {
    redirect('https://tarfdergisi.com.tr/')
  }
  if (slug === 'yazilim/gelistirme') {
    redirect('https://tarf-yazilim.vercel.app/')
  }
  const page = await getPublishedContentPage(slug)

  if (!page) {
    notFound()
  }

  const settings = await api.getSettings(locale)

  return (
    <>
      <Header locale={locale} settings={settings} />
      <ContentPageView page={page} locale={locale} />
      <Footer locale={locale} settings={settings} />
    </>
  )
}
