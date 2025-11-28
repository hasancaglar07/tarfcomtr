'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Lightbulb,
  Rocket,
} from 'lucide-react'
import Link from 'next/link'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'

interface FutureContributionProps {
  locale: string
}

const defaultContent = {
  tr: {
    title: 'Geleceğe Katkımız',
    subtitle: 'Türkiye\'nin dijital dönüşümüne ve gençlerin eğitimine katkıda bulunuyoruz',
    cta_title: 'Bize Katılın',
    cta_description: 'Türkiye\'nin dijital geleceğini birlikte inşa edelim',
    cta_button: 'Bize Ulaşın',
    stats: [
      { value: '10,000+', label: 'Eğitim Alan Öğrenci', icon: Users },
      { value: '50+', label: 'Eğitim Programı', icon: BookOpen },
      { value: '100+', label: 'İş Ortağı', icon: Target },
      { value: '95%', label: 'Memnuniyet Oranı', icon: Award },
    ],
    contributions: [
      {
        icon: Globe,
        title: 'Dijital Dönüşüm',
        description: 'Türkiye\'nin dijital dönüşümüne liderlik ediyoruz',
      },
      {
        icon: Users,
        title: 'Gençlik Eğitimi',
        description: 'Gençlere modern teknolojiler konusunda eğitim veriyoruz',
      },
      {
        icon: Lightbulb,
        title: 'İnovasyon',
        description: 'Yenilikçi çözümler ve projeler geliştiriyoruz',
      },
      {
        icon: Rocket,
        title: 'Kariyer Desteği',
        description: 'Öğrencilerin kariyer yolculuğunda yanlarındayız',
      },
    ],
  },
  en: {
    title: 'Our Contribution to the Future',
    subtitle: 'Contributing to Turkey\'s digital transformation and youth education',
    cta_title: 'Join Us',
    cta_description: 'Let\'s build Turkey\'s digital future together',
    cta_button: 'Contact Us',
    stats: [
      { value: '10,000+', label: 'Trained Students', icon: Users },
      { value: '50+', label: 'Training Programs', icon: BookOpen },
      { value: '100+', label: 'Partners', icon: Target },
      { value: '95%', label: 'Satisfaction Rate', icon: Award },
    ],
    contributions: [
      {
        icon: Globe,
        title: 'Digital Transformation',
        description: 'Leading Turkey\'s digital transformation',
      },
      {
        icon: Users,
        title: 'Youth Education',
        description: 'Training young people in modern technologies',
      },
      {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'Developing innovative solutions and projects',
      },
      {
        icon: Rocket,
        title: 'Career Support',
        description: 'Supporting students in their career journey',
      },
    ],
  },
  ar: {
    title: 'مساهمتنا في المستقبل',
    subtitle: 'المساهمة في التحول الرقمي لتركيا وتعليم الشباب',
    cta_title: 'انضم إلينا',
    cta_description: 'لنبني معًا مستقبل تركيا الرقمي',
    cta_button: 'اتصل بنا',
    stats: [
      { value: '10,000+', label: 'طالب مدرب', icon: Users },
      { value: '50+', label: 'برنامج تدريبي', icon: BookOpen },
      { value: '100+', label: 'شريك', icon: Target },
      { value: '95%', label: 'معدل الرضا', icon: Award },
    ],
    contributions: [
      {
        icon: Globe,
        title: 'التحول الرقمي',
        description: 'قيادة التحول الرقمي في تركيا',
      },
      {
        icon: Users,
        title: 'تعليم الشباب',
        description: 'تدريب الشباب على التقنيات الحديثة',
      },
      {
        icon: Lightbulb,
        title: 'الابتكار',
        description: 'تطوير حلول ومشاريع مبتكرة',
      },
      {
        icon: Rocket,
        title: 'دعم المسار المهني',
        description: 'دعم الطلاب في رحلتهم المهنية',
      },
    ],
  },
}

export function FutureContribution({ locale }: FutureContributionProps) {
  const content = defaultContent[locale as keyof typeof defaultContent] || defaultContent.en

  return (
    <section className="py-12">
      <div className="container">
        {/* Header */}
        <Animate variant="fadeIn">
          <div className="text-center mb-16">
            <Badge className="mb-4">
              <TrendingUp className="w-4 h-4 mr-2" />
              {content.title}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.subtitle}
            </p>
          </div>
        </Animate>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <StaggerItem key={index}>
                <Card className="p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        {/* Contributions Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {content.contributions.map((item, index) => {
            const Icon = item.icon
            return (
              <StaggerItem key={index}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

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
