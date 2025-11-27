'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'

export type SettingsActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

const settingsSchema = z.object({
  locale: z.string().default('tr'),
  siteName: z.string().min(1, 'Site adı zorunludur'),
  siteDescription: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  contactAddress: z.string().optional(),
  socialTwitter: z.string().optional(),
  socialYoutube: z.string().optional(),
  contactContentJson: z.string().optional(),
  contactHeroEyebrow: z.string().optional(),
  contactHeroTitle: z.string().optional(),
  contactHeroSubtitle: z.string().optional(),
  contactHeroBody: z.string().optional(),
  contactFormTitle: z.string().optional(),
  contactFormSubtitle: z.string().optional(),
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
      contactContentJson: formData.get('contactContentJson')?.toString() || '',
    })
    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    // Parse existing contact content if provided as JSON
    let contactContent: Record<string, unknown> | undefined = undefined
    if (data.contactContentJson && data.contactContentJson.trim().length > 0) {
      try {
        contactContent = JSON.parse(data.contactContentJson) as Record<string, unknown>
      } catch {
        return { status: 'error', message: 'İletişim içeriği JSON formatı hatalı' }
      }
    }

    // Merge locale-specific overrides from form fields
    const localeContent: Record<string, string> = {}
    const setIf = (key: string, value?: string) => {
      if (value && value.trim().length > 0) {
        localeContent[key] = value.trim()
      }
    }
    setIf('heroEyebrow', data.contactHeroEyebrow)
    setIf('heroTitle', data.contactHeroTitle)
    setIf('heroSubtitle', data.contactHeroSubtitle)
    setIf('heroBody', data.contactHeroBody)
    setIf('formTitle', data.contactFormTitle)
    setIf('formSubtitle', data.contactFormSubtitle)

    if (Object.keys(localeContent).length > 0) {
      const existing =
        !contactContent && data.contactContentJson
          ? undefined
          : contactContent && typeof contactContent === 'object'
      const currentSetting = await prisma.setting.findUnique({ where: { locale: data.locale } })
      const current: Record<string, unknown> =
        (existing as Record<string, unknown> | undefined) ||
        ((currentSetting as unknown as { contactContent?: Record<string, unknown> | null })?.contactContent ??
          undefined) ||
        {}
      contactContent = {
        ...current,
        [data.locale]: { ...(current?.[data.locale] as Record<string, unknown> | undefined), ...localeContent },
      }
    }
    const updateData: Prisma.SettingUncheckedUpdateInput & {
      contactContent?: Prisma.InputJsonValue
    } = {
      siteName: data.siteName,
      siteDescription: data.siteDescription,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactAddress: data.contactAddress,
      social: {
        twitter: data.socialTwitter,
        youtube: data.socialYoutube,
      } as unknown as Prisma.InputJsonValue,
      contactContent: contactContent as Prisma.InputJsonValue,
    }
    const createData: Prisma.SettingUncheckedCreateInput & {
      contactContent?: Prisma.InputJsonValue
    } = {
      locale: data.locale,
      siteName: data.siteName,
      siteDescription: data.siteDescription,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      contactAddress: data.contactAddress,
      social: {
        twitter: data.socialTwitter,
        youtube: data.socialYoutube,
      } as unknown as Prisma.InputJsonValue,
      contactContent: contactContent as Prisma.InputJsonValue,
    }

    await prisma.setting.upsert({
      where: { locale: data.locale },
      update: updateData,
      create: createData,
    })

    revalidate()
    return { status: 'success', message: 'Ayarlar kaydedildi' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}
