'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

interface Podcast {
  id: number
  title: string
  slug: string
  excerpt?: string
  content?: string | null
  featured_image?: string | null
  created_at: string
  duration?: string | null
}

interface PodcastSectionProps {
  locale: string
  podcasts: Podcast[]
}

const defaultContent = {
  tr: {
    title: 'TARF Podcast Yayınları',
    subtitle: 'Bilim, teknoloji, felsefe ve toplum üzerine derin sohbetler. Uzmanlarla buluşun, yeni perspektifler keşfedin.',
    listen: 'Dinle',
    view_all: 'Tüm Podcast\'leri Keşfet',
    no_podcasts: 'Henüz podcast eklenmedi.'
  },
  en: {
    title: 'TARF Podcast Series',
    subtitle: 'Deep conversations on science, technology, philosophy and society. Meet experts, discover new perspectives.',
    listen: 'Listen',
    view_all: 'Explore All Podcasts',
    no_podcasts: 'No podcasts available yet.'
  },
  ar: {
    title: 'سلسلة بودكاست تارف',
    subtitle: 'محادثات عميقة حول العلم والتكنولوجيا والفلسفة والمجتمع. التقِ بالخبراء واكتشف وجهات نظر جديدة.',
    listen: 'استمع',
    view_all: 'استكشف جميع البودكاست',
    no_podcasts: 'لا توجد بودكاست متاحة حتى الآن.'
  }
}

export function PodcastSection({ locale, podcasts }: PodcastSectionProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en

  if (podcasts.length === 0) {
    return (
      <section className="py-20">
        <div className="container text-center">
          <p className="text-muted-foreground">{content.no_podcasts}</p>
        </div>
      </section>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, '')
  }

  return (
    <section className="py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Podcast Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {podcasts.slice(0, 8).map((podcast, index) => (
            <Card
              key={podcast.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Podcast Cover/Thumbnail */}
              <Link href={`/${locale}/podcasts/${podcast.slug}`}>
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/20 to-primary/5">
                  {podcast.featured_image ? (
                    <Image
                      src={resolveImageSrc(podcast.featured_image, getDefaultImage())}
                      alt={podcast.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl">🎙️</div>
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                    <div className="bg-primary rounded-full p-4 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
              </Link>

              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/${locale}/podcasts/${podcast.slug}`}>
                    {podcast.title}
                  </Link>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">
                  {podcast.excerpt || (podcast.content ? stripHtml(podcast.content).substring(0, 100) + '...' : '')}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(podcast.created_at)}</span>
                  </div>
                  {podcast.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{podcast.duration}</span>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="w-full group/btn" asChild>
                  <Link href={`/${locale}/podcasts/${podcast.slug}`}>
                    <Play className="mr-2 h-4 w-4 transition-transform group-hover/btn:scale-110" />
                    {content.listen}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center animate-fade-in">
          <Button size="lg" className="group" asChild>
            <Link href={`/${locale}/podcasts`}>
              {content.view_all}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
