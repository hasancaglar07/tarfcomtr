import { api, listPublishedPostSlugs } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { stripImages } from '@/lib/html'
import { cache } from 'react'
import { PostType } from '@prisma/client'

const getPodcast = cache((slug: string, locale: string) => api.getPodcast(slug, locale))

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPostSlugs(PostType.podcast)
    return posts.map((post) => ({ locale: post.locale, slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)
  try {
    const { podcast } = await getPodcast(slug, locale)
    return buildPageMetadata({
      locale,
      title: podcast.title,
      description: podcast.excerpt,
      pathSegments: ['podcasts', slug],
      image: podcast.featured_image,
      type: 'article',
      publishedTime: podcast.created_at,
      modifiedTime: podcast.updated_at,
      keywords: [podcast.duration || '', podcast.category?.name || ''].filter(
        (keyword): keyword is string => Boolean(keyword)
      ),
    })
  } catch {
    return buildPageMetadata({ locale, page: 'podcasts', pathSegments: ['podcasts'] })
  }
}

export default async function PodcastDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const { podcast, related_podcasts } = await getPodcast(slug, locale)

    const getYouTubeId = (url?: string | null) => {
      if (!url) return null
      const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[1].length === 11 ? match[1] : null
    }

    const videoId = getYouTubeId(podcast.youtube_url as string)

    return (
      <>
        <main className="min-h-screen">
          <div className="border-b">
            <div className="container flex items-center justify-between py-4">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/podcasts`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Podcastlere Dön' : locale === 'ar' ? 'العودة إلى البودكاست' : 'Back to podcasts'}
                  </Link>
                </Button>
              </Animate>
              <Animate variant="fadeIn" delay={0.15}>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Paylaş' : locale === 'ar' ? 'شارك' : 'Share'}
                </Button>
              </Animate>
            </div>
          </div>

          <section className="bg-gradient-to-b from-primary/10 via-background to-background py-16">
            <Animate variant="slideUp" className="container max-w-4xl space-y-6">
              <Badge variant="secondary" className="w-fit">
                Podcast
              </Badge>
              <h1 className="text-4xl font-bold">{podcast.title}</h1>
              <p className="text-lg text-muted-foreground">{podcast.excerpt}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(podcast.created_at).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {podcast.duration && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {podcast.duration}
                  </span>
                )}
              </div>
            </Animate>
          </section>

          <div className="container py-10">
            <Animate variant="scaleUp" delay={0.2}>
              {videoId ? (
                <div className="relative aspect-video overflow-hidden rounded-3xl">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={podcast.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {locale === 'tr'
                      ? 'Bu bölüm için medya kaydı yakında eklenecek.'
                      : locale === 'ar'
                        ? 'سيتم إضافة تسجيل الوسائط لهذه الحلقة قريبًا.'
                        : 'Media for this episode will be available soon.'}
                  </p>
                </Card>
              )}
            </Animate>
          </div>

          <div className="container pb-16 space-y-10">
            <Animate variant="fadeIn" delay={0.3}>
              <Card className="p-8 md:p-12">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{
                    __html: stripImages(
                      podcast.content ?? podcast.content_raw ?? podcast.excerpt ?? '',
                    ),
                  }}
                />
              </Card>
            </Animate>

            {related_podcasts && related_podcasts.length > 0 && (
              <div>
                <Animate variant="slideUp" delay={0.4}>
                  <h2 className="text-2xl font-bold mb-4">
                    {locale === 'tr' ? 'İlgili Bölümler' : locale === 'ar' ? 'حلقات ذات صلة' : 'Related Episodes'}
                  </h2>
                </Animate>
                <StaggerContainer className="grid gap-4 md:grid-cols-2">
                  {related_podcasts.map((related) => (
                    <StaggerItem key={related.id}>
                      <Card className="p-5">
                      <p className="text-sm text-primary/80 mb-1">{related.category?.name}</p>
                      <h3 className="font-semibold line-clamp-2 mb-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{related.excerpt}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${locale}/podcasts/${related.slug}`}>
                          {locale === 'tr' ? 'Dinle' : locale === 'ar' ? 'استمع' : 'Listen'}
                        </Link>
                      </Button>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>
        </main>
      </>
    )
  } catch {
    notFound()
  }
}
