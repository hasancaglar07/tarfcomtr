'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { PostType } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePostListPaths } from '@/lib/content-store'
import { cacheTags } from '@/lib/cache-tags'

export type CategoryActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Ad zorunludur'),
  slug: z.string().min(1, 'Slug zorunludur'),
  type: z.nativeEnum(PostType),
  locale: z.string().default('tr'),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

async function revalidate(type: PostType, locale: string) {
  revalidatePostListPaths(revalidatePath, type, locale)
  revalidateTag(cacheTags.categories(locale))
  revalidateTag(cacheTags.categories(locale, type))
  revalidateTag(cacheTags.posts(type, locale))
}

export async function upsertCategoryAction(
  _prev: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  try {
    await requireAdmin()
    const parsed = categorySchema.safeParse({
      id: formData.get('id')?.toString(),
      name: formData.get('name')?.toString() ?? '',
      slug: formData.get('slug')?.toString() ?? '',
      type: formData.get('type')?.toString(),
      locale: formData.get('locale')?.toString() || 'tr',
    })
    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }
    const data = parsed.data

    if (data.id) {
      await prisma.category.update({
        where: { id: data.id },
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type,
          locale: data.locale,
        },
      })
    } else {
      await prisma.category.create({
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type,
          locale: data.locale,
        },
      })
    }
    await revalidate(data.type, data.locale)
    return { status: 'success', message: data.id ? 'Kategori güncellendi' : 'Kategori eklendi' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}

export async function deleteCategoryAction(formData: FormData) {
  try {
    await requireAdmin()
    const id = formData.get('id')?.toString()
    if (!id) {
      throw new Error('ID eksik')
    }
    const category = await prisma.category.findUnique({
      where: { id },
      select: { type: true, locale: true },
    })
    if (!category) {
      throw new Error('Kategori bulunamadı')
    }
    await prisma.category.delete({ where: { id } })
    await revalidate(category.type, category.locale ?? 'tr')
    const params = new URLSearchParams({ toast: 'Kategori silindi', toastType: 'success' })
    redirect(`/admin/categories?${params.toString()}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    const params = new URLSearchParams({ toast: message, toastType: 'error' })
    redirect(`/admin/categories?${params.toString()}`)
  }
}
