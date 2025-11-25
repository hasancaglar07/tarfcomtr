import { PageForm } from '@/components/admin/page-form'
import { createPageAction } from '@/app/admin/actions'
import { BlobUpload } from '@/components/admin/blob-upload'

const template = {
  hero: {
    eyebrow: 'Kategori etiketi',
    title: 'Yeni sayfa başlığı',
    subtitle: 'Kısa alt başlık',
    description: 'Detaylı açıklama metni',
    actions: [{ label: 'İletişim', href: 'contact' }],
    stats: [{ label: 'Örnek', value: '100+', helper: 'İstatistik' }],
  },
  sections: [],
  cta: {
    title: 'Çağrı başlığı',
    description: 'CTA açıklaması',
    primaryAction: { label: 'İletişime geç', href: 'contact' },
  },
  seo: {
    title: 'SEO başlığı',
    description: 'SEO açıklaması',
  },
}

export default function NewContentPage() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yeni sayfa
            </p>
            <h1 className="text-3xl font-semibold">İçerik oluştur</h1>
            <p className="text-sm text-slate-400">
              Slug, kategori ve JSON içeriği ile yeni bir sayfa ekleyin.
            </p>
          </div>
        </div>

        <BlobUpload />

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <PageForm
            mode="create"
            action={createPageAction}
            defaultValues={{
              slug: '',
              category: 'kurumsal',
              title: '',
              seoTitle: '',
              seoDescription: '',
              dataJson: JSON.stringify(template, null, 2),
              publish: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}
