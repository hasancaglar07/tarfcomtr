import { api } from '@/lib/api'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { normalizeLocale } from '@/lib/i18n'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'
import { buildPageMetadata } from '@/lib/seo'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

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
  const settings = await api.getSettings(locale)

  const pageTitle = {
    tr: 'Blog',
    en: 'Blog',
    ar: 'المدونة'
  }

  const pageDescription = {
    tr: 'En son haberler, makaleler ve içerikler',
    en: 'Latest news, articles and content',
    ar: 'أحدث الأخبار والمقالات والمحتوى'
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

        {/* Blog Posts Grid */}
        <div className="container py-12">
          {posts && posts.length > 0 ? (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <AnimatedCard className="h-full">
                    <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="relative h-48 w-full bg-muted overflow-hidden">
                    <Image
                      src={resolveImageSrc(post.featured_image, getDefaultImage())}
                      alt={post.title}
                      fill
                      className="object-contain p-6"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.category && (
                        <Badge variant="secondary">{post.category.name}</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.created_at}>
                          {new Date(post.created_at).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </time>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {locale === 'tr' ? 'Devamını Oku' : locale === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                      </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                {locale === 'tr' ? 'Henüz blog yazısı yok.' : locale === 'ar' ? 'لا توجد مقالات بعد' : 'No blog posts yet.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer locale={locale} settings={settings} />
    </>
  )
}
