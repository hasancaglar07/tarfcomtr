import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Play, Mic2, Sparkles } from 'lucide-react'

interface BasePost {
  id: number
  title: string
  slug: string
  excerpt?: string
  featured_image?: string | null
  created_at?: string
  category?: {
    id: number
    name: string
  } | null
}

interface InsightsShowcaseProps {
  locale: string
  blogPosts?: BasePost[]
  events?: BasePost[]
  videos?: BasePost[]
  podcasts?: BasePost[]
}

export function InsightsShowcase({
  locale,
  blogPosts = [],
  events = [],
  videos = [],
  podcasts = [],
}: InsightsShowcaseProps) {
  if (!blogPosts.length && !events.length && !videos.length && !podcasts.length) {
    return null
  }

  const featuredPost = blogPosts[0]
  const highlightCards = [
    {
      item: events[0],
      label: locale === 'tr' ? 'Etkinlik' : locale === 'ar' ? 'فعالية' : 'Event',
      href: (slug: string) => `/${locale}/events/${slug}`,
      icon: Calendar,
    },
    {
      item: videos[0],
      label: locale === 'tr' ? 'Video' : locale === 'ar' ? 'فيديو' : 'Video',
      href: (slug: string) => `/${locale}/videos/${slug}`,
      icon: Play,
    },
    {
      item: podcasts[0],
      label: locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'بودكاست' : 'Podcast',
      href: (slug: string) => `/${locale}/podcasts/${slug}`,
      icon: Mic2,
    },
  ].filter(({ item }) => Boolean(item))

  return (
    <section className="py-20 bg-slate-100/40 dark:bg-slate-900/20">
      <div className="container">
        <div className="flex flex-col gap-4 text-center mb-12">
          <Badge className="mx-auto w-fit" variant="secondary">
            <Sparkles className="h-4 w-4 mr-2" />
            {locale === 'tr' ? 'Güncel içerikler' : locale === 'ar' ? 'محتوى محدث' : 'Fresh insights'}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            {locale === 'tr'
              ? 'Bilgi meydanımız: Blog, etkinlik ve yayınlar'
              : locale === 'ar'
                ? 'ساحة المعرفة لدينا: المدونة والفعاليات والبث'
                : 'Our knowledge arena: blog, events & broadcasts'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {locale === 'tr'
              ? 'Referans tasarımdaki çok katmanlı içerik akışını dijitalleştirerek tek bakışta tüm yayınlarımızı keşfedin.'
              : locale === 'ar'
                ? 'اكتشف جميع منشوراتنا في لمحة واحدة مع تدفق المحتوى متعدد المستويات.'
                : 'Explore every content stream at a glance through a multi-layered feed inspired by the reference design.'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {featuredPost && (
            <Card className="overflow-hidden border shadow-lg">
              <div className="relative h-64 w-full">
                {featuredPost.featured_image ? (
                  <Image
                    src={featuredPost.featured_image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {featuredPost.category && (
                    <Badge variant="secondary" className="mb-3">
                      {featuredPost.category.name}
                    </Badge>
                  )}
                  <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
                  <Button variant="secondary" asChild>
                    <Link href={`/${locale}/blog/${featuredPost.slug}`}>
                      {locale === 'tr' ? 'Yazıyı Oku' : locale === 'ar' ? 'اقرأ المقال' : 'Read article'}
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            {highlightCards.map(({ item, label, href, icon: Icon }) => (
              <Card key={item!.id} className="p-5 border bg-background/80 backdrop-blur">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
                      <Link href={href(item!.slug)} className="font-semibold text-lg hover:text-primary transition-colors">
                        {item!.title}
                      </Link>
                      {item!.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{item!.excerpt}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {item!.created_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={item!.created_at}>
                          {new Date(item!.created_at).toLocaleDateString(locale, {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                    )}
                    {label === (locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'بودكاست' : 'Podcast') && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{locale === 'tr' ? 'Yeni bölüm' : locale === 'ar' ? 'حلقة جديدة' : 'New episode'}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
