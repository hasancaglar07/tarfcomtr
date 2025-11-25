import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { publishToggleAction } from '@/app/admin/actions'

function formatDate(value: Date | null) {
  if (!value) return 'Taslak'
  return new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(value)
}

export default async function AdminPagesList() {
  const pages = await prisma.contentPage.findMany({
    orderBy: { updatedAt: 'desc' },
  })

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
                    {page.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">
                    {formatDate(page.publishedAt)}
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
