import Link from 'next/link'
import { ContentCategory } from '@prisma/client'

import { categoryLabels } from '@/content/content-pages'
import { prisma } from '@/lib/prisma'
import { publishToggleAction } from '@/app/admin/actions'

function formatDate(value: Date | null) {
  if (!value) return 'Taslak'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

const categoryOrder = Object.keys(categoryLabels) as ContentCategory[]

export default async function AdminPagesList({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const search = await searchParams
  const category =
    typeof search.category === 'string' && search.category.length > 0
      ? (search.category as ContentCategory)
      : undefined
  const status =
    typeof search.status === 'string' && ['published', 'draft'].includes(search.status)
      ? (search.status as 'published' | 'draft')
      : undefined
  const q =
    typeof search.q === 'string' && search.q.trim().length > 0 ? search.q.trim() : undefined

  const baseWhere = {
    ...(status === 'published' ? { publishedAt: { not: null } } : {}),
    ...(status === 'draft' ? { publishedAt: null } : {}),
    ...(q
      ? {
          OR: [
            { slug: { contains: q, mode: 'insensitive' as const } },
            { title: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [pages, categoryStats] = await Promise.all([
    prisma.contentPage.findMany({
      where: { ...baseWhere, ...(category ? { category } : {}) },
      orderBy: { updatedAt: 'desc' },
    }),
    prisma.contentPage.groupBy({
      by: ['category'],
      _count: { _all: true },
      where: baseWhere,
    }),
  ])

  const categoryCounts = categoryStats.reduce<Record<ContentCategory, number>>((acc, item) => {
    acc[item.category as ContentCategory] = item._count._all
    return acc
  }, {} as Record<ContentCategory, number>)

  const totalMatching = categoryStats.reduce((sum, item) => sum + item._count._all, 0)

  const buildQuery = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams()
    const resolved: Record<string, string | undefined> = {
      q,
      status,
      category,
      ...overrides,
    }
    Object.entries(resolved).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    const query = params.toString()
    return query ? `?${query}` : ''
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">İçerik sayfaları</h1>
            <p className="text-sm text-slate-400">Slug bazlı içerikleri burada yönetin.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Panele dön
            </Link>
            <Link
              href="/admin/pages/new"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              Yeni sayfa
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl space-y-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-200">
                {pages.length} sonuç · Toplam {totalMatching} kayıt
              </p>
              <p className="text-xs text-slate-500">
                Aradığını hızla bulmak için arama, durum ve kategori filtrelerini birlikte kullan.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/admin/pages"
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500"
              >
                Filtreleri temizle
              </Link>
              <Link
                href={`/admin/pages${buildQuery({ category: undefined })}`}
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 md:hidden"
              >
                Tüm kategoriler
              </Link>
            </div>
          </div>

          <form className="grid gap-3 md:grid-cols-4 items-end">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Arama</label>
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="başlık veya slug"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Durum</label>
              <select
                name="status"
                defaultValue={status || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                <option value="published">Yayında</option>
                <option value="draft">Taslak</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Kategori
              </label>
              <select
                name="category"
                defaultValue={category || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                {categoryOrder.map((cat) => (
                  <option key={cat} value={cat}>
                    {categoryLabels[cat].label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1 flex gap-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
              >
                Filtrele
              </button>
            </div>
          </form>

          <div className="grid gap-3 md:grid-cols-3">
            {categoryOrder.map((cat) => {
              const active = cat === category
              const count = categoryCounts[cat] ?? 0
              return (
                <Link
                  key={cat}
                  href={`/admin/pages${buildQuery({ category: active ? undefined : cat })}`}
                  className={`rounded-xl border px-4 py-3 transition hover:border-orange-400/60 hover:bg-orange-500/5 ${
                    active
                      ? 'border-orange-500/80 bg-orange-500/10'
                      : 'border-slate-800 bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Kategori</p>
                      <p className="text-sm font-semibold text-slate-50">
                        {categoryLabels[cat].label}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        active
                          ? 'bg-orange-500 text-slate-950'
                          : 'bg-slate-800 text-slate-200'
                      }`}
                    >
                      {count} içerik
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {categoryLabels[cat].description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Başlık
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Kategori
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Yayın
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pages.map((page) => (
                <tr key={page.slug} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-sm font-semibold text-orange-200">
                    {page.slug}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-100">{page.title}</td>
                  <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-slate-50">
                        {categoryLabels[page.category].label}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-slate-500">
                        {page.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                          page.publishedAt
                            ? 'bg-green-500/15 text-green-200'
                            : 'bg-slate-800 text-slate-200'
                        }`}
                      >
                        {page.publishedAt ? 'Yayında' : 'Taslak'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {page.publishedAt ? formatDate(page.publishedAt) : 'Yayınlanmadı'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/pages/${page.slug}`}
                        className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                      >
                        Düzenle
                      </Link>
                      <form action={publishToggleAction}>
                        <input type="hidden" name="slug" value={page.slug} />
                        <input
                          type="hidden"
                          name="publish"
                          value={page.publishedAt ? 'false' : 'true'}
                        />
                        <button
                          type="submit"
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
                        >
                          {page.publishedAt ? 'Taslak yap' : 'Yayınla'}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-400" colSpan={5}>
                    Filtreleri değiştirerek sonuçları daraltmayı deneyin. Henüz içerik bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
