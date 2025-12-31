import Link from 'next/link'

import { SettingsForm } from '@/components/admin/settings-form'
import { upsertSettingsAction } from '@/app/admin/settings/actions'
import { prisma } from '@/lib/prisma'

export default async function SettingsPage() {
  const settings = await prisma.setting.findUnique({ where: { locale: 'tr' } })
  const defaultContactCopy = {
    heroEyebrow: 'TARF Akademi',
    heroTitle: 'Bilim, teknoloji ve etik ekseninde ortaklık kurun',
    heroSubtitle:
      'TARF, gençleri üretken kılan çok katmanlı teknoloji ekosistemi. Formu doldurun, 24 saat içinde yol haritamızı paylaşalım.',
    heroBody:
      'Bilimsel araştırma, yazılım teknolojileri, dergi ve teknoloji takımları aynı çatı altında. İhtiyacınızı anlatın; Ankara stüdyomuzdan hibrit görüşme ayarlayalım ve sprint bazlı planımızı sizinle paylaşalım.',
    formTitle: 'Başvuru formu',
    formSubtitle: 'Ekibimiz 24 saat içinde dönüş yapar.',
  }
  const contactContent =
    settings?.contactContent &&
      typeof settings.contactContent === 'object' &&
      !Array.isArray(settings.contactContent)
      ? (settings.contactContent as Record<string, Record<string, string>>)
      : undefined
  const contactCopy = contactContent?.tr

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">Site ayarları</h1>
            <p className="text-sm text-slate-400">
              Başlık, açıklama ve iletişim bilgilerini buradan güncelleyin.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Panele dön
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <SettingsForm
            action={upsertSettingsAction}
            defaultValues={{
              locale: settings?.locale ?? 'tr',
              siteName: settings?.siteName ?? '',
              siteDescription: settings?.siteDescription ?? '',
              contactEmail: settings?.contactEmail ?? '',
              contactPhone: settings?.contactPhone ?? '',
              contactAddress: settings?.contactAddress ?? '',
              socialTwitter:
                settings?.social && typeof settings.social === 'object'
                  ? (settings.social as Record<string, string>).twitter ||
                  (settings.social as Record<string, string>).x ||
                  ''
                  : '',
              socialYoutube:
                settings?.social && typeof settings.social === 'object'
                  ? (settings.social as Record<string, string>).youtube || ''
                  : '',
              contactContentJson: settings?.contactContent
                ? JSON.stringify(settings.contactContent, null, 2)
                : '',
              contactHeroEyebrow: contactCopy?.heroEyebrow || defaultContactCopy.heroEyebrow,
              contactHeroTitle: contactCopy?.heroTitle || defaultContactCopy.heroTitle,
              contactHeroSubtitle: contactCopy?.heroSubtitle || defaultContactCopy.heroSubtitle,
              contactHeroBody: contactCopy?.heroBody || defaultContactCopy.heroBody,
              contactFormTitle: contactCopy?.formTitle || defaultContactCopy.formTitle,
              contactFormSubtitle: contactCopy?.formSubtitle || defaultContactCopy.formSubtitle,
              contactCtaTitle: (contactCopy?.cta as any)?.title || '',
              contactCtaDescription: (contactCopy?.cta as any)?.description || '',
              contactCtaPrimaryLabel: (contactCopy?.cta as any)?.primaryAction?.label || '',
              contactCtaPrimaryUrl: (contactCopy?.cta as any)?.primaryAction?.href || '',
              contactCtaSecondaryLabel: (contactCopy?.cta as any)?.secondaryAction?.label || '',
              contactCtaSecondaryUrl: (contactCopy?.cta as any)?.secondaryAction?.href || '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
