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
    video_url: 'https://www.youtube.com/watch?v=Qt6oaPhToZ4',
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
    video_url: 'https://www.youtube.com/watch?v=Qt6oaPhToZ4',
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
    video_url: 'https://www.youtube.com/watch?v=Qt6oaPhToZ4',
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
  const data = await api.getHome(locale)
  const heroContent = STATIC_HERO_CONTENT[locale] || STATIC_HERO_CONTENT.tr

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
        <StrategicPages locale={locale} />

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
