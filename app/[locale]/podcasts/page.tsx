import { api } from '@/lib/api'
import { normalizeLocale } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'podcasts', pathSegments: ['podcasts'] })
}

export default async function PodcastsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const [podcasts, settings] = await Promise.all([
    api.getPodcasts(locale),
    api.getSettings(locale),
  ])

  const pageTitle = {
    tr: 'Podcast Serileri',
    en: 'Podcast Series',
    ar: 'سلاسل البودكاست',
  }

  const pageDescription = {
    tr: 'Uzmanlarla teknoloji, eğitim ve strateji sohbetleri',
    en: 'Conversations on technology, education and strategy',
    ar: 'حوارات حول التكنولوجيا والتعليم والاستراتيجية',
  }

  return (
    <>
      <Header locale={locale} settings={settings} />
      <main className="min-h-screen">
        <section className="bg-gradient-to-r from-primary via-primary/80 to-primary py-16 text-primary-foreground">
          <div className="container">
            <Animate variant="slideUp" className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-primary-foreground/70">
                TARF Podcasts
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
              </h1>
              <p className="text-lg text-primary-foreground/70 max-w-3xl">
                {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
              </p>
            </Animate>
          </div>
        </section>

        <div className="container py-16">
          {podcasts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              {locale === 'tr' ? 'Henüz podcast yayımlanmadı.' : locale === 'ar' ? 'لا توجد حلقات بودكاست بعد.' : 'No podcast episodes yet.'}
            </div>
          ) : (
            <StaggerContainer className="grid gap-8 md:grid-cols-2">
              {podcasts.map((podcast) => (
                <StaggerItem key={podcast.id}>
                  <AnimatedCard className="h-full">
                    <Card className="overflow-hidden group flex flex-col md:flex-row h-full">
                  <div className="relative h-56 w-full md:h-auto md:w-1/3 bg-primary/10">
                    {podcast.featured_image ? (
                      <Image
                        src={resolveImageSrc(podcast.featured_image, getDefaultImage())}
                        alt={podcast.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        🎙️
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="rounded-full bg-white/90 p-4 text-primary shadow-xl">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                      <Badge variant="outline">{locale === 'tr' ? 'Bölüm' : locale === 'ar' ? 'حلقة' : 'Episode'}</Badge>
                      <span>TARF Kast</span>
                    </div>
                    <Link href={`/${locale}/podcasts/${podcast.slug}`} className="text-2xl font-semibold hover:text-primary transition-colors">
                      {podcast.title}
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-3">{podcast.excerpt}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(podcast.created_at).toLocaleDateString(locale, {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      {podcast.duration && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {podcast.duration}
                        </span>
                      )}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/${locale}/podcasts/${podcast.slug}`}>
                        {locale === 'tr' ? 'Dinle' : locale === 'ar' ? 'استمع' : 'Listen'}
                      </Link>
                      </Button>
                    </div>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </main>
      <Footer locale={locale} settings={settings} />
    </>
  )
}
