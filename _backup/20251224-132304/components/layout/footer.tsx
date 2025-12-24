import Link from 'next/link'
import Image from 'next/image'
import { Settings } from '@/lib/api'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Youtube, ArrowUpRight, Twitter, Facebook } from 'lucide-react'

interface FooterProps {
  locale: string
  settings?: Settings
}

const footerNavigation = (locale: string) => ({
  kurumsal: [
    { label: locale === 'tr' ? 'Hakkımızda' : locale === 'ar' ? 'من نحن' : 'About', href: `/${locale}/hakkimizda` },
    { label: locale === 'tr' ? 'Vizyon & Değerler' : locale === 'ar' ? 'الرؤية والقيم' : 'Vision & Values', href: `/${locale}/vizyon-degerler` },
    { label: locale === 'tr' ? 'Yönetim İlkeleri' : locale === 'ar' ? 'مبادئ الإدارة' : 'Management Principles', href: `/${locale}/yonetim-ilkeleri` },
    { label: locale === 'tr' ? 'Etik Beyan' : locale === 'ar' ? 'البيان الأخلاقي' : 'Ethics Statement', href: `/${locale}/etik-beyan` },
    { label: locale === 'tr' ? 'Basın Kiti' : locale === 'ar' ? 'مجموعة الصحافة' : 'Press Kit', href: `/${locale}/basin-kiti` },
    { label: locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'اتصل' : 'Contact', href: `/${locale}/contact` },
  ],
  faaliyetler: [
    { label: locale === 'tr' ? 'Akademi' : locale === 'ar' ? 'الأكاديمية' : 'Academy', href: `/${locale}/akademi` },
    { label: locale === 'tr' ? 'Tarf Dergi' : locale === 'ar' ? 'مجلة تارف' : 'Tarf Magazine', href: `/${locale}/dergi` },
    { label: locale === 'tr' ? 'Kulüpler ve Takımlar' : locale === 'ar' ? 'الأندية والفرق' : 'Clubs & Teams', href: `/${locale}/kulupler` },
    { label: locale === 'tr' ? 'Tarf Mekan' : locale === 'ar' ? 'مكان تارف' : 'Tarf Space', href: `/${locale}/tarf-mekan` },
    { label: locale === 'tr' ? 'Düşünce Enstitüsü' : locale === 'ar' ? 'معهد الفكر' : 'Think Tank', href: `/${locale}/dusunce-enstitusu` },
    { label: locale === 'tr' ? 'Yazılım Teknolojileri' : locale === 'ar' ? 'تقنيات البرمجيات' : 'Software Technologies', href: `/${locale}/yazilim` },
  ],
  kaynaklar: [
    { label: locale === 'tr' ? 'Blog' : locale === 'ar' ? 'المدونة' : 'Blog', href: `/${locale}/blog` },
    { label: locale === 'tr' ? 'Video' : locale === 'ar' ? 'الفيديو' : 'Videos', href: `/${locale}/videos` },
    { label: locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'البودكاست' : 'Podcasts', href: `/${locale}/podcasts` },
    { label: locale === 'tr' ? 'Etkinlikler' : locale === 'ar' ? 'الفعاليات' : 'Events', href: `/${locale}/events` },
    { label: locale === 'tr' ? 'SSS' : locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ', href: `/${locale}/faq` },
    { label: locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'اتصل' : 'Contact', href: `/${locale}/contact` },
  ],
})

const socialLinks = [
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://www.youtube.com/@tarfakademi',
  },
  { icon: Twitter, label: 'X', href: 'https://x.com/tarfakademi' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/tarfakademi' },
]

const highlightPills: Record<string, string[]> = {
  tr: ['Bilim', 'Teknoloji', 'Topluluk'],
  ar: ['العلم', 'التكنولوجيا', 'المجتمع'],
  en: ['Science', 'Technology', 'Community'],
}

export function Footer({ locale, settings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const nav = footerNavigation(locale)
  const pills = highlightPills[locale] || highlightPills.en

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-gradient-to-b from-background via-background/95 to-primary/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-[-10%] top-0 h-40 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent opacity-70 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-64 w-64 rounded-full bg-primary/25 blur-[140px] opacity-60" />
        <div className="absolute -left-10 top-1/3 h-48 w-48 rounded-full bg-primary/10 blur-[120px]" />
      </div>
      <div className="relative container py-16">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.9fr_0.9fr_1.05fr]">
          {/* Brand */}
          <div className="space-y-6 rounded-3xl border border-white/10 bg-background/80 p-6 shadow-2xl shadow-primary/10 backdrop-blur">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-primary/5">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent opacity-60 blur-md" />
                  <Image
                    src="/img/tarf_white.png"
                    alt="TARF Logo"
                    width={120}
                    height={40}
                    className="relative h-10 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {locale === 'tr' ? 'Araştırma Fonları' : locale === 'ar' ? 'صناديق البحث' : 'Research Funds'}
                  </p>
                  <h3 className="text-2xl font-semibold">
                    {settings?.site_name || 'TARF Düşünce Enstitüsü'}
                  </h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {locale === 'tr'
                  ? 'Bilim, teknoloji ve irfanı bir araya getirerek geleceği inşa ediyoruz. Eğitim, yazılım, araştırma ve toplumsal dönüşüm için çalışıyoruz.'
                  : locale === 'ar'
                  ? 'نبني المستقبل من خلال الجمع بين العلم والتكنولوجيا والحكمة. نعمل من أجل التعليم والبرمجيات والبحث والتحول المجتمعي.'
                  : 'Building the future by bringing together science, technology and wisdom. We work for education, software, research and social transformation.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-primary/5 px-4 py-1 text-xs font-medium uppercase tracking-wide text-foreground/80"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              {settings?.contact_phone && (
                <a href={`tel:${settings.contact_phone}`} className="font-semibold text-foreground transition-colors hover:text-primary">
                  {settings.contact_phone}
                </a>
              )}
              {settings?.contact_email && settings?.contact_phone && (
                <span className="text-muted-foreground/70">—</span>
              )}
              {settings?.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="text-muted-foreground transition-colors hover:text-primary">
                  {settings.contact_email}
                </a>
              )}
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-background/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <span className="absolute inset-0 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100">
                    <span className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent" />
                  </span>
                  <Icon className="relative h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Kurumsal */}
          <div className="rounded-3xl border border-white/10 bg-background/70 p-6 shadow-xl shadow-primary/5 backdrop-blur">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {locale === 'tr' ? 'Kurumsal' : locale === 'ar' ? 'مؤسسي' : 'Corporate'}
            </h4>
            <ul className="space-y-3">
              {nav.kurumsal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-2xl px-4 py-2 text-sm text-muted-foreground/80 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Faaliyetler */}
          <div className="rounded-3xl border border-white/10 bg-background/70 p-6 shadow-xl shadow-primary/5 backdrop-blur">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              {locale === 'tr' ? 'Faaliyetler' : locale === 'ar' ? 'الأنشطة' : 'Activities'}
            </h4>
            <ul className="space-y-3">
              {nav.faaliyetler.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between rounded-2xl px-4 py-2 text-sm text-muted-foreground/80 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kaynaklar / Newsletter */}
          <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-background/70 p-6 shadow-xl shadow-primary/5 backdrop-blur">
            <div>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                {locale === 'tr' ? 'Kaynaklar' : locale === 'ar' ? 'الموارد' : 'Resources'}
              </h4>
              <ul className="space-y-3">
                {nav.kaynaklar.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between rounded-2xl px-4 py-2 text-sm text-muted-foreground/80 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/5 hover:text-foreground"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-5 shadow-2xl shadow-primary/20">
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_60%)]" />
              </div>
              <div className="relative space-y-3">
                <p className="text-sm font-semibold">
                  {locale === 'tr' ? 'Hizmetlerimizden yararlanın' : locale === 'ar' ? 'استفد من خدماتنا' : 'Benefit from our services'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {locale === 'tr'
                    ? 'Eğitimler, projeler, yayınlar ve teknoloji takımlarıyla üretim yolculuğunuza bugün başlayın.'
                    : locale === 'ar'
                    ? 'ابدأ رحلة إنتاجك اليوم مع التدريبات والمشاريع والمنشورات وفرق التكنولوجيا.'
                    : 'Start your production journey today with trainings, projects, publications and technology teams.'}
                </p>
                <form className="space-y-2">
                  <Input
                    type="email"
                    placeholder={locale === 'tr' ? 'E-posta adresiniz' : locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                    className="h-12 border-white/20 bg-background/80 text-sm focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  <Button className="w-full shadow-lg shadow-primary/30" type="submit">
                    {locale === 'tr' ? 'Ücretsiz Başvuru' : locale === 'ar' ? 'طلب مجاني' : 'Free Application'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/5 pt-6 text-sm text-muted-foreground/80 md:flex-row md:items-center md:justify-between">
          <p>
            © {currentYear} TARF. {locale === 'tr' ? 'Tüm hakları saklıdır.' : locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/${locale}/gizlilik-politikasi`} className="transition-colors hover:text-primary">
              {locale === 'tr' ? 'Gizlilik Politikası' : locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/kullanim-kosullari`} className="transition-colors hover:text-primary">
              {locale === 'tr' ? 'Kullanım Koşulları' : locale === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
            </Link>
            <Link href={`/${locale}/cerez-politikasi`} className="transition-colors hover:text-primary">
              {locale === 'tr' ? 'Çerez Politikası' : locale === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
            </Link>
            <Link href={`/${locale}/contact`} className="transition-colors hover:text-primary">
              {locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'اتصل' : 'Contact'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
