'use client'

import type { Post } from '@/lib/api'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { BookOpen, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Animate, AnimatedCard } from '@/components/ui/animate'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

interface BlogShowcaseProps {
  locale: string
  posts: Post[]
}

const defaultContent = {
  tr: {
    title: 'Blog',
    subtitle: 'Uzmanlarımızdan görüşler ve araştırma notları.',
    read_more: 'Devamını Oku',
    see_all: 'Tüm Blog Yazılarını Gör',
  },
  en: {
    title: 'Blog',
    subtitle: 'Insights and notes from our experts and researchers.',
    read_more: 'Read More',
    see_all: 'See All Blog Posts',
  },
  ar: {
    title: 'المدونة',
    subtitle: 'رؤى وملاحظات من خبرائنا وباحثينا.',
    read_more: 'اقرأ المزيد',
    see_all: 'عرض كل مقالات المدونة',
  },
}

type BlogContent = typeof defaultContent[keyof typeof defaultContent]

export function BlogShowcase({ locale, posts }: BlogShowcaseProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en

  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="py-4" aria-labelledby="home-blog-title">
      <div className="container">
        <Animate variant="slideUp" className="text-center mb-4">
          <h2 id="home-blog-title" className="text-3xl md:text-4xl font-bold mb-4">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </Animate>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <BlogCard post={post} content={content} locale={locale} index={index} />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-6 mt-6">
          <Animate variant="slideUp" delay={0.3}>
            <Link href={`/${locale}/blog`} aria-label={content.see_all}>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 h-auto text-base font-semibold border-slate-200 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all group"
              >
                {content.see_all}
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </Animate>
        </div>
      </div>
    </section>
  )
}

function BlogCard({
  post,
  content,
  locale,
  index = 0,
}: {
  post: Post
  content: BlogContent
  locale: string
  index?: number
}) {
  const imageSrc = post.featured_image
    ? resolveImageSrc(post.featured_image, getDefaultImage())
    : null

  return (
    <AnimatedCard className="h-full">
      <article className="group relative h-full flex flex-col overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-white/80 via-white/50 to-white/30 shadow-[0_10px_30px_rgba(15,23,42,0.05),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-3xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(15,23,42,0.1),inset_0_0_0_1px_rgba(255,255,255,0.8)] hover:-translate-y-1">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />

        <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/20 to-transparent rotate-45 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-700 z-0" />

        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="relative block z-10 w-full aspect-[16/10] overflow-hidden m-2 rounded-[24px] mb-0"
          aria-label={post.title}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              priority={index < 3}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-amber-50 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-primary/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

          {post.category && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-slate-800 shadow-lg backdrop-blur-md">
                {post.category.name}
              </span>
            </div>
          )}
        </Link>

        <div className="relative z-10 p-5 flex flex-col flex-1">
          <div className="space-y-3 flex-1">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 text-slate-800 group-hover:text-primary transition-colors">
              <Link href={`/${locale}/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h3>

            {post.excerpt && (
              <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed opacity-80">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200/50">
            <Link
              href={`/${locale}/blog/${post.slug}`}
              className="block"
              aria-label={`${content.read_more}: ${post.title}`}
            >
              <Button className="w-full rounded-full bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:text-slate-950 hover:border-slate-300 transition-all group/btn">
                {content.read_more}
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </AnimatedCard>
  )
}
