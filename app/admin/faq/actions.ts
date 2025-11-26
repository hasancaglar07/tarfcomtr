'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'

export type FaqActionState = { status: 'idle' | 'error'; message?: string }

const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, 'Soru zorunludur'),
  answer: z.string().min(1, 'Cevap zorunludur'),
  order: z.coerce.number().default(1),
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
  revalidatePath('/admin/faq')
}

export async function upsertFaqAction(
  _prev: FaqActionState,
  formData: FormData,
): Promise<FaqActionState> {
  try {
    await requireAdmin()
    const parsed = faqSchema.safeParse({
      id: formData.get('id')?.toString(),
      question: formData.get('question')?.toString() ?? '',
      answer: formData.get('answer')?.toString() ?? '',
      order: formData.get('order')?.toString() ?? '1',
      locale: formData.get('locale')?.toString() || 'tr',
    })
    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }
    const data = parsed.data

    if (data.id) {
      await prisma.fAQ.update({
        where: { id: data.id },
        data: {
          question: data.question,
          answer: data.answer,
          order: data.order,
          locale: data.locale,
        },
      })
    } else {
      await prisma.fAQ.create({
        data: {
          id: `faq-${data.order}-${data.locale}-${Date.now()}`,
          question: data.question,
          answer: data.answer,
          order: data.order,
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

export async function deleteFaqAction(formData: FormData) {
  await requireAdmin()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('ID eksik')
  await prisma.fAQ.delete({ where: { id } })
  revalidate()
}
