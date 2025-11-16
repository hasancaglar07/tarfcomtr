import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContentPageView } from '@/components/content/content-page'
import { api } from '@/lib/api'
import { contentPageSlugs, getContentPage } from '@/content/content-pages'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

const joinSlug = (segments?: string[]) => (segments && segments.length > 0 ? segments.join('/') : '')

export async function generateStaticParams() {
  const paths: Array<{ locale: string; pageSlug: string[] }> = []
  for (const slug of contentPageSlugs) {
    for (const locale of SUPPORTED_LOCALES) {
      paths.push({ locale, pageSlug: slug.split('/') })
    }
  }
  return paths
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pageSlug: string[] }>
}): Promise<Metadata> {
  const { pageSlug, locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const slug = joinSlug(pageSlug)
  const page = getContentPage(slug)
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
  const page = getContentPage(slug)

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
