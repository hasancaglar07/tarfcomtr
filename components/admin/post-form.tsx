'use client'

import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { useEffect, useMemo, useState } from 'react'
import type { Category, Post, PostType } from '@prisma/client'

import type { PostActionState } from '@/app/admin/posts/actions'
import { RichTextEditor } from '@/components/admin/rich-text'
import { MediaPicker } from '@/components/admin/media-picker'
import { BlobUpload } from '@/components/admin/blob-upload'
import { ActionToast } from '@/components/admin/action-toast'

type PostFormProps = {
  mode: 'create' | 'edit'
  action: (state: PostActionState, formData: FormData) => Promise<PostActionState>
  type: PostType
  categories: Category[]
  defaultValues?: Partial<Post> & {
    gallery?: string[]
  }
}

const initialState: PostActionState = { status: 'idle' }

export function PostForm({ mode, action, type, categories, defaultValues }: PostFormProps) {
  const router = useRouter()
  const [state, formAction] = useFormState(action, initialState)
  const galleryValue =
    defaultValues?.meta && typeof defaultValues.meta === 'object'
      ? Array.isArray((defaultValues.meta as { gallery?: string[] }).gallery)
        ? ((defaultValues.meta as { gallery?: string[] }).gallery || []).join(', ')
        : ''
      : ''

  const [title, setTitle] = useState(defaultValues?.title ?? '')
  const [slug, setSlug] = useState(defaultValues?.slug ?? '')
  const [content, setContent] = useState(defaultValues?.content ?? '')
  const [featuredImage, setFeaturedImage] = useState(defaultValues?.featuredImage || '')
  const [ogImage, setOgImage] = useState(
    (defaultValues as Partial<Post> & { ogImage?: string })?.ogImage || '',
  )
  const [seoTitle, setSeoTitle] = useState(
    (defaultValues as Partial<Post> & { seoTitle?: string })?.seoTitle || '',
  )
  const [seoDescription, setSeoDescription] = useState(
    (defaultValues as Partial<Post> & { seoDescription?: string })?.seoDescription || '',
  )
  const [seoTitleDirty, setSeoTitleDirty] = useState(
    Boolean((defaultValues as Partial<Post> & { seoTitle?: string })?.seoTitle),
  )
  const [seoDescriptionDirty, setSeoDescriptionDirty] = useState(
    Boolean((defaultValues as Partial<Post> & { seoDescription?: string })?.seoDescription),
  )

  const autoSlug = useMemo(() => {
    if (!title) return ''
    return title
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
  }, [title])

  useEffect(() => {
    if (!slug && autoSlug) {
      setSlug(autoSlug)
    }
  }, [autoSlug, slug])

  // Auto-fill SEO fields when empty, based on title/content
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

    const buildSeoTitle = () => {
      if (!title) return ''
      const base = normalize(title)
      const withBrand = `${base} | TARF Akademi`
      return withBrand.slice(0, 90)
    }
    const buildDescription = () => {
      const raw =
        (content && content.replace(/<[^>]+>/g, ' ')) || defaultValues?.excerpt || title || ''
      if (!raw) return ''
      const normalized = normalize(raw)
      const cleaned = normalized.replace(/\.+/g, '.').trim()
      const sentence = cleaned.endsWith('.') ? cleaned : `${cleaned}.`
      // Add category hint if available
      const categoryText =
        type === 'blog'
          ? 'Blog yazısı.'
          : type === 'event'
            ? 'Etkinlik.'
            : type === 'service'
              ? 'Hizmet.'
              : type === 'podcast'
                ? 'Podcast.'
                : type === 'video'
                  ? 'Video.'
                  : ''
      const merged =
        sentence.length + categoryText.length < 155 ? `${sentence} ${categoryText}` : sentence
      return merged.slice(0, 155).trim()
    }
    if (!seoTitleDirty && title) {
      const candidate = buildSeoTitle()
      if (candidate && candidate !== seoTitle) setSeoTitle(candidate)
    }
    if (!seoDescriptionDirty) {
      const desc = buildDescription()
      const candidate = desc ? desc : normalize(title).slice(0, 160)
      if (candidate && candidate !== seoDescription) setSeoDescription(candidate)
    }
  }, [
    title,
    content,
    seoTitleDirty,
    seoDescriptionDirty,
    defaultValues?.excerpt,
    seoTitle,
    seoDescription,
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
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="type" value={type} />
      {mode === 'edit' && defaultValues?.slug ? (
        <input type="hidden" name="originalSlug" value={defaultValues.slug} />
      ) : null}
      <input type="hidden" name="content" value={content} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="title">
            Başlık
          </label>
          <input
            id="title"
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Başlık"
          />
          <p className="text-xs text-slate-500">Başlık yazıldıkça slug otomatik önerilir.</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="ornek-slug"
          />
          <p className="text-xs text-slate-500">
            Önerilen: {autoSlug || '—'}{' '}
            <button
              type="button"
              className="text-orange-300 underline underline-offset-2"
              onClick={() => setSlug(autoSlug || slug)}
            >
              Öneriyi kullan
            </button>
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="excerpt">
          Özet
        </label>
        <input
          id="excerpt"
          name="excerpt"
          defaultValue={defaultValues?.excerpt || ''}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Kısa açıklama"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="content">
          İçerik
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          placeholder="İçerik metni (biçimlendirme destekli)"
        />
        <p className="text-xs text-slate-500">
          Biçimlendirme desteklidir (kalın/italik/listeler). İçerik HTML olarak kaydedilir.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="categoryId">
            Kategori
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={defaultValues?.categoryId || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="">(Seçiniz)</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="locale">
            Locale
          </label>
          <input
            id="locale"
            name="locale"
            defaultValue={defaultValues?.locale || 'tr'}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="featuredImage">
            Kapak görseli (URL)
          </label>
          <input
            id="featuredImage"
            name="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
          <p className="text-xs text-slate-500">Medya yükledikten sonra URL’yi buraya yapıştırın.</p>
          <div className="space-y-2">
            <BlobUpload />
            <MediaPicker
              onSelect={(url) => setFeaturedImage(url)}
              filterKind="image"
              filterLocale={defaultValues?.locale || 'tr'}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="gallery">
            Galeri (virgül ile ayırın)
          </label>
          <input
            id="gallery"
            name="gallery"
            defaultValue={galleryValue}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="https://... , https://..."
          />
          <p className="text-xs text-slate-500">Etkinlik/konferans fotoğrafları için çoklu URL ekleyin.</p>
          <div className="space-y-2">
            <BlobUpload />
            <MediaPicker
              onSelect={(url) => {
                const current = galleryValue ? `${galleryValue}, ${url}` : url
                const input = document.getElementById('gallery') as HTMLInputElement | null
                if (input) input.value = current
              }}
              filterKind="image"
              filterLocale={defaultValues?.locale || 'tr'}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="seoTitle">
            SEO Başlık
          </label>
          <input
            id="seoTitle"
        name="seoTitle"
        value={seoTitle}
        onChange={(e) => {
          setSeoTitleDirty(true)
          setSeoTitle(e.target.value)
        }}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        placeholder="Meta title"
      />
    </div>
    <div className="space-y-2 sm:col-span-2">
      <label className="text-sm text-slate-300" htmlFor="seoDescription">
        SEO Açıklama
      </label>
      <input
        id="seoDescription"
        name="seoDescription"
        value={seoDescription}
        onChange={(e) => {
          setSeoDescriptionDirty(true)
          setSeoDescription(e.target.value)
        }}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        placeholder="Meta description"
      />
    </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300" htmlFor="ogImage">
          Sosyal önizleme görseli (OG image URL)
        </label>
        <input
          id="ogImage"
          name="ogImage"
          value={ogImage}
          onChange={(e) => setOgImage(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="https://.../og-image.jpg"
        />
        <p className="text-xs text-slate-500">Sosyal paylaşım için kapak. Medyadan seçebilirsiniz.</p>
        <div className="space-y-2">
          <BlobUpload />
          <MediaPicker
            onSelect={(url) => setOgImage(url)}
            filterKind="image"
            filterLocale={defaultValues?.locale || 'tr'}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="youtubeUrl">
            YouTube URL (video için)
          </label>
          <input
            id="youtubeUrl"
            name="youtubeUrl"
            defaultValue={defaultValues?.youtubeUrl || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="audioUrl">
            Audio URL (podcast için)
          </label>
          <input
            id="audioUrl"
            name="audioUrl"
            defaultValue={defaultValues?.audioUrl || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="status">
            Yayın durumu
          </label>
          <select
            id="status"
            name="status"
            defaultValue={defaultValues?.status || 'published'}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="draft">Taslak</option>
            <option value="published">Yayında</option>
          </select>
        </div>
      </div>

      {type === 'event' && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="eventDate">
              Etkinlik tarihi
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              defaultValue={
                defaultValues?.eventDate
                  ? new Date(defaultValues.eventDate).toISOString().slice(0, 10)
                  : ''
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="eventTime">
              Saat
            </label>
            <input
              id="eventTime"
              name="eventTime"
              defaultValue={defaultValues?.eventTime || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="19:00"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300" htmlFor="location">
              Konum
            </label>
            <input
              id="location"
              name="location"
              defaultValue={defaultValues?.location || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="İstanbul"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push(`/admin/posts/${type}`)}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
        >
          Listeye dön
        </button>
        <SubmitButton />
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
