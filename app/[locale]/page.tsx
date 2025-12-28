import { api } from '@/lib/api'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Hero } from '@/components/sections/hero'
import { EventsCarousel } from '@/components/sections/events-carousel'
import { FutureContribution } from '@/components/sections/future-contribution'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

type StaticHeroContent = {
  eyebrow?: string
  title: string
  subtitle: string
  primary_cta_label: string
  primary_cta_href: string
  tertiary_cta_label: string
  tertiary_cta_href: string
  stats: Array<{ value: string; label: string }>
  headlineSlides?: Array<{ title: string; subtitle: string }>
  background_image?: string | null
  video_cover?: string | null
  video_url?: string | null
  video_url_2?: string | null
  video_cover_2?: string | null
  video_url_3?: string | null
  video_url_4?: string | null
  video_url_5?: string | null
}

export const revalidate = 3600

const STATIC_HERO_CONTENT: Record<string, StaticHeroContent> = {
  tr: {
    eyebrow: 'Tarf Düşünce Enstitüsü',
    title: 'Bilim, teknoloji ve irfanı bir araya getirerek geleceği inşa ediyoruz',
    subtitle:
      'TARF olarak profesyonel eğitim ve danışmanlık hizmetleri sunuyoruz. Uzman kadromuzla kaliteli eğitim programları ve danışmanlık hizmetleri.',
    primary_cta_label: 'TARF Ekosistemine Katılın',
    primary_cta_href: '/tr/contact',
    tertiary_cta_label: 'Tanıtım Filmi',
    tertiary_cta_href: '/tr/videos',
    stats: [
      { value: '6+', label: 'Ana Hizmet' },
      { value: '15+', label: 'Aktif Proje' },
      { value: '100+', label: 'Etkinlik' },
      { value: '500+', label: 'Katılımcı' },
    ],
  },
  en: {
    eyebrow: 'Tarf Think Tank Institute',
    title: 'Building the future by bringing together science, technology and wisdom',
    subtitle:
      'TARF provides professional education and consulting services. Quality education programs and consulting services with our expert staff.',
    primary_cta_label: 'Join TARF Ecosystem',
    primary_cta_href: '/en/contact',
    tertiary_cta_label: 'Watch Showreel',
    tertiary_cta_href: '/en/videos',
    stats: [
      { value: '6+', label: 'Main Services' },
      { value: '15+', label: 'Active Projects' },
      { value: '100+', label: 'Events' },
      { value: '500+', label: 'Participants' },
    ],
  },
  ar: {
    eyebrow: 'معهد تارف للفكر',
    title: 'بناء المستقبل من خلال الجمع بين العلم والتكنولوجيا والحكمة',
    subtitle:
      'يقدم TARF خدمات التعليم والاستشارات المهنية. برامج تعليمية عالية الجودة وخدمات استشارية مع فريقنا الخبير.',
    primary_cta_label: 'انضم إلى نظام TARF',
    primary_cta_href: '/ar/contact',
    tertiary_cta_label: 'شاهد الفيلم التعريفي',
    tertiary_cta_href: '/ar/videos',
    stats: [
      { value: '6+', label: 'الخدمات الرئيسية' },
      { value: '15+', label: 'المشاريع النشطة' },
      { value: '100+', label: 'الفعاليات' },
      { value: '500+', label: 'المشاركون' },
    ],
  },
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'home', pathSegments: [] })
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  let data
  try {
    data = await api.getHome(locale)
  } catch (error) {
    console.error('[home] API failed, using empty data', error)
    const settings = await api.getSettings(locale)
    data = {
      heroes: [],
      blog_posts: [],
      services: [],
      events: [],
      videos: [],
      podcasts: [],
      faqs: [],
      categories: [],
      settings,
    }
  }
  const heroFromDb = data.heroes && data.heroes.length > 0 ? data.heroes[0] : null
  const heroContent =
    heroFromDb
      ? {
        eyebrow: heroFromDb.eyebrow || STATIC_HERO_CONTENT[locale].eyebrow,
        title: heroFromDb.title || STATIC_HERO_CONTENT[locale].title,
        subtitle: heroFromDb.subtitle || STATIC_HERO_CONTENT[locale].subtitle,
        primary_cta_label: heroFromDb.button_text || STATIC_HERO_CONTENT[locale].primary_cta_label,
        primary_cta_href: heroFromDb.button_url || STATIC_HERO_CONTENT[locale].primary_cta_href,
        tertiary_cta_label: STATIC_HERO_CONTENT[locale].tertiary_cta_label,
        tertiary_cta_href: STATIC_HERO_CONTENT[locale].tertiary_cta_href,
        background_image: heroFromDb.background_image || STATIC_HERO_CONTENT[locale].background_image,
        stats: STATIC_HERO_CONTENT[locale].stats,
        headlineSlides: heroFromDb.headline_slides || STATIC_HERO_CONTENT[locale].headlineSlides,
        video_url: heroFromDb.video_url || STATIC_HERO_CONTENT[locale].video_url,
        video_cover: heroFromDb.video_cover || heroFromDb.background_image || STATIC_HERO_CONTENT[locale].background_image,
        video_url_2: heroFromDb.video_url_2,
        video_cover_2: heroFromDb.video_cover_2,
        video_url_3: heroFromDb.video_url_3,
        video_url_4: heroFromDb.video_url_4,
        video_url_5: heroFromDb.video_url_5,
      }
      : STATIC_HERO_CONTENT[locale] || STATIC_HERO_CONTENT.tr

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-white">
        <div
          className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-4 lg:gap-6">
          {/* Hero Section - Bilim, teknoloji ve irfan ile geleceği inşa ediyoruz */}
          <Hero locale={locale} data={heroContent} events={data.events} />

          {/* Events Carousel - Aktif etkinliklerimiz ve seminerler */}
          <ScrollReveal delay={0.2}>
            {(data.events && data.events.length > 0) || (data.past_events && data.past_events.length > 0) ? (
              <EventsCarousel
                locale={locale}
                upcomingEvents={data.events}
                pastEvents={data.past_events}
              />
            ) : null}
          </ScrollReveal>

          {/* Join CTA */}
          <ScrollReveal delay={0.2}>
            <FutureContribution locale={locale} />
          </ScrollReveal>
        </div>
      </main>

    </>
  )
}
