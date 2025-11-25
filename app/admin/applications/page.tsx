import { ApplicationStatus } from '@prisma/client'
import { format } from 'date-fns'

import { prisma } from '@/lib/prisma'
import { updateApplicationAction } from '@/app/admin/applications/actions'

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

export default async function ApplicationsPage() {
  let applications = []
  let loadError: string | null = null
  try {
    applications = await prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
  } catch (error) {
    console.error('[applications] list error', error)
    loadError = 'Başvuru tablosu bulunamadı veya veri okunamadı. Migrasyonların çalıştığından emin olun.'
  }

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
                    <td className="px-4 py-3 text-sm text-slate-200">
                      {format(app.createdAt, 'dd.MM.yyyy HH:mm')}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-100">
                      <div className="font-semibold">{app.name}</div>
                      <div className="text-xs text-slate-400">{app.email}</div>
                      {app.phone && <div className="text-xs text-slate-400">{app.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-200">{app.subject || '-'}</td>
                    <td className="px-4 py-3 text-sm text-slate-200">
                      <div className="max-w-xs whitespace-pre-line text-slate-200">{app.message}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-200">
                      <div className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold ${statusColors[app.status]}`}>
                        {statusLabels[app.status]}
                      </div>
                      <form action={updateApplicationAction} className="mt-2 space-y-2">
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
                        <input
                          name="adminNote"
                          defaultValue={app.adminNote || ''}
                          placeholder="Geri dönüş notu"
                          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
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
      </div>
    </div>
  )
}
