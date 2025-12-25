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
} from 'lucide-react'

interface HeaderProps {
  locale: string
  settings?: Settings
  contentPageSlugs?: string[]
  publishedPageSlugs?: string[]
}

interface NavSection {
  label: string
  href?: string
  description?: string
  links?: Array<{ label: string; href: string; description?: string }>
}

const MOBILE_MENU_ID = 'mobile-navigation-drawer'

export function Header({ locale, settings, contentPageSlugs, publishedPageSlugs }: HeaderProps) {
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
          label: locale === 'tr' ? 'Tarih, Kültür ve Medeniyet' : locale === 'ar' ? 'الثقافة والفن' : 'Culture & Art',
          href: `/${locale}/dusunce-enstitusu/kultur-sanat`,
          description: locale === 'tr' ? 'Kültürel araştırmalar' : 'Cultural research',
        },
        {
          label: locale === 'tr' ? 'Uluslararası İlişkiler' : locale === 'ar' ? 'العلاقات الدولية' : 'International Relations',
          href: `/${locale}/dusunce-enstitusu/uluslararasi-iliskiler`,
          description: locale === 'tr' ? 'Diplomasi ve bölgesel çalışmalar' : 'Diplomacy and regional studies',
        },
        {
          label: locale === 'tr' ? 'Çevre-İklim-Şehir' : locale === 'ar' ? 'البيئة والمناخ والطبيعة' : 'Environment & Climate',
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
          label: locale === 'tr' ? 'Akademi' : 'Overview',
          href: `/${locale}/akademi`,
          description: locale === 'tr' ? 'Merak eden gençlik' : 'Learning ecosystem',
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
          label: locale === 'tr' ? 'Ürünlerimiz' : locale === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
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
      ],
    },
    {
      label: locale === 'tr' ? 'Yayınlar' : locale === 'ar' ? 'المنشورات' : 'Publications',
      links: [
        {
          label:
            locale === 'tr'
              ? 'Yayın Anlayışımız'
              : locale === 'ar'
                ? 'رؤيتنا للنشر'
                : 'Publishing Ethos',
          href: `/${locale}/yayin-anlayisimiz`,
          description:
            locale === 'tr'
              ? 'Yayın ilkemiz'
              : locale === 'ar'
                ? 'رؤيتنا التحريرية'
                : 'Editorial approach',
        },
        {
          label: locale === 'tr' ? 'Tarf Dergi' : locale === 'ar' ? 'مجلة تارف' : 'Tarf Magazine',
          href: `/${locale}/dergi`,
          description: locale === 'tr' ? 'Bilim ve teknoloji dergisi' : 'Science and technology magazine',
        },
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

  const contentPageSet = new Set(contentPageSlugs ?? [])
  const publishedPageSet = new Set(publishedPageSlugs ?? [])

  const normalizeSlug = (href?: string) => {
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

  const shouldShowLink = (href?: string) => {
    const slug = normalizeSlug(href)
    if (!slug) return true
    if (contentPageSet.size === 0) return true
    if (!contentPageSet.has(slug)) return true
    if (publishedPageSet.size === 0) return true
    return publishedPageSet.has(slug)
  }

  const visibleNavigation = navigation
    .map((item) => {
      if (item.links?.length) {
        const links = item.links.filter((link) => shouldShowLink(link.href))
        if (links.length === 0) return null
        return { ...item, links }
      }
      if (item.href && !shouldShowLink(item.href)) {
        return null
      }
      return item
    })
    .filter(Boolean) as NavSection[]

  const renderNavLinks = (variant: 'desktop' | 'mobile' = 'desktop') => {
    const isDesktop = variant === 'desktop'

    return (
      <motion.div
        layout
        className={cn(
          isDesktop
            ? 'hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[0_30px_60px_rgba(255,138,52,0.18)] backdrop-blur-2xl'
            : 'flex flex-col'
        )}
        {...(isDesktop
          ? {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35, delay: 0.1 },
          }
          : {})}
      >
        {visibleNavigation.map((item, index) => {
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
                className={!isDesktop ? 'border-b border-white/5 last:border-0' : undefined}
              >
                <Link
                  href={item.href || '#'}
                  className={cn(
                    'group relative isolate flex items-center gap-2 transition-all',
                    isDesktop
                      ? 'rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/80 hover:text-foreground'
                      : 'w-full py-4 text-lg font-medium text-foreground hover:text-primary'
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
                  : 'border-b border-white/5 last:border-0'
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
                  'group inline-flex w-full items-center justify-between gap-2 transition-all',
                  isDesktop
                    ? 'relative isolate rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/80 hover:text-foreground'
                    : 'w-full py-4 text-lg font-medium text-foreground hover:text-primary'
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
                      <div className="space-y-2">
                        {item.links?.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="group/link block rounded-2xl border border-transparent bg-white p-3 transition-all hover:border-[hsl(var(--primary)_/_0.4)] hover:bg-white hover:shadow-lg"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-foreground group-hover/link:text-primary">{link.label}</p>
                              <ChevronDown className="h-3.5 w-3.5 shrink-0 -rotate-90 text-muted-foreground transition-transform group-hover/link:translate-x-1 group-hover/link:text-[hsl(var(--primary))]" />
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
                      className="overflow-hidden bg-white/5 rounded-2xl mb-4"
                    >
                      <div className="flex flex-col p-2 space-y-1">
                        {item.links?.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-primary"
                          >
                            <span>{link.label}</span>
                            <ChevronDown className="-rotate-90 h-3 w-3 opacity-50" />
                          </Link>
                        ))}
                      </div>
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
          className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-md lg:hidden"
          onClick={closeMobileMenu}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 bottom-0 h-full w-full max-w-sm border-l border-white/10 bg-background shadow-2xl flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={
              locale === 'tr' ? 'Mobil navigasyon' : locale === 'ar' ? 'قائمة الجوال' : 'Mobile navigation'
            }
            id={MOBILE_MENU_ID}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  {locale === 'tr' ? 'Menü' : locale === 'ar' ? 'القائمة' : 'Menu'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobileMenu}
                className="hover:bg-white/5 rounded-full"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-hide">
              {renderNavLinks('mobile')}

              {/* Extras Divider */}
              <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Contact Information */}
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {locale === 'tr' ? 'İletişim' : locale === 'ar' ? 'تواصل' : 'Contact'}
                </h4>
                <div className="space-y-3">
                  {contactInfo.map((info, idx) => {
                    const Icon = info.icon
                    return (
                      <div key={idx} className="flex items-center gap-4 text-foreground/80">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/5 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        {info.href ? (
                          <a href={info.href} onClick={closeMobileMenu} className="text-sm font-medium hover:text-primary transition-colors">
                            {info.label}
                          </a>
                        ) : (
                          <span className="text-sm font-medium">{info.label}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action Button */}
              <Link href={`/${locale}/contact`} onClick={closeMobileMenu} className="block">
                <Button className="w-full h-14 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 transition-all">
                  {locale === 'tr' ? 'Başvuru Yap' : locale === 'ar' ? 'قدّم الآن' : 'Send Application'}
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="container flex h-16 items-center justify-between lg:h-20"
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
