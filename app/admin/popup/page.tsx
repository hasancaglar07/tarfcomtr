import Link from 'next/link'
import { PostStatus, PostType } from '@prisma/client'

import { upsertPopupAction } from '@/app/admin/popup/actions'
import { PopupForm, type PopupTargetGroup } from '@/components/admin/popup-form'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { defaultPopupContent, normalizePopupContent } from '@/lib/popup-content'
import { prisma } from '@/lib/prisma'

const systemTargetGroup: PopupTargetGroup = {
  label: 'Sistem sayfaları',
  options: [
    { value: '/', label: 'Anasayfa (/)' },
    { value: '/kursu-asistani-basvuru', label: 'Kürsü Asistan Başvuru Formu (/kursu-asistani-basvuru)' },
    { value: '/contact', label: 'İletişim (/contact)' },
    { value: '/blog', label: 'Blog (/blog)' },
    { value: '/events', label: 'Etkinlikler (/events)' },
    { value: '/videos', label: 'Videolar (/videos)' },
    { value: '/podcasts', label: 'Podcastler (/podcasts)' },
    { value: '/services', label: 'Hizmetler (/services)' },
  ],
}

const postTypeTargets: Array<{
  type: PostType
  label: string
  segment: string
}> = [
  { type: PostType.blog, label: 'Blog detay sayfaları', segment: 'blog' },
  { type: PostType.event, label: 'Etkinlik detay sayfaları', segment: 'events' },
  { type: PostType.video, label: 'Video detay sayfaları', segment: 'videos' },
  { type: PostType.podcast, label: 'Podcast detay sayfaları', segment: 'podcasts' },
  { type: PostType.service, label: 'Hizmet / Eğitim detay sayfaları', segment: 'services' },
]

function buildLocaleLink(locale: string) {
  return `/admin/popup?locale=${locale}`
}

async function getTargetGroups(locale: string): Promise<PopupTargetGroup[]> {
  try {
    const [contentPages, ...postResults] = await Promise.all([
      prisma.contentPage.findMany({
        where: {
          status: PostStatus.published,
          publishedAt: { not: null },
        },
        orderBy: { title: 'asc' },
        select: {
          slug: true,
          title: true,
        },
      }),
      ...postTypeTargets.map((config) =>
        prisma.post.findMany({
          where: {
            locale,
            type: config.type,
            status: PostStatus.published,
          },
          orderBy: { title: 'asc' },
          select: {
            slug: true,
            title: true,
          },
        }),
      ),
    ])

    const groups: PopupTargetGroup[] = [systemTargetGroup]

    if (contentPages.length > 0) {
      groups.push({
        label: 'İçerik sayfaları',
        options: contentPages.map((page) => ({
          value: `/${page.slug}`,
          label: `${page.title} (/${page.slug})`,
        })),
      })
    }

    postResults.forEach((records, index) => {
      if (records.length === 0) return
      const target = postTypeTargets[index]
      groups.push({
        label: target.label,
        options: records.map((record) => ({
          value: `/${target.segment}/${record.slug}`,
          label: `${record.title} (/${target.segment}/${record.slug})`,
        })),
      })
    })

    return groups
  } catch (error) {
    console.error('[admin/popup] Failed to load popup targets, falling back to system routes:', error)
    return [systemTargetGroup]
  }
}

export default async function PopupPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const search = await searchParams
  const localeParam = typeof search.locale === 'string' ? search.locale : 'tr'
  const locale = normalizeLocale(localeParam)

  let setting: { popupContent: unknown } | null = null
  let targetGroups: PopupTargetGroup[] = [systemTargetGroup]

  try {
    ;[setting, targetGroups] = await Promise.all([
      prisma.setting.findUnique({
        where: { locale },
        select: {
          popupContent: true,
        },
      }),
      getTargetGroups(locale),
    ])
  } catch (error) {
    console.error('[admin/popup] Failed to load popup config, using defaults:', error)
  }

  const popupContent = normalizePopupContent(setting?.popupContent) ?? defaultPopupContent

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Popup Yönetimi</h1>
            <p className="text-sm text-slate-400">
              Anasayfada açılan locale bazlı popup görselini ve hedefini yönetin.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Panele dön
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LOCALES.map((localeOption) => {
            const active = localeOption === locale
            return (
              <Link
                key={localeOption}
                href={buildLocaleLink(localeOption)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'border-orange-500 bg-orange-500 text-slate-950'
                    : 'border-slate-700 text-slate-200 hover:border-orange-400'
                }`}
              >
                {localeOption.toUpperCase()}
              </Link>
            )
          })}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <PopupForm
            action={upsertPopupAction}
            locale={locale}
            defaultValues={popupContent}
            targetGroups={targetGroups}
          />
        </div>
      </div>
    </div>
  )
}
