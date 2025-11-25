'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { MediaCard } from '@/components/admin/media-card'

type MediaItem = {
  id: string
  url: string
  type?: string | null
  altText?: string | null
  locale?: string | null
  createdAt?: string
  kind?: string | null
}

export function MediaLibrary() {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('')
  const [locale, setLocale] = useState('')

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (kind) params.set('kind', kind)
    if (locale) params.set('locale', locale)
    return params.toString()
  }, [q, kind, locale])

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/media?${query}`, { cache: 'no-store' })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Medya listesi alınamadı')
      }
      const data = await res.json()
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hata')
    } finally {
      setLoading(false)
    }
  }, [query])

  useEffect(() => {
    fetchMedia()
  }, [query, fetchMedia])

  useEffect(() => {
    const handler = () => fetchMedia()
    window.addEventListener('media:uploaded', handler)
    return () => window.removeEventListener('media:uploaded', handler)
  }, [fetchMedia])

  return (
    <div className="space-y-4">
      <form
        className="grid gap-3 md:grid-cols-4 items-end"
        onSubmit={(e) => {
          e.preventDefault()
          fetchMedia()
        }}
      >
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Ara</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="URL içinde ara"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Tür</label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="">(Tümü)</option>
            <option value="image">Görsel</option>
            <option value="video">Video</option>
            <option value="document">Doküman</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Locale</label>
          <input
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            placeholder="tr/en/ar"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400"
          >
            Filtrele
          </button>
          <button
            type="button"
            onClick={() => {
              setQ('')
              setKind('')
              setLocale('')
            }}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Temizle
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-400">Yükleniyor…</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            url={item.url}
            altText={item.altText}
            locale={item.locale}
            type={item.kind || item.type}
            createdAt={item.createdAt}
          />
        ))}
        {items.length === 0 && !loading && (
          <p className="text-sm text-slate-400">Henüz medya yok.</p>
        )}
      </div>

      <Link
        href="/admin"
        className="inline-flex w-fit rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
      >
        Panele dön
      </Link>
    </div>
  )
}
