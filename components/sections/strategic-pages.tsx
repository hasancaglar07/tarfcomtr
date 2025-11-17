import Link from 'next/link'
import { contentPageGroups, ContentPageCategory } from '@/content/content-pages'
import { ArrowRight } from 'lucide-react'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'

interface StrategicPagesProps {
  locale: string
}

const groupOrder: ContentPageCategory[] = ['kurumsal', 'dusunce', 'akademi', 'yazilim', 'kulupler', 'yayinlar']

export function StrategicPages({ locale }: StrategicPagesProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[50rem] bg-[radial-gradient(circle_at_top,_rgba(250,180,70,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_40%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[60rem] -translate-x-1/2 bg-[radial-gradient(circle,_rgba(33,62,72,0.05),_transparent_65%)]" />

      <div className="container relative space-y-12">
        <Animate variant="slideUp">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.45em] text-primary">
                {locale === 'tr'
                  ? 'Tüm alt sayfalar'
                  : locale === 'ar'
                  ? 'جميع الصفحات'
                  : 'All core pages'}
              </p>
              <h2 className="text-4xl font-semibold leading-tight text-slate-900">
                {locale === 'tr'
                  ? 'Ekosistemin tamamına tek noktadan ulaşın'
                  : locale === 'ar'
                  ? 'الوصول إلى النظام بأكمله من نقطة واحدة'
                  : 'Reach every part of the ecosystem from one place'}
              </h2>
              <p className="text-lg text-slate-600">
                {locale === 'tr'
                  ? 'Kurumsal yapımızdan akademi programlarına, yazılım teknolojilerinden topluluk sayfalarına kadar tüm içerikleri aynı tasarım diliyle erişilebilir kıldık.'
                  : locale === 'ar'
                  ? 'جعلنا جميع المحتويات من الهيكل المؤسسي إلى برامج الأكاديمية وتقنيات البرمجيات وصفحات المجتمع في متناول اليد بنفس لغة التصميم.'
                  : 'From corporate pages to academy programs and community hubs, every section follows the same design language and can be explored effortlessly.'}
              </p>
            </div>
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_35px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">
                {locale === 'tr' ? 'Keşfetme Haritası' : locale === 'ar' ? 'خريطة الاستكشاف' : 'Discovery map'}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                {locale === 'tr'
                  ? 'Birleşik bilgi haritası ile hızlıca doğru deneyime geçiş yapın.'
                  : locale === 'ar'
                  ? 'انتقل بسرعة إلى التجربة الصحيحة عبر خريطة المعرفة الموحدة.'
                  : 'Move across a unified knowledge grid and jump into the right experience immediately.'}
              </h3>
              <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    {locale === 'tr' ? 'Programlar' : locale === 'ar' ? 'البرامج' : 'Programs'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">30+</p>
                  <p>{locale === 'tr' ? 'Çok disiplinli yolculuk' : locale === 'ar' ? 'مسارات متعددة التخصصات' : 'Multi-disciplinary tracks'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    {locale === 'tr' ? 'Topluluklar' : locale === 'ar' ? 'المجتمعات' : 'Communities'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">12</p>
                  <p>{locale === 'tr' ? 'Kurucu ekip & kulüpler' : locale === 'ar' ? 'الفرق والمؤسسون' : 'Core teams & clubs'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    {locale === 'tr' ? 'Yayınlar' : locale === 'ar' ? 'المنشورات' : 'Publications'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">80+</p>
                  <p>{locale === 'tr' ? 'Bilgi ve araştırma içeriği' : locale === 'ar' ? 'محتوى معرفي وبحثي' : 'Knowledge & research'}</p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                    {locale === 'tr' ? 'Teknoloji' : locale === 'ar' ? 'التقنية' : 'Technology'}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">15+</p>
                  <p>{locale === 'tr' ? 'Üretim hattı & çözüm' : locale === 'ar' ? 'خطوط الإنتاج والحلول' : 'Solution verticals'}</p>
                </div>
              </div>
            </div>
          </div>
        </Animate>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {groupOrder.map((category) => {
            const group = contentPageGroups[category]
            if (!group) return null
            const featuredPages = group.pages.slice(0, 3)

            return (
              <StaggerItem key={category}>
                <div
                  className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_40px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/80 transition duration-300 hover:-translate-y-1.5 hover:ring-primary/30"
                >
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full bg-primary/10 blur-3xl transition duration-300 group-hover:scale-110" />

                  <div className="relative space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary/80">
                          {group.label}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-900">{group.description}</h3>
                      </div>
                      <span className="rounded-2xl border border-slate-200/70 bg-slate-50/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        {locale === 'tr'
                          ? `${group.pages.length} sayfa`
                          : locale === 'ar'
                          ? `${group.pages.length} صفحة`
                          : `${group.pages.length} pages`}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {featuredPages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/${locale}/${page.slug}`}
                          className="group/link flex items-center justify-between rounded-2xl border border-slate-200/80 bg-gradient-to-r from-white via-white to-slate-50/50 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-primary/50 hover:from-primary/5 hover:text-primary"
                        >
                          <span>{page.hero.title}</span>
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition group-hover/link:translate-x-1 group-hover/link:border-primary/40 group-hover/link:bg-primary/10 group-hover/link:text-primary">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
