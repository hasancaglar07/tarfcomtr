import Link from 'next/link'
import { PostType } from '@prisma/client'

import { upsertCategoryAction, deleteCategoryAction } from '@/app/admin/categories/actions'
import { CategoryForm } from '@/components/admin/category-form'
import { prisma } from '@/lib/prisma'

const typeLabels: Record<PostType, string> = {
  blog: 'Blog',
  event: 'Etkinlik',
  video: 'Video',
  podcast: 'Podcast',
  service: 'Hizmet/Eğitim',
}

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
  })

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Kategoriler</h1>
            <p className="text-sm text-slate-400">
              Blog, etkinlik, video, podcast ve hizmetler için kategori ekleyin/düzenleyin.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Panele dön
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Yeni kategori</h2>
          <CategoryForm action={upsertCategoryAction} />
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-900/80">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Ad
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Tür
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Locale
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/40">
                  <td className="px-4 py-3 text-sm font-semibold text-slate-100">{cat.name}</td>
                  <td className="px-4 py-3 text-sm text-orange-200">{cat.slug}</td>
                  <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                    {typeLabels[cat.type]}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-200">{cat.locale}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <details className="group">
                        <summary className="cursor-pointer rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500">
                          Düzenle
                        </summary>
                        <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                          <CategoryForm
                            action={upsertCategoryAction}
                            defaultValues={{
                              id: cat.id,
                              name: cat.name,
                              slug: cat.slug,
                              type: cat.type,
                              locale: cat.locale ?? 'tr',
                            }}
                          />
                        </div>
                      </details>
                      <form action={deleteCategoryAction}>
                        <input type="hidden" name="id" value={cat.id} />
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
              {categories.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-sm text-slate-400" colSpan={5}>
                    Henüz kategori yok.
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
