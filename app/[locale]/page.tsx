import { api } from '@/lib/api'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { BlogSection } from '@/components/sections/blog-section'
import { VideoSection } from '@/components/sections/video-section'
import { EventsCarousel } from '@/components/sections/events-carousel'
import { ContactCTA } from '@/components/sections/contact-cta'
import { FutureContribution } from '@/components/sections/future-contribution'
import { StatsShowcase } from '@/components/sections/stats-showcase'
import { ValuePillars } from '@/components/sections/value-pillars'
import { StrategicPages } from '@/components/sections/strategic-pages'
import { getContentPageGroups } from '@/lib/content-store'
type StaticHeroContent = {
  eyebrow?: string
  title: string
  subtitle: string
  primary_cta_label: string
  primary_cta_href: string
  tertiary_cta_label: string
  tertiary_cta_href: string
  stats: Array<{ value: string; label: string }>
  background_image?: string | null
  video_cover?: string | null
  video_url?: string | null
}

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
  const contentPageGroups = await getContentPageGroups()
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
          video_url: heroFromDb.video_url || STATIC_HERO_CONTENT[locale].video_url,
          video_cover: heroFromDb.video_cover || heroFromDb.background_image || STATIC_HERO_CONTENT[locale].background_image,
          video_url_2: heroFromDb.video_url_2,
          video_cover_2: heroFromDb.video_cover_2,
        }
      : STATIC_HERO_CONTENT[locale] || STATIC_HERO_CONTENT.tr

  return (
    <>
      <Header locale={locale} settings={data.settings} />
      
      <main className="min-h-screen bg-[linear-gradient(180deg,#fff4e7_0%,#fffefb_40%,#f7f7ff_100%)]">
        {/* Hero Section - Bilim, teknoloji ve irfan ile geleceği inşa ediyoruz */}
        <Hero locale={locale} data={heroContent} />

        {/* Events Carousel - Aktif etkinliklerimiz ve seminerler */}
        {data.events && data.events.length > 0 && (
          <EventsCarousel
            locale={locale}
            events={data.events}
          />
        )}

        {/* Blog Section - Düşünce yazıları, araştırmalar ve makaleler */}
        {data.blog_posts && data.blog_posts.length > 0 && (
          <BlogSection
            locale={locale}
            posts={data.blog_posts}
            categories={data.categories || []}
          />
        )}

        {/* Future Contribution - Projelerimiz ve teknoloji takımları */}
        <FutureContribution locale={locale} />

        {/* Value Pillars - Vizyonumuz ve değerlerimiz */}
        <ValuePillars locale={locale} />

        {/* Strategic Pages - Alt sayfalara giden bağlantılar */}
        <StrategicPages locale={locale} groups={contentPageGroups} />

        {/* Video Section - Eğitim videoları ve konuşmalar */}
        {data.videos && data.videos.length > 0 && (
          <VideoSection
            locale={locale}
            videos={data.videos}
          />
        )}

        {/* Stats Showcase - Sayılarla TARF ekosistemi */}
        <StatsShowcase
          locale={locale}
          servicesCount={data.services?.length || 0}
          eventsCount={data.events?.length || 0}
          blogCount={data.blog_posts?.length || 0}
          videosCount={data.videos?.length || 0}
          podcastsCount={data.podcasts?.length || 0}
          categories={data.categories}
        />

        {/* Contact CTA - Bize ulaşın ve projelerimize katılın */}
        <ContactCTA locale={locale} settings={data.settings} />
      </main>

      <Footer locale={locale} settings={data.settings} />
    </>
  )
}
