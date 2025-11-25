import { notFound } from 'next/navigation'
import { PostType } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/admin/post-form'
import { createPostAction } from '@/app/admin/posts/actions'

const typeLabels: Record<PostType, string> = {
  blog: 'Blog',
  event: 'Etkinlik',
  video: 'Video',
  podcast: 'Podcast',
  service: 'Hizmet/Eğitim',
}

function typeFromParam(param: string): PostType | null {
  if (['blog', 'event', 'video', 'podcast', 'service'].includes(param)) {
    return param as PostType
  }
  return null
}

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type: rawType } = await params
  const type = typeFromParam(rawType)
  if (!type) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    where: { type },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Yeni {typeLabels[type]}
          </p>
          <h1 className="text-3xl font-semibold">İçerik oluştur</h1>
          <p className="text-sm text-slate-400">
            Kısa açıklama, galeri, video ve konum bilgileri ekleyebilirsiniz.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <PostForm
            mode="create"
            action={createPostAction}
            type={type}
            categories={categories}
            defaultValues={{
              locale: 'tr',
              status: 'published',
            }}
          />
        </div>
      </div>
    </div>
  )
}
