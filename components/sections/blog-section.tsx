'use client'

import type { Category, Post } from '@/lib/api'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Animate, StaggerContainer, StaggerItem, AnimatedCard } from '@/components/ui/animate'

type BlogPost = Post
type BlogCategory = Category

interface BlogSectionProps {
  locale: string
  posts: BlogPost[]
  categories?: BlogCategory[]
}

const defaultContent = {
  tr: {
    title: 'Düşünce ve Araştırma',
    subtitle: 'Bilim, teknoloji, felsefe ve toplum üzerine derinlemesine yazılar ve araştırmalar. TARF Düşünce Enstitüsü\'nün özgün içerikleri.',
    all: 'Tümü',
    read_more: 'Devamını Oku',
    view_all: 'Tüm Yazıları İncele',
    no_posts: 'Bu kategoride henüz yazı bulunmuyor.'
  },
  en: {
    title: 'Thought and Research',
    subtitle: 'In-depth articles and research on science, technology, philosophy and society. Original content from TARF Think Tank.',
    all: 'All',
    read_more: 'Read More',
    view_all: 'Explore All Articles',
    no_posts: 'No posts in this category yet.'
  },
  ar: {
    title: 'الفكر والبحث',
    subtitle: 'مقالات وأبحاث متعمقة حول العلم والتكنولوجيا والفلسفة والمجتمع. محتوى أصلي من معهد تارف للفكر.',
    all: 'الكل',
    read_more: 'اقرأ المزيد',
    view_all: 'استكشف جميع المقالات',
    no_posts: 'لا توجد مشاركات في هذه الفئة حتى الآن.'
  }
}

export function BlogSection({ locale, posts, categories = [] }: BlogSectionProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en

  if (posts.length === 0) {
    return (
      <section className="py-20">
        <div className="container text-center">
          <p className="text-muted-foreground">{content.no_posts}</p>
        </div>
      </section>
    )
  }

  // Group posts by category
  const allPosts = posts
  const categoriesWithPosts = categories.filter(cat => 
    posts.some(post => post.category?.id === cat.id)
  )

  const renderPostGrid = (filteredPosts: BlogPost[]) => (
    <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredPosts.map((post) => (
        <StaggerItem key={post.id}>
          <AnimatedCard className="h-full">
            <Card className="group relative h-full overflow-hidden border border-border/60 bg-gradient-to-b from-muted/60 via-background to-background hover:shadow-xl transition-all duration-300 flex flex-col">
              <CardHeader className="flex-1 space-y-3">
                {post.category && (
                  <Badge variant="secondary" className="w-fit">
                    {post.category.name}
                  </Badge>
                )}
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 mt-auto">
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <Button variant="ghost" size="sm" className="group/btn p-0 h-auto" asChild>
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    {content.read_more}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </AnimatedCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )

  return (
    <section className="py-20">
      <div className="container">
        {/* Header */}
        <Animate variant="slideUp" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </Animate>

        {/* Category Tabs */}
        {categoriesWithPosts.length > 0 ? (
          <Tabs defaultValue="all" className="w-full">
            {/* Category Pills */}
            <div className="flex justify-center mb-8">
              <TabsList className="inline-flex h-auto p-1 bg-secondary/50 backdrop-blur-sm flex-wrap gap-2">
                <TabsTrigger
                  value="all"
                  className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                >
                  {content.all}
                </TabsTrigger>
                {categoriesWithPosts.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.slug}
                    className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* All Posts Tab */}
            <TabsContent value="all" className="mt-0">
              {renderPostGrid(allPosts.slice(0, 8))}
            </TabsContent>

            {/* Category Tabs */}
            {categoriesWithPosts.map((category) => {
              const categoryPosts = posts.filter(
                post => post.category?.id === category.id
              )
              return (
                <TabsContent key={category.id} value={category.slug} className="mt-0">
                  {categoryPosts.length > 0 ? (
                    renderPostGrid(categoryPosts.slice(0, 8))
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      {content.no_posts}
                    </div>
                  )}
                </TabsContent>
              )
            })}
          </Tabs>
        ) : (
          renderPostGrid(allPosts.slice(0, 8))
        )}

        {/* View All Button */}
        <Animate variant="fadeIn" delay={0.3} className="text-center mt-12">
          <Button size="lg" className="group" asChild>
            <Link href={`/${locale}/blog`}>
              {content.view_all}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Animate>
      </div>
    </section>
  )
}
