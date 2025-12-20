import { api, listPublishedPostSlugs } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, User, ArrowLeft, Play } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { cache } from 'react'
import { PostType } from '@prisma/client'

const getVideo = cache((slug: string, locale: string) => api.getVideo(slug, locale))

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPostSlugs(PostType.video)
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
    const { video } = await getVideo(slug, locale)
    return buildPageMetadata({
      locale,
      title: video.title,
      description: video.excerpt,
      pathSegments: ['videos', slug],
      image: video.featured_image,
      type: 'article',
      publishedTime: video.created_at,
      modifiedTime: video.updated_at,
      keywords: [video.category?.name || '', video.author?.name || ''].filter(
        (keyword): keyword is string => Boolean(keyword)
      ),
    })
  } catch {
    return buildPageMetadata({ locale, page: 'videos', pathSegments: ['videos'] })
  }
}

export default async function VideoPage({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)
  
  try {
    const [{ video, related_videos }, settings] = await Promise.all([
      getVideo(slug, locale),
      api.getSettings(locale),
    ])

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return (match && match[2].length === 11) ? match[2] : null
    }

    const videoId = video.youtube_url ? getYouTubeId(video.youtube_url) : null

    return (
      <>
        <Header locale={locale} settings={settings} />
        
        <main className="min-h-screen">
          {/* Back Button */}
          <div className="border-b">
            <div className="container py-4">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/videos`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Videolara Dön' : locale === 'ar' ? 'العودة إلى الفيديوهات' : 'Back to Videos'}
                  </Link>
                </Button>
              </Animate>
            </div>
          </div>

          {/* Video Player Section */}
          <div className="bg-black">
            <div className="container py-8">
              <Animate variant="scaleUp" delay={0.2} className="max-w-5xl mx-auto">
                {videoId ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <Play className="w-20 h-20 text-muted-foreground" />
                  </div>
                )}
              </Animate>
            </div>
          </div>

          {/* Video Info */}
          <div className="container py-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <Animate variant="slideUp" delay={0.3} className="lg:col-span-2">
                  <Card className="p-8">
                    {/* Category Badge */}
                    {video.category && (
                      <Badge className="mb-4">
                        {video.category.name}
                      </Badge>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">
                      {video.title}
                    </h1>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-muted-foreground mb-8 pb-8 border-b">
                      {video.author && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{video.author.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={video.created_at}>
                          {new Date(video.created_at).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>

                    {/* Description */}
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                      dangerouslySetInnerHTML={{ __html: video.content ?? video.content_raw ?? video.excerpt ?? '' }}
                    />
                  </Card>
                </Animate>
  
                {/* Sidebar - Related Videos */}
                <Animate variant="slideInRight" delay={0.4}>
                  <div>
                    <h3 className="text-xl font-bold mb-4">
                      {locale === 'tr' ? 'İlgili Videolar' : locale === 'ar' ? 'فيديوهات ذات صلة' : 'Related Videos'}
                    </h3>
                    <StaggerContainer className="space-y-4">
                      {related_videos && related_videos.length > 0 ? (
                        related_videos.map((related) => (
                          <StaggerItem key={related.id}>
                            <Card className="p-4">
                          <p className="text-sm text-primary/80">{related.category?.name}</p>
                          <h4 className="font-semibold line-clamp-2">{related.title}</h4>
                          <Button variant="ghost" size="sm" className="mt-2 px-0 text-primary" asChild>
                            <Link href={`/${locale}/videos/${related.slug}`}>
                              {locale === 'tr' ? 'İzle' : locale === 'ar' ? 'شاهد' : 'Watch'}
                            </Link>
                          </Button>
                            </Card>
                          </StaggerItem>
                        ))
                      ) : (
                        <Card className="p-6 text-muted-foreground">
                          {locale === 'tr' ? 'Henüz ilgili video yok.' : 'No related videos yet.'}
                        </Card>
                      )}
                    </StaggerContainer>
                  </div>
                </Animate>
              </div>
            </div>
          </div>
        </main>

        <Footer locale={locale} settings={settings} />
      </>
    )
  } catch {
    notFound()
  }
}
