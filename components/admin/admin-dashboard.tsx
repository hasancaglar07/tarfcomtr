'use client'

import Link from 'next/link'
import {
  AlertTriangle,
  BarChart,
  BookOpen,
  CalendarRange,
  CheckCircle,
  Image as ImageIcon,
  Mic2,
  Briefcase,
  FileText,
  Layers,
  Settings,
  Video,
  Moon,
  SunMedium,
} from 'lucide-react'
import { useAdminTheme } from '@/components/admin/admin-theme-provider'

const iconMap = {
  BookOpen,
  CalendarRange,
  Video,
  Mic2,
  Briefcase,
  FileText,
  Layers,
  ImageIcon,
  Settings,
} as const

type QuickLink = {
  href: string
  label: string
  icon: keyof typeof iconMap
}

type RecentPost = {
  id: string
  title: string
  slug: string
  type: string
  status: string
}

type RecentPage = {
  slug: string
  title: string
  category: string | null
}

type AppCounts = {
  new: number
  in_review: number
  closed: number
}

type AdminDashboardProps = {
  sessionEmail: string
  quickLinks: QuickLink[]
  recentPosts: RecentPost[]
  recentPages: RecentPage[]
  appCounts: AppCounts
  seoPostsMissing: number
  seoPagesMissing: number
}

const themes = {
  dark: {
    page: 'bg-slate-950 text-slate-100',
    heroCard:
      'border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl ring-1 ring-orange-500/10',
    overlay:
      'bg-[radial-gradient(circle_at_20%_20%,rgba(251,146,60,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.08),transparent_35%)]',
    label: 'text-slate-400',
    heading: 'text-slate-50',
    subtext: 'text-slate-300',
    muted: 'text-slate-500',
    card: 'border border-slate-800 bg-slate-900/70 shadow-2xl',
    pill: 'border border-slate-800 bg-slate-950/60',
    accent: 'text-orange-300',
    iconWrap: 'border border-slate-800 bg-slate-950 text-orange-300',
    primaryButton: 'bg-orange-500 text-slate-950 hover:bg-orange-400',
    ghostButton: 'border border-slate-700 bg-slate-800 text-slate-100 hover:border-orange-400 hover:text-orange-200',
    linkHover: 'hover:border-orange-400 hover:bg-slate-900 hover:text-orange-200',
    iconHover: 'group-hover:border-orange-400 group-hover:text-orange-200',
    toggleContainer: 'bg-slate-900/60 border border-slate-700',
    toggleIdle: 'text-slate-100',
  },
  light: {
    page: 'bg-gradient-to-br from-orange-50 via-white to-sky-50 text-slate-900',
    heroCard:
      'border border-orange-200 bg-gradient-to-br from-white via-orange-50 to-sky-50 shadow-xl ring-1 ring-orange-100',
    overlay:
      'bg-[radial-gradient(circle_at_20%_20%,rgba(247,162,91,0.20),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.16),transparent_35%)]',
    label: 'text-orange-700/70',
    heading: 'text-slate-900',
    subtext: 'text-slate-600',
    muted: 'text-slate-600',
    card: 'border border-slate-200 bg-white shadow-lg',
    pill: 'border border-orange-100 bg-orange-50',
    accent: 'text-orange-600',
    iconWrap: 'border border-orange-200 bg-orange-50 text-orange-600',
    primaryButton: 'bg-orange-500 text-white hover:bg-orange-400',
    ghostButton: 'border border-orange-200 bg-white text-slate-900 hover:border-orange-400 hover:text-orange-700',
    linkHover: 'hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700',
    iconHover: 'group-hover:border-orange-400 group-hover:text-orange-700',
    toggleContainer: 'bg-white/80 border border-orange-200',
    toggleIdle: 'text-slate-700',
  },
}

