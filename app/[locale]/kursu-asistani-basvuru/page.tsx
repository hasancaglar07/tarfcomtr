import { notFound } from 'next/navigation'

import { ChairAssistantApplicationPage } from '@/components/pages/chair-assistant-application-page'
import { chairAssistantPageDescription, chairAssistantPageTitle } from '@/lib/chair-assistant'
import { buildPageMetadata } from '@/lib/seo'
import { normalizeLocale } from '@/lib/i18n'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)

  return buildPageMetadata({
    locale,
    title: `${chairAssistantPageTitle} · TARF`,
    description: chairAssistantPageDescription,
    pathSegments: ['kursu-asistani-basvuru'],
  })
}

export default async function ChairAssistantApplicationRoute({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)

  if (locale !== 'tr') {
    notFound()
  }

  return <ChairAssistantApplicationPage />
}
