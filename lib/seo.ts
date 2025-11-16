import type { Metadata } from 'next'
import { SUPPORTED_LOCALES, normalizeLocale, type SupportedLocale } from '@/lib/i18n'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tarfakademi.com'

export const siteSeoConfig = {
  siteName: 'TARF Akademi',
  defaultImage: '/img/og-default.png',
  locales: {
    tr: {
      title: 'TARF Akademi · Bilim, teknoloji ve etik üretim ekosistemi',
      description:
        'TARF Akademi; bilim, teknoloji ve etik ekseninde çalışan danışmanlık, eğitim ve yayın ekosistemi. Ankara ve İstanbul merkezli üretim stüdyolarımızla hibrit çözümler tasarlıyor, gençleri geleceğin becerileriyle buluşturuyoruz.',
      keywords: [
        'TARF Akademi',
        'teknoloji eğitimi',
        'danışmanlık',
        'gençlik projeleri',
        'bilim',
        'etik teknoloji',
      ],
    },
    en: {
      title: 'TARF Academy · Science, technology and ethics ecosystem',
      description:
        'TARF Academy is a multi-layered ecosystem delivering advisory, education and publications across science, software and ethics. From Ankara and Istanbul studios we design hybrid programs that prepare young talent for the future.',
      keywords: [
        'TARF Academy',
        'technology education',
        'consulting',
        'youth programs',
        'science',
        'ethical technology',
      ],
    },
    ar: {
      title: 'أكاديمية تاراف · منظومة العلم والتقنية والقيم',
      description:
        'توفر أكاديمية TARF منظومة متعددة المستويات تجمع بين الاستشارات والتعليم والنشر في العلوم والتقنية والأخلاق. من استوديوهاتنا في أنقرة وإسطنبول نصمم برامج هجينة لتأهيل الشباب لمهارات المستقبل.',
      keywords: [
        'أكاديمية تاراف',
        'التعليم التقني',
        'الاستشارات',
        'برامج الشباب',
        'العلم',
        'الأخلاقيات',
      ],
    },
  } satisfies Record<SupportedLocale, { title: string; description: string; keywords: string[] }>,
  pages: {
    home: {
      tr: {
        title: 'TARF Akademi · Gençler için teknoloji ve bilim programları',
        description:
          'Danışmanlık, yayıncılık ve teknoloji takımlarımızla kurumlara özel programlar tasarlıyoruz. Hibrit atölyeler, saha projeleri ve yayınlarla üretken gençlik ekosistemi kuruyoruz.',
      },
      en: {
        title: 'TARF Academy · Technology and science programs for future talent',
        description:
          'We co-design customized advisory, publishing and technology programs. Hybrid workshops, field projects and media enable a productive youth ecosystem.',
      },
      ar: {
        title: 'أكاديمية TARF · برامج العلوم والتقنية للمواهب الصاعدة',
        description:
          'نشارك المؤسسات في تصميم برامج استشارية وتقنية ونشر متخصصة. ورش هجينة ومشاريع ميدانية وإعلام لإطلاق منظومة شباب منتجة.',
      },
    },
    blog: {
      tr: {
        title: 'TARF Blog · Makaleler ve düşünce yazıları',
        description:
          'Bilim, teknoloji ve etik odağında yayımlanan makaleleri keşfedin; yeni sayı ve araştırmalardan haberdar olun.',
      },
      en: {
        title: 'TARF Blog · Articles and thought pieces',
        description: 'Explore articles across science, technology and ethics; stay up to date with new issues.',
      },
      ar: {
        title: 'مدونة TARF · مقالات وأوراق فكرية',
        description: 'اكتشف المقالات التي تغطي العلم والتقنية والأخلاق واطلع على الإصدارات الجديدة.',
      },
    },
    events: {
      tr: {
        title: 'Etkinlikler · TARF Akademi',
        description:
          'Atölyeler, zirveler ve saha programları. Yaklaşan etkinliklerimizi keşfedin ve yerinizi ayırtın.',
      },
      en: {
        title: 'Events · TARF Academy',
        description: 'Workshops, summits and field programmes. Discover the upcoming experiences.',
      },
      ar: {
        title: 'الفعاليات · أكاديمية TARF',
        description: 'ورش وقمم وبرامج ميدانية. اطّلع على فعالياتنا القادمة واحجز مكانك.',
      },
    },
    services: {
      tr: {
        title: 'Programlar ve hizmetler · TARF Akademi',
        description: 'Kurumlara özel danışmanlık, eğitim ve teknoloji programlarımızı inceleyin.',
      },
      en: {
        title: 'Services & programmes · TARF Academy',
        description: 'Review our advisory, education and technology programmes tailored for organisations.',
      },
      ar: {
        title: 'الخدمات والبرامج · أكاديمية TARF',
        description: 'استعرض برامج الاستشارات والتعليم والتقنية المصممة للمؤسسات.',
      },
    },
    contact: {
      tr: {
        title: 'İletişim · TARF Akademi',
        description:
          'TARF ekipleriyle hibrit toplantı planlayın, danışmanlık veya eğitim çözümlerini birlikte tasarlayalım.',
      },
      en: {
        title: 'Contact · TARF Academy',
        description: 'Plan a hybrid meeting with TARF teams to co-design advisory or education solutions.',
      },
      ar: {
        title: 'تواصل معنا · أكاديمية TARF',
        description: 'احجز اجتماعاً هجينا مع فرق TARF لتصميم حلول الاستشارات أو التعليم.',
      },
    },
    faq: {
      tr: {
        title: 'SSS · TARF Akademi',
        description: 'Programlar, başvurular ve ortaklık modelleri hakkında sık sorulan sorular.',
      },
      en: {
        title: 'FAQ · TARF Academy',
        description: 'Frequently asked questions about programmes, applications and partnerships.',
      },
      ar: {
        title: 'الأسئلة الشائعة · أكاديمية TARF',
        description: 'إجابات عن أبرز الأسئلة حول البرامج والتقديمات والشراكات.',
      },
    },
    podcasts: {
      tr: {
        title: 'Podcastler · TARF Akademi',
        description: 'İrfan, bilim ve teknoloji sohbetleri. Yeni bölümleri dinleyin.',
      },
      en: {
        title: 'Podcasts · TARF Academy',
        description: 'Conversations on wisdom, science and technology. Listen to new episodes.',
      },
      ar: {
        title: 'البودكاست · أكاديمية TARF',
        description: 'حوارات حول الحكمة والعلم والتقنية. استمع إلى الحلقات الجديدة.',
      },
    },
    videos: {
      tr: {
        title: 'Videolar · TARF Akademi',
        description: 'Eğitim yayınları, etkinlik kayıtları ve belgeseller.',
      },
      en: {
        title: 'Videos · TARF Academy',
        description: 'Educational releases, event recordings and documentaries.',
      },
      ar: {
        title: 'الفيديوهات · أكاديمية TARF',
        description: 'إصدارات تعليمية وتسجيلات فعاليات وأفلام وثائقية.',
      },
    },
  } as const,
}

