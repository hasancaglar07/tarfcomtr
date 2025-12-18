'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import type { ContentCategory } from '@prisma/client'

import type { PageActionState } from '@/app/admin/actions'
import { ActionToast } from '@/components/admin/action-toast'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'

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

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="dataJson">
          İçerik JSON (hero, sections, cta, seo)
        </label>
        <textarea
          id="dataJson"
          name="dataJson"
          required
          defaultValue={defaultValues.dataJson}
          className="min-h-[360px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-mono text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
        <p className="text-xs text-slate-500">
          JSON yapısı `ContentPageDefinition` formatında olmalı. Slug/kategori alanları yukarıdan alınır.
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
