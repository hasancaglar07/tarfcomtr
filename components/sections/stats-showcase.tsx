import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, CalendarDays, Video, Mic2, BookOpen } from 'lucide-react'

interface StatsShowcaseProps {
  locale: string
  servicesCount: number
  eventsCount: number
  blogCount: number
  videosCount: number
  podcastsCount: number
  categories?: Array<{ id: number; name: string }>
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
      icon: BookOpen,
      label: locale === 'tr' ? 'Eğitim Programı' : locale === 'ar' ? 'البرامج التدريبية' : 'Training Programs',
      value: servicesCount,
      description:
        locale === 'tr' ? 'Kurumlara özel içerikler' : locale === 'ar' ? 'محتوى مخصص للمنظمات' : 'Custom programs for organisations',
    },
    {
      icon: CalendarDays,
      label: locale === 'tr' ? 'Etkinlik' : locale === 'ar' ? 'الفعاليات' : 'Events',
      value: eventsCount,
      description:
        locale === 'tr' ? 'Seminer ve zirveler' : locale === 'ar' ? 'الندوات والقمم' : 'Seminars & summits',
    },
    {
      icon: Target,
      label: locale === 'tr' ? 'Blog Yazısı' : locale === 'ar' ? 'مقالات' : 'Blog Posts',
      value: blogCount,
      description:
        locale === 'tr' ? 'Güncel içerikler' : locale === 'ar' ? 'محتوى حديث' : 'Fresh insights',
    },
    {
      icon: Video,
      label: locale === 'tr' ? 'Video Kütüphanesi' : locale === 'ar' ? 'الفيديوهات' : 'Video Library',
      value: videosCount,
      description:
        locale === 'tr' ? 'İlham veren söyleşiler' : locale === 'ar' ? 'حوارات ملهمة' : 'Inspiring talks',
    },
    {
      icon: Mic2,
      label: locale === 'tr' ? 'Podcast' : locale === 'ar' ? 'البودكاست' : 'Podcasts',
      value: podcastsCount,
      description:
        locale === 'tr' ? 'Uzman görüşleri' : locale === 'ar' ? 'آراء الخبراء' : 'Expert opinions',
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 via-background to-background">
      <div className="container space-y-10">
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={stat.label}
                className="p-6 bg-background/80 backdrop-blur border-primary/10 hover:-translate-y-1 hover:border-primary/40 transition-all"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" />
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

        {categories.length > 0 && (
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
        )}
      </div>
    </section>
  )
}
