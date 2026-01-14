'use client'

import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'
import Link from 'next/link'
import { Animate } from '@/components/ui/animate'

interface FutureContributionProps {
  locale: string
}

const defaultContent = {
  tr: {
    cta_title: 'Bize Katılın',
    cta_description: 'Türkiye\'nin dijital geleceğini birlikte inşa edelim',
    cta_button: 'Bize Ulaşın',
  },
  en: {
    cta_title: 'Join Us',
    cta_description: 'Let\'s build Turkey\'s digital future together',
    cta_button: 'Contact Us',
  },
  ar: {
    cta_title: 'انضم إلينا',
    cta_description: 'لنبني معًا مستقبل تركيا الرقمي',
    cta_button: 'اتصل بنا',
  },
}

export function FutureContribution({ locale }: FutureContributionProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en

  return (
    <section className="py-6">
      <div className="container">
        {/* CTA Card */}
        <Animate variant="slideUp" delay={0.2}>
          <div className="relative group overflow-hidden rounded-[40px] border border-white/40 bg-gradient-to-br from-white/90 via-white/60 to-white/30 p-8 md:p-14 shadow-[0_40px_100px_rgba(15,23,42,0.1),inset_0_0_0_1px_rgba(255,255,255,0.6)] backdrop-blur-3xl lg:flex lg:items-center lg:justify-between lg:gap-16">
            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

            {/* Ambient Background Glow (Orange/Amber) */}
            <div className="absolute -right-20 -bottom-40 h-[400px] w-[400px] rounded-full bg-amber-500/20 blur-[100px] pointer-events-none group-hover:bg-amber-500/30 transition-colors duration-700" />
            <div className="absolute -left-20 -top-40 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

            {/* Content Left */}
            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <h3 className="mb-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {content.cta_title}
              </h3>
              <p className="text-lg font-medium text-slate-600 sm:text-xl">
                {content.cta_description}
              </p>
            </div>

            {/* CTA Button Right */}
            <div className="relative z-10 mt-8 flex flex-shrink-0 justify-center lg:mt-0">
              <Link href={`/${locale}/contact`}>
                <Button
                  className="relative h-16 rounded-full px-10 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-900 hover:shadow-xl hover:-translate-y-0.5 bg-slate-950 border-0 group/btn"
                >
                  <span className="flex items-center gap-2">
                    {content.cta_button}
                    <Rocket className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </Animate>
      </div>
    </section>
  )
}
