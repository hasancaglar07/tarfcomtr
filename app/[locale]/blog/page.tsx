import { api } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { Calendar, BookOpen, ArrowRight, User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

export const revalidate = 3600

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
  return buildPageMetadata({ locale, page: 'blog', pathSegments: ['blog'] })
}

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const posts = await api.getBlogPosts(locale)

  const pageTitle = {
    tr: 'Blog',
    en: 'Blog',
    ar: 'المدونة'
  }

  const pageDescription = {
    tr: 'Uzmanlarımızdan görüşler, makaleler ve içerikler',
    en: 'Insights, articles and content from our experts',
    ar: 'رؤى ومقالات ومحتوى من خبرائنا'
  }

  const labels = {
    tr: {
      readMore: 'Devamını Oku',
      noPosts: 'Henüz blog yazısı yok.'
    },
    en: {
      readMore: 'Read More',
      noPosts: 'No blog posts yet.'
    },
    ar: {
      readMore: 'اقرأ المزيد',
      noPosts: 'لا توجد مقالات بعد'
    }
  }
  const content = labels[locale as keyof typeof labels] || labels.en

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Global Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
        aria-hidden="true"
      />

      <div className="container relative z-10 pt-28 pb-10 lg:pt-36 lg:pb-20 space-y-12">
        {/* Premium Header Section */}
        <Animate variant="fadeIn">
          <div className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/60 px-6 py-12 text-center shadow-lg backdrop-blur-2xl md:px-12 md:py-16">
            {/* Ambient Orbs */}
            <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[80px]" />
            <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[80px]" />

            <div className="relative z-10 mx-auto max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
                <BookOpen className="h-4 w-4" />
                <span>TARF Blog</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
              </h1>
              <p className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed">
                {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
              </p>
            </div>
          </div>
        </Animate>

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <StaggerItem key={post.id}>
                <AnimatedCard className="h-full">
                  <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
                    <div className="h-full flex flex-col overflow-hidden rounded-[32px] border border-white/40 bg-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-white/80">
                      {/* Featured Image */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        {post.featured_image ? (
                          <Image
                            src={resolveImageSrc(post.featured_image, getDefaultImage())}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-50 to-white">
                            <BookOpen className="h-12 w-12 text-primary/40" />
                          </div>
                        )}
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />

                        {/* Category Badge */}
                        {post.category && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/90 text-foreground border-white/40 backdrop-blur-md shadow-sm px-3 py-1 text-xs uppercase tracking-widest rounded-full">
                              {post.category.name}
                            </Badge>
                          </div>
                        )}

                        {/* Date Badge */}
                        <div className="absolute bottom-4 right-4">
                          <div className="flex flex-col items-center justify-center rounded-xl bg-white/90 px-3 py-2 text-center shadow-md backdrop-blur">
                            <span className="text-xl font-black text-slate-900 leading-none">
                              {new Date(post.created_at).getDate()}
                            </span>
                            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                              {new Date(post.created_at).toLocaleDateString(locale, { month: 'short' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col">
                        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed mb-4 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 mb-4">
                          {post.author && (
                            <span className="inline-flex items-center gap-1.5">
                              <User className="h-3 w-3 text-primary/70" />
                              {post.author.name}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-primary/70" />
                            {new Date(post.created_at).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Read More Link */}
                        <div className="pt-4 border-t border-slate-200/50">
                          <span className="inline-flex items-center text-sm font-bold text-primary group-hover:underline decoration-2 underline-offset-4">
                            {content.readMore}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="rounded-[32px] border border-dashed border-slate-300 bg-white/30 p-12 text-center text-lg text-slate-500">
            {content.noPosts}
          </div>
        )}
      </div>
    </main>
  )
}

