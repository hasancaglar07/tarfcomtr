import type { Category } from '@/lib/api'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Animate } from '@/components/ui/animate'
import Image from 'next/image'

interface StatsShowcaseProps {
  locale: string
  servicesCount: number
  eventsCount: number
  blogCount: number
  videosCount: number
  podcastsCount: number
  categories?: Category[]
}

export function StatsShowcase({
  locale,
  servicesCount,
  eventsCount,
  blogCount,
  videosCount,
  podcastsCount,
  categories = [],
}: StatsShowcaseProps) {
  const stats = [
    {
      iconKey: 'programs',
      label: locale === 'tr' ? 'Eğitim Programı' : locale === 'ar' ? 'البرامج التدريبية' : 'Training Programs',
      value: servicesCount,
      description:
        locale === 'tr' ? 'Kurumlara özel içerikler' : locale === 'ar' ? 'محتوى مخصص للمنظمات' : 'Custom programs for organisations',
    },
    {
      iconKey: 'events',
      label: locale === 'tr' ? 'Etkinlik' : locale === 'ar' ? 'الفعاليات' : 'Events',
      value: eventsCount,
      description:
        locale === 'tr' ? 'Seminer ve zirveler' : locale === 'ar' ? 'الندوات والقمم' : 'Seminars & summits',
    },
    {
      iconKey: 'blog',
      label: locale === 'tr' ? 'Blog Yazısı' : locale === 'ar' ? 'مقالات' : 'Blog Posts',
      value: blogCount,
      description:
        locale === 'tr' ? 'Güncel içerikler' : locale === 'ar' ? 'محتوى حديث' : 'Fresh insights',
    },
    {
      iconKey: 'videos',
      label: locale === 'tr' ? 'Video Kütüphanesi' : locale === 'ar' ? 'الفيديوهات' : 'Video Library',
      value: videosCount,
      description:
        locale === 'tr' ? 'İlham veren söyleşiler' : locale === 'ar' ? 'حوارات ملهمة' : 'Inspiring talks',
    },
    {
      iconKey: 'podcasts',
      label: locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'البودكاست' : 'Podcasts',
      value: podcastsCount,
      description:
        locale === 'tr' ? 'Uzman görüşleri' : locale === 'ar' ? 'آراء الخبراء' : 'Expert opinions',
    },
  ]

  const iconMap: Record<string, string> = {
    programs: '/img/icons/stat-programs.png',
    events: '/img/icons/stat-events.png',
    blog: '/img/icons/stat-blog.png',
    videos: '/img/icons/stat-videos.png',
    podcasts: '/img/icons/stat-podcasts.png',
  }

  return (
    <section className="py-10">
      <div className="container space-y-10">
        <Animate variant="fadeIn">
          <div className="flex flex-col gap-4 text-center">
            <Badge className="mx-auto w-fit">
              {locale === 'tr' ? 'Veri odaklı yolculuk' : locale === 'ar' ? 'رحلة قائمة على البيانات' : 'Data-driven journey'}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              {locale === 'tr'
                ? 'TARF Akademi ekosisteminden sayılar'
                : locale === 'ar'
                  ? 'أرقام من منظومة تاراف أكاديمي'
                  : 'Numbers from TARF Academy ecosystem'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {locale === 'tr'
                ? 'Programlarımız, etkinliklerimiz ve içeriklerimizle büyüyen topluluklardan canlı veriler.'
                : locale === 'ar'
                  ? 'بيانات مباشرة من البرامج والفعاليات والمحتوى الذي ينمّي مجتمعاتنا.'
                  : 'Live metrics from programs, events and knowledge streams that power our community.'}
            </p>
          </div>
        </Animate>

        <Animate variant="slideUp" delay={0.1}>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat, index) => {
              const iconSrc = iconMap[stat.iconKey]
              return (
                <Card
                  key={stat.label}
                  className="animation-wrapper animate-slide-up p-6 bg-background/80 backdrop-blur border-primary/10 hover:-translate-y-1 hover:border-primary/40 transition-all"
                  style={{ animationDelay: `${index * 0.06}s` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                      <Image
                        src={iconSrc}
                        alt={stat.label}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value || 0}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </Card>
              )
            })}
          </div>
        </Animate>

        {categories.length > 0 && (
          <Animate variant="slideUp" delay={0.25}>
            <div className="rounded-3xl border bg-background/70 p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-3">
                {locale === 'tr'
                  ? 'Öne çıkan temalar'
                  : locale === 'ar'
                    ? 'الموضوعات البارزة'
                    : 'Highlighted themes'}
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 12).map((category) => (
                  <span
                    key={category.id}
                    className="inline-flex items-center rounded-full border border-dashed px-4 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </Animate>
        )}
      </div>
    </section>
  )
}
