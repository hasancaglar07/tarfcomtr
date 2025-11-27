'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Settings } from '@/lib/api'
import { cn } from '@/lib/utils'
import {
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react'

interface HeaderProps {
  locale: string
  settings?: Settings
}

interface NavSection {
  label: string
  href?: string
  description?: string
  links?: Array<{ label: string; href: string; description?: string }>
}

interface LinkGroup {
  label: string
  href?: string
  children?: Array<{ label: string; href: string }>
}

const MOBILE_MENU_ID = 'mobile-navigation-drawer'

export function Header({ locale, settings }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearDropdownTimeout = () => {
    if (dropdownCloseTimeout.current) {
      clearTimeout(dropdownCloseTimeout.current)
      dropdownCloseTimeout.current = null
    }
  }

  const openDropdown = (label: string) => {
    clearDropdownTimeout()
    setActiveDropdown(label)
    setHoveredNav(label)
  }

  const scheduleCloseDropdown = (label: string) => {
    clearDropdownTimeout()
    dropdownCloseTimeout.current = setTimeout(() => {
      setActiveDropdown((current) => (current === label ? null : current))
      setHoveredNav((current) => (current === label ? null : current))
    }, 120)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    return () => {
      clearDropdownTimeout()
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const root = document.documentElement
    const previousOverflow = root.style.overflow
    const previousPaddingRight = root.style.paddingRight

    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - root.clientWidth
      root.style.overflow = 'hidden'
      if (scrollbarWidth > 0) {
        root.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    return () => {
      root.style.overflow = previousOverflow
      root.style.paddingRight = previousPaddingRight
    }
  }, [mobileOpen, isMounted])

  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setActiveDropdown(null)
      }
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false)
        setActiveDropdown(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange)
    } else {
      mediaQuery.addListener(handleMediaChange)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange)
      } else {
        mediaQuery.removeListener(handleMediaChange)
      }
    }
  }, [isMounted])

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }

  const topbarLinks: LinkGroup[] = [
    { label: locale === 'tr' ? 'İletişim' : 'Contact', href: `/${locale}/contact` },
    { label: locale === 'tr' ? 'Hakkımızda' : 'About', href: `/${locale}/hakkimizda` },
    { label: locale === 'tr' ? 'Etkinlik Takvimi' : 'Events Calendar', href: `/${locale}/events` },
  ]

  const navigation: NavSection[] = [
    {
      label: locale === 'tr' ? 'Kurumsal' : locale === 'ar' ? 'مؤسسي' : 'Corporate',
      description:
        locale === 'tr'
          ? 'Kim olduğumuz ve değerlerimiz'
          : locale === 'ar'
          ? 'من نحن وقيمنا'
          : 'Who we are and what we believe',
      links: [
        { label: locale === 'tr' ? 'Hakkımızda' : 'About', href: `/${locale}/hakkimizda`, description: locale === 'tr' ? 'Kuruluş hikayemiz' : 'Our story' },
        { label: locale === 'tr' ? 'Vizyon & Değerler' : 'Vision & Values', href: `/${locale}/vizyon-degerler`, description: locale === 'tr' ? 'Gelecek perspektifimiz' : 'Our long term vision' },
        { label: locale === 'tr' ? 'Yönetim İlkeleri' : 'Governance', href: `/${locale}/yonetim-ilkeleri`, description: locale === 'tr' ? 'Şeffaf yönetişim' : 'Transparent governance' },
        { label: locale === 'tr' ? 'Etik Beyan' : 'Ethics', href: `/${locale}/etik-beyan`, description: locale === 'tr' ? 'Etik kodumuz' : 'Ethics code' },
        { label: locale === 'tr' ? 'Basın Kiti' : 'Press Kit', href: `/${locale}/basin-kiti`, description: locale === 'tr' ? 'Medya kaynakları' : 'Media resources' },
        { label: locale === 'tr' ? 'TARF Mekan' : 'TARF Space', href: `/${locale}/tarf-mekan`, description: locale === 'tr' ? 'Üretim alanımız' : 'Our space' },
      ],
    },
    {
      label: locale === 'tr' ? 'Düşünce Enstitüsü' : locale === 'ar' ? 'معهد الفكر' : 'Think Tank Institute',
      description:
        locale === 'tr'
          ? 'Fikir üretimi ve araştırma platformu'
          : locale === 'ar'
          ? 'منصة إنتاج الأفكار والبحث'
          : 'Idea generation and research platform',
      links: [
        {
          label: locale === 'tr' ? 'Ana sayfa' : locale === 'ar' ? 'الرئيسية' : 'Overview',
          href: `/${locale}/dusunce-enstitusu`,
          description: locale === 'tr' ? 'Araştırma merkezi' : 'Research hub',
        },
        {
          label: locale === 'tr' ? 'Eğitim Araştırmaları' : locale === 'ar' ? 'أبحاث التعليم' : 'Education research',
          href: `/${locale}/dusunce-enstitusu/egitim`,
          description: locale === 'tr' ? 'Modern eğitim dönüşümü' : 'Modern education transformation',
        },
        {
          label: locale === 'tr' ? 'Gençlik' : locale === 'ar' ? 'الشباب' : 'Youth',
          href: `/${locale}/dusunce-enstitusu/genclik`,
          description: locale === 'tr' ? 'Gençlik programları' : 'Youth programs',
        },
        {
          label: locale === 'tr' ? 'Aile' : locale === 'ar' ? 'الأسرة' : 'Family',
          href: `/${locale}/dusunce-enstitusu/aile`,
          description: locale === 'tr' ? 'Aile destek programları' : 'Family initiatives',
        },
        {
          label: locale === 'tr' ? 'Kültür & Sanat' : locale === 'ar' ? 'الثقافة والفن' : 'Culture & Art',
          href: `/${locale}/dusunce-enstitusu/kultur-sanat`,
          description: locale === 'tr' ? 'Kültürel araştırmalar' : 'Cultural research',
        },
        {
          label: locale === 'tr' ? 'Uluslararası İlişkiler' : locale === 'ar' ? 'العلاقات الدولية' : 'International Relations',
          href: `/${locale}/dusunce-enstitusu/uluslararasi-iliskiler`,
          description: locale === 'tr' ? 'Diplomasi ve bölgesel çalışmalar' : 'Diplomacy and regional studies',
        },
        {
          label: locale === 'tr' ? 'Çevre-İklim-Doğa' : locale === 'ar' ? 'البيئة والمناخ والطبيعة' : 'Environment & Climate',
          href: `/${locale}/dusunce-enstitusu/cevre-iklim-doga`,
          description: locale === 'tr' ? 'İklim ve sürdürülebilirlik' : 'Climate and sustainability',
        },
        {
          label: locale === 'tr' ? 'Bilim ve Teknoloji' : locale === 'ar' ? 'العلم والتكنولوجيا' : 'Science & Technology',
          href: `/${locale}/dusunce-enstitusu/bilim-teknoloji`,
          description: locale === 'tr' ? 'Teknoloji ve etik' : 'Technology and ethics',
        },
      ],
    },
    {
      label: locale === 'tr' ? 'Akademi' : locale === 'ar' ? 'الأكاديمية' : 'Academy',
      description:
        locale === 'tr'
          ? 'Eğitim programları ve sertifikalar'
          : locale === 'ar'
          ? 'البرامج التعليمية والشهادات'
          : 'Educational programs and certificates',
      links: [
        {
          label: locale === 'tr' ? 'Akademi Ana' : 'Overview',
          href: `/${locale}/akademi`,
          description: locale === 'tr' ? 'Merak eden gençlik' : 'Learning ecosystem',
        },
        {
          label: locale === 'tr' ? 'Lisans Eğitimleri' : 'Undergraduate Programs',
          href: `/${locale}/akademi/egitimler`,
          description: locale === 'tr' ? 'Derinlikli programlar' : 'Deep-dive programs',
        },
        {
          label: locale === 'tr' ? 'Seminerler' : locale === 'ar' ? 'الندوات' : 'Seminars',
          href: `/${locale}/akademi/seminerler`,
          description: locale === 'tr' ? 'Uzman seminerleri' : 'Expert seminars',
        },
        {
          label: locale === 'tr' ? 'Konferanslar' : locale === 'ar' ? 'المؤتمرات' : 'Conferences',
          href: `/${locale}/akademi/konferanslar`,
          description: locale === 'tr' ? 'Akademik konferanslar' : 'Academic conferences',
        },
        {
          label: locale === 'tr' ? 'Çalıştaylar' : locale === 'ar' ? 'ورش العمل' : 'Workshops',
          href: `/${locale}/akademi/calistaylar`,
          description: locale === 'tr' ? 'Uygulamalı çalıştaylar' : 'Practical workshops',
        },
        {
          label: locale === 'tr' ? 'Sertifika Programları' : 'Certificate Programs',
          href: `/${locale}/akademi/sertifika-programlari`,
          description: locale === 'tr' ? 'Sertifikalı eğitimler' : 'Certified trainings',
        },
      ],
    },
    {
      label: locale === 'tr' ? 'Yazılım Teknolojileri' : locale === 'ar' ? 'تقنيات البرمجيات' : 'Software Technologies',
      description:
        locale === 'tr'
          ? 'Yenilikçi dijital çözümler'
          : locale === 'ar'
          ? 'حلول رقمية مبتكرة'
          : 'Innovative digital solutions',
      links: [
        {
          label: locale === 'tr' ? 'Yazılım Geliştirme' : 'Software Development',
          href: `/${locale}/yazilim/gelistirme`,
          description: locale === 'tr' ? 'Özel yazılım çözümleri' : 'Custom software solutions',
        },
        {
          label: locale === 'tr' ? 'Teknoloji Danışmanlığı' : 'Technology Consulting',
          href: `/${locale}/yazilim/danismanlik`,
          description: locale === 'tr' ? 'Dijital dönüşüm danışmanlığı' : 'Digital transformation consulting',
        },
        {
          label: locale === 'tr' ? 'Siber Güvenlik' : locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
          href: `/${locale}/yazilim/siber-guvenlik`,
          description: locale === 'tr' ? 'Siber güvenlik hizmetleri' : 'Cybersecurity services',
        },
      ],
    },
    {
      label: locale === 'tr' ? 'Kulüpler ve Takımlar' : locale === 'ar' ? 'الأندية والفرق' : 'Clubs & Teams',
      description:
        locale === 'tr'
          ? 'Teknoloji takımları ve kulüpler'
          : locale === 'ar'
          ? 'الفرق والأندية التقنية'
          : 'Technology teams and clubs',
      links: [
        {
          label: locale === 'tr' ? 'Öğrenci Kulüpleri' : 'Student Clubs',
          href: `/${locale}/kulupler/ogrenci-kulupleri`,
          description: locale === 'tr' ? 'Öğrenci toplulukları' : 'Student communities',
        },
        {
          label: locale === 'tr' ? 'Teknoloji Takımları' : 'Technology Teams',
          href: `/${locale}/kulupler/teknoloji-takimlari`,
          description: locale === 'tr' ? 'Proje geliştirme takımları' : 'Project development teams',
        },
        {
          label: locale === 'tr' ? 'Kulüpler Ana' : 'Overview',
          href: `/${locale}/kulupler`,
          description: locale === 'tr' ? 'Topluluk ekosistemi' : 'Community hub',
        },
      ],
    },
    {
      label: locale === 'tr' ? 'Yayınlar' : locale === 'ar' ? 'المنشورات' : 'Publications',
      links: [
        {
          label: locale === 'tr' ? 'Tarf Dergi' : locale === 'ar' ? 'مجلة تارف' : 'Tarf Magazine',
          href: `/${locale}/dergi`,
          description: locale === 'tr' ? 'Bilim ve teknoloji dergisi' : 'Science and technology magazine',
        },
        { label: locale === 'tr' ? 'Blog' : locale === 'ar' ? 'المدونة' : 'Blog', href: `/${locale}/blog`, description: locale === 'tr' ? 'Güncel yazılar' : 'Latest articles' },
        { label: locale === 'tr' ? 'Video' : locale === 'ar' ? 'الفيديو' : 'Video', href: `/${locale}/videos`, description: locale === 'tr' ? 'Video içerikler' : 'Video content' },
        { label: locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'البودكاست' : 'Podcast', href: `/${locale}/podcasts`, description: locale === 'tr' ? 'Podcast serileri' : 'Podcast series' },
      ],
    },
    {
      label: locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'اتصل' : 'Contact',
      href: `/${locale}/contact`,
    },
  ]

  const languages = [
    { code: 'tr', name: 'TR', flag: '🇹🇷' },
    { code: 'en', name: 'EN', flag: '🇬🇧' },
    { code: 'ar', name: 'AR', flag: '🇸🇦' },
  ]

  const contactInfo = [
    settings?.contact_phone && {
      icon: Phone,
      label: settings.contact_phone,
      href: `tel:${settings.contact_phone.replace(/\s/g, '')}`,
    },
    settings?.contact_email && {
      icon: Mail,
      label: settings.contact_email,
      href: `mailto:${settings.contact_email}`,
    },
    settings?.contact_address && {
      icon: MapPin,
      label: settings.contact_address,
    },
  ].filter(Boolean) as Array<{ icon: typeof Phone; label: string; href?: string }>

  const socialLinks = [
    { label: 'Facebook', href: 'https://www.facebook.com/tarfakademi', icon: Facebook },
    { label: 'X', href: 'https://x.com/tarfakademi', icon: Twitter },
    { label: 'Instagram', href: 'https://www.instagram.com/tarfdergisi/', icon: Instagram },
    { label: 'YouTube', href: 'https://www.youtube.com/@tarfakademi', icon: Youtube },
  ]

  const renderNavLinks = (variant: 'desktop' | 'mobile' = 'desktop') => {
    const isDesktop = variant === 'desktop'

    return (
      <motion.div
        layout
        className={cn(
          isDesktop
            ? 'hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[0_30px_60px_rgba(255,138,52,0.18)] backdrop-blur-2xl'
            : 'space-y-4'
        )}
        {...(isDesktop
          ? {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35, delay: 0.1 },
            }
          : {})}
      >
        {navigation.map((item, index) => {
          const hasLinks = Boolean(item.links?.length)

          if (!hasLinks) {
            return (
              <motion.div
                layout
                key={item.label}
                {...(isDesktop
                  ? {
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.05 * index, duration: 0.3 },
                    }
                  : {})}
              >
                <Link
                  href={item.href || '#'}
                  className={cn(
                    'group relative isolate flex items-center gap-2 text-sm font-semibold transition-all',
                    isDesktop
                      ? 'rounded-full px-3 py-1.5 text-foreground/80 hover:text-foreground'
                      : 'rounded-3xl border border-white/15 bg-[hsl(var(--background)_/_0.94)] px-4 py-3 text-base shadow-[0_25px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(15,23,42,0.22)]'
                  )}
                  onClick={() => {
                    if (!isDesktop) {
                      closeMobileMenu()
                    }
                  }}
                  {...(isDesktop
                    ? {
                        onMouseEnter: () => setHoveredNav(item.label),
                        onMouseLeave: () =>
                          setHoveredNav((current) => (current === item.label ? null : current)),
                      }
                    : {})}
                >
                  {isDesktop && hoveredNav === item.label && (
                    <motion.span
                      layoutId="navHighlight"
                      className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.32),_hsl(var(--primary)_/_0.12))] shadow-[0_15px_35px_rgba(255,138,52,0.35)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            )
          }

          return (
	            <motion.div
	              layout
	              key={item.label}
	              className={cn(
	                'group',
                isDesktop
                  ? 'relative'
	                  : 'overflow-hidden rounded-3xl border border-white/15 bg-[hsl(var(--background)_/_0.88)] shadow-[0_30px_80px_rgba(15,23,42,0.16)] backdrop-blur-2xl'
	              )}
	              {...(isDesktop
	                ? {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.05 * index, duration: 0.3 },
                  }
                : {})}
              onMouseEnter={() => {
                if (!isDesktop) return
                openDropdown(item.label)
              }}
              onMouseLeave={() => {
                if (!isDesktop) return
                scheduleCloseDropdown(item.label)
              }}
	            >
	              <button
	                type="button"
                className={cn(
                  'group inline-flex w-full items-center justify-between gap-2 text-sm font-semibold transition-all',
                  isDesktop
                    ? 'relative isolate rounded-full px-3 py-1.5 text-foreground/80 hover:text-foreground'
                    : 'px-4 py-3 text-base'
                )}
                onClick={() => {
                  if (isDesktop) return
	                  setActiveDropdown((current) => (current === item.label ? null : item.label))
	                }}
	                {...(isDesktop
	                  ? {
	                      onMouseEnter: () => setHoveredNav(item.label),
	                      onMouseLeave: () =>
	                        setHoveredNav((current) => (current === item.label ? null : current)),
	                    }
	                  : {})}
	              >
                {isDesktop && hoveredNav === item.label && (
                  <motion.span
                    layoutId="navHighlight"
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.32),_hsl(var(--primary)_/_0.12))] shadow-[0_15px_35px_rgba(255,138,52,0.35)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                <ChevronDown
                  className={cn(
                    'relative z-10 h-4 w-4 transition-transform duration-300',
                    !isDesktop && activeDropdown === item.label && 'rotate-180'
                  )}
                />
              </button>

	                {isDesktop ? (
	                  <AnimatePresence>
	                    {activeDropdown === item.label && (
	                      <motion.div
	                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
	                        animate={{ opacity: 1, y: 0, scale: 1 }}
	                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
	                        transition={{ duration: 0.2 }}
	                        className="absolute left-1/2 top-full z-20 mt-4 w-[360px] -translate-x-1/2 rounded-3xl border border-white/30 bg-white p-5 text-foreground shadow-[0_30px_90px_rgba(15,23,42,0.35)] backdrop-blur-[22px]"
                        onMouseEnter={() => {
                          if (!isDesktop) return
                          openDropdown(item.label)
                        }}
                        onMouseLeave={() => {
                          if (!isDesktop) return
                          scheduleCloseDropdown(item.label)
                        }}
	                      >
                      {item.description && (
                        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      <div className="space-y-2">
                        {item.links?.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group/link block rounded-2xl border border-transparent bg-white p-3 transition-all hover:border-[hsl(var(--primary)_/_0.4)] hover:bg-white"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold">{link.label}</p>
                                {link.description && (
                                  <p className="text-xs text-muted-foreground">{link.description}</p>
                                )}
                              </div>
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted-foreground transition-transform group-hover/link:translate-x-1 group-hover/link:text-[hsl(var(--primary))]" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <AnimatePresence initial={false}>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-3 border-t border-white/15 px-4 pb-4 pt-3"
                    >
                      {item.description && (
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground/80">
                          {item.description}
                        </p>
                      )}
                      {item.links?.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMobileMenu}
                          className="block rounded-2xl border border-white/10 bg-[hsl(var(--background)_/_0.96)] px-3 py-2 text-sm font-semibold text-foreground/90 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition hover:-translate-y-0.5 hover:border-[hsl(var(--primary)_/_0.4)] hover:text-[hsl(var(--primary))]"
                        >
                          <p className="font-semibold">{link.label}</p>
                          {link.description && (
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    )
  }

  const mobileMenu = (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-[radial-gradient(circle_at_top,_rgba(3,7,18,0.85),_rgba(2,6,23,0.65))] backdrop-blur-[32px] lg:hidden"
          onClick={closeMobileMenu}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-hidden border-l border-white/15 bg-[hsl(var(--background)_/_0.97)] text-foreground shadow-[0_45px_140px_rgba(15,23,42,0.5)]"
            role="dialog"
            aria-modal="true"
            aria-label={
              locale === 'tr' ? 'Mobil navigasyon' : locale === 'ar' ? 'قائمة الجوال' : 'Mobile navigation'
            }
            id={MOBILE_MENU_ID}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)_/_0.6)] to-transparent" />
              <div className="absolute right-10 top-24 h-48 w-48 rounded-full bg-[radial-gradient(circle,_hsl(var(--primary)_/_0.2),_transparent_65%)] blur-3xl" />
            </div>
            <div className="relative flex h-16 items-center justify-between border-b border-white/15 bg-[hsl(var(--background)_/_0.98)] px-4">
              <span className="text-lg font-semibold">
                {locale === 'tr' ? 'Menü' : locale === 'ar' ? 'القائمة' : 'Menu'}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                aria-label={
                  locale === 'tr'
                    ? 'Menüyü kapat'
                    : locale === 'ar'
                    ? 'إغلاق القائمة'
                    : 'Close menu'
                }
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative flex-1 space-y-6 overflow-y-auto px-4 py-6">
              {renderNavLinks('mobile')}

              <div className="space-y-3 rounded-3xl border border-white/15 bg-[hsl(var(--background)_/_0.95)] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                <p className="text-sm font-semibold text-muted-foreground">
                  {locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'تواصل' : 'Contact'}
                </p>
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[hsl(var(--background)_/_0.97)] px-3 py-2 text-sm font-medium text-foreground/90 shadow-[0_18px_50px_rgba(15,23,42,0.14)]"
                    >
                      <Icon className="h-4 w-4 text-[hsl(var(--primary))]" />
                      {info.href ? (
                        <a href={info.href} onClick={closeMobileMenu} className="hover:text-[hsl(var(--primary))]">
                          {info.label}
                        </a>
                      ) : (
                        info.label
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="rounded-3xl border border-white/15 bg-[hsl(var(--background)_/_0.95)] p-4 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                <p className="mb-3 text-sm font-semibold text-muted-foreground">
                  {locale === 'tr' ? 'Dil Seçimi' : locale === 'ar' ? 'اختر اللغة' : 'Switch Language'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Link key={lang.code} href={`/${lang.code}`} onClick={closeMobileMenu}>
                      <Button variant={locale === lang.code ? 'default' : 'outline'}>{lang.name}</Button>
                    </Link>
                  ))}
                </div>
              </div>

              <Link href={`/${locale}/contact`} onClick={closeMobileMenu}>
                <Button className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-[hsl(var(--primary))] py-6 text-base font-semibold text-primary-foreground shadow-[0_20px_50px_rgba(255,138,52,0.4)]">
                  <span className="relative z-10">
                    {locale === 'tr' ? 'Hızlı Teklif Al' : locale === 'ar' ? 'اطلب عرضاً' : 'Get a Quote'}
                  </span>
                  <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.5),_transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <header className="relative sticky top-0 z-50 w-full overflow-visible border-b border-white/10 bg-background/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)_/_0.8)] to-transparent opacity-80" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)_/_0.5)] to-transparent opacity-60" />
        <div className="absolute left-1/2 top-[-35%] h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_hsl(var(--primary)_/_0.2),_transparent_65%)] blur-[140px]" />
        <div className="absolute right-0 top-[-5%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,_hsl(var(--primary)_/_0.16),_transparent_60%)] blur-[150px]" />
        <div className="absolute left-0 bottom-[-15%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,_hsl(var(--primary)_/_0.1),_transparent_70%)] blur-[160px]" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden border-b border-white/5 bg-white/5 text-[11px] text-foreground/70 backdrop-blur lg:block"
        >
          <div className="container flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              {topbarLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href || '#'}
                    className="relative inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.38em] text-foreground/80"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[hsl(var(--primary))] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                  {link.children && (
                    <div className="invisible absolute left-0 top-full mt-3 min-w-[220px] rounded-2xl border border-white/20 bg-white p-3 text-foreground shadow-[0_20px_80px_rgba(15,23,42,0.3)] backdrop-blur-xl opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-1 group-hover:opacity-100">
                      <ul className="space-y-2 text-sm">
                        {link.children.map((child) => (
                          <li key={child.label}>
                              <Link
                              href={child.href}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-foreground/80 transition hover:bg-white"
                            >
                              {child.label}
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-muted-foreground" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, scale: 1.05 }}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:text-[hsl(var(--primary))]"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-1 rounded-full border border-white/10 bg-background/70 px-2 py-1 text-[11px] font-semibold shadow-inner shadow-white/5">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={`/${lang.code}`}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-2 transition',
                      locale === lang.code
                        ? 'bg-[hsl(var(--primary))] text-primary-foreground shadow-[0_10px_30px_rgba(255,138,52,0.35)]'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <span>{lang.flag}</span>
                    {lang.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="container flex h-20 items-center justify-between"
        >
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/img/tarf.png"
                alt="TARF - Türkiye Araştırma Fonları Derneği"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </motion.div>

          {renderNavLinks('desktop')}

          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <Link href={`/${locale}/contact`} className="hidden lg:inline-flex">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-full border border-white/15 bg-[hsl(var(--primary))] px-6 py-5 text-base font-semibold text-primary-foreground shadow-[0_25px_60px_rgba(255,138,52,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_70px_rgba(255,138,52,0.5)]"
              >
                <span className="relative z-10">
                  {locale === 'tr' ? 'Başvuru Yap' : locale === 'ar' ? 'قدّم الآن' : 'Send Application'}
                </span>
                <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.55),_transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-80" />
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: [0.25, 0.4, 0.25], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -inset-6 rounded-full bg-[hsl(var(--primary)_/_0.55)] blur-3xl"
                />
              </Button>
            </Link>

            <Button
              size="icon"
              variant="outline"
              className="lg:hidden border-white/20 bg-white/5 text-foreground"
              aria-label={
                locale === 'tr'
                  ? 'Mobil menüyü aç'
                  : locale === 'ar'
                  ? 'افتح قائمة الجوال'
                  : 'Open mobile menu'
              }
              aria-controls={MOBILE_MENU_ID}
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
              onClick={() => {
                setActiveDropdown(null)
                setMobileOpen(true)
              }}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </header>

    {isMounted ? createPortal(mobileMenu, document.body) : null}
    </>
  )
}
