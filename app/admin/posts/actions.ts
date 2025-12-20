'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Prisma, PostStatus, PostType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { getPastEventsTotalPages } from '@/lib/api'
import { prisma } from '@/lib/prisma'
import { revalidatePostDetailPath, revalidatePostListPaths } from '@/lib/content-store'

export type PostActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string; redirectTo?: string }
  | { status: 'error'; message?: string }

const postSchema = z.object({
  type: z.nativeEnum(PostType),
  slug: z.string().min(1, 'Slug zorunludur'),
  title: z.string().min(1, 'Başlık zorunludur'),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: z.string().optional(),
  openGraphImage: z.string().optional(), // legacy form name guard
  status: z.enum(['draft', 'published']).optional(),
  locale: z.string().default('tr'),
  categoryId: z.string().optional().nullable(),
  featuredImage: z.string().optional().nullable(),
  youtubeUrl: z.string().optional().nullable(),
  audioUrl: z.string().optional().nullable(),
  eventDate: z.string().optional().nullable(),
  eventTime: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gallery: z.string().optional().nullable(),
  originalSlug: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

function parseGallery(gallery?: string | null) {
  if (!gallery) return undefined
  return gallery
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)
}

function parseDate(value?: string | null) {
  if (!value) return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

async function revalidate(
  type: PostType,
  locale: string,
  slug?: string,
  previous?: { locale?: string; slug?: string },
) {
  revalidatePostListPaths(revalidatePath, type, locale)
  if (slug) {
    revalidatePostDetailPath(revalidatePath, type, slug, locale)
  }

  if (previous?.slug && (previous.slug !== slug || previous.locale !== locale)) {
    const previousLocale = previous.locale ?? locale
    revalidatePostListPaths(revalidatePath, type, previousLocale)
    revalidatePostDetailPath(revalidatePath, type, previous.slug, previousLocale)
  }

  if (type === PostType.event) {
    const localesToRevalidate =
      previous?.locale && previous.locale !== locale ? [locale, previous.locale] : [locale]
    for (const targetLocale of localesToRevalidate) {
      const totalPages = await getPastEventsTotalPages(targetLocale, 12)
      for (let page = 2; page <= totalPages; page += 1) {
        revalidatePath(`/${targetLocale}/events/page/${page}`)
      }
    }
  }
}

const typeLabel: Record<PostType, string> = {
  blog: 'Blog yazısı',
  event: 'Etkinlik',
  video: 'Video',
  podcast: 'Podcast',
  service: 'Hizmet/Eğitim',
}

const typeLabelFor = (type: PostType) => typeLabel[type] || 'İçerik'

export async function createPostAction(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  try {
    await requireAdmin()
    const parsed = postSchema.safeParse({
      type: formData.get('type')?.toString(),
      slug: formData.get('slug')?.toString() ?? '',
      title: formData.get('title')?.toString() ?? '',
      excerpt: formData.get('excerpt')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      seoTitle: formData.get('seoTitle')?.toString() || undefined,
      seoDescription: formData.get('seoDescription')?.toString() || undefined,
      ogImage:
        formData.get('ogImage')?.toString() ||
        formData.get('openGraphImage')?.toString() ||
        undefined,
      status: formData.get('status')?.toString() as 'draft' | 'published',
      locale: formData.get('locale')?.toString() || 'tr',
      categoryId: formData.get('categoryId')?.toString() || undefined,
      featuredImage: formData.get('featuredImage')?.toString() || undefined,
      youtubeUrl: formData.get('youtubeUrl')?.toString() || undefined,
      audioUrl: formData.get('audioUrl')?.toString() || undefined,
      eventDate: formData.get('eventDate')?.toString() || undefined,
      eventTime: formData.get('eventTime')?.toString() || undefined,
      location: formData.get('location')?.toString() || undefined,
      gallery: formData.get('gallery')?.toString() || undefined,
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    const gallery = parseGallery(data.gallery)

    if (data.type === PostType.video && !data.youtubeUrl) {
      return { status: 'error', message: 'Video için YouTube URL zorunludur' }
    }

    await prisma.post.create({
      data: {
        type: data.type,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        ogImage: data.ogImage || null,
        status: (data.status as PostStatus) || PostStatus.published,
        locale: data.locale,
        categoryId: data.categoryId || null,
        featuredImage: data.featuredImage || null,
        youtubeUrl: data.youtubeUrl || null,
        audioUrl: data.audioUrl || null,
        eventDate: parseDate(data.eventDate),
        eventTime: data.eventTime || null,
        location: data.location || null,
        meta: gallery ? { gallery } : undefined,
        publishedAt: data.status === 'published' || !data.status ? new Date() : null,
      },
    })

    await revalidate(data.type, data.locale, data.slug)
    const params = new URLSearchParams({
      toast: `${typeLabelFor(data.type)} kaydedildi`,
      toastType: 'success',
    })
    return {
      status: 'success',
      message: `${typeLabelFor(data.type)} kaydedildi`,
      redirectTo: `/admin/posts/${data.type}?${params.toString()}`,
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        status: 'error',
        message: 'Bu slug zaten kullanılıyor. Lütfen slug alanını değiştirin.',
      }
    }
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}

export async function updatePostAction(
  _prev: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  try {
    await requireAdmin()
    const parsed = postSchema.safeParse({
      type: formData.get('type')?.toString(),
      slug: formData.get('slug')?.toString() ?? '',
      title: formData.get('title')?.toString() ?? '',
      excerpt: formData.get('excerpt')?.toString() || '',
      content: formData.get('content')?.toString() || '',
      seoTitle: formData.get('seoTitle')?.toString() || undefined,
      seoDescription: formData.get('seoDescription')?.toString() || undefined,
      ogImage:
        formData.get('ogImage')?.toString() ||
        formData.get('openGraphImage')?.toString() ||
        undefined,
      status: formData.get('status')?.toString() as 'draft' | 'published',
      locale: formData.get('locale')?.toString() || 'tr',
      categoryId: formData.get('categoryId')?.toString() || undefined,
      featuredImage: formData.get('featuredImage')?.toString() || undefined,
      youtubeUrl: formData.get('youtubeUrl')?.toString() || undefined,
      audioUrl: formData.get('audioUrl')?.toString() || undefined,
      eventDate: formData.get('eventDate')?.toString() || undefined,
      eventTime: formData.get('eventTime')?.toString() || undefined,
      location: formData.get('location')?.toString() || undefined,
      gallery: formData.get('gallery')?.toString() || undefined,
      originalSlug: formData.get('originalSlug')?.toString() || undefined,
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    const whereSlug = data.originalSlug || data.slug
    const existing = await prisma.post.findFirst({
      where: { slug: whereSlug, type: data.type },
    })
    if (!existing) {
      return { status: 'error', message: 'Kayıt bulunamadı' }
    }

    const gallery = parseGallery(data.gallery)

    if (data.type === PostType.video && !data.youtubeUrl) {
      return { status: 'error', message: 'Video için YouTube URL zorunludur' }
    }

    await prisma.post.update({
      where: { id: existing.id },
      data: {
        type: data.type,
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        status: (data.status as PostStatus) || PostStatus.published,
        locale: data.locale,
        categoryId: data.categoryId || null,
        featuredImage: data.featuredImage || null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        ogImage: data.ogImage || null,
        youtubeUrl: data.youtubeUrl || null,
        audioUrl: data.audioUrl || null,
        eventDate: parseDate(data.eventDate),
        eventTime: data.eventTime || null,
        location: data.location || null,
        meta: gallery ? { gallery } : undefined,
        publishedAt:
          data.status === 'published' || !data.status
            ? existing.publishedAt ?? new Date()
            : null,
      },
    })

    await revalidate(data.type, data.locale, data.slug, {
      locale: existing.locale,
      slug: existing.slug,
    })
    const params = new URLSearchParams({
      toast: `${typeLabelFor(data.type)} güncellendi`,
      toastType: 'success',
    })
    return {
      status: 'success',
      message: `${typeLabelFor(data.type)} güncellendi`,
      redirectTo: `/admin/posts/${data.type}?${params.toString()}`,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id')?.toString()
  const type = formData.get('type')?.toString() as PostType
  if (!id || !type) {
    throw new Error('Eksik bilgi')
  }
  const existing = await prisma.post.findUnique({
    where: { id },
    select: { locale: true, slug: true },
  })
  if (!existing) {
    throw new Error('Kayıt bulunamadı')
  }
  await prisma.post.delete({ where: { id } })
  await revalidate(type, existing.locale, existing.slug)
  const params = new URLSearchParams({
    toast: `${typeLabelFor(type)} silindi`,
    toastType: 'success',
  })
  redirect(`/admin/posts/${type}?${params.toString()}`)
}
