'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { PostType } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'

export type CategoryActionState = { status: 'idle' | 'error'; message?: string }

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

function revalidate() {
  revalidateHome(revalidatePath)
  revalidatePath('/admin/categories')
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
    revalidate()
    return { status: 'idle' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id')?.toString()
  if (!id) {
    throw new Error('ID eksik')
  }
  await prisma.category.delete({ where: { id } })
  revalidate()
}
