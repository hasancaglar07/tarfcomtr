import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Animate, StaggerContainer, StaggerItem } from '@/components/ui/animate'
import Image from 'next/image'

interface ValuePillarsProps {
  locale: string
}

const pillarIcons = {
  policy: '/img/icons/pillar-policy.png',
  digital: '/img/icons/pillar-digital.png',
  academy: '/img/icons/pillar-academy.png',
  ecosystem: '/img/icons/pillar-ecosystem.png',
} as const

const copy = {
  tr: {
    title: 'TARF yaklaşımı dört stratejik sütuna dayanır',
    subtitle:
      'Araştırma ve politika üretimini sahadaki eğitim ve girişim hızlandırıcılarıyla buluşturuyoruz. Tek yapmanız gereken etki alanınızı seçmek.',
    items: [
      {
        iconKey: 'policy',
        title: 'Politika Tasarımı',
        description:
          'Bakanlıklar, belediyeler ve kalkınma ajansları için veri odaklı politika tasarımı ve mevzuat önerileri hazırlıyoruz.',
      },
      {
        iconKey: 'digital',
        title: 'Dijital Dönüşüm Laboratuvarı',
        description:
          'Yapay zeka, blokzincir ve iklim teknolojileri odağında prototipler ve regülasyon sand-box programları işletiyoruz.',
      },
      {
        iconKey: 'academy',
        title: 'Akademi Programları',
        description:
          'Genç liderler, kamu çalışanları ve özel sektör profesyonelleri için çok dilli eğitim katalogları sunuyoruz.',
      },
      {
        iconKey: 'ecosystem',
        title: 'Ekosistem Koalisyonları',
        description:
          'Sivil toplum ve yatırımcı ağlarıyla birlikte bölgesel forumlar, rapor serileri ve medya programları tasarlıyoruz.',
      },
    ],
  },
  en: {
    title: 'The TARF approach relies on four strategic pillars',
    subtitle:
      'We merge research, policy production and on-the-ground learning + venture accelerators. Simply plug your organisation into the stream.',
    items: [
      {
        iconKey: 'policy',
        title: 'Policy Design',
        description: 'Data-driven policy notes, reform packages and legislation support for ministries and development agencies.',
      },
      {
        iconKey: 'digital',
        title: 'Digital Transformation Lab',
        description: 'Prototyping sandboxes around AI, blockchain and climate-tech with regulatory foresight.',
      },
      {
        iconKey: 'academy',
        title: 'Academy Programmes',
        description: 'Multilingual learning tracks for young leaders, civil servants and corporate innovators.',
      },
      {
        iconKey: 'ecosystem',
        title: 'Ecosystem Coalitions',
        description: 'Regional forums, report series and media shows delivered with NGOs and investor networks.',
      },
    ],
  },
  ar: {
    title: 'يعتمد نهج TARF على أربعة ركائز استراتيجية',
    subtitle: 'نمزج البحث وصنع السياسات وبرامج التعلم والمسرّعات في منظومة واحدة يمكن لأي مؤسسة الانضمام إليها.',
    items: [
      {
        iconKey: 'policy',
        title: 'تصميم السياسات',
        description: 'مذكرات سياسات وحزم إصلاح وتشريعات مبنية على البيانات للوزارات والهيئات التنموية.',
      },
      {
        iconKey: 'digital',
        title: 'مختبر التحول الرقمي',
        description: 'بيئات اختبار لتقنيات الذكاء الاصطناعي وسلاسل الكتل وتقنيات المناخ مع استشراف تنظيمي.',
      },
      {
        iconKey: 'academy',
        title: 'برامج الأكاديمية',
        description: 'مسارات تعلم متعددة اللغات للقادة الشباب والقطاعين العام والخاص.',
      },
      {
        iconKey: 'ecosystem',
        title: 'تحالفات المنظومة',
        description: 'منتديات إقليمية وسلاسل تقارير وبرامج إعلامية بالتعاون مع المجتمع المدني وشبكات المستثمرين.',
      },
    ],
  },
}

export function ValuePillars({ locale }: ValuePillarsProps) {
  const content = copy[locale as keyof typeof copy] || copy.en

  return (
    <section className="py-12 lg:py-16">
      <div className="container space-y-10">
        <Animate variant="fadeIn">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="mx-auto w-fit">
              TARF · 2025 Gündemi
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {content.subtitle}
            </p>
          </div>
        </Animate>

        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {content.items.map((item, index) => {
            const iconSrc = pillarIcons[item.iconKey as keyof typeof pillarIcons]
            return (
              <StaggerItem key={item.title}>
                <Card
                  className="group relative overflow-hidden border border-border/60 bg-card/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Image
                        src={iconSrc}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">0{index + 1}</p>
                      <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    <span>STRATEGY</span>
                    <span className="h-px flex-1 bg-primary/40" />
                  </div>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </section>
  )
}
