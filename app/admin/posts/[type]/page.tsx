import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostStatus, PostType } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { deletePostAction } from '@/app/admin/posts/actions'
import { ActionToast } from '@/components/admin/action-toast'

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

function formatDate(value: Date | null) {
  if (!value) return 'Taslak'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

export default async function PostListPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { type: rawType } = await params
  const search = await searchParams
  const type = typeFromParam(rawType)
  if (!type) {
    notFound()
  }
  const initialToast =
    typeof search.toast === 'string'
      ? {
          kind: (search.toastType === 'error' ? 'error' : 'success') as 'success' | 'error',
          message: search.toast,
        }
      : undefined

  const statusFilter = (typeof search.status === 'string' ? search.status : undefined) as
    | PostStatus
    | undefined
  const categoryId =
    typeof search.categoryId === 'string' && search.categoryId.length > 0
      ? search.categoryId
      : undefined
  const locale =
    typeof search.locale === 'string' && search.locale.length > 0 ? search.locale : undefined
  const q = typeof search.q === 'string' && search.q.length > 0 ? search.q : undefined
  const page = Number(search.page) > 0 ? Number(search.page) : 1
  const take = 15
  const skip = (page - 1) * take

  const [categories, count, posts] = await Promise.all([
    prisma.category.findMany({ where: { type }, orderBy: { name: 'asc' } }),
    prisma.post.count({
      where: {
        type,
        status: statusFilter,
        categoryId,
        locale,
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { excerpt: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
    }),
    prisma.post.findMany({
      where: {
        type,
        status: statusFilter,
        categoryId,
        locale,
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { excerpt: { contains: q, mode: 'insensitive' } },
                { content: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: { updatedAt: 'desc' },
      include: { category: true },
      skip,
      take,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(count / take))
  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <ActionToast initial={initialToast} />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">
              {typeLabels[type]} içerikleri
            </h1>
            <p className="text-sm text-slate-400">
              Etkinlikler, konferanslar, videolar, podcastler ve yazılar burada yönetilir.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Panele dön
            </Link>
            <Link
              href={`/admin/posts/${type}/new`}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              Yeni {typeLabels[type]}
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
          <form className="grid gap-3 md:grid-cols-4 items-end">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Arama</label>
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="başlık / içerik"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Durum</label>
              <select
                name="status"
                defaultValue={statusFilter || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Kategori</label>
              <select
                name="categoryId"
                defaultValue={categoryId || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Locale</label>
              <input
                name="locale"
                defaultValue={locale || ''}
                placeholder="tr/en/ar"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              />
            </div>
            <div className="md:col-span-4 flex gap-2">
              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
              >
                Filtrele
              </button>
              <Link
                href={`/admin/posts/${type}`}
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
              >
                Temizle
              </Link>
            </div>
          </form>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Başlık
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Locale
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Durum
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-100">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-orange-200">{post.slug}</td>
                  <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {post.category?.name || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">{post.locale}</td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {post.status === 'published' ? `Yayında · ${formatDate(post.publishedAt)}` : 'Taslak'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/posts/${type}/${post.slug}`}
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                      >
                        Düzenle
                      </Link>
                      <form action={deletePostAction}>
                        <input type="hidden" name="id" value={post.id} />
                        <input type="hidden" name="type" value={type} />
                        <input type="hidden" name="slug" value={post.slug} />
                        <button
                          type="submit"
                          className="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/10"
                        >
                          Sil
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-400" colSpan={5}>
                    Henüz içerik yok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <div>
            Sayfa {page} / {totalPages} · Toplam {count} kayıt
          </div>
          <div className="flex gap-2">
            {hasPrev && (
              <Link
                href={`/admin/posts/${type}?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(search).filter(([k]) => !['page', 'toast', 'toastType'].includes(k)),
                  ),
                  page: String(page - 1),
                }).toString()}`}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Önceki
              </Link>
            )}
            {hasNext && (
              <Link
                href={`/admin/posts/${type}?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(search).filter(([k]) => !['page', 'toast', 'toastType'].includes(k)),
                  ),
                  page: String(page + 1),
                }).toString()}`}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Sonraki
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
