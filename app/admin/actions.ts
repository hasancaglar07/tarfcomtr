'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { ContentCategory } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateContentPaths } from '@/lib/content-store'

export type PageActionState = { status: 'idle' | 'error'; message?: string }

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

function revalidateForSlug(slug: string) {
  revalidateContentPaths(revalidatePath, slug)
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

    const { slug, category, title, seoTitle, seoDescription, dataJson, publish } = parsed.data

    const data = parseJson(dataJson)
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
    redirect(`/admin/pages/${slug}`)
  } catch (error) {
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

    const { slug, category, title, seoTitle, seoDescription, dataJson, publish, originalSlug } =
      parsed.data

    const whereSlug = originalSlug || slug

    const existing = await prisma.contentPage.findUnique({ where: { slug: whereSlug } })
    if (!existing) {
      return { status: 'error', message: 'Sayfa bulunamadı' }
    }

    const data = parseJson(dataJson)
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
    redirect(`/admin/pages/${slug}`)
  } catch (error) {
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
  redirect('/admin/pages')
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
    data: { publishedAt: publish ? new Date() : null },
  })

  revalidateForSlug(slug)
  redirect('/admin/pages')
}
