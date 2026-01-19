import { api, listPublishedPostSlugs } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, User, ArrowLeft, Share2, BookOpen, Clock3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { PostEngagement } from '@/components/ui/post-engagement'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'
import { cache } from 'react'
import { PostType } from '@prisma/client'

const getBlogPost = cache((slug: string, locale: string) => api.getBlogPost(slug, locale))

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const posts = await listPublishedPostSlugs(PostType.blog)
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
    const { post } = await getBlogPost(slug, locale)
    return buildPageMetadata({
      locale,
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      pathSegments: ['blog', slug],
      image: post.og_image || post.featured_image,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      keywords: [post.category?.name || '', post.author?.name || ''].filter(
        (keyword): keyword is string => Boolean(keyword)
      ),
    })
  } catch {
    return buildPageMetadata({ locale, page: 'blog', pathSegments: ['blog'] })
  }
}

// Okuma süresi hesaplama
function calculateReadingTime(content: string | null | undefined): number {
  if (!content) return 1
  const text = content.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPost({
  params
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const { post, related_posts } = await getBlogPost(slug, locale)
    const readingTime = calculateReadingTime(post.content || post.content_raw)

    return (
      <>
        <main className="relative min-h-screen overflow-hidden">
          {/* Global Background Pattern */}
          <div
            className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
            aria-hidden="true"
          />

          <div className="container relative z-10 pt-28 pb-10 lg:pt-36 lg:pb-20 space-y-8">
            {/* Navigation Bar */}
            <div className="flex items-center justify-between px-4">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild className="hover:bg-white/20 -ml-4 md:ml-0 rounded-full">
                  <Link href={`/${locale}/blog`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Blog\'a Dön' : locale === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
                  </Link>
                </Button>
              </Animate>
              <Animate variant="fadeIn" delay={0.15}>
                <Button variant="outline" className="rounded-full bg-white/40 border-white/40 hover:bg-white/60">
                  <Share2 className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Paylaş' : locale === 'ar' ? 'شارك' : 'Share'}
                </Button>
              </Animate>
            </div>

            <StaggerContainer>
              <StaggerItem>
                {/* Grand Unified Hero Card */}
                <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-white/40 bg-gradient-to-br from-white/80 via-white/50 to-white/30 p-2 shadow-[0_40px_100px_rgba(15,23,42,0.1),0_20px_50px_rgba(15,23,42,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-3xl group/card">
                  {/* Noise Texture */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                  {/* Decorative Shine */}
                  <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white/20 to-transparent rotate-45 pointer-events-none" />

                  <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-12 p-6 sm:p-10 lg:p-14 items-center">

                    {/* Left Side: Blog Details */}
                    <div className="flex flex-col gap-6 sm:gap-8 text-center lg:text-left justify-center">
                      <div className="space-y-6">
                        {/* Category Badge */}
                        <div className="flex justify-center lg:justify-start gap-3">
                          {post.category && (
                            <Badge className="bg-white/50 hover:bg-white/80 text-foreground border-white/40 backdrop-blur-md shadow-sm px-4 py-1 text-xs uppercase tracking-widest rounded-full">
                              {post.category.name}
                            </Badge>
                          )}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent filter drop-shadow-sm">
                          {post.title}
                        </h1>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-lg font-medium text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            {post.excerpt}
                          </p>
                        )}

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                          {/* Yazar */}
                          {post.author && (
                            <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <User className="h-5 w-5" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                  {locale === 'tr' ? 'Yazar' : locale === 'ar' ? 'الكاتب' : 'Author'}
                                </div>
                                <div className="text-sm font-bold text-slate-800">
                                  {post.author.name}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Tarih */}
                          <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {locale === 'tr' ? 'Tarih' : locale === 'ar' ? 'التاريخ' : 'Date'}
                              </div>
                              <div className="text-sm font-bold text-slate-800">
                                {new Date(post.created_at).toLocaleDateString(locale, {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Okuma Süresi */}
                          <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 backdrop-blur-sm shadow-sm">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Clock3 className="h-5 w-5" />
                            </div>
                            <div className="text-left">
                              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                {locale === 'tr' ? 'Okuma' : locale === 'ar' ? 'وقت القراءة' : 'Read'}
                              </div>
                              <div className="text-sm font-bold text-slate-800">
                                {readingTime} {locale === 'tr' ? 'dk' : locale === 'ar' ? 'د' : 'min'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Featured Image */}
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-[32px] bg-slate-100 shadow-2xl ring-1 ring-white/20 group/video aspect-video sm:aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
                        {post.featured_image ? (
                          <Image
                            src={resolveImageSrc(post.featured_image, getDefaultImage())}
                            alt={post.title}
                            fill
                            priority
                            className="object-cover transition-transform duration-700 group-hover/video:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                            <BookOpen className="h-20 w-20 text-slate-300" />
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Content Body */}
            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
              {/* Main Content */}
              <div className="space-y-8">
                <Animate variant="slideUp" delay={0.2}>
                  <Card className="overflow-hidden rounded-[32px] border border-white/40 bg-white/60 p-8 md:p-12 shadow-lg backdrop-blur-xl">
                    <div
                      className="prose prose-lg prose-slate max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                        prose-p:text-slate-600 prose-p:leading-relaxed
                        prose-li:text-slate-600
                        prose-strong:text-slate-900 prose-strong:font-bold
                        prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: post.content ?? post.content_raw ?? post.excerpt ?? '' }}
                    />

                    {/* Multimedia Embeds */}
                    {(post.youtube_url || post.audio_url) && (
                      <div className="mt-12 grid gap-8">
                        {post.youtube_url && (
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                            <iframe
                              src={post.youtube_url.replace('watch?v=', 'embed/')}
                              title={post.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full aspect-video"
                            />
                          </div>
                        )}
                        {post.audio_url && (
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                            <p className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                              {locale === 'tr' ? 'Ses Kaydı' : locale === 'ar' ? 'تسجيل صوتي' : 'Audio Recording'}
                            </p>
                            <audio controls className="w-full">
                              <source src={post.audio_url} />
                            </audio>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tags & Engagement */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                      <PostEngagement
                        postId={post.id}
                        initialLikes={(post as unknown as { likes?: number }).likes || 0}
                        tags={(() => {
                          const postMeta = (post as unknown as { meta?: { tags?: string } }).meta
                          if (postMeta?.tags) {
                            return String(postMeta.tags)
                              .split(/[,#]/)
                              .map((t: string) => t.trim())
                              .filter(Boolean)
                          }
                          return post.category ? [post.category.name] : []
                        })()}
                        locale={locale}
                        shareTitle={post.title}
                      />
                    </div>
                  </Card>
                </Animate>
              </div>

              {/* Sidebar: Related Posts */}
              <div className="space-y-6">
                {related_posts && related_posts.length > 0 && (
                  <Animate variant="slideInRight" delay={0.4}>
                    <h3 className="text-xl font-bold text-slate-900 px-2 mb-4">
                      {locale === 'tr' ? 'İlgili Yazılar' : locale === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}
                    </h3>
                    <div className="space-y-4">
                      {related_posts.map((related) => (
                        <Link href={`/${locale}/blog/${related.slug}`} key={related.id} className="block group">
                          <div className="flex gap-4 p-4 rounded-3xl bg-white/40 hover:bg-white/60 border border-white/40 shadow-sm backdrop-blur-md transition-all">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
                              {related.featured_image ? (
                                <Image
                                  src={resolveImageSrc(related.featured_image, getDefaultImage())}
                                  alt={related.title}
                                  fill
                                  className="object-cover transition-transform group-hover:scale-110"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <BookOpen className="h-8 w-8 text-slate-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">
                                {related.category?.name}
                              </p>
                              <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                {related.title}
                              </h4>
                              <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(related.created_at).toLocaleDateString(locale)}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Animate>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  } catch {
    notFound()
  }
}

