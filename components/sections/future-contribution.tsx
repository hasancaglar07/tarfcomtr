'use client'

import { Card } from '@/components/ui/card'
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
    <section className="py-12">
      <div className="container">
        {/* CTA Card */}
        <Animate variant="fadeIn" delay={0.4}>
          <Card className="relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />

            {/* Content */}
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {content.cta_title}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {content.cta_description}
                </p>
              </div>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  className="whitespace-nowrap group"
                >
                  {content.cta_button}
                  <Rocket className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </Animate>
      </div>
    </section>
  )
}
