import Link from 'next/link'

import { HeroForm } from '@/components/admin/hero-form'
import { upsertHeroAction } from '@/app/admin/hero/actions'
import { prisma } from '@/lib/prisma'

export default async function HeroPage() {
  const heroes = await prisma.hero.findMany({
    orderBy: { locale: 'asc' },
  })
  const current = heroes.find((h) => h.locale === 'tr') ?? heroes[0]

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Hero / Landing içerikleri</h1>
            <p className="text-sm text-slate-400">
              Anasayfa hero başlıkları, alt metin, buton ve görselleri güncelleyin.
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
          <HeroForm
            action={upsertHeroAction}
            defaultValues={
              current
                ? {
                    id: current.id,
                    locale: current.locale,
                    title: current.title,
                    subtitle: current.subtitle,
                    description: current.description ?? '',
                    buttonText: current.buttonText ?? '',
                    buttonUrl: current.buttonUrl ?? '',
                    backgroundImage: current.backgroundImage ?? '',
                    videoUrl: current.videoUrl ?? '',
                    videoCover: current.videoCover ?? '',
                    videoUrl2: current.videoUrl2 ?? '',
                    videoCover2: current.videoCover2 ?? '',
                    videoUrl3: current.videoUrl3 ?? '',
                    videoUrl4: current.videoUrl4 ?? '',
                    videoUrl5: current.videoUrl5 ?? '',
                  }
                : { locale: 'tr' }
            }
          />
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow">
          <h2 className="text-lg font-semibold mb-3">Kayıtlı hero setleri</h2>
          <div className="space-y-3">
            {heroes.map((h) => (
              <div key={h.id} className="rounded-lg border border-slate-800 bg-slate-900/80 p-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{h.locale}</p>
                <p className="text-sm font-semibold text-slate-100">{h.title}</p>
                <p className="text-xs text-slate-500">{h.subtitle}</p>
              </div>
            ))}
            {heroes.length === 0 && <p className="text-sm text-slate-400">Henüz kayıt yok.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
