'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import type { ContentCategory } from '@prisma/client'

import type { PageActionState } from '@/app/admin/actions'
import { ActionToast } from '@/components/admin/action-toast'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'
import { RichTextEditor } from './rich-text-editor'
import { ContentPageDefinition } from '@/content/content-pages'

type PageFormProps = {
  mode: 'create' | 'edit'
  action: (state: PageActionState, formData: FormData) => Promise<PageActionState>
  defaultValues: {
    slug: string
    category: ContentCategory
    title: string
    seoTitle?: string | null
    seoDescription?: string | null
    dataJson: string
    publish: boolean
    originalSlug?: string
  }
}

const initialState: PageActionState = { status: 'idle' }
const categories: ContentCategory[] = [
  'kurumsal',
  'dusunce',
  'akademi',
  'yazilim',
  'kulupler',
  'yayinlar',
  'yasal',
]

export function PageForm({ mode, action, defaultValues }: PageFormProps) {
  const router = useRouter()
  const [state, formAction] = useFormState(action, initialState)
  const onInvalid = useInvalidToast()
  const [seoTitle, setSeoTitle] = useState(defaultValues.seoTitle || '')
  const [seoDescription, setSeoDescription] = useState(defaultValues.seoDescription || '')
  const [seoDirty, setSeoDirty] = useState({
    title: Boolean(defaultValues.seoTitle),
    description: Boolean(defaultValues.seoDescription),
  })
  const [dataJson, setDataJson] = useState(defaultValues.dataJson)
  const [editorMode, setEditorMode] = useState<'json' | 'visual'>('json')

  const parsedData = (() => {
    try {
      return JSON.parse(dataJson) as ContentPageDefinition
    } catch (e) {
      return null
    }
  })()

  const updateParsedData = (updater: (prev: ContentPageDefinition) => ContentPageDefinition) => {
    if (!parsedData) return
    const newData = updater(parsedData)
    setDataJson(JSON.stringify(newData, null, 2))
  }

  if (state?.status === 'error') {
    // noop, render message below
  }

  useEffect(() => {
    if (state?.status === 'success') {
      if (state.redirectTo) {
        router.push(state.redirectTo)
      } else {
        router.refresh()
      }
    }
  }, [router, state])

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
    if (!seoDirty.title && defaultValues.title) {
      const candidate = normalize(defaultValues.title).slice(0, 90)
      if (candidate !== seoTitle) setSeoTitle(candidate)
    }
    if (!seoDirty.description) {
      const candidate = normalize(defaultValues.title).slice(0, 160)
      if (candidate !== seoDescription) setSeoDescription(candidate)
    }
  }, [defaultValues.title, seoTitle, seoDescription, seoDirty])

  const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? 'Kaydediliyor…' : mode === 'create' ? 'Oluştur' : 'Güncelle'}
      </button>
    )
  }

  return (
    <form action={formAction} className="space-y-6" onInvalid={onInvalid}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={defaultValues.slug}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="ornek-slug"
          />
          {mode === 'edit' && (
            <input type="hidden" name="originalSlug" value={defaultValues.originalSlug ?? defaultValues.slug} />
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="category">
            Kategori
          </label>
          <select
            id="category"
            name="category"
            defaultValue={defaultValues.category}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues.title}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Sayfa başlığı"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="seoTitle">
            SEO Başlık
          </label>
          <input
            id="seoTitle"
            name="seoTitle"
            value={seoTitle}
            onChange={(e) => {
              setSeoDirty((prev) => ({ ...prev, title: true }))
              setSeoTitle(e.target.value)
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="SEO başlığı (opsiyonel)"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="seoDescription">
            SEO Açıklama
          </label>
          <input
            id="seoDescription"
            name="seoDescription"
            value={seoDescription}
            onChange={(e) => {
              setSeoDirty((prev) => ({ ...prev, description: true }))
              setSeoDescription(e.target.value)
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Kısa açıklama"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-300">
            İçerik Editörü
          </label>
          <div className="flex rounded-lg border border-slate-700 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => setEditorMode('json')}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition ${editorMode === 'json'
                  ? 'bg-slate-700 text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              JSON
            </button>
            <button
              type="button"
              onClick={() => {
                if (!parsedData) {
                  alert('JSON formatı hatalı olduğu için görsel editöre geçilemiyor.')
                  return
                }
                setEditorMode('visual')
              }}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition ${editorMode === 'visual'
                  ? 'bg-orange-500 text-slate-950'
                  : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              Görsel Editör
            </button>
          </div>
        </div>

        {editorMode === 'json' ? (
          <textarea
            id="dataJson"
            name="dataJson"
            required
            value={dataJson}
            onChange={(e) => setDataJson(e.target.value)}
            className="min-h-[460px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-mono text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        ) : (
          <div className="space-y-8 rounded-xl border border-slate-700 bg-slate-900/50 p-6">
            <input type="hidden" name="dataJson" value={dataJson} />

            {/* Hero Section */}
            <div className="space-y-4">
              <h3 className="border-b border-slate-700 pb-2 text-lg font-bold text-orange-400">Hero Bölümü</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 uppercase">Giriş Etiketi (Eyebrow)</label>
                  <input
                    value={parsedData?.hero.eyebrow || ''}
                    onChange={(e) => updateParsedData(prev => ({ ...prev, hero: { ...prev.hero, eyebrow: e.target.value } }))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 uppercase">Hero Başlık</label>
                  <input
                    value={parsedData?.hero.title || ''}
                    onChange={(e) => updateParsedData(prev => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400 uppercase">Açıklama Metni (Rich Text)</label>
                <RichTextEditor
                  value={parsedData?.hero.description || ''}
                  onChange={(val) => updateParsedData(prev => ({ ...prev, hero: { ...prev.hero, description: val } }))}
                  placeholder="Hero açıklamasını buraya yazın..."
                />
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-6">
              <h3 className="border-b border-slate-700 pb-2 text-lg font-bold text-orange-400">Sayfa Bölümleri (Sections)</h3>
              {parsedData?.sections.map((section, sIdx) => (
                <div key={section.id || sIdx} className="rounded-lg border border-slate-700 bg-slate-950/50 p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-200">Bölüm #{sIdx + 1}: {section.title}</span>
                    <span className="text-[10px] uppercase text-slate-500 font-mono">{section.layout || 'grid'}</span>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 uppercase">Bölüm Başlığı</label>
                      <input
                        value={section.title || ''}
                        onChange={(e) => updateParsedData(prev => {
                          const sections = [...prev.sections]
                          sections[sIdx] = { ...sections[sIdx], title: e.target.value }
                          return { ...prev, sections }
                        })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 uppercase">Giriş Metni (Eyebrow)</label>
                      <input
                        value={section.eyebrow || ''}
                        onChange={(e) => updateParsedData(prev => {
                          const sections = [...prev.sections]
                          sections[sIdx] = { ...sections[sIdx], eyebrow: e.target.value }
                          return { ...prev, sections }
                        })}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-orange-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 uppercase">Bölüm Açıklaması</label>
                    <RichTextEditor
                      value={section.description || ''}
                      onChange={(val) => updateParsedData(prev => {
                        const sections = [...prev.sections]
                        sections[sIdx] = { ...sections[sIdx], description: val }
                        return { ...prev, sections }
                      })}
                    />
                  </div>

                  {section.items && section.items.length > 0 && (
                    <div className="pl-4 border-l-2 border-slate-800 space-y-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase">Alt Öğeler (Items)</p>
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx} className="space-y-2">
                          <input
                            value={item.title || ''}
                            placeholder="Öğe başlığı"
                            onChange={(e) => updateParsedData(prev => {
                              const sections = [...prev.sections]
                              const items = [...(sections[sIdx].items || [])]
                              items[iIdx] = { ...items[iIdx], title: e.target.value }
                              sections[sIdx] = { ...sections[sIdx], items }
                              return { ...prev, sections }
                            })}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-sm text-slate-100 outline-none focus:border-orange-400"
                          />
                          <RichTextEditor
                            value={item.description || ''}
                            onChange={(val) => updateParsedData(prev => {
                              const sections = [...prev.sections]
                              const items = [...(sections[sIdx].items || [])]
                              items[iIdx] = { ...items[iIdx], description: val }
                              sections[sIdx] = { ...sections[sIdx], items }
                              return { ...prev, sections }
                            })}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic text-center">
              Daha fazla bölüm eklemek veya silmek için şimdilik JSON modunu kullanın.
            </p>
          </div>
        )}
        <p className="text-xs text-slate-500">
          Slug ve Kategori alanlarını yukarıdan güncelleyebilirsiniz. İçerik yapısı `ContentPageDefinition` formatındadır.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input
            type="checkbox"
            name="publish"
            defaultChecked={defaultValues.publish}
            className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-500"
          />
          Yayınla
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/pages')}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Listeye dön
          </button>
          <SubmitButton />
        </div>
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
