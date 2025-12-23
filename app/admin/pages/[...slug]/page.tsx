import Link from 'next/link'
import { notFound } from 'next/navigation'

import { deletePageAction, updatePageAction } from '@/app/admin/actions'
import { BlobUpload } from '@/components/admin/blob-upload'
import { ConfirmAction } from '@/components/admin/confirm-action'
import { prisma } from '@/lib/prisma'
import { ContentPageForm } from '@/components/admin/content-page-form'
import type { ContentPageDefinition } from '@/content/content-pages'

function formatDate(value: Date | null) {
  if (!value) return 'Taslak'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

export default async function EditPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { slug: slugParts } = await params
  await searchParams
  const slug = Array.isArray(slugParts) ? slugParts.join('/') : slugParts
  const page = await prisma.contentPage.findUnique({ where: { slug } })

  if (!page) {
    notFound()
  }

  const fallbackContent: ContentPageDefinition = {
    slug: page.slug,
    category: 'kurumsal',
    hero: {
      eyebrow: '',
      title: page.title || page.slug,
      subtitle: '',
      description: '',
      actions: [],
      stats: [],
    },
    sections: [],
    cta: {
      title: '',
      description: '',
      primaryAction: { label: '', href: '' },
    },
    seo: {
      title: page.title || page.slug,
      description: '',
    },
  }

  const contentData =
    page.data && typeof page.data === 'object'
      ? (page.data as unknown as ContentPageDefinition)
      : fallbackContent

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Sayfa düzenle
            </p>
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <p className="text-sm text-slate-400">
              Son güncelleme: {formatDate(page.updatedAt)} · Yayın durumu:{' '}
              {page.publishedAt ? 'Yayında' : 'Taslak'}
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Panele dön
            </Link>
            <Link
              href="/admin/pages"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Listeye dön
            </Link>
          </div>
        </div>

        <BlobUpload />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <ContentPageForm
            mode="edit"
            action={updatePageAction}
            defaultValues={contentData}
          />

          <div className="mt-6 flex justify-end">
            <ConfirmAction
              action={deletePageAction}
              fields={{ slug: page.slug }}
              title="Sayfayı sil?"
              description="Sayfa kalıcı olarak silinir. Bu işlem geri alınamaz."
              triggerLabel="Sayfayı sil"
              triggerClassName="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/10"
              confirmLabel="Evet, sil"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
