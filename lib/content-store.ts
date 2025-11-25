import type {
  ContentPageCategory,
  ContentPageDefinition,
} from '@/content/content-pages'
import { categoryLabels } from '@/content/content-pages'
import { prisma } from '@/lib/prisma'

const locales = ['tr', 'en', 'ar']

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

  return {
    ...data,
    slug: record.slug,
    category: record.category,
    seo: data.seo ?? {
      title: record.seoTitle ?? data.hero?.title ?? record.slug,
      description:
        record.seoDescription ?? data.hero?.subtitle ?? data.hero?.description ?? '',
    },
  }
}

export async function getPublishedContentPage(slug: string) {
  const record = await prisma.contentPage.findUnique({
    where: { slug },
  })

  if (!record || !record.publishedAt || record.status !== 'published') return null

  return mapRecordToPage(record)
}

export async function listPublishedContentPages() {
  const records = await prisma.contentPage.findMany({
    where: { publishedAt: { not: null }, status: 'published' },
    orderBy: { updatedAt: 'desc' },
  })

  return records.map(mapRecordToPage)
}

export async function listPublishedSlugs() {
  const records = await prisma.contentPage.findMany({
    where: { publishedAt: { not: null }, status: 'published' },
    select: { slug: true },
  })

  return records.map((r) => r.slug)
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
  revalidatePath('/')
  for (const locale of locales) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/${slug}`)
  }
  revalidatePath('/admin')
  revalidatePath('/admin/pages')
}

const typePathMap: Record<string, string> = {
  blog: 'blog',
  event: 'events',
  video: 'videos',
  podcast: 'podcasts',
  service: 'services',
}

export function revalidatePostPaths(
  revalidatePath: (path: string) => void,
  type: string,
  slug?: string,
) {
  const segment = typePathMap[type] ?? type
  revalidatePath('/')
  for (const locale of locales) {
    revalidatePath(`/${locale}`)
    revalidatePath(`/${locale}/${segment}`)
    if (slug) {
      revalidatePath(`/${locale}/${segment}/${slug}`)
    }
  }
  revalidatePath('/admin')
  revalidatePath(`/admin/posts/${type}`)
}

export function revalidateHome(revalidatePath: (path: string) => void) {
  revalidatePath('/')
  for (const locale of locales) {
    revalidatePath(`/${locale}`)
  }
  revalidatePath('/admin')
}
