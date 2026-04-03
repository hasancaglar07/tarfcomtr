import Link from 'next/link'
import { format } from 'date-fns'
import { ApplicationStatus, ChairAssistantChair } from '@prisma/client'

import { updateChairAssistantApplicationAction } from '@/app/admin/ozel-basvurular/actions'
import { Badge } from '@/components/ui/badge'
import {
  chairAssistantChairs,
  chairAssistantStatusColors,
  chairAssistantStatusLabels,
  chairAssistantStatusOptions,
  formatChairAssistantChair,
} from '@/lib/chair-assistant'
import { prisma } from '@/lib/prisma'

const chairValues = chairAssistantChairs.map((item) => item.value)

export default async function SpecialApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const search = await searchParams
  const statusFilter =
    typeof search.status === 'string' && chairAssistantStatusOptions.includes(search.status as ApplicationStatus)
      ? (search.status as ApplicationStatus)
      : undefined
  const chairFilter =
    typeof search.chair === 'string' && chairValues.includes(search.chair as ChairAssistantChair)
      ? (search.chair as ChairAssistantChair)
      : undefined
  const q = typeof search.q === 'string' && search.q.trim().length > 0 ? search.q.trim() : undefined
  const page = Number(search.page) > 0 ? Number(search.page) : 1
  const take = 30
  const skip = (page - 1) * take

  const where = {
    ...(statusFilter ? { status: statusFilter } : {}),
    ...(chairFilter ? { chair: chairFilter } : {}),
    ...(q
      ? {
          OR: [
            { fullName: { contains: q, mode: 'insensitive' as const } },
            { email: { contains: q, mode: 'insensitive' as const } },
            { city: { contains: q, mode: 'insensitive' as const } },
            { adminNote: { contains: q, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  }

  const [applications, count] = await Promise.all([
    prisma.chairAssistantApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take,
      include: {
        _count: {
          select: {
            documents: true,
          },
        },
      },
    }),
    prisma.chairAssistantApplication.count({ where }),
  ])

  const totalPages = Math.max(1, Math.ceil(count / take))
  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Özel Başvurular</h1>
            <p className="text-sm text-slate-400">
              Kürsü asistanı başvuruları, yüklenen evraklar ve PDF çıktıları burada yönetilir.
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
          <form className="grid items-end gap-3 md:grid-cols-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Arama</label>
              <input
                name="q"
                defaultValue={q || ''}
                placeholder="isim, e-posta, şehir"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Kürsü</label>
              <select
                name="chair"
                defaultValue={chairFilter || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                {chairAssistantChairs.map((chair) => (
                  <option key={chair.value} value={chair.value}>
                    {chair.shortLabel}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Durum</label>
              <select
                name="status"
                defaultValue={statusFilter || ''}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              >
                <option value="">(Tümü)</option>
                {chairAssistantStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {chairAssistantStatusLabels[status]}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
              >
                Filtrele
              </button>
              <Link
                href="/admin/ozel-basvurular"
                className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
              >
                Temizle
              </Link>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800">
              <thead className="bg-slate-900/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Tarih
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Aday
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Kürsü / Şehir
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Evrak
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Durum / Not
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-slate-800/40">
                    <td className="px-4 py-3 align-top text-sm text-slate-200">
                      <div className="space-y-1">
                        <div>{format(application.createdAt, 'dd.MM.yyyy HH:mm')}</div>
                        <Badge
                          variant="outline"
                          className={`text-[11px] ${chairAssistantStatusColors[application.status]}`}
                        >
                          {chairAssistantStatusLabels[application.status]}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-100">
                      <div className="font-semibold">{application.fullName}</div>
                      <div className="text-xs text-slate-400">{application.email}</div>
                      <div className="text-xs text-slate-400">{application.phone}</div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">
                      <div className="font-medium">{formatChairAssistantChair(application.chair)}</div>
                      <div className="text-xs text-slate-400">{application.city}</div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">
                      <div>{application._count.documents} / 5 belge</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Link
                          href={`/admin/ozel-basvurular/${application.id}`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
                        >
                          Detayı aç
                        </Link>
                        <a
                          href={`/api/admin/chair-assistant-applications/${application.id}/pdf`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
                        >
                          PDF indir
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-top text-sm text-slate-200">
                      <form action={updateChairAssistantApplicationAction} className="space-y-2">
                        <input type="hidden" name="id" value={application.id} />
                        <input type="hidden" name="redirectTo" value="/admin/ozel-basvurular" />
                        <select
                          name="status"
                          defaultValue={application.status}
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                        >
                          {chairAssistantStatusOptions.map((status) => (
                            <option key={status} value={status}>
                              {chairAssistantStatusLabels[status]}
                            </option>
                          ))}
                        </select>
                        <textarea
                          name="adminNote"
                          defaultValue={application.adminNote || ''}
                          placeholder="Admin notu"
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
                {applications.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-sm text-slate-400" colSpan={5}>
                      Henüz özel başvuru yok.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-400">
          <div>
            Sayfa {page} / {totalPages} · Toplam {count} kayıt
          </div>
          <div className="flex gap-2">
            {hasPrev ? (
              <Link
                href={`/admin/ozel-basvurular?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(search).filter(([key]) => !['page', 'toast', 'toastType'].includes(key)),
                  ),
                  page: String(page - 1),
                }).toString()}`}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Önceki
              </Link>
            ) : null}
            {hasNext ? (
              <Link
                href={`/admin/ozel-basvurular?${new URLSearchParams({
                  ...Object.fromEntries(
                    Object.entries(search).filter(([key]) => !['page', 'toast', 'toastType'].includes(key)),
                  ),
                  page: String(page + 1),
                }).toString()}`}
                className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Sonraki
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
