'use client'

import { useEffect, useState } from 'react'
import type { ContentPageDefinition } from '@/content/content-pages'

import type { PageActionState } from '@/app/admin/actions'
import { SectionEditor } from '@/components/admin/content-section'

type ContentPageFormProps = {
  mode: 'create' | 'edit'
  action: (state: PageActionState, formData: FormData) => Promise<PageActionState>
  defaultValues: ContentPageDefinition & { status?: 'draft' | 'published' }
}

const initialState: PageActionState = { status: 'idle' }

const withDefaults = (value: ContentPageDefinition): ContentPageDefinition => {
  return {
    ...value,
    hero: {
      eyebrow: value.hero.eyebrow || '',
      title: value.hero.title || '',
      subtitle: value.hero.subtitle || '',
      description: value.hero.description || '',
      highlight: value.hero.highlight || '',
      badge: value.hero.badge || '',
      actions: value.hero.actions || [],
      stats: value.hero.stats || [],
    },
    sections: value.sections || [],
    cta: {
      title: value.cta.title || '',
      description: value.cta.description || '',
      primaryAction: value.cta.primaryAction || { label: '', href: '' },
      secondaryAction: value.cta.secondaryAction || undefined,
    },
    seo: {
      title: value.seo.title || '',
      description: value.seo.description || '',
    },
  }
}

export function ContentPageForm({ mode, action, defaultValues }: ContentPageFormProps) {
  const [state, setState] = useState<PageActionState>(initialState)
  const [data, setData] = useState<ContentPageDefinition>(withDefaults(defaultValues))
  const [publish, setPublish] = useState(defaultValues.status !== 'draft')

  const safeSlug = useMemo(() => {
    const value = data.slug || ''
    return value
      .toLowerCase()
      .trim()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }, [data.slug])

  useEffect(() => {
    setData(withDefaults(defaultValues))
    setPublish(defaultValues.status !== 'draft')
  }, [defaultValues])

  const handleSubmit = async (formData: FormData) => {
    formData.set('slug', data.slug)
    formData.set('category', data.category)
    formData.set('title', data.hero.title)
    formData.set('seoTitle', data.seo.title)
    formData.set('seoDescription', data.seo.description)
    formData.set('dataJson', JSON.stringify(data, null, 2))
    if (mode === 'edit') {
      formData.set('originalSlug', defaultValues.slug)
    }
    if (publish) {
      formData.set('publish', 'true')
    }
    const next = await action(state, formData)
    setState(next)
  }

  const updateData = (partial: Partial<ContentPageDefinition>) => {
    setData((prev) => ({ ...prev, ...partial }))
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            value={data.slug}
            onChange={(e) => updateData({ slug: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
          <p className="text-xs text-slate-500">
            Önerilen slug: <span className="text-orange-300">{safeSlug || '—'}</span>{' '}
            <button
              type="button"
              className="underline underline-offset-2"
              onClick={() => updateData({ slug: safeSlug })}
            >
              Uygula
            </button>
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="category">
            Kategori
          </label>
          <input
            id="category"
            value={data.category}
            onChange={(e) => updateData({ category: e.target.value as ContentPageDefinition['category'] })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Hero başlık</label>
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={data.hero.backgroundImage || ''}
            onChange={(e) => updateData({ hero: { ...data.hero, backgroundImage: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Arka plan görseli URL"
          />
          <input
            value={data.hero.videoUrl || ''}
            onChange={(e) => updateData({ hero: { ...data.hero, videoUrl: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Video URL (opsiyonel)"
          />
        </div>
        <input
          value={data.hero.eyebrow || ''}
          onChange={(e) => updateData({ hero: { ...data.hero, eyebrow: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Eyebrow"
        />
        <input
          value={data.hero.title}
          onChange={(e) => updateData({ hero: { ...data.hero, title: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
        <input
          value={data.hero.subtitle}
          onChange={(e) => updateData({ hero: { ...data.hero, subtitle: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Alt başlık"
        />
        <textarea
          value={data.hero.description || ''}
          onChange={(e) => updateData({ hero: { ...data.hero, description: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Hero açıklama"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={data.hero.badge || ''}
            onChange={(e) => updateData({ hero: { ...data.hero, badge: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Badge"
          />
          <input
            value={data.hero.highlight || ''}
            onChange={(e) => updateData({ hero: { ...data.hero, highlight: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Öne çıkan metin"
          />
        </div>
      </div>

      <SectionEditor
        value={data.sections || []}
        onChange={(sections) => updateData({ sections })}
      />

      <div className="space-y-2">
        <label className="text-sm text-slate-300">CTA başlık</label>
        <input
          value={data.cta.title}
          onChange={(e) => updateData({ cta: { ...data.cta, title: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
        <input
          value={data.cta.description}
          onChange={(e) => updateData({ cta: { ...data.cta, description: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            value={data.cta.primaryAction?.label || ''}
            onChange={(e) =>
              updateData({
                cta: {
                  ...data.cta,
                  primaryAction: { ...(data.cta.primaryAction || { href: '' }), label: e.target.value },
                },
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Birincil CTA metni"
          />
          <input
            value={data.cta.primaryAction?.href || ''}
            onChange={(e) =>
              updateData({
                cta: {
                  ...data.cta,
                  primaryAction: { ...(data.cta.primaryAction || { label: '' }), href: e.target.value },
                },
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Birincil CTA link"
          />
          <input
            value={data.cta.secondaryAction?.label || ''}
            onChange={(e) =>
              updateData({
                cta: {
                  ...data.cta,
                  secondaryAction: {
                    ...(data.cta.secondaryAction || { href: '' }),
                    label: e.target.value,
                  },
                },
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="İkincil CTA metni"
          />
          <input
            value={data.cta.secondaryAction?.href || ''}
            onChange={(e) =>
              updateData({
                cta: {
                  ...data.cta,
                  secondaryAction: {
                    ...(data.cta.secondaryAction || { label: '' }),
                    href: e.target.value,
                  },
                },
              })
            }
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="İkincil CTA link"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300">SEO başlık</label>
          <input
            value={data.seo.title}
            onChange={(e) => updateData({ seo: { ...data.seo, title: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">SEO açıklama</label>
          <input
            value={data.seo.description}
            onChange={(e) => updateData({ seo: { ...data.seo, description: e.target.value } })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500"
          />
          Yayınla
        </label>
        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
        >
          {mode === 'create' ? 'Oluştur' : 'Güncelle'}
        </button>
      </div>

      {state?.status === 'error' && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.message || 'Kaydetme hatası'}
        </div>
      )}
    </form>
  )
}
