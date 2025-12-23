import { api } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

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
  return buildPageMetadata({ locale, page: 'videos', pathSegments: ['videos'] })
}

export default async function VideosPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const videos = await api.getVideos(locale)
  const settings = await api.getSettings(locale)

  const pageTitle = {
    tr: 'Videolar',
    en: 'Videos',
    ar: 'الفيديوهات'
  }

  const pageDescription = {
    tr: 'Eğitim videoları ve içerikler',
    en: 'Educational videos and content',
    ar: 'مقاطع الفيديو التعليمية والمحتوى'
  }

  return (
    <>
      <Header locale={locale} settings={settings} />
      
      <main className="min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container">
            <Animate variant="slideUp" className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
              </h1>
              <p className="text-xl text-muted-foreground">
                {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
              </p>
            </Animate>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="container py-12">
          {videos && videos.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <StaggerItem key={video.id}>
                  <Link
                    href={`/${locale}/videos/${video.slug}`}
                    className="group block h-full"
                  >
                    <AnimatedCard className="h-full">
                      <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                    <div className="relative aspect-video bg-black">
                      {video.featured_image ? (
                        <Image
                          src={resolveImageSrc(video.featured_image, getDefaultImage())}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:opacity-75 transition-opacity"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      {video.category && (
                        <Badge variant="secondary" className="mb-2">
                          {video.category.name}
                        </Badge>
                      )}
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {video.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={video.created_at}>
                          {new Date(video.created_at).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedCard>
                </Link>
              </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                {locale === 'tr' ? 'Henüz video yok.' : locale === 'ar' ? 'لا توجد مقاطع فيديو بعد' : 'No videos yet.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale} settings={settings} />
    </>
  )
}
