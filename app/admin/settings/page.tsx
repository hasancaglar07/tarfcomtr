import { SettingsForm } from '@/components/admin/settings-form'
import { upsertSettingsAction } from '@/app/admin/settings/actions'
import { prisma } from '@/lib/prisma'

export default async function SettingsPage() {
  const settings = await prisma.setting.findUnique({ where: { locale: 'tr' } })

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Site ayarları</h1>
            <p className="text-sm text-slate-400">
              Başlık, açıklama ve iletişim bilgilerini buradan güncelleyin.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <SettingsForm
            action={upsertSettingsAction}
            defaultValues={{
              locale: settings?.locale ?? 'tr',
              siteName: settings?.siteName ?? '',
              siteDescription: settings?.siteDescription ?? '',
              contactEmail: settings?.contactEmail ?? '',
              contactPhone: settings?.contactPhone ?? '',
              contactAddress: settings?.contactAddress ?? '',
              socialTwitter:
                settings?.social && typeof settings.social === 'object'
                  ? (settings.social as Record<string, string>).twitter ||
                    (settings.social as Record<string, string>).x ||
                    ''
                  : '',
              socialYoutube:
                settings?.social && typeof settings.social === 'object'
                  ? (settings.social as Record<string, string>).youtube || ''
                  : '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
