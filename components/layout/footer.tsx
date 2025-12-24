import Link from 'next/link'
import Image from 'next/image'
import { Settings } from '@/lib/api'
import { Youtube, Twitter, Facebook, Instagram, Globe } from 'lucide-react'

interface FooterProps {
  locale: string
  settings?: Settings
  contentPageSlugs?: string[]
  publishedPageSlugs?: string[]
}

const footerNavigation = (locale: string) => ({
  kurumsal: [
    { label: locale === 'tr' ? 'Hakkımızda' : 'About', href: `/${locale}/hakkimizda` },
    { label: locale === 'tr' ? 'Vizyon & Değerler' : 'Vision & Values', href: `/${locale}/vizyon-degerler` },
    { label: locale === 'tr' ? 'Yönetim İlkeleri' : 'Governance', href: `/${locale}/yonetim-ilkeleri` },
  ],
  dusunce: [
    { label: locale === 'tr' ? 'Eğitim Araştırmaları' : locale === 'ar' ? 'أبحاث التعليم' : 'Education research', href: `/${locale}/dusunce-enstitusu/egitim` },
    { label: locale === 'tr' ? 'Gençlik' : locale === 'ar' ? 'الشباب' : 'Youth', href: `/${locale}/dusunce-enstitusu/genclik` },
    { label: locale === 'tr' ? 'Aile' : locale === 'ar' ? 'الأسرة' : 'Family', href: `/${locale}/dusunce-enstitusu/aile` },
    { label: locale === 'tr' ? 'Tarih, Kültür ve Medeniyet' : locale === 'ar' ? 'الثقافة والفن' : 'Culture & Art', href: `/${locale}/dusunce-enstitusu/kultur-sanat` },
    { label: locale === 'tr' ? 'Uluslararası İlişkiler' : locale === 'ar' ? 'العلاقات الدولية' : 'International Relations', href: `/${locale}/dusunce-enstitusu/uluslararasi-iliskiler` },
    { label: locale === 'tr' ? 'Çevre-İklim-Şehir' : locale === 'ar' ? 'البيئة والمناخ والطبيعة' : 'Environment & Climate', href: `/${locale}/dusunce-enstitusu/cevre-iklim-doga` },
    { label: locale === 'tr' ? 'Bilim ve Teknoloji' : locale === 'ar' ? 'العلم والتكنولوجيا' : 'Science & Technology', href: `/${locale}/dusunce-enstitusu/bilim-teknoloji` },
  ],
  akademi: [
    { label: locale === 'tr' ? 'Akademi' : 'Overview', href: `/${locale}/akademi` },
    { label: locale === 'tr' ? 'Seminerler' : locale === 'ar' ? 'الندوات' : 'Seminars', href: `/${locale}/akademi/seminerler` },
    { label: locale === 'tr' ? 'Konferanslar' : locale === 'ar' ? 'المؤتمرات' : 'Conferences', href: `/${locale}/akademi/konferanslar` },
    { label: locale === 'tr' ? 'Çalıştaylar' : locale === 'ar' ? 'ورش العمل' : 'Workshops', href: `/${locale}/akademi/calistaylar` },
    { label: locale === 'tr' ? 'Sertifika Programları' : 'Certificate Programs', href: `/${locale}/akademi/sertifika-programlari` },
  ],
  yazilim: [
    { label: locale === 'tr' ? 'Yazılım Geliştirme' : 'Software Development', href: `/${locale}/yazilim/gelistirme` },
    { label: locale === 'tr' ? 'Teknoloji Danışmanlığı' : 'Technology Consulting', href: `/${locale}/yazilim/danismanlik` },
    { label: locale === 'tr' ? 'Ürünlerimiz' : locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity', href: `/${locale}/yazilim/siber-guvenlik` },
  ],
  kulupler: [
    { label: locale === 'tr' ? 'Öğrenci Kulüpleri' : 'Student Clubs', href: `/${locale}/kulupler/ogrenci-kulupleri` },
    { label: locale === 'tr' ? 'Teknoloji Takımları' : 'Technology Teams', href: `/${locale}/kulupler/teknoloji-takimlari` },
  ],
  yayinlar: [
    { label: locale === 'tr' ? 'Yayın Anlayışımız' : locale === 'ar' ? 'رؤيتنا للنشر' : 'Publishing Ethos', href: `/${locale}/yayin-anlayisimiz` },
    { label: locale === 'tr' ? 'Tarf Dergi' : locale === 'ar' ? 'مجلة تارف' : 'Tarf Magazine', href: `/${locale}/dergi` },
  ],
})

const socialLinks = [
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@tarfakademi' },
  { icon: Twitter, label: 'X', href: 'https://x.com/tarfakademi' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/tarfakademi' },
  { icon: Instagram, label: 'Instagram', href: 'https://example.com/tarf-instagram' },
  { icon: Globe, label: 'Website', href: 'https://tarf.com.tr' },
]

const highlightPills: Record<string, string[]> = {
  tr: ['Bilim', 'Teknoloji', 'Topluluk'],
  ar: ['العلم', 'التكنولوجيا', 'المجتمع'],
  en: ['Science', 'Technology', 'Community'],
}

export function Footer({ locale, settings, contentPageSlugs, publishedPageSlugs }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const nav = footerNavigation(locale)
  const contentPageSet = new Set(contentPageSlugs ?? [])
  const publishedPageSet = new Set(publishedPageSlugs ?? [])
  const pills = highlightPills[locale] || highlightPills.en

  const normalizeSlug = (href: string) => {
    if (!href) return null
    if (/^(https?:|mailto:|tel:)/i.test(href)) return null
    const path = href.split('?')[0]?.split('#')[0] ?? ''
    const trimmed = path.replace(/^\/+/, '').replace(/\/+$/, '')
    if (!trimmed || trimmed === locale) return null
    const prefix = `${locale}/`
    const withoutLocale = trimmed.startsWith(prefix) ? trimmed.slice(prefix.length) : trimmed
    if (!withoutLocale || withoutLocale === locale) return null
    return withoutLocale
  }

  const shouldShowLink = (href: string) => {
    const slug = normalizeSlug(href)
    if (!slug) return true
    if (contentPageSet.size === 0) return true
    if (!contentPageSet.has(slug)) return true
    if (publishedPageSet.size === 0) return true
    return publishedPageSet.has(slug)
  }

  const navSections = [
    {
      title: locale === 'tr' ? 'Kurumsal' : locale === 'ar' ? 'مؤسسي' : 'Corporate',
      links: nav.kurumsal.filter((link) => shouldShowLink(link.href)),
    },
    {
      title: locale === 'tr' ? 'Düşünce Enstitüsü' : locale === 'ar' ? 'معهد الفكر' : 'Think Tank',
      links: nav.dusunce.filter((link) => shouldShowLink(link.href)),
    },
    {
      title: locale === 'tr' ? 'Akademi' : locale === 'ar' ? 'الأكاديمية' : 'Academy',
      links: nav.akademi.filter((link) => shouldShowLink(link.href)),
    },
    {
      title: locale === 'tr' ? 'Yazılım' : locale === 'ar' ? 'تقنيات البرمجيات' : 'Software',
      links: nav.yazilim.filter((link) => shouldShowLink(link.href)),
    },
    {
      title: locale === 'tr' ? 'Kulüpler' : locale === 'ar' ? 'الأندية والفرق' : 'Clubs',
      links: nav.kulupler.filter((link) => shouldShowLink(link.href)),
    },
    {
      title: locale === 'tr' ? 'Yayınlar' : locale === 'ar' ? 'المنشورات' : 'Publications',
      links: nav.yayinlar.filter((link) => shouldShowLink(link.href)),
    },
  ]

  const legalLinks = [
    {
      href: `/${locale}/gizlilik-politikasi`,
      label: locale === 'tr' ? 'Gizlilik' : locale === 'ar' ? 'الخصوصية' : 'Privacy',
    },
    {
      href: `/${locale}/kullanim-kosullari`,
      label: locale === 'tr' ? 'Koşullar' : locale === 'ar' ? 'الشروط' : 'Terms',
    },
    {
      href: `/${locale}/contact`,
      label: locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'اتصل' : 'Contact',
    },
  ].filter((link) => shouldShowLink(link.href))

  return (
    <footer className="relative mt-auto border-t border-slate-800/50 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative container py-10 lg:py-12">
        {/* Brand Section */}
        <div className="mb-8 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 p-3 shadow-lg">
              <Image
                src="/img/tarf.png"
                alt="TARF"
                width={100}
                height={35}
                className="h-auto w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/70">
                {locale === 'tr' ? 'Araştırma Fonları' : locale === 'ar' ? 'صناديق البحث' : 'Research Funds'}
              </p>
              <h3 className="text-lg font-bold text-white sm:text-xl">
                TARF Akademi
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm lg:max-w-md">
                {locale === 'tr'
                  ? 'Bilim, teknoloji ve irfanı bir araya getirerek geleceği inşa ediyoruz.'
                  : locale === 'ar'
                    ? 'نبني المستقبل من خلال الجمع بين العلم والتكنولوجيا والحكمة.'
                    : 'Building the future by bringing together science, technology and wisdom.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Pills */}
            <div className="flex flex-wrap gap-1.5">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary"
                >
                  <span className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                  {pill}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              {settings?.contact_phone && (
                <a href={`tel:${settings.contact_phone}`} className="font-semibold text-white transition-colors hover:text-primary">
                  {settings.contact_phone}
                </a>
              )}
              {settings?.contact_email && settings?.contact_phone && (
                <span className="text-slate-600">—</span>
              )}
              {settings?.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="text-slate-400 transition-colors hover:text-primary">
                  {settings.contact_email}
                </a>
              )}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navigation Grid - TÜM HEADER LİNKLERİ */}
        <div className="mb-6 grid grid-cols-2 gap-6 border-t border-slate-800/50 pt-8 md:grid-cols-3 lg:grid-cols-6">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-xs text-slate-400 transition-colors hover:text-primary sm:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar - Compact */}
        <div className="flex flex-col gap-3 border-t border-slate-800/50 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} TARF. {locale === 'tr' ? 'Tüm hakları saklıdır.' : locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
