'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidateHome } from '@/lib/content-store'

export type HeroActionState = { status: 'idle' | 'error'; message?: string }

const heroSchema = z.object({
  id: z.string().optional(),
  locale: z.string().default('tr'),
  title: z.string().min(1, 'Başlık zorunludur'),
  subtitle: z.string().min(1, 'Alt başlık zorunludur'),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().optional(),
  backgroundImage: z.string().optional(),
  videoUrl: z.string().optional(),
  videoCover: z.string().optional(),
  videoUrl2: z.string().optional(),
  videoCover2: z.string().optional(),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Yetkisiz işlem. Lütfen giriş yapın.')
  }
}

function revalidate() {
  revalidateHome(revalidatePath)
  revalidatePath('/admin/hero')
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
      buttonText: formData.get('buttonText')?.toString() || '',
      buttonUrl: formData.get('buttonUrl')?.toString() || '',
      backgroundImage: formData.get('backgroundImage')?.toString() || '',
      videoUrl: formData.get('videoUrl')?.toString() || '',
      videoCover: formData.get('videoCover')?.toString() || '',
      videoUrl2: formData.get('videoUrl2')?.toString() || '',
      videoCover2: formData.get('videoCover2')?.toString() || '',
    })

    if (!parsed.success) {
      return { status: 'error', message: parsed.error.errors[0]?.message ?? 'Form hatası' }
    }

    const data = parsed.data
    const id = data.id || `hero-${data.locale}`

    await prisma.hero.upsert({
      where: { id },
      update: {
        locale: data.locale,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        backgroundImage: data.backgroundImage,
        videoUrl: data.videoUrl,
        videoCover: data.videoCover,
        videoUrl2: data.videoUrl2,
        videoCover2: data.videoCover2,
      },
      create: {
        id,
        locale: data.locale,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        buttonText: data.buttonText,
        buttonUrl: data.buttonUrl,
        backgroundImage: data.backgroundImage,
        videoUrl: data.videoUrl,
        videoCover: data.videoCover,
        videoUrl2: data.videoUrl2,
        videoCover2: data.videoCover2,
      },
    })

    revalidate()
    return { status: 'idle' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu'
    return { status: 'error', message }
  }
}
