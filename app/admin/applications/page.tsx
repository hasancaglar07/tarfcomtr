import Link from 'next/link'
import { ApplicationStatus } from '@prisma/client'
import { format } from 'date-fns'

import { prisma } from '@/lib/prisma'
import { updateApplicationAction } from '@/app/admin/applications/actions'
import { Badge } from '@/components/ui/badge'

const statusLabels: Record<ApplicationStatus, string> = {
  new: 'Yeni',
  in_review: 'İncelemede',
  closed: 'Kapatıldı',
}

const statusColors: Record<ApplicationStatus, string> = {
  new: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  in_review: 'bg-amber-500/20 text-amber-200 border-amber-500/40',
  closed: 'bg-slate-500/20 text-slate-200 border-slate-500/40',
}
const statusOptions: ApplicationStatus[] = ['new', 'in_review', 'closed']

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const search = await searchParams
  const statusFilter =
    typeof search.status === 'string' && statusOptions.includes(search.status as ApplicationStatus)
      ? (search.status as ApplicationStatus)
      : undefined
  const subjectFilter =
    typeof search.subject === 'string' && search.subject.length > 0 ? search.subject : undefined
  const q = typeof search.q === 'string' && search.q.trim().length > 0 ? search.q.trim() : undefined
  const page = Number(search.page) > 0 ? Number(search.page) : 1
  const take = 30
  const skip = (page - 1) * take

  const where = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(subjectFilter ? { subject: { contains: subjectFilter, mode: 'insensitive' as const } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' as const } },
            { email: { contains: q, mode: 'insensitive' as const } },
            { subject: { contains: q, mode: 'insensitive' as const } },
            { message: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  let applications: Awaited<ReturnType<typeof prisma.application.findMany>> = []
  let count = 0
  let loadError: string | null = null
  try {
    ;[applications, count] = await Promise.all([
      prisma.application.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.application.count({ where }),
    ])
  } catch (error) {
    console.error('[applications] list error', error)
    loadError =
      'Başvuru tablosu okunamadı. Migrasyonların çalıştığından ve veritabanı bağlantısının sağlıklı olduğundan emin olun.'
  }

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
            <h1 className="text-3xl font-semibold">Başvurular</h1>
            <p className="text-sm text-slate-400">
              Ön yüz başvuruları burada listelenir; durum ve geri dönüş notu ekleyebilirsiniz.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Panele dön
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
          <form className="grid gap-3 md:grid-cols-4 items-end">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Arama</label>
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="isim, e-posta, mesaj"
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
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Başvuru türü</label>
              <input
                name="subject"
                defaultValue={subjectFilter || ''}
                placeholder="Etkinlik, Eğitim, vb."
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              />
            </div>
            <div className="md:col-span-1 flex gap-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
              >
                Filtrele
              </button>
              <Link
                href="/admin/applications"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
              >
                Temizle
              </Link>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl">
          {loadError ? (
            <div className="px-6 py-4 text-sm text-red-200">{loadError}</div>
          ) : null}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    İsim / E-posta
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Konu
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Mesaj
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Durum / Not
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 text-sm text-slate-200 align-top">
                      <div className="space-y-1">
                        <div>{format(app.createdAt, 'dd.MM.yyyy HH:mm')}</div>
                        <Badge
                          variant="outline"
                          className={`text-[11px] ${statusColors[app.status]}`}
                        >
                          {statusLabels[app.status]}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-100 align-top">
                      <div className="font-semibold">{app.name}</div>
                      <div className="text-xs text-slate-400">{app.email}</div>
                      {app.phone && <div className="text-xs text-slate-400">{app.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-200 align-top">
                      {app.subject ? (
                        <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-100">
                          {app.subject}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-200 align-top">
                      <details className="group">
                        <summary className="cursor-pointer text-xs text-slate-300 underline-offset-4 transition group-open:text-orange-200 group-hover:text-orange-200">
                          Mesajı göster
                        </summary>
                        <div className="mt-2 max-w-xs whitespace-pre-line rounded-lg border border-slate-800 bg-slate-900/60 p-3 text-xs text-slate-200">
                          {app.message}
                        </div>
                      </details>
                      {app.adminNote && (
                        <div className="mt-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
                          Not: {app.adminNote}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-200 align-top">
                      <form action={updateApplicationAction} className="space-y-2">
                        <input type="hidden" name="id" value={app.id} />
                        <select
                          name="status"
                          defaultValue={app.status}
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                        >
                          <option value="new">Yeni</option>
                          <option value="in_review">İncelemede</option>
                          <option value="closed">Kapatıldı</option>
                        </select>
                        <textarea
                          name="adminNote"
                          defaultValue={app.adminNote || ''}
                          placeholder="Geri dönüş notu"
                          className="min-h-[72px] w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                        />
                        <button
                          type="submit"
                          className="w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
                        >
                          Kaydet
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-sm text-slate-400" colSpan={5}>
                      Henüz başvuru yok.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <div>
            Sayfa {page} / {totalPages} · Toplam {count} kayıt
          </div>
          <div className="flex gap-2">
            {hasPrev && (
              <Link
                href={`/admin/applications?${new URLSearchParams({
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
                href={`/admin/applications?${new URLSearchParams({
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
