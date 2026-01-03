'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { Prisma } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'
import { cacheTags } from '@/lib/cache-tags'

export type HeroActionState =
  | { status: 'idle'; message?: string }
  | { status: 'success'; message?: string }
  | { status: 'error'; message?: string }

const heroSchema = z.object({
  id: z.string().optional(),
  locale: z.string().default('tr'),
  title: z.string().min(1, 'Başlık zorunludur'),
  subtitle: z.string().min(1, 'Alt başlık zorunludur'),
  description: z.string().optional(),
  headlineSlidesJson: z.string().optional(),
  headlineTitle1: z.string().optional(),
  headlineSubtitle1: z.string().optional(),
  headlineTitle2: z.string().optional(),
  headlineSubtitle2: z.string().optional(),
  headlineTitle3: z.string().optional(),
  headlineSubtitle3: z.string().optional(),
  headlineTitle4: z.string().optional(),
  headlineSubtitle4: z.string().optional(),
  headlineTitle5: z.string().optional(),
  headlineSubtitle5: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  backgroundImage: z.string().optional(),
  videoUrl: z.string().optional(),
  videoCover: z.string().optional(),
  videoUrl2: z.string().optional(),
  videoCover2: z.string().optional(),
  videoUrl3: z.string().optional(),
  videoUrl4: z.string().optional(),
  videoUrl5: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

function revalidate(locale: string) {
  revalidateHome(revalidatePath, locale)
  revalidateTag(cacheTags.heroes(locale))
}

export async function upsertHeroAction(
  _prev: HeroActionState,
  formData: FormData,
): Promise<HeroActionState> {
  try {
    await requireAdmin()
    const parsed = heroSchema.safeParse({
      id: formData.get('id')?.toString(),
      locale: formData.get('locale')?.toString() || 'tr',
      title: formData.get('title')?.toString() ?? '',
      subtitle: formData.get('subtitle')?.toString() ?? '',
      description: formData.get('description')?.toString() || '',
      headlineSlidesJson: formData.get('headlineSlidesJson')?.toString(),
      headlineTitle1: formData.get('headlineTitle1')?.toString() || '',
      headlineSubtitle1: formData.get('headlineSubtitle1')?.toString() || '',
      headlineTitle2: formData.get('headlineTitle2')?.toString() || '',
      headlineSubtitle2: formData.get('headlineSubtitle2')?.toString() || '',
      headlineTitle3: formData.get('headlineTitle3')?.toString() || '',
      headlineSubtitle3: formData.get('headlineSubtitle3')?.toString() || '',
      headlineTitle4: formData.get('headlineTitle4')?.toString() || '',
      headlineSubtitle4: formData.get('headlineSubtitle4')?.toString() || '',
      headlineTitle5: formData.get('headlineTitle5')?.toString() || '',
      headlineSubtitle5: formData.get('headlineSubtitle5')?.toString() || '',
      buttonText: formData.get('buttonText')?.toString() || '',
      buttonUrl: formData.get('buttonUrl')?.toString() || '',
      backgroundImage: formData.get('backgroundImage')?.toString() || '',
      videoUrl: formData.get('videoUrl')?.toString() || '',
      videoCover: formData.get('videoCover')?.toString() || '',
      videoUrl2: formData.get('videoUrl2')?.toString() || '',
      videoCover2: formData.get('videoCover2')?.toString() || '',
      videoUrl3: formData.get('videoUrl3')?.toString() || '',
      videoUrl4: formData.get('videoUrl4')?.toString() || '',
      videoUrl5: formData.get('videoUrl5')?.toString() || '',
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    const id = data.id || `hero-${data.locale}`
    let headlineSlides: Array<{ title: string; subtitle: string; titleSize?: string }> = []

    if (data.headlineSlidesJson) {
      try {
        const raw = JSON.parse(data.headlineSlidesJson)
        if (Array.isArray(raw)) {
          headlineSlides = raw
            .map((slide) => {
              if (!slide || typeof slide !== 'object') return null
              const record = slide as Record<string, unknown>
              return {
                title: typeof record.title === 'string' ? record.title.trim() : '',
                subtitle: typeof record.subtitle === 'string' ? record.subtitle.trim() : '',
                titleSize: typeof record.titleSize === 'string' ? record.titleSize : 'medium',
              }
            })
            .filter((slide): slide is { title: string; subtitle: string; titleSize: string } =>
              Boolean(slide && (slide.title || slide.subtitle)),
            )
        }
      } catch {
        return { status: 'error', message: 'Slogan slider verisi çözümlenemedi' }
      }
    } else {
      headlineSlides = [
        { title: data.headlineTitle1, subtitle: data.headlineSubtitle1 },
        { title: data.headlineTitle2, subtitle: data.headlineSubtitle2 },
        { title: data.headlineTitle3, subtitle: data.headlineSubtitle3 },
        { title: data.headlineTitle4, subtitle: data.headlineSubtitle4 },
        { title: data.headlineTitle5, subtitle: data.headlineSubtitle5 },
      ]
        .map((slide) => ({
          title: slide.title?.trim() || '',
          subtitle: slide.subtitle?.trim() || '',
        }))
        .filter((slide) => slide.title || slide.subtitle)
    }

    await prisma.hero.upsert({
      where: { id },
      update: {
        locale: data.locale,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        headlineSlides: headlineSlides.length > 0 ? headlineSlides : Prisma.DbNull,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        backgroundImage: data.backgroundImage,
        videoUrl: data.videoUrl,
        videoCover: data.videoCover,
        videoUrl2: data.videoUrl2,
        videoCover2: data.videoCover2,
        videoUrl3: data.videoUrl3,
        videoUrl4: data.videoUrl4,
        videoUrl5: data.videoUrl5,
      },
      create: {
        id,
        locale: data.locale,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        headlineSlides: headlineSlides.length > 0 ? headlineSlides : Prisma.DbNull,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        backgroundImage: data.backgroundImage,
        videoUrl: data.videoUrl,
        videoCover: data.videoCover,
        videoUrl2: data.videoUrl2,
        videoCover2: data.videoCover2,
        videoUrl3: data.videoUrl3,
        videoUrl4: data.videoUrl4,
        videoUrl5: data.videoUrl5,
      },
    })

    revalidate(data.locale)
    return { status: 'success', message: 'Hero içeriği kaydedildi' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}
