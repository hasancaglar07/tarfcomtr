'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { ContentPageDefinition } from '@/content/content-pages'

import type { PageActionState } from '@/app/admin/actions'
import { SectionEditor } from '@/components/admin/content-section'
import { ActionToast } from '@/components/admin/action-toast'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'
import { RichTextEditor } from '@/components/admin/rich-text-editor'

type ContentPageFormProps = {
  mode: 'create' | 'edit'
  action: (state: PageActionState, formData: FormData) => Promise<PageActionState>
  defaultValues: ContentPageDefinition & { status?: 'draft' | 'published' }
}

type HeroAction = NonNullable<ContentPageDefinition['hero']['actions']>[number]

const initialState: PageActionState = { status: 'idle' }

const withDefaults = (value: ContentPageDefinition): ContentPageDefinition => {
  return {
    ...value,
    hero: {
      eyebrow: value.hero.eyebrow || '',
      title: value.hero.title || '',
      subtitle: value.hero.subtitle || '',
      description: value.hero.description || '',
      backgroundImage: value.hero.backgroundImage || '',
      videoUrl: value.hero.videoUrl || '',
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
  const router = useRouter()
  const onInvalid = useInvalidToast()
  const [seoDirty, setSeoDirty] = useState({
    title: Boolean(defaultValues.seo.title),
    description: Boolean(defaultValues.seo.description),
  })

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

  const showSections = data.category === 'yasal'
  const heroActions = data.hero.actions ?? []

  useEffect(() => {
    setData(withDefaults(defaultValues))
    setPublish(defaultValues.status !== 'draft')
  }, [defaultValues])

  // Auto-fill SEO from hero title/description when empty
  useEffect(() => {
    const normalize = (text: string) =>
      text
        .trim()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/\s+/g, ' ')
    const buildSeoTitle = (page: ContentPageDefinition) => {
      if (!page.hero.title) return ''
      const base = normalize(page.hero.title)
      const withBrand = `${base} | TARF Akademi`
      return withBrand.slice(0, 90)
    }
    const buildDescription = (page: ContentPageDefinition) => {
      const raw =
        page.hero.subtitle ||
        page.hero.description ||
        page.cta.description ||
        page.seo.description ||
        page.hero.title ||
        ''
      const normalized = normalize(raw)
      const cleaned = normalized.replace(/\.+/g, '.').trim()
      const sentence = cleaned.endsWith('.') ? cleaned : `${cleaned}.`
      return sentence.slice(0, 155).trim()
    }
    setData((prev) => {
      let changed = false
      const next = { ...prev, seo: { ...prev.seo } }
      if (!seoDirty.title) {
        const candidate = buildSeoTitle(prev)
        if (candidate && candidate !== prev.seo.title) {
          next.seo.title = candidate
          changed = true
        }
      }
      if (!seoDirty.description) {
        const candidate = buildDescription(prev) || normalize(prev.hero.title).slice(0, 160)
        if (candidate && candidate !== prev.seo.description) {
          next.seo.description = candidate
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [
    seoDirty,
    data.hero.title,
    data.hero.subtitle,
    data.hero.description,
    data.cta.description,
    data.seo.title,
    data.seo.description,
  ])

  useEffect(() => {
    if (state?.status === 'success') {
      if (state.redirectTo) {
        router.push(state.redirectTo)
      } else {
        router.refresh()
      }
    }
  }, [router, state])

  const handleSubmit = async (formData: FormData) => {
    const cleanedActions = (data.hero.actions ?? [])
      .map((action) => ({
        ...action,
        label: action.label?.trim() ?? '',
        href: action.href?.trim() ?? '',
      }))
      .filter((action) => action.label && action.href)
    const payload: ContentPageDefinition = {
      ...data,
      hero: {
        ...data.hero,
        actions: cleanedActions,
      },
    }
    formData.set('slug', data.slug)
    formData.set('category', data.category)
    formData.set('title', data.hero.title)
    formData.set('seoTitle', data.seo.title)
    formData.set('seoDescription', data.seo.description)
    formData.set('dataJson', JSON.stringify(payload, null, 2))
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

  const updateHeroActions = (actions: HeroAction[]) => {
    updateData({ hero: { ...data.hero, actions } })
  }

  const addHeroAction = () => {
    updateHeroActions([...heroActions, { label: '', href: '', variant: 'primary' }])
  }

  const updateHeroAction = (index: number, patch: Partial<HeroAction>) => {
    const next = [...heroActions]
    const current = next[index] || { label: '', href: '' }
    next[index] = { ...current, ...patch }
    updateHeroActions(next)
  }

  const removeHeroAction = (index: number) => {
    updateHeroActions(heroActions.filter((_, i) => i !== index))
  }

  return (
    <form action={handleSubmit} className="space-y-6" onInvalid={onInvalid}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            value={data.slug}
            onChange={(e) => updateData({ slug: e.target.value })}
            required
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
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="heroTitle">
          Hero başlık
        </label>
        <input
          value={data.hero.eyebrow || ''}
          onChange={(e) => updateData({ hero: { ...data.hero, eyebrow: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Eyebrow"
        />
        <input
          id="heroTitle"
          value={data.hero.title}
          onChange={(e) => updateData({ hero: { ...data.hero, title: e.target.value } })}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
        <input
          value={data.hero.subtitle}
          onChange={(e) => updateData({ hero: { ...data.hero, subtitle: e.target.value } })}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Alt başlık"
        />
        <RichTextEditor
          value={data.hero.description || ''}
          onChange={(val) => updateData({ hero: { ...data.hero, description: val } })}
          placeholder="Hero açıklama"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm text-slate-300">Hero butonları</label>
          <button
            type="button"
            onClick={addHeroAction}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
          >
            Buton ekle
          </button>
        </div>
        <div className="space-y-2">
          {heroActions.length > 0 ? (
            heroActions.map((action, index) => (
              <div
                key={`${action.label}-${index}`}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-3"
              >
                <div className="grid gap-2 sm:grid-cols-3">
                  <input
                    value={action.label}
                    onChange={(e) => updateHeroAction(index, { label: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                    placeholder="Buton metni"
                  />
                  <input
                    value={action.href}
                    onChange={(e) => updateHeroAction(index, { href: e.target.value })}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                    placeholder="Buton linki"
                  />
                  <select
                    value={action.variant || ''}
                    onChange={(e) =>
                      updateHeroAction(index, {
                        variant: e.target.value
                          ? (e.target.value as HeroAction['variant'])
                          : undefined,
                      })
                    }
                    className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                  >
                    <option value="">Varsayılan</option>
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                  </select>
                </div>
                <div className="mt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeHeroAction(index)}
                    className="text-xs font-semibold text-red-200 transition hover:text-red-100"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">Henüz hero butonu yok.</p>
          )}
        </div>
      </div>

      {showSections ? (
        <SectionEditor value={data.sections || []} onChange={(sections) => updateData({ sections })} />
      ) : (
        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="text-sm font-semibold text-slate-200">Bölümler</h3>
          <p className="text-xs text-slate-500">
            Bu sayfa kategorisinde bölümler sitede gösterilmiyor.
          </p>
        </div>
      )}

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
            onChange={(e) => {
              setSeoDirty((prev) => ({ ...prev, title: true }))
              updateData({ seo: { ...data.seo, title: e.target.value } })
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300">SEO açıklama</label>
          <input
            value={data.seo.description}
            onChange={(e) => {
              setSeoDirty((prev) => ({ ...prev, description: true }))
              updateData({ seo: { ...data.seo, description: e.target.value } })
            }}
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

      <ActionToast state={state} />
    </form>
  )
}
