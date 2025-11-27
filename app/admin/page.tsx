import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { AdminDashboard } from '@/components/admin/admin-dashboard'

const quickLinks: Parameters<typeof AdminDashboard>[0]['quickLinks'] = [
  { href: '/admin/posts/blog', label: 'Blog / Yazılar', icon: 'BookOpen' },
  { href: '/admin/posts/event', label: 'Etkinlikler', icon: 'CalendarRange' },
  { href: '/admin/posts/video', label: 'Video kütüphanesi', icon: 'Video' },
  { href: '/admin/posts/podcast', label: 'Podcastler', icon: 'Mic2' },
  { href: '/admin/posts/service', label: 'Hizmet / Eğitim', icon: 'Briefcase' },
  { href: '/admin/pages', label: 'Statik sayfalar', icon: 'FileText' },
  { href: '/admin/categories', label: 'Kategoriler', icon: 'Layers' },
  { href: '/admin/faq', label: 'SSS (FAQ)', icon: 'Layers' },
  { href: '/admin/hero', label: 'Hero içerikleri', icon: 'Video' },
  { href: '/admin/media', label: 'Medya kütüphanesi', icon: 'ImageIcon' },
  { href: '/admin/settings', label: 'Site ayarları', icon: 'Settings' },
  { href: '/admin/applications', label: 'Başvurular', icon: 'FileText' },
]

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const [recentPosts, recentPages, appSummary, seoPostsMissing, seoPagesMissing] = await Promise.all([
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, slug: true, type: true, status: true, updatedAt: true },
    }),
    prisma.contentPage.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { slug: true, title: true, category: true, updatedAt: true },
    }),
    prisma.application.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
    prisma.post.count({
      where: {
        OR: [
          { seoTitle: null },
          { seoTitle: '' },
          { seoDescription: null },
          { seoDescription: '' },
        ],
      },
    }),
    prisma.contentPage.count({
      where: {
        OR: [
          { seoTitle: null },
          { seoTitle: '' },
          { seoDescription: null },
          { seoDescription: '' },
        ],
      },
    }),
  ])

  const appCounts = {
    new: appSummary.find((a) => a.status === 'new')?._count._all || 0,
    in_review: appSummary.find((a) => a.status === 'in_review')?._count._all || 0,
    closed: appSummary.find((a) => a.status === 'closed')?._count._all || 0,
  }

  return (
    <AdminDashboard
      sessionEmail={session.user?.email ?? 'Admin'}
      quickLinks={quickLinks}
      recentPosts={recentPosts}
      recentPages={recentPages}
      appCounts={appCounts}
      seoPostsMissing={seoPostsMissing}
      seoPagesMissing={seoPagesMissing}
    />
  )
}
