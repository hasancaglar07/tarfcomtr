import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { localizeHref } from '@/lib/i18n'

interface CtaAction {
    label: string
    href: string
}

interface CtaSectionProps {
    locale: string
    eyebrow?: string
    title: string
    description: string
    primaryAction?: CtaAction | null
    secondaryAction?: CtaAction | null
    className?: string
}

export function CtaSection({
    locale,
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
    className,
}: CtaSectionProps) {
    return (
        <section className={`pt-12 pb-16 lg:pt-16 lg:pb-20 ${className || ''}`}>
            <div className="container relative z-10">
                <div className="relative overflow-hidden rounded-[32px] border border-white/30 bg-gradient-to-br from-amber-500 to-orange-600 px-6 py-6 shadow-[0_40px_100px_rgba(249,115,22,0.3)] md:px-12 md:py-8 text-white">
                    {/* Decorative shapes */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-white/10 rotate-12 blur-3xl opacity-50" />
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-black/10 rotate-12 blur-3xl opacity-20" />
                    </div>

                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="w-full space-y-4 text-left">
                            {eyebrow && (
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                    {eyebrow}
                                </p>
                            )}
                            <h2 className="text-2xl font-black tracking-tight md:text-3xl drop-shadow-sm">
                                {title}
                            </h2>
                            <p className="text-sm md:text-base font-medium text-amber-50 leading-relaxed w-full">
                                {description}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {primaryAction && primaryAction.label && primaryAction.href && (
                                <Button
                                    size="lg"
                                    className="h-12 rounded-full bg-white px-8 text-base font-bold text-orange-600 hover:bg-slate-50 hover:scale-105 transition-all shadow-xl"
                                    asChild
                                >
                                    <Link href={localizeHref(locale, primaryAction.href)}>
                                        {primaryAction.label}
                                    </Link>
                                </Button>
                            )}
                            {secondaryAction && secondaryAction.label && secondaryAction.href && (
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 rounded-full border-2 border-white/30 bg-transparent px-8 text-base font-bold text-white hover:bg-white/10 hover:border-white/50 transition-all"
                                    asChild
                                >
                                    <Link href={localizeHref(locale, secondaryAction.href)}>
                                        {secondaryAction.label}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
