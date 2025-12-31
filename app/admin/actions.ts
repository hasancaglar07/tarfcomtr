'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { ContentCategory, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateContentPaths } from '@/lib/content-store'
import { cacheTags } from '@/lib/cache-tags'

export type PageActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string; redirectTo?: string }
  | { status: 'error'; message?: string }

const pageSchema = z.object({
  slug: z.string().min(1, 'Slug zorunludur'),
  category: z.nativeEnum(ContentCategory, { errorMap: () => ({ message: 'Geçersiz kategori' }) }),
  title: z.string().min(1, 'Başlık zorunludur'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  dataJson: z.string().min(1, 'İçerik JSON zorunludur'),
  publish: z.string().optional(),
  originalSlug: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

function parseJson(dataJson: string) {
  try {
    return JSON.parse(dataJson)
  } catch {
    throw new Error('İçerik JSON formatı hatalı')
  }
}

function normalizeSlug(slug: string) {
  const normalized = slug
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
  const segments = normalized
    .split('/')
    .map((segment) =>
      segment
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
    )
    .filter(Boolean)
  return segments.join('/')
}

function validateSlug(slug: string) {
  if (slug === 'new') {
    throw new Error('"new" geçersiz bir slug değeridir.')
  }
  if (!slug || slug.length === 0) {
    throw new Error('Slug boş olamaz')
  }
}

function revalidateForSlug(slug: string) {
  revalidateContentPaths(revalidatePath, slug)
  revalidateTag(cacheTags.contentPage(slug))
  revalidateTag(cacheTags.contentPages())
}

export async function createPageAction(
  _prevState: PageActionState,
  formData: FormData,
): Promise<PageActionState> {
  try {
    await requireAdmin()

    const parsed = pageSchema.safeParse({
      slug: formData.get('slug')?.toString() ?? '',
      category: formData.get('category')?.toString(),
      title: formData.get('title')?.toString() ?? '',
      seoTitle: formData.get('seoTitle')?.toString() || undefined,
      seoDescription: formData.get('seoDescription')?.toString() || undefined,
      dataJson: formData.get('dataJson')?.toString() ?? '',
      publish: formData.get('publish')?.toString(),
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const { slug: rawSlug, category, title, seoTitle, seoDescription, dataJson, publish } = parsed.data
    const slug = normalizeSlug(rawSlug)
    validateSlug(slug)

    const data = parseJson(dataJson)
    if (data && typeof data === 'object') {
      data.slug = slug
      data.category = category
    }
    await prisma.contentPage.create({
      data: {
        slug,
        category,
        title,
        seoTitle: seoTitle ?? null,
        seoDescription: seoDescription ?? null,
        data,
        status: publish ? 'published' : 'draft',
        publishedAt: publish ? new Date() : null,
      },
    })

    revalidateForSlug(slug)
    const params = new URLSearchParams({
      toast: 'Sayfa oluşturuldu',
      toastType: 'success',
    })
    return {
      status: 'success',
      message: 'Sayfa oluşturuldu',
      redirectTo: `/admin/pages/${slug}?${params.toString()}`,
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

export async function updatePageAction(
  _prevState: PageActionState,
  formData: FormData,
): Promise<PageActionState> {
  try {
    await requireAdmin()

    const parsed = pageSchema.safeParse({
      slug: formData.get('slug')?.toString() ?? '',
      category: formData.get('category')?.toString(),
      title: formData.get('title')?.toString() ?? '',
      seoTitle: formData.get('seoTitle')?.toString() || undefined,
      seoDescription: formData.get('seoDescription')?.toString() || undefined,
      dataJson: formData.get('dataJson')?.toString() ?? '',
      publish: formData.get('publish')?.toString(),
      originalSlug: formData.get('originalSlug')?.toString() || undefined,
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const { slug: rawSlug, category, title, seoTitle, seoDescription, dataJson, publish, originalSlug } =
      parsed.data

    const slug = normalizeSlug(rawSlug)
    validateSlug(slug)

    const whereSlug = originalSlug || slug

    const existing = await prisma.contentPage.findUnique({ where: { slug: whereSlug } })
    if (!existing) {
      return { status: 'error', message: 'Sayfa bulunamadı' }
    }

    const data = parseJson(dataJson)
    if (data && typeof data === 'object') {
      data.slug = slug
      data.category = category
    }
    await prisma.contentPage.update({
      where: { slug: whereSlug },
      data: {
        slug,
        category,
        title,
        seoTitle: seoTitle ?? null,
        seoDescription: seoDescription ?? null,
        data,
        status: publish ? 'published' : 'draft',
        publishedAt: publish ? existing.publishedAt ?? new Date() : null,
      },
    })

    revalidateForSlug(slug)
    if (originalSlug && originalSlug !== slug) {
      revalidateForSlug(originalSlug)
    }
    const params = new URLSearchParams({
      toast: 'Sayfa güncellendi',
      toastType: 'success',
    })
    return { status: 'success', message: 'Sayfa güncellendi', redirectTo: `/admin/pages/${slug}?${params.toString()}` }
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

export async function deletePageAction(formData: FormData) {
  await requireAdmin()

  const slug = formData.get('slug')?.toString()
  if (!slug) {
    throw new Error('Slug eksik')
  }

  await prisma.contentPage.delete({ where: { slug } })
  revalidateForSlug(slug)
  const params = new URLSearchParams({
    toast: 'Sayfa silindi',
    toastType: 'success',
  })
  redirect(`/admin/pages?${params.toString()}`)
}

export async function publishToggleAction(formData: FormData) {
  await requireAdmin()

  const slug = formData.get('slug')?.toString()
  const publish = formData.get('publish')?.toString() === 'true'

  if (!slug) {
    throw new Error('Slug eksik')
  }

  await prisma.contentPage.update({
    where: { slug },
    data: {
      publishedAt: publish ? new Date() : null,
      status: publish ? 'published' : 'draft',
    },
  })

  revalidateForSlug(slug)
  const params = new URLSearchParams({
    toast: publish ? 'Sayfa yayınlandı' : 'Taslak olarak işaretlendi',
    toastType: 'success',
  })
  redirect(`/admin/pages?${params.toString()}`)
}
