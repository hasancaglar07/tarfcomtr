'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { getDefaultImage, resolveImageSrc } from '@/lib/images'

interface Service {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image?: string | null
  youtube_url?: string | null
  category?: {
    id: number
    name: string
  } | null
}

interface ServicesTabsProps {
  locale: string
  services: Service[]
}

const defaultContent = {
  tr: {
    title: 'TARF Ekosistemi',
    subtitle: 'Yazılım teknolojileri, düşünce enstitüsü, akademi ve daha fazlası ile bütünsel bir üretim ekosistemi sunuyoruz',
    cta_label: 'Keşfet',
    view_all: 'Tüm Hizmetleri İncele'
  },
  en: {
    title: 'TARF Ecosystem',
    subtitle: 'We offer a holistic production ecosystem with software technologies, think tank, academy and more',
    cta_label: 'Explore',
    view_all: 'Explore All Services'
  },
  ar: {
    title: 'نظام تارف البيئي',
    subtitle: 'نقدم نظامًا بيئيًا شاملاً للإنتاج يتضمن تقنيات البرمجيات ومعهد الفكر والأكاديمية والمزيد',
    cta_label: 'استكشف',
    view_all: 'استكشف جميع الخدمات'
  }
}

export function ServicesTabs({ locale, services }: ServicesTabsProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en
  const [activeTab, setActiveTab] = useState(services[0]?.slug || '')

  if (services.length === 0) {
    return (
      <section className="py-20">
        <div className="container text-center">
          <p className="text-muted-foreground">
            {locale === 'tr' ? 'Henüz hizmet eklenmedi.' : 'No services available yet.'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20" id="services">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full animate-slide-up"
        >
          {/* Mobile: Horizontal Scroll Tabs */}
          <div className="mb-8">
            <TabsList className="inline-flex h-auto p-1 bg-background/50 backdrop-blur-sm border w-full md:w-auto overflow-x-auto flex-nowrap">
              {services.slice(0, 6).map((service) => (
                <TabsTrigger
                  key={service.slug}
                  value={service.slug}
                  className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground whitespace-nowrap"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          {services.slice(0, 6).map((service) => (
            <TabsContent
              key={service.slug}
              value={service.slug}
              className="mt-0 animate-fade-in"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image/Video Side */}
                <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl group">
                  {service.youtube_url ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={`${service.youtube_url}?rel=0&modestbranding=1&showinfo=0`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  ) : service.featured_image ? (
                    <Image
                      src={resolveImageSrc(service.featured_image, getDefaultImage())}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="relative w-40 h-40">
                        <Image
                          src="/img/tarf.png"
                          alt="TARF"
                          fill
                          className="object-contain opacity-90"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Side */}
                <div className="space-y-6">
                  {service.category && (
                    <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {service.category.name}
                    </div>
                  )}
                  
                  <h3 className="text-3xl font-bold">{service.title}</h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.excerpt}
                  </p>

                  <Button size="lg" className="group" asChild>
                    <Link href={`/${locale}/services/${service.slug}`}>
                      {content.cta_label}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* View All Button */}
        {services.length > 6 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href={`/${locale}/services`}>
                {content.view_all}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
