import { redirect, notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { EventsPage } from '@/components/pages/events-page'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'events', pathSegments: ['events'] })
}

export async function generateStaticParams() {
  return []
}

export default async function EventsPaginationRoute({
  params,
}: {
  params: Promise<{ locale: string; page: string }>
}) {
  const { locale: rawLocale, page } = await params
  const locale = normalizeLocale(rawLocale)
  const pageNumber = Number(page)

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const safePage = Math.floor(pageNumber)
  if (safePage === 1) {
    redirect(`/${locale}/events`)
  }

  return <EventsPage locale={locale} pastPage={safePage} />
}