export function AdminDashboard({
  sessionEmail,
  quickLinks,
  recentPosts,
  recentPages,
  appCounts,
  seoPostsMissing,
  seoPagesMissing,
}: AdminDashboardProps) {
  const { theme, setTheme } = useAdminTheme()

  const palette = themes[theme]

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${palette.page}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className={`overflow-hidden rounded-3xl ${palette.heroCard}`}>
          <div className="relative isolate px-6 py-10 sm:px-10">
            <div className={`pointer-events-none absolute inset-0 ${palette.overlay}`} />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <p className={`text-xs uppercase tracking-[0.35em] ${palette.label}`}>Yönetim</p>
                <h1 className={`text-3xl font-semibold ${palette.heading}`}>İçerik kontrol merkezi</h1>
                <p className={`text-sm ${palette.subtext}`}>
                  Tüm içerik tiplerini tek yerden yönetin. Taslak/yayın durumlarını güncelleyin, medya yükleyin,
                  SEO alanlarını doldurun.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <div className={`space-y-2 rounded-2xl px-4 py-3 text-sm shadow-lg ${palette.card}`}>
                  <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Kullanıcı</p>
                  <p className={`text-lg font-semibold ${palette.heading}`}>{sessionEmail || 'Admin'}</p>
                  <p className={`text-xs ${palette.subtext}`}>Oturum açık. Ayarlar için sağdaki kısayollardan ilerleyin.</p>
                </div>
                <div
                  className={`flex items-center gap-1 rounded-full px-1 py-1 text-xs font-semibold shadow-sm backdrop-blur ${palette.toggleContainer}`}
                >
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 transition ${
                      theme === 'light' ? 'bg-orange-500 text-white shadow' : palette.toggleIdle
                    }`}
                    aria-pressed={theme === 'light'}
                  >
                    <SunMedium className="h-4 w-4" />
                    Açık
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 transition ${
                      theme === 'dark' ? 'bg-orange-500 text-white shadow' : palette.toggleIdle
                    }`}
                    aria-pressed={theme === 'dark'}
                  >
                    <Moon className="h-4 w-4" />
                    Koyu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-3xl p-5 ${palette.card}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Hızlı kısayollar</p>
              <p className={`text-lg font-semibold ${palette.heading}`}>Tüm modüller tek ekranda</p>
            </div>
            <Link
              href="/admin/pages/new"
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${palette.primaryButton}`}
            >
              Yeni sayfa oluştur
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => {
              const Icon = iconMap[link.icon]
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${palette.card} ${palette.linkHover}`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${palette.iconWrap} ${palette.iconHover} group-hover:-translate-y-0.5`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className={`rounded-2xl p-4 ${palette.card}`}>
            <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Durum</p>
            <p className={`mt-2 text-xl font-semibold ${palette.heading}`}>Oturum açık</p>
            <p className={`mt-1 text-xs ${palette.muted}`}>Giriş yapıldı, içerik ve medya güncellemeleri yapabilirsiniz.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className={`rounded-lg p-2 ${palette.pill}`}>
                <p className={`text-[10px] uppercase tracking-[0.25em] ${palette.muted}`}>Yeni</p>
                <p className={`text-lg font-semibold ${palette.accent}`}>{appCounts.new}</p>
              </div>
              <div className={`rounded-lg p-2 ${palette.pill}`}>
                <p className={`text-[10px] uppercase tracking-[0.25em] ${palette.muted}`}>İnceleme</p>
                <p className={`text-lg font-semibold ${palette.accent}`}>{appCounts.in_review}</p>
              </div>
              <div className={`rounded-lg p-2 ${palette.pill}`}>
                <p className={`text-[10px] uppercase tracking-[0.25em] ${palette.muted}`}>Kapalı</p>
                <p className={`text-lg font-semibold ${palette.accent}`}>{appCounts.closed}</p>
              </div>
            </div>
            <Link
              href="/admin/applications"
              className={`mt-3 inline-flex w-fit items-center justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition ${palette.ghostButton}`}
            >
              Başvuruları aç
            </Link>
          </div>
          <div className={`space-y-3 rounded-2xl p-4 ${palette.card}`}>
            <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Son düzenlenenler</p>
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/posts/${post.type}/${post.slug}`}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${palette.pill} ${palette.linkHover}`}
                >
                  <span className="truncate">{post.title}</span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${palette.muted}`}>
                    {post.type} · {post.status === 'published' ? 'Yayında' : 'Taslak'}
                  </span>
                </Link>
              ))}
              {recentPosts.length === 0 && <p className={`text-xs ${palette.muted}`}>Henüz içerik yok.</p>}
            </div>
          </div>
          <div className={`space-y-3 rounded-2xl p-4 ${palette.card}`}>
            <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Statik sayfalar</p>
            <div className="space-y-2">
              {recentPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/admin/pages/${page.slug}`}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${palette.pill} ${palette.linkHover}`}
                >
                  <span className="truncate">{page.title}</span>
                  <span className={`text-[10px] uppercase tracking-[0.2em] ${palette.muted}`}>
                    {page.category ?? 'Kategori yok'}
                  </span>
                </Link>
              ))}
              {recentPages.length === 0 && <p className={`text-xs ${palette.muted}`}>Henüz sayfa yok.</p>}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
          <div className={`rounded-2xl p-4 ${palette.card}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>SEO Uyarıları</p>
                <p className={`text-sm ${palette.subtext}`}>SEO başlığı veya açıklaması eksik olan içerikleri tamamlayın.</p>
              </div>
              <BarChart className={`h-5 w-5 ${palette.accent}`} />
            </div>
            <div className={`mt-3 space-y-2 text-sm`}>
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${palette.pill}`}>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Blog / içerikler: SEO eksik ({seoPostsMissing}).</span>
                <Link
                  href="/admin/posts/blog"
                  className="ml-auto text-xs font-semibold text-orange-500 underline underline-offset-4"
                >
                  Aç
                </Link>
              </div>
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${palette.pill}`}>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>Statik sayfalar: SEO eksik ({seoPagesMissing}).</span>
                <Link
                  href="/admin/pages"
                  className="ml-auto text-xs font-semibold text-orange-500 underline underline-offset-4"
                >
                  Aç
                </Link>
              </div>
              <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${palette.pill}`}>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Hero ve ayarlar: Güncel.</span>
                <Link
                  href="/admin/settings"
                  className="ml-auto text-xs font-semibold text-orange-500 underline underline-offset-4"
                >
                  Ayarlar
                </Link>
              </div>
            </div>
          </div>
          <div className={`rounded-2xl p-4 ${palette.card}`}>
            <p className={`text-xs uppercase tracking-[0.25em] ${palette.label}`}>Hızlı aksiyonlar</p>
            <div className="mt-3 grid gap-2">
              <Link
                href="/admin/posts/blog/new"
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${palette.pill} ${palette.linkHover}`}
              >
                Yeni blog yazısı
              </Link>
              <Link
                href="/admin/posts/event/new"
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${palette.pill} ${palette.linkHover}`}
              >
                Yeni etkinlik
              </Link>
              <Link
                href="/admin/media"
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${palette.pill} ${palette.linkHover}`}
              >
                Medya yükle
              </Link>
              <Link
                href="/admin/applications"
                className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${palette.pill} ${palette.linkHover}`}
              >
                Yeni başvuruları incele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
