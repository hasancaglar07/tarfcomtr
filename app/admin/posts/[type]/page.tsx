import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Prisma, PostStatus, PostType } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { getEventsTodayStart } from '@/lib/events'
import { deletePostAction } from '@/app/admin/posts/actions'
import { ConfirmAction } from '@/components/admin/confirm-action'

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

function formatEventDate(value: Date | null) {
  if (!value) return 'Tarih yok'
  return new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium' }).format(value)
}

function buildSearchParams(
  search: Record<string, string | string[] | undefined>,
  overrides: Record<string, string | undefined>,
) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(search)) {
    if (value == null) continue
    if (key === 'toast' || key === 'toastType') continue
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.set(key, value)
    }
  }
  for (const [key, value] of Object.entries(overrides)) {
    if (value == null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
  }
  return params.toString()
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
  const take = 15

  const baseWhere: Prisma.PostWhereInput = {
    type,
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(categoryId ? { categoryId } : {}),
    ...(locale ? { locale } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { excerpt: { contains: q, mode: 'insensitive' } },
            { content: { contains: q, mode: 'insensitive' } },
          ],
        }
      : {}),
  }

  const categories = await prisma.category.findMany({ where: { type }, orderBy: { name: 'asc' } })

  if (type === 'event') {
    const todayStart = getEventsTodayStart()
    const upcomingSort =
      typeof search.upSort === 'string' && (search.upSort === 'desc' || search.upSort === 'asc')
        ? (search.upSort as 'asc' | 'desc')
        : 'asc'
    const pastSort =
      typeof search.pastSort === 'string' && (search.pastSort === 'desc' || search.pastSort === 'asc')
        ? (search.pastSort as 'asc' | 'desc')
        : 'desc'
    const upcomingPage = Number(search.upPage) > 0 ? Number(search.upPage) : 1
    const pastPage = Number(search.pastPage) > 0 ? Number(search.pastPage) : 1
    const noDatePage = Number(search.noDatePage) > 0 ? Number(search.noDatePage) : 1

    const upcomingSkip = (upcomingPage - 1) * take
    const pastSkip = (pastPage - 1) * take
    const noDateSkip = (noDatePage - 1) * take

    const [upcomingCount, pastCount, noDateCount, upcomingPosts, pastPosts, noDatePosts] =
      await Promise.all([
        prisma.post.count({
          where: {
            ...baseWhere,
            eventDate: { gte: todayStart },
          },
        }),
        prisma.post.count({
          where: {
            ...baseWhere,
            eventDate: { lt: todayStart },
          },
        }),
        prisma.post.count({
          where: {
            ...baseWhere,
            eventDate: null,
          },
        }),
        prisma.post.findMany({
          where: { ...baseWhere, eventDate: { gte: todayStart } },
          orderBy: [
            { eventDate: upcomingSort },
            { eventTime: 'asc' },
            { updatedAt: 'desc' },
          ],
          include: { category: true },
          skip: upcomingSkip,
          take,
        }),
        prisma.post.findMany({
          where: { ...baseWhere, eventDate: { lt: todayStart } },
          orderBy: [
            { eventDate: pastSort },
            { eventTime: pastSort === 'asc' ? 'asc' : 'desc' },
            { updatedAt: 'desc' },
          ],
          include: { category: true },
          skip: pastSkip,
          take,
        }),
        prisma.post.findMany({
          where: { ...baseWhere, eventDate: null },
          orderBy: [{ updatedAt: 'desc' }],
          include: { category: true },
          skip: noDateSkip,
          take,
        }),
      ])

    const upcomingTotalPages = Math.max(1, Math.ceil(upcomingCount / take))
    const pastTotalPages = Math.max(1, Math.ceil(pastCount / take))
    const noDateTotalPages = Math.max(1, Math.ceil(noDateCount / take))

    const EventTable = ({
      rows,
      emptyLabel,
    }: {
      rows: Array<{
        id: string
        title: string
        slug: string
        eventDate: Date | null
        eventTime: string | null
        locale: string
        status: PostStatus
        publishedAt: Date | null
        category?: { name: string } | null
      }>
      emptyLabel: string
    }) => (
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
        <table className="min-w-full divide-y divide-slate-800">
          <thead className="bg-slate-900/80">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                Başlık
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                Tarih / Saat
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
            {rows.map((post) => (
              <tr key={post.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 text-sm font-semibold text-slate-100">{post.title}</td>
                <td className="px-4 py-3 text-sm text-slate-200">
                  <div className="flex flex-col">
                    <span>{formatEventDate(post.eventDate)}</span>
                    <span className="text-xs text-slate-400">{post.eventTime || '-'}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {post.category?.name || '-'}
                </td>
                <td className="px-4 py-3 text-sm text-slate-200">{post.locale}</td>
                <td className="px-4 py-3 text-sm text-slate-200">
                  {post.status === 'published'
                    ? `Yayında · ${formatDate(post.publishedAt)}`
                    : 'Taslak'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/posts/${type}/${post.slug}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Düzenle
                    </Link>
                    <ConfirmAction
                      action={deletePostAction}
                      fields={{ id: post.id, type, slug: post.slug }}
                      title={`${typeLabels[type]} sil?`}
                      description="İçerik kalıcı olarak silinir. Bu işlem geri alınamaz."
                      triggerLabel="Sil"
                      triggerClassName="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/10"
                      confirmLabel="Evet, sil"
                    />
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-sm text-slate-400" colSpan={6}>
                  {emptyLabel}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )

    return (
      <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
                Yönetim
              </p>
              <h1 className="text-3xl font-semibold">{typeLabels[type]} içerikleri</h1>
              <p className="text-sm text-slate-400">
                Etkinlikler otomatik olarak planlanan / gerçekleşen diye ayrılır (etkinlik tarihine göre).
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
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Planlanan sıralama
                </label>
                <select
                  name="upSort"
                  defaultValue={upcomingSort}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                >
                  <option value="asc">Yakın → Uzak</option>
                  <option value="desc">Uzak → Yakın</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Gerçekleşen sıralama
                </label>
                <select
                  name="pastSort"
                  defaultValue={pastSort}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                >
                  <option value="desc">Yeni → Eski</option>
                  <option value="asc">Eski → Yeni</option>
                </select>
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

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-lg font-semibold">
                Planlanan Etkinlikler <span className="text-slate-400">({upcomingCount})</span>
              </h2>
              <div className="text-sm text-slate-400">
                Sayfa {upcomingPage} / {upcomingTotalPages}
              </div>
            </div>
            <EventTable rows={upcomingPosts} emptyLabel="Planlanmış etkinlik bulunmuyor." />
            {upcomingTotalPages > 1 ? (
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div />
                <div className="flex gap-2">
                  {upcomingPage > 1 ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        upPage: String(upcomingPage - 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Önceki
                    </Link>
                  ) : null}
                  {upcomingPage < upcomingTotalPages ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        upPage: String(upcomingPage + 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Sonraki
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-lg font-semibold">
                Gerçekleşen Etkinlikler <span className="text-slate-400">({pastCount})</span>
              </h2>
              <div className="text-sm text-slate-400">
                Sayfa {pastPage} / {pastTotalPages}
              </div>
            </div>
            <EventTable rows={pastPosts} emptyLabel="Gerçekleşmiş etkinlik bulunmuyor." />
            {pastTotalPages > 1 ? (
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div />
                <div className="flex gap-2">
                  {pastPage > 1 ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        pastPage: String(pastPage - 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Önceki
                    </Link>
                  ) : null}
                  {pastPage < pastTotalPages ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        pastPage: String(pastPage + 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Sonraki
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h2 className="text-lg font-semibold">
                Tarihi Olmayanlar <span className="text-slate-400">({noDateCount})</span>
              </h2>
              <div className="text-sm text-slate-400">
                Sayfa {noDatePage} / {noDateTotalPages}
              </div>
            </div>
            <EventTable rows={noDatePosts} emptyLabel="Tarihi olmayan etkinlik bulunmuyor." />
            {noDateTotalPages > 1 ? (
              <div className="flex items-center justify-between text-sm text-slate-400">
                <div />
                <div className="flex gap-2">
                  {noDatePage > 1 ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        noDatePage: String(noDatePage - 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Önceki
                    </Link>
                  ) : null}
                  {noDatePage < noDateTotalPages ? (
                    <Link
                      href={`/admin/posts/${type}?${buildSearchParams(search, {
                        noDatePage: String(noDatePage + 1),
                      })}`}
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                    >
                      Sonraki
                    </Link>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  const page = Number(search.page) > 0 ? Number(search.page) : 1
  const skip = (page - 1) * take

  const [count, posts] = await Promise.all([
    prisma.post.count({ where: baseWhere }),
    prisma.post.findMany({
      where: baseWhere,
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
                      <ConfirmAction
                        action={deletePostAction}
                        fields={{ id: post.id, type, slug: post.slug }}
                        title={`${typeLabels[type]} sil?`}
                        description="İçerik kalıcı olarak silinir. Bu işlem geri alınamaz."
                        triggerLabel="Sil"
                        triggerClassName="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/10"
                        confirmLabel="Evet, sil"
                      />
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
