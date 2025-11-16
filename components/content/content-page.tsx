import Link from 'next/link'
import { ContentPageDefinition, ContentSection } from '@/content/content-pages'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ContentPageViewProps {
  page: ContentPageDefinition
  locale: string
}

const localizeHref = (locale: string, href?: string) => {
  if (!href) return '#'
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return href
  }
  if (href.startsWith('/')) {
    return `/${locale}${href}`
  }
  if (href.startsWith('#')) {
    return href
  }
  return `/${locale}/${href}`
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
  <section className="py-16 border-b border-border/60 bg-background/80">
    <div className="container space-y-6">
      <div className="max-w-3xl space-y-3">
        {section.eyebrow && (
          <span className="inline-flex text-xs uppercase tracking-[0.3em] text-primary font-semibold">
            {section.eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-bold">{section.title}</h2>
        {section.description && (
          <p className="text-muted-foreground leading-relaxed">{section.description}</p>
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
        className="rounded-2xl border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
      >
        {item.badge && (
          <span className="inline-flex text-xs font-semibold uppercase tracking-wider text-primary">
            {item.badge}
          </span>
        )}
        <h3 className="text-xl font-semibold">{item.title}</h3>
        {item.description && (
          <p className="mt-2 text-muted-foreground leading-relaxed">{item.description}</p>
        )}
        {item.bullets && (
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span className="h-2 w-2 translate-y-2 rounded-full bg-primary/70" />
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
    <ListTag className="space-y-4">
      {section.items?.map((item, idx) => (
        <div
          key={item.title}
          className="flex gap-4 rounded-2xl border bg-card/80 p-5 shadow-sm"
        >
          {ordered && (
            <span className="text-2xl font-bold text-primary">
              {(idx + 1).toString().padStart(2, '0')}
            </span>
          )}
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            {item.description && (
              <p className="text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </ListTag>
  )
}

const TimelineSection = ({ section }: { section: ContentSection }) => (
  <div className="relative pl-6">
    <div className="absolute left-2 top-0 h-full w-px bg-gradient-to-b from-primary/60 to-transparent" />
    <div className="space-y-8">
      {section.items?.map((item, idx) => (
        <div key={item.title} className="relative rounded-2xl border bg-card p-6 shadow-sm">
          <span className="absolute -left-6 top-6 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-md" />
          <div className="flex items-center gap-3 text-sm text-primary font-semibold uppercase tracking-wider">
            <span>{item.meta || `Adım ${idx + 1}`}</span>
          </div>
          <h3 className="mt-2 text-2xl font-semibold">{item.title}</h3>
          {item.description && (
            <p className="text-muted-foreground leading-relaxed mt-2">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  </div>
)

const StatsSection = ({ section }: { section: ContentSection }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    {section.stats?.map((stat) => (
      <div key={stat.label} className="rounded-2xl border bg-card/80 p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
        <p className="mt-4 text-4xl font-bold text-primary">{stat.value}</p>
        {stat.helper && <p className="text-muted-foreground">{stat.helper}</p>}
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
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-24 right-10 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />
        </div>
        <div className="container relative py-20">
          {page.hero.eyebrow && (
            <span className="inline-flex text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              {page.hero.eyebrow}
            </span>
          )}
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{page.hero.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{page.hero.subtitle}</p>
          {page.hero.description && (
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground leading-relaxed">
              {page.hero.description}
            </p>
          )}
          {page.hero.actions && (
            <div className="mt-8 flex flex-wrap gap-4">
              {page.hero.actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant === 'secondary' ? 'outline' : 'default'}
                  asChild
                >
                  <Link href={localizeHref(locale, action.href)}>{action.label}</Link>
                </Button>
              ))}
            </div>
          )}
          {page.hero.stats && (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {page.hero.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border bg-card/80 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-4xl font-bold text-primary">{stat.value}</p>
                  {stat.helper && (
                    <p className="text-muted-foreground">{stat.helper}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {page.sections.map((section) => (
        <SectionWrapper key={section.id} section={section}>
          <SectionContent section={section} />
        </SectionWrapper>
      ))}

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container flex flex-col gap-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] font-semibold text-primary-foreground/80">
            {page.category === 'yasal' ? 'Yasal destek' : 'Birlikte üretelim'}
          </p>
          <h2 className="text-4xl font-bold">{page.cta.title}</h2>
          <p className="mx-auto max-w-3xl text-lg text-primary-foreground/90">
            {page.cta.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href={localizeHref(locale, page.cta.primaryAction.href)}>
                {page.cta.primaryAction.label}
              </Link>
            </Button>
            {page.cta.secondaryAction && (
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground bg-primary-foreground text-primary hover:bg-white hover:text-primary"
                asChild
              >
                <Link href={localizeHref(locale, page.cta.secondaryAction.href)}>
                  {page.cta.secondaryAction.label}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
