'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { cacheTags } from '@/lib/cache-tags'
import { revalidateHome } from '@/lib/content-store'
import { normalizeLocale } from '@/lib/i18n'
import { popupTargetModes, isValidPopupManualUrl } from '@/lib/popup-content'
import { prisma } from '@/lib/prisma'

export type PopupActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

const DEFAULT_SITE_NAME = 'TARF Akademi'

const popupSchema = z.object({
  locale: z.string().default('tr'),
  enabled: z.boolean().default(false),
  imageUrl: z.string().optional(),
  targetMode: z.enum(popupTargetModes).default('internal'),
  internalTarget: z.string().optional(),
  manualUrl: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

export async function upsertPopupAction(
  _prev: PopupActionState,
  formData: FormData,
): Promise<PopupActionState> {
  try {
    await requireAdmin()

    const parsed = popupSchema.safeParse({
      locale: formData.get('locale')?.toString() || 'tr',
      enabled: Boolean(formData.get('enabled')),
      imageUrl: formData.get('imageUrl')?.toString() || '',
      targetMode: formData.get('targetMode')?.toString() || 'internal',
      internalTarget: formData.get('internalTarget')?.toString() || '',
      manualUrl: formData.get('manualUrl')?.toString() || '',
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const locale = normalizeLocale(parsed.data.locale)
    const imageUrl = parsed.data.imageUrl?.trim() || ''
    const targetValue =
      parsed.data.targetMode === 'internal'
        ? parsed.data.internalTarget?.trim() || ''
        : parsed.data.manualUrl?.trim() || ''

    if (parsed.data.enabled && !imageUrl) {
      return { status: 'error', message: 'Aktif popup için görsel seçmeniz gerekiyor.' }
    }

    if (parsed.data.enabled && !targetValue) {
      return {
        status: 'error',
        message:
          parsed.data.targetMode === 'internal'
            ? 'İç sayfa hedefi seçmeniz gerekiyor.'
            : 'Manuel URL girmeniz gerekiyor.',
      }
    }

    if (parsed.data.enabled && parsed.data.targetMode === 'internal' && !targetValue.startsWith('/')) {
      return { status: 'error', message: 'İç sayfa hedefi `/` ile başlamalıdır.' }
    }

    if (parsed.data.enabled && parsed.data.targetMode === 'url' && !isValidPopupManualUrl(targetValue)) {
      return {
        status: 'error',
        message: 'Manuel URL `https://...` ya da `/ornek-yol` formatında olmalıdır.',
      }
    }

    const popupContent = {
      enabled: parsed.data.enabled,
      imageUrl,
      targetMode: parsed.data.targetMode,
      targetValue,
    } satisfies {
      enabled: boolean
      imageUrl: string
      targetMode: 'internal' | 'url'
      targetValue: string
    }

    await prisma.setting.upsert({
      where: { locale },
      update: {
        popupContent: popupContent as Prisma.InputJsonValue,
      },
      create: {
        locale,
        siteName: DEFAULT_SITE_NAME,
        popupContent: popupContent as Prisma.InputJsonValue,
      },
    })

    revalidateHome(revalidatePath, locale)
    revalidatePath('/admin/popup')
    revalidateTag(cacheTags.settings(locale))

    return { status: 'success', message: 'Popup ayarları kaydedildi.' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}
