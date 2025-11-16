import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, Compass, Users2, Lightbulb } from 'lucide-react'

interface ValuePillarsProps {
  locale: string
}

const copy = {
  tr: {
    title: 'TARF yaklaşımı dört stratejik sütuna dayanır',
    subtitle:
      'Araştırma ve politika üretimini sahadaki eğitim ve girişim hızlandırıcılarıyla buluşturuyoruz. Tek yapmanız gereken etki alanınızı seçmek.',
    items: [
      {
        icon: Target,
        title: 'Politika Tasarımı',
        description:
          'Bakanlıklar, belediyeler ve kalkınma ajansları için veri odaklı politika tasarımı ve mevzuat önerileri hazırlıyoruz.',
      },
      {
        icon: Compass,
        title: 'Dijital Dönüşüm Laboratuvarı',
        description:
          'Yapay zeka, blokzincir ve iklim teknolojileri odağında prototipler ve regülasyon sand-box programları işletiyoruz.',
      },
      {
        icon: Users2,
        title: 'Akademi Programları',
        description:
          'Genç liderler, kamu çalışanları ve özel sektör profesyonelleri için çok dilli eğitim katalogları sunuyoruz.',
      },
      {
        icon: Lightbulb,
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
        icon: Target,
        title: 'Policy Design',
        description: 'Data-driven policy notes, reform packages and legislation support for ministries and development agencies.',
      },
      {
        icon: Compass,
        title: 'Digital Transformation Lab',
        description: 'Prototyping sandboxes around AI, blockchain and climate-tech with regulatory foresight.',
      },
      {
        icon: Users2,
        title: 'Academy Programmes',
        description: 'Multilingual learning tracks for young leaders, civil servants and corporate innovators.',
      },
      {
        icon: Lightbulb,
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
        icon: Target,
        title: 'تصميم السياسات',
        description: 'مذكرات سياسات وحزم إصلاح وتشريعات مبنية على البيانات للوزارات والهيئات التنموية.',
      },
      {
        icon: Compass,
        title: 'مختبر التحول الرقمي',
        description: 'بيئات اختبار لتقنيات الذكاء الاصطناعي وسلاسل الكتل وتقنيات المناخ مع استشراف تنظيمي.',
      },
      {
        icon: Users2,
        title: 'برامج الأكاديمية',
        description: 'مسارات تعلم متعددة اللغات للقادة الشباب والقطاعين العام والخاص.',
      },
      {
        icon: Lightbulb,
        title: 'تحالفات المنظومة',
        description: 'منتديات إقليمية وسلاسل تقارير وبرامج إعلامية بالتعاون مع المجتمع المدني وشبكات المستثمرين.',
      },
    ],
  },
}

export function ValuePillars({ locale }: ValuePillarsProps) {
  const content = copy[locale as keyof typeof copy] || copy.en

  return (
    <section className="bg-secondary/50 py-16 lg:py-20">
      <div className="container space-y-10">
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

        <div className="grid gap-6 md:grid-cols-2">
          {content.items.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={item.title}
                className="group relative overflow-hidden border border-border/60 bg-card/90 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
