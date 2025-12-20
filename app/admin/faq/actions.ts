'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export type FaqActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

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

function revalidate(locale: string) {
  revalidatePath(`/${locale}/faq`)
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
    revalidate(data.locale)
    return { status: 'success', message: data.id ? 'Soru güncellendi' : 'Soru eklendi' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}

export async function deleteFaqAction(formData: FormData) {
  try {
    await requireAdmin()
    const id = formData.get('id')?.toString()
    if (!id) throw new Error('ID eksik')
    const existing = await prisma.fAQ.findUnique({ where: { id }, select: { locale: true } })
    if (!existing) throw new Error('Kayıt bulunamadı')
    await prisma.fAQ.delete({ where: { id } })
    revalidate(existing.locale)
    const params = new URLSearchParams({ toast: 'Kayıt silindi', toastType: 'success' })
    redirect(`/admin/faq?${params.toString()}`)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    const params = new URLSearchParams({ toast: message, toastType: 'error' })
    redirect(`/admin/faq?${params.toString()}`)
  }
}
