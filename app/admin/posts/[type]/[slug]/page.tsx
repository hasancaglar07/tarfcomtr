import { notFound } from 'next/navigation'
import { PostType } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { PostForm } from '@/components/admin/post-form'
import { updatePostAction } from '@/app/admin/posts/actions'

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

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}) {
  const { type: rawType, slug } = await params
  const type = typeFromParam(rawType)
  if (!type) notFound()

  const post = await prisma.post.findFirst({
    where: { type, slug },
  })
  if (!post) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    where: { type },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              {typeLabels[type]} düzenle
            </p>
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <p className="text-sm text-slate-400">
              Slug: {post.slug} · Durum: {post.status === 'published' ? 'Yayında' : 'Taslak'}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <PostForm
            mode="edit"
            action={updatePostAction}
            type={type}
            categories={categories}
            defaultValues={{
              ...post,
              gallery:
                post.meta &&
                typeof post.meta === 'object' &&
                Array.isArray((post.meta as { gallery?: string[] }).gallery)
                  ? (post.meta as { gallery?: string[] }).gallery
                  : [],
            }}
          />
        </div>
      </div>
    </div>
  )
}