type PageKey = keyof typeof siteSeoConfig.pages

const sanitizeSegments = (segments?: Array<string | number>) => {
  if (!segments || segments.length === 0) return []
  return segments.map((segment) => encodeURIComponent(String(segment))).filter(Boolean)
}

const buildPathname = (locale: SupportedLocale, segments?: Array<string | number>) => {
  const sanitized = sanitizeSegments(segments)
  if (sanitized.length === 0) {
    return `/${locale}`
  }
  return `/${locale}/${sanitized.join('/')}`
}

export const absoluteUrl = (path: string) => {
  try {
    return new URL(path, SITE_URL).toString()
  } catch {
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
  }
}

interface SeoParams {
  locale?: string
  page?: PageKey
  title?: string | null
  description?: string | null
  pathSegments?: Array<string | number>
  image?: string | null
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
}

const normalizeImageUrl = (image?: string | null) => {
  if (!image) return absoluteUrl(siteSeoConfig.defaultImage)
  if (image.startsWith('http')) return image
  return absoluteUrl(image)
}

export function buildPageMetadata({
  locale: rawLocale,
  page,
  title,
  description,
  pathSegments,
  image,
  keywords = [],
  type = 'website',
  publishedTime,
  modifiedTime,
}: SeoParams = {}): Metadata {
  const locale = normalizeLocale(rawLocale)
  const localizedDefaults = siteSeoConfig.locales[locale]
  const localizedPage = page ? siteSeoConfig.pages[page]?.[locale] : undefined

  const finalTitle = title || localizedPage?.title || localizedDefaults.title
  const finalDescription = description || localizedPage?.description || localizedDefaults.description
  const mergedKeywords = Array.from(new Set([...(localizedDefaults.keywords || []), ...keywords]))
  const pathname = buildPathname(locale, pathSegments)
  const languages = SUPPORTED_LOCALES.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = absoluteUrl(buildPathname(lang, pathSegments))
    return acc
  }, {})

  const ogImage = normalizeImageUrl(image)

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: mergedKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: absoluteUrl(pathname),
      languages,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: absoluteUrl(pathname),
      siteName: siteSeoConfig.siteName,
      type,
      locale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      ...(type === 'article'
        ? {
            publishedTime: publishedTime || undefined,
            modifiedTime: modifiedTime || publishedTime || undefined,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
    },
  }
}
