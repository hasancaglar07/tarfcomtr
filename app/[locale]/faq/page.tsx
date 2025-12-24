import { api } from '@/lib/api'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HelpCircle, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { normalizeLocale, SUPPORTED_LOCALES } from '@/lib/i18n'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  return buildPageMetadata({ locale, page: 'faq', pathSegments: ['faq'] })
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const [faqs, settings] = await Promise.all([
    api.getFaqs(locale),
    api.getSettings(locale),
  ])

  const pageTitle = {
    tr: 'Sık Sorulan Sorular',
    en: 'Frequently Asked Questions',
    ar: 'الأسئلة المتكررة',
  }

  const pageDescription = {
    tr: 'Programlarımız, ödüllerimiz ve teknik detaylar hakkında yanıtlar',
    en: 'Answers about our programs, grants and technical details',
    ar: 'إجابات حول برامجنا ومنحنا والتفاصيل التقنية',
  }

  return (
    <>
      <main className="min-h-screen">
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16">
          <div className="container text-center space-y-6">
            <Badge className="mx-auto w-fit" variant="secondary">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              {pageTitle[locale as keyof typeof pageTitle] || pageTitle.en}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {pageDescription[locale as keyof typeof pageDescription] || pageDescription.en}
            </p>
          </div>
        </section>

        <div className="container py-16">
          {faqs.length === 0 ? (
            <div className="text-center text-muted-foreground">
              {locale === 'tr' ? 'Henüz SSS içeriği yok.' : locale === 'ar' ? 'لا توجد أسئلة شائعة بعد.' : 'No FAQ entries yet.'}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-4">
              {faqs
                .sort((a, b) => a.order - b.order)
                .map((faq) => (
                  <Card key={faq.id} className="p-0 overflow-hidden">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-left text-lg font-semibold">
                        {faq.question}
                        <span className="text-sm text-muted-foreground transition-transform group-open:-rotate-45">+</span>
                      </summary>
                      <div className="border-t p-6 text-muted-foreground">
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                      </div>
                    </details>
                  </Card>
                ))}
            </div>
          )}

          <Card className="mt-12 grid gap-6 border-dashed border-primary/40 bg-primary/5 p-8 md:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-wide text-primary">{locale === 'tr' ? 'Daha fazla bilgi' : locale === 'ar' ? 'معلومات إضافية' : 'Need more info?'}</p>
              <h2 className="text-2xl font-bold">
                {locale === 'tr' ? 'Uzmanlarımız sorularınızı yanıtlasın' : locale === 'ar' ? 'دع خبراءنا يجيبون عن أسئلتك' : 'Talk to our experts directly'}
              </h2>
              <p className="text-muted-foreground">
                {locale === 'tr'
                  ? 'Canlı oturumlar ve özel sunumlar için iletişim formunu doldurun.'
                  : locale === 'ar'
                    ? 'املأ نموذج الاتصال لجلسات مباشرة وعروض خاصة.'
                    : 'Fill the contact form for live sessions and custom showcases.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href={`/${locale}/contact`}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {locale === 'tr' ? 'İletişim Formu' : locale === 'ar' ? 'نموذج الاتصال' : 'Contact form'}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`mailto:${settings.contact_email || 'info@tarfakademi.com'}`}>
                  E-mail
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
