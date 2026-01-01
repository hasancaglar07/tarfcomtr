import Link from 'next/link'
import { ContentPageDefinition, ContentSection } from '@/content/content-pages'
import { CtaSection } from '@/components/shared/cta-section'
import { localizeHref } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContentPageViewProps {
  page: ContentPageDefinition
  locale: string
}

const gridColumns = (columns?: number) => {
  switch (columns) {
    case 3:
      return 'md:grid-cols-2 xl:grid-cols-3'
    case 4:
      return 'md:grid-cols-2 lg:grid-cols-4'
    default:
      return 'md:grid-cols-2'
  }
}

const SectionWrapper = ({ section, children }: { section: ContentSection; children: React.ReactNode }) => (
  <section className="py-16 md:py-24 relative z-10">
    <div className="container space-y-12">
      <div className="max-w-3xl space-y-4">
        {section.eyebrow && (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
            {section.eyebrow}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
        {section.description && (
          <div
            className="text-lg text-slate-600 leading-relaxed [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_strong]:font-bold [&_em]:italic"
            dangerouslySetInnerHTML={{
              __html: section.description.startsWith('<')
                ? section.description
                : section.description.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')
            }}
          />
        )}
      </div>
      {children}
    </div>
  </section>
)

const GridSection = ({ section }: { section: ContentSection }) => (
  <div className={cn('grid gap-6', gridColumns(section.columns))}>
    {section.items?.map((item) => (
      <div
        key={item.title}
        className="group relative flex flex-col rounded-2xl md:rounded-[32px] border border-white/40 bg-white/50 p-5 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-md transition-all duration-300 hover:bg-white/80 hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1"


      >
        {item.badge && (
          <span className="mb-4 inline-flex w-fit rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {item.badge}
          </span>
        )}
        <h3 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h3>
        {item.description && (
          <div
            className="text-slate-600 leading-relaxed [&_p]:leading-relaxed [&_p]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_strong]:font-bold [&_em]:italic flex-1"
            dangerouslySetInnerHTML={{
              __html: item.description.startsWith('<')
                ? item.description
                : item.description.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')
            }}
          />
        )}
        {item.bullets && (
          <ul className="mt-6 space-y-3 border-t border-slate-200/60 pt-6 text-sm text-slate-600">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}
  </div>
)

const ListSection = ({ section }: { section: ContentSection }) => {
  const ordered = section.ordered
  const ListTag = ordered ? 'ol' : 'div'
  return (
    <ListTag className="space-y-6">
      {section.items?.map((item, idx) => (
        <div
          key={item.title}
          className="group flex gap-6 rounded-2xl md:rounded-[32px] border border-white/40 bg-white/50 p-5 md:p-8 shadow-sm backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-md"


        >
          {ordered && (
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
          )}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
            {item.description && (
              <div
                className="text-slate-600 leading-relaxed [&_p]:leading-relaxed [&_p]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_strong]:font-bold [&_em]:italic"
                dangerouslySetInnerHTML={{
                  __html: item.description.startsWith('<')
                    ? item.description
                    : item.description.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')
                }}
              />
            )}
          </div>
        </div>
      ))}
    </ListTag>
  )
}

const TimelineSection = ({ section }: { section: ContentSection }) => (
  <div className="relative pl-8">
    <div className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
    <div className="space-y-10">
      {section.items?.map((item, idx) => (
        <div key={item.title} className="relative rounded-2xl md:rounded-[32px] border border-white/40 bg-white/60 p-5 md:p-8 shadow-sm backdrop-blur-md transition-all hover:bg-white/90">


          <span className="absolute -left-[29px] top-9 h-3 w-3 rounded-full border-[3px] border-white bg-primary shadow-[0_0_0_4px_rgba(249,115,22,0.2)]" />
          <div className="mb-2 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary/80">
            <span>{item.meta || `Adım ${idx + 1}`}</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
          {item.description && (
            <div
              className="mt-3 text-slate-600 leading-relaxed [&_p]:leading-relaxed [&_p]:mb-1.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_strong]:font-bold [&_em]:italic"
              dangerouslySetInnerHTML={{
                __html: item.description.startsWith('<')
                  ? item.description
                  : item.description.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')
              }}
            />
          )}
        </div>
      ))}
    </div>
  </div>
)

const StatsSection = ({ section }: { section: ContentSection }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {section.stats?.map((stat) => (
      <div key={stat.label} className="group rounded-2xl md:rounded-[32px] border border-white/40 bg-white/60 p-5 md:p-8 shadow-sm backdrop-blur-md transition-all hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg">


        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
        <p className="mt-4 bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-5xl font-black text-transparent group-hover:from-primary group-hover:to-orange-600 transition-all duration-300">{stat.value}</p>
        {stat.helper && <p className="mt-2 text-sm font-medium text-slate-400">{stat.helper}</p>}
      </div>
    ))}
  </div>
)

const SectionContent = ({ section }: { section: ContentSection }) => {
  switch (section.layout) {
    case 'list':
      return <ListSection section={section} />
    case 'timeline':
      return <TimelineSection section={section} />
    case 'stats':
      return <StatsSection section={section} />
    case 'grid':
    case 'split':
    default:
      return <GridSection section={section} />
  }
}

export function ContentPageView({ page, locale }: ContentPageViewProps) {
  const description = page.hero.description?.trim() ?? ''
  const descriptionParagraphs = description
    ? description
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
    : []
  const showNarrative =
    Boolean(description) && (descriptionParagraphs.length > 1 || description.length > 220)
  const hideExtraSections = page.category !== 'yasal'
  const heroActions = (page.hero.actions ?? [])
    .map((action) => ({
      ...action,
      label: action.label?.trim() ?? '',
      href: action.href?.trim() ?? '',
    }))
    .filter((action) => action.label && action.href)

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Global Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-90 pointer-events-none bg-amber-pattern"
        aria-hidden="true"
      />

      <section className="relative z-10 pt-28 lg:pt-36 pb-12">
        <div className="container">
          {/* Grand Hero Card */}
          <div className="relative overflow-hidden rounded-[24px] md:rounded-[56px] border border-white/40 bg-white/60 p-5 shadow-[0_40px_100px_rgba(15,23,42,0.1),inset_0_0_0_1px_rgba(255,255,255,0.5)] backdrop-blur-3xl md:p-16">


            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
            {/* Ambient Orbs */}
            <div className="absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[100px]" />
            <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

            <div className="relative z-10 space-y-8">
              <div className="max-w-4xl space-y-6">
                {page.hero.eyebrow && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary shadow-sm backdrop-blur-md">
                    {page.hero.eyebrow}
                  </span>
                )}
                <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl md:leading-[1.1]">{page.hero.title}</h1>
                <p className="text-xl font-medium text-slate-600 leading-relaxed md:text-2xl">{page.hero.subtitle}</p>

                {!showNarrative && description && (
                  <div
                    className="text-lg text-slate-600 leading-relaxed max-w-3xl [&_p]:leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-0.5 [&_strong]:font-bold [&_em]:italic"
                    dangerouslySetInnerHTML={{
                      __html: description.startsWith('<')
                        ? description
                        : description.split('\n').filter(Boolean).map(p => `<p>${p}</p>`).join('')
                    }}
                  />
                )}
              </div>

              {showNarrative && description && (
                <div className="relative mt-12 rounded-2xl md:rounded-[32px] border border-white/50 bg-white/50 p-5 md:p-8 shadow-sm backdrop-blur-md">


                  <div className="h-1.5 w-16 rounded-full bg-primary/80 mb-6" />
                  <div className="space-y-4 text-lg leading-8 text-slate-600">
                    {description.startsWith('<') ? (
                      <div
                        className="[&_p]:leading-8 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-900 [&_em]:italic"
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ) : (
                      descriptionParagraphs.map((paragraph, index) => (
                        <p
                          key={`${index}-${paragraph.slice(0, 24)}`}
                          className={
                            index === 0
                              ? 'first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900'
                              : ''
                          }
                        >
                          {paragraph}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              )}

              {heroActions.length > 0 && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {heroActions.map((action) => (
                    <Button
                      key={action.label}
                      size="lg"
                      variant={action.variant === 'secondary' ? 'outline' : 'default'}
                      className={cn(
                        "rounded-full px-8 font-bold transition-all hover:scale-105",
                        action.variant === 'secondary'
                          ? "border-slate-300 bg-white/50 text-slate-700 hover:bg-white hover:text-primary hover:border-primary/30"
                          : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 border-0"
                      )}
                      asChild
                    >
                      <Link href={localizeHref(locale, action.href)}>{action.label}</Link>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {!hideExtraSections && page.hero.stats && (
              <div className="mt-16 grid gap-6 md:grid-cols-3 border-t border-white/20 pt-10">
                {page.hero.stats.map((stat) => (
                  <div key={stat.label} className="group rounded-[24px] bg-white/40 p-6 transition-colors hover:bg-white/60">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-500 opacity-70">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-4xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">{stat.value}</p>
                    {stat.helper && (
                      <p className="mt-1 text-sm font-medium text-slate-500">{stat.helper}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {!hideExtraSections &&
        page.sections.map((section) => (
          <SectionWrapper key={section.id} section={section}>
            <SectionContent section={section} />
          </SectionWrapper>
        ))}

      <CtaSection
        locale={locale}
        eyebrow={page.category === 'yasal' ? 'Yasal destek' : 'Birlikte üretelim'}
        title={page.cta.title}
        description={page.cta.description}
        primaryAction={{
          label: page.slug === 'kulupler/teknoloji-takimlari' ? 'İletişime Geç' : page.cta.primaryAction.label,
          href: page.cta.primaryAction.href,
        }}
        secondaryAction={
          !['kulupler/ogrenci-kulupleri', 'dusunce-enstitusu/egitim', 'yazilim/danismanlik', 'kulupler/teknoloji-takimlari', 'vizyon-degerler'].includes(
            page.slug,
          ) && page.cta.secondaryAction
            ? page.cta.secondaryAction
            : undefined
        }
      />
    </main>
  )
}
