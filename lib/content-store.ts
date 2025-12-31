import type {
  ContentPageCategory,
  ContentPageDefinition,
} from '@/content/content-pages'
import { categoryLabels } from '@/content/content-pages'
import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { cacheTags } from '@/lib/cache-tags'

const locales = ['tr', 'en', 'ar']
const resolveLocales = (locale?: string) => (locale ? [locale] : locales)

const CACHE_TTL_SECONDS = 60 * 60

const cached = <T>(
  keyParts: Array<string | number>,
  tags: string[],
  fn: () => Promise<T>,
) => unstable_cache(fn, keyParts.map(String), { revalidate: CACHE_TTL_SECONDS, tags })()

type GroupedPages = Record<
  ContentPageCategory,
  { label: string; description: string; pages: ContentPageDefinition[] }
>

const mapRecordToPage = (record: {
  slug: string
  category: ContentPageCategory
  title: string
  seoTitle: string | null
  seoDescription: string | null
  data: unknown
}) => {
  const data = record.data as ContentPageDefinition

  const seoTitle =
    record.seoTitle?.trim() ||
    data.seo?.title?.trim() ||
    data.hero?.title ||
    record.slug
  const seoDescription =
    record.seoDescription?.trim() ||
    data.seo?.description?.trim() ||
    data.hero?.subtitle ||
    data.hero?.description ||
    ''

  return {
    ...data,
    slug: record.slug,
    category: record.category,
    seo: {
      title: seoTitle,
      description: seoDescription,
    },
  }
}

export async function getPublishedContentPage(slug: string) {
  return cached(
    ['content-page', slug],
    [cacheTags.contentPage(slug)],
    async () => {
      const record = await prisma.contentPage.findUnique({
        where: { slug },
      })

      if (!record || !record.publishedAt || record.status !== 'published') return null

      return mapRecordToPage(record)
    },
  )
}

export async function listPublishedContentPages() {
  return cached(
    ['content-pages'],
    [cacheTags.contentPages()],
    async () => {
      const records = await prisma.contentPage.findMany({
        where: { publishedAt: { not: null }, status: 'published' },
        orderBy: { updatedAt: 'desc' },
      })

      return records.map(mapRecordToPage)
    },
  )
}

export async function listPublishedSlugs() {
  return cached(
    ['content-pages', 'slugs', 'published'],
    [cacheTags.contentPages()],
    async () => {
      const records = await prisma.contentPage.findMany({
        where: { publishedAt: { not: null }, status: 'published' },
        select: { slug: true },
      })

      return records.map((r) => r.slug)
    },
  )
}

export async function listContentPageSlugs() {
  return cached(
    ['content-pages', 'slugs', 'all'],
    [cacheTags.contentPages()],
    async () => {
      const records = await prisma.contentPage.findMany({
        select: { slug: true },
      })

      return records.map((r) => r.slug)
    },
  )
}

export async function getContentPageGroups() {
  const pages = await listPublishedContentPages()
  const groups: GroupedPages = {} as GroupedPages

  for (const page of pages) {
    const label = categoryLabels[page.category]
    const existing = groups[page.category]
    const entry = {
      label: label?.label ?? page.category,
      description: label?.description ?? '',
      pages: existing?.pages ? [...existing.pages, page] : [page],
    }
    groups[page.category] = entry
  }

  return groups
}

export function revalidateContentPaths(revalidatePath: (path: string) => void, slug: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/${slug}`)
  }
}

const typePathMap: Record<string, string> = {
  blog: 'blog',
  event: 'events',
  video: 'videos',
  podcast: 'podcasts',
  service: 'services',
}

export function revalidatePostListPaths(
  revalidatePath: (path: string) => void,
  type: string,
  locale?: string,
) {
  const segment = typePathMap[type] ?? type
  for (const targetLocale of resolveLocales(locale)) {
    revalidatePath(`/${targetLocale}`)
    revalidatePath(`/${targetLocale}/${segment}`)
  }
}

export function revalidatePostDetailPath(
  revalidatePath: (path: string) => void,
  type: string,
  slug: string,
  locale?: string,
) {
  const segment = typePathMap[type] ?? type
  for (const targetLocale of resolveLocales(locale)) {
    revalidatePath(`/${targetLocale}/${segment}/${slug}`)
  }
}

export function revalidatePostPaths(
  revalidatePath: (path: string) => void,
  type: string,
  slug?: string,
  locale?: string,
) {
  revalidatePostListPaths(revalidatePath, type, locale)
  if (slug) {
    revalidatePostDetailPath(revalidatePath, type, slug, locale)
  }
}

export function revalidateHome(revalidatePath: (path: string) => void, locale?: string) {
  for (const targetLocale of resolveLocales(locale)) {
    revalidatePath(`/${targetLocale}`)
  }
}
