'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'

export type SettingsActionState = { status: 'idle' | 'error'; message?: string }

const settingsSchema = z.object({
  locale: z.string().default('tr'),
  siteName: z.string().min(1, 'Site adı zorunludur'),
  siteDescription: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialYoutube: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

function revalidate() {
  revalidateHome(revalidatePath)
  revalidatePath('/admin/settings')
}

export async function upsertSettingsAction(
  _prev: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  try {
    await requireAdmin()
    const parsed = settingsSchema.safeParse({
      locale: formData.get('locale')?.toString() || 'tr',
      siteName: formData.get('siteName')?.toString() ?? '',
      siteDescription: formData.get('siteDescription')?.toString() || '',
      contactEmail: formData.get('contactEmail')?.toString() || '',
      contactPhone: formData.get('contactPhone')?.toString() || '',
      contactAddress: formData.get('contactAddress')?.toString() || '',
      socialTwitter: formData.get('socialTwitter')?.toString() || '',
      socialYoutube: formData.get('socialYoutube')?.toString() || '',
    })
    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    await prisma.setting.upsert({
      where: { locale: data.locale },
      update: {
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        contactAddress: data.contactAddress,
        social: {
          twitter: data.socialTwitter,
          youtube: data.socialYoutube,
        },
      },
      create: {
        locale: data.locale,
        siteName: data.siteName,
        siteDescription: data.siteDescription,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        contactAddress: data.contactAddress,
        social: {
          twitter: data.socialTwitter,
          youtube: data.socialYoutube,
        },
      },
    })

    revalidate()
    return { status: 'idle' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}
