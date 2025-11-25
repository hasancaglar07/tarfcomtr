import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen,
  CalendarRange,
  Video,
  Mic2,
  Briefcase,
  FileText,
  Layers,
  Image as ImageIcon,
  Settings,
} from 'lucide-react'

import { authOptions } from '@/lib/auth'

const quickLinks = [
  { href: '/admin/posts/blog', label: 'Blog / Yazılar', icon: BookOpen },
  { href: '/admin/posts/event', label: 'Etkinlikler', icon: CalendarRange },
  { href: '/admin/posts/video', label: 'Video kütüphanesi', icon: Video },
  { href: '/admin/posts/podcast', label: 'Podcastler', icon: Mic2 },
  { href: '/admin/posts/service', label: 'Hizmet / Eğitim', icon: Briefcase },
  { href: '/admin/pages', label: 'Statik sayfalar', icon: FileText },
  { href: '/admin/categories', label: 'Kategoriler', icon: Layers },
  { href: '/admin/faq', label: 'SSS (FAQ)', icon: Layers },
  { href: '/admin/hero', label: 'Hero içerikleri', icon: Video },
  { href: '/admin/media', label: 'Medya kütüphanesi', icon: ImageIcon },
  { href: '/admin/settings', label: 'Site ayarları', icon: Settings },
  { href: '/admin/applications', label: 'Başvurular', icon: FileText },
]

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl ring-1 ring-orange-500/10">
          <div className="relative isolate px-6 py-10 sm:px-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.08),transparent_35%)]" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-orange-300">Yönetim</p>
                <h1 className="text-3xl font-semibold text-slate-50">İçerik kontrol merkezi</h1>
                <p className="text-sm text-slate-300">
                  Tüm içerik tiplerini tek yerden yönetin. Taslak/yayın durumlarını güncelleyin,
                  medya yükleyin, SEO alanlarını doldurun.
                </p>
              </div>
              <div className="space-y-2 rounded-2xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-50 shadow-lg">
                <p className="text-xs uppercase tracking-[0.25em] text-orange-200">Kullanıcı</p>
                <p className="text-lg font-semibold">{session.user?.email ?? 'Admin'}</p>
                <p className="text-xs text-orange-100/80">
                  Oturum açık. Ayarlar için sağdaki kısayollardan ilerleyin.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Hızlı kısayollar</p>
              <p className="text-lg font-semibold text-slate-50">Tüm modüller tek ekranda</p>
            </div>
            <Link
              href="/admin/pages/new"
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
            >
              Yeni sayfa oluştur
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-orange-400 hover:bg-slate-900"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-orange-300 transition group-hover:border-orange-400 group-hover:text-orange-200">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Durum</p>
            <p className="mt-2 text-xl font-semibold text-slate-50">Oturum açık</p>
            <p className="mt-1 text-xs text-slate-500">
              Giriş yapıldı, içerik ve medya güncellemeleri yapabilirsiniz.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Hatırlatmalar</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• SEO alanlarını doldurun (başlık/açıklama/OG görsel)</li>
              <li>• Etkinlik/konferans galerilerini ekleyin</li>
              <li>• Taslakları yayınladıktan sonra önizlemeyi kontrol edin</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Medya</p>
            <p className="mt-2 text-sm text-slate-300">
              Kapak, galeri ve OG görsellerini kütüphaneden seçin. Alt metin eklemeyi unutmayın.
            </p>
            <Link
              href="/admin/media"
              className="mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-orange-400 hover:text-orange-200"
            >
              Medyaya git
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
