import { api } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)

  try {
    const { post } = await api.getBlogPost(slug, locale)
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

export default async function BlogPost({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)
  
  try {
    const { post, related_posts } = await api.getBlogPost(slug, locale)
    const settings = await api.getSettings(locale)

    return (
      <>
        <Header locale={locale} settings={settings} />
        
        <main className="min-h-screen">
          {/* Back Button */}
          <div className="border-b">
            <div className="container py-4">
              <Animate variant="fadeIn" delay={0.1}>
                <Button variant="ghost" asChild>
                  <Link href={`/${locale}/blog`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {locale === 'tr' ? 'Blog\'a Dön' : locale === 'ar' ? 'العودة إلى المدونة' : 'Back to Blog'}
                  </Link>
                </Button>
              </Animate>
            </div>
          </div>

          {/* Hero Section */}
          <div className="relative bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
            <div className="container">
              <Animate variant="slideUp" className="max-w-4xl mx-auto">
                {/* Category Badge */}
                {post.category && (
                  <Badge className="mb-4">
                    {post.category.name}
                  </Badge>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-muted-foreground mb-8">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.created_at}>
                      {new Date(post.created_at).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                {/* Share Button */}
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'Paylaş' : locale === 'ar' ? 'مشاركة' : 'Share'}
                </Button>
              </Animate>
            </div>
          </div>

          {/* Featured Image */}
          <div className="container py-8">
            <Animate variant="scaleUp" delay={0.2} className="max-w-4xl mx-auto">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={resolveImageSrc(post.featured_image, getDefaultImage())}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Animate>
          </div>

          {/* Content */}
          <div className="container py-8">
            <Animate variant="fadeIn" delay={0.3} className="max-w-4xl mx-auto">
              <Card className="p-8 md:p-12">
                <div
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content ?? post.content_raw ?? post.excerpt ?? '' }}
                />
              </Card>
            </Animate>
          </div>

          {/* Related Posts */}
          {related_posts && related_posts.length > 0 && (
            <div className="container py-12">
              <div className="max-w-4xl mx-auto">
                <Animate variant="slideUp" delay={0.4}>
                  <h2 className="text-2xl font-bold mb-6">
                    {locale === 'tr' ? 'İlgili Yazılar' : locale === 'ar' ? 'مقالات ذات صلة' : 'Related Posts'}
                  </h2>
                </Animate>
                <StaggerContainer className="grid md:grid-cols-2 gap-6">
                  {related_posts.map((related) => (
                    <StaggerItem key={related.id}>
                      <Card className="p-6 hover:shadow-lg transition-shadow">
                      <p className="text-sm text-primary/80 mb-2">{related.category?.name}</p>
                      <h3 className="text-lg font-semibold mb-3 line-clamp-2">{related.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{related.excerpt}</p>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/${locale}/blog/${related.slug}`}>
                          {locale === 'tr' ? 'Yazıyı Aç' : locale === 'ar' ? 'عرض المقال' : 'Read Article'}
                        </Link>
                      </Button>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          )}
        </main>

        <Footer locale={locale} settings={settings} />
      </>
    )
  } catch {
    notFound()
  }
}
