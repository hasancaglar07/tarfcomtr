'use server'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { ApplicationStatus } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(ApplicationStatus),
  adminNote: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }
}

export async function updateApplicationAction(
  formData: FormData,
): Promise<void> {
  await requireAdmin()
  const parsed = updateSchema.safeParse({
    id: formData.get('id')?.toString(),
    status: formData.get('status')?.toString(),
    adminNote: formData.get('adminNote')?.toString() || undefined,
  })
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Form hatası')
  }

  const data = parsed.data
  await prisma.application.update({
    where: { id: data.id },
    data: {
      status: data.status,
      adminNote: data.adminNote,
    },
  })
}
