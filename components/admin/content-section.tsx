'use client'

import { useEffect, useState } from 'react'
import type { ContentSection } from '@/content/content-pages'

type SectionEditorProps = {
  value: ContentSection[]
  onChange: (value: ContentSection[]) => void
}

export function SectionEditor({ value, onChange }: SectionEditorProps) {
  const [sections, setSections] = useState<ContentSection[]>(value)

  useEffect(() => {
    setSections(value)
  }, [value])

  const updateSection = (index: number, section: Partial<ContentSection>) => {
    const next = [...sections]
    next[index] = { ...next[index], ...section }
    setSections(next)
    onChange(next)
  }

  const addSection = () => {
    const next = [
      ...sections,
      {
        id: `section-${Date.now()}`,
        title: 'Yeni bölüm',
        layout: 'grid',
        items: [],
      },
    ]
    setSections(next)
    onChange(next)
  }

  const removeSection = (index: number) => {
    const next = sections.filter((_, i) => i !== index)
    setSections(next)
    onChange(next)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200">Bölümler</h3>
        <button
          type="button"
          onClick={addSection}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400"
        >
          Bölüm ekle
        </button>
      </div>
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={section.id} className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                value={section.title}
                onChange={(e) => updateSection(index, { title: e.target.value })}
              />
              <select
                className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                value={section.layout || 'grid'}
                onChange={(e) => updateSection(index, { layout: e.target.value as ContentSection['layout'] })}
              >
                <option value="grid">Grid</option>
                <option value="list">Liste</option>
                <option value="timeline">Zaman çizelgesi</option>
                <option value="stats">İstatistik</option>
              </select>
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="rounded-lg border border-red-500/50 px-2 py-2 text-xs font-semibold text-red-100 transition hover:bg-red-500/10"
              >
                Sil
              </button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                placeholder="Eyebrow"
                value={section.eyebrow || ''}
                onChange={(e) => updateSection(index, { eyebrow: e.target.value })}
              />
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                placeholder="Açıklama"
                value={section.description || ''}
                onChange={(e) => updateSection(index, { description: e.target.value })}
              />
            </div>
            {/* Items basit düzenleyici */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Öğeler</p>
                <button
                  type="button"
                  onClick={() =>
                    updateSection(index, {
                      items: [...(section.items || []), { title: 'Başlık', description: '' }],
                    })
                  }
                  className="rounded-lg border border-slate-700 px-2 py-1 text-xs text-slate-100 transition hover:border-orange-400"
                >
                  Ekle
                </button>
              </div>
              <div className="space-y-2">
                {(section.items || []).map((item, itemIndex) => (
                  <div
                    key={`${section.id}-item-${itemIndex}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/80 p-2 space-y-1"
                  >
                    <input
                      className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                      placeholder="Başlık"
                      value={item.title}
                      onChange={(e) => {
                        const items = [...(section.items || [])]
                        items[itemIndex] = { ...items[itemIndex], title: e.target.value }
                        updateSection(index, { items })
                      }}
                    />
                    <textarea
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                    placeholder="Açıklama"
                    value={item.description || ''}
                    onChange={(e) => {
                      const items = [...(section.items || [])]
                      items[itemIndex] = { ...items[itemIndex], description: e.target.value }
                      updateSection(index, { items })
                    }}
                  />
                    <div className="grid gap-1 sm:grid-cols-2">
                      <input
                        className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                        placeholder="Link"
                        value={item.cta?.href || ''}
                        onChange={(e) => {
                          const items = [...(section.items || [])]
                          items[itemIndex] = {
                            ...items[itemIndex],
                            cta: { ...(items[itemIndex].cta || {}), href: e.target.value },
                          }
                          updateSection(index, { items })
                        }}
                      />
                      <input
                        className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                        placeholder="Link metni"
                        value={item.cta?.label || ''}
                        onChange={(e) => {
                          const items = [...(section.items || [])]
                          items[itemIndex] = {
                            ...items[itemIndex],
                            cta: { ...(items[itemIndex].cta || {}), label: e.target.value },
                          }
                          updateSection(index, { items })
                        }}
                      />
                    </div>
                    <div className="grid gap-1 sm:grid-cols-3">
                      <input
                        className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                        placeholder="Badge"
                        value={item.badge || ''}
                        onChange={(e) => {
                          const items = [...(section.items || [])]
                          items[itemIndex] = { ...items[itemIndex], badge: e.target.value }
                          updateSection(index, { items })
                        }}
                      />
                      <input
                        className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                        placeholder="Meta"
                        value={item.meta || ''}
                        onChange={(e) => {
                          const items = [...(section.items || [])]
                          items[itemIndex] = { ...items[itemIndex], meta: e.target.value }
                          updateSection(index, { items })
                        }}
                      />
                      <input
                        className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-orange-400"
                        placeholder="Highlight"
                        value={item.highlight || ''}
                        onChange={(e) => {
                          const items = [...(section.items || [])]
                          items[itemIndex] = { ...items[itemIndex], highlight: e.target.value }
                          updateSection(index, { items })
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const items = [...(section.items || [])].filter((_, i) => i !== itemIndex)
                        updateSection(index, { items })
                      }}
                      className="text-[11px] text-red-200"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                {(section.items || []).length === 0 && (
                  <p className="text-[11px] text-slate-500">Henüz öğe yok.</p>
                )}
              </div>
            </div>
          </div>
        ))}
        {sections.length === 0 && (
          <p className="text-xs text-slate-400">Henüz bölüm yok. Bölüm ekleyin.</p>
        )}
      </div>
    </div>
  )
}
