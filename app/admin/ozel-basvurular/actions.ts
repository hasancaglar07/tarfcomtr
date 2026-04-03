'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { ApplicationStatus } from '@prisma/client'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(ApplicationStatus),
  adminNote: z.string().optional(),
  redirectTo: z.string().min(1),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }
}

export async function updateChairAssistantApplicationAction(formData: FormData): Promise<void> {
  await requireAdmin()

  const parsed = updateSchema.safeParse({
    id: formData.get('id')?.toString(),
    status: formData.get('status')?.toString(),
    adminNote: formData.get('adminNote')?.toString() || undefined,
    redirectTo: formData.get('redirectTo')?.toString(),
  })

  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Form hatası')
  }

  const data = parsed.data

  await prisma.chairAssistantApplication.update({
    where: { id: data.id },
    data: {
      status: data.status,
      adminNote: data.adminNote,
    },
  })

  revalidatePath('/admin/ozel-basvurular')
  revalidatePath(data.redirectTo)

  const params = new URLSearchParams({
    toast: 'Özel başvuru güncellendi',
    toastType: 'success',
  })

  redirect(`${data.redirectTo}?${params.toString()}`)
}
