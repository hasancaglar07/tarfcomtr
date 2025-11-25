'use client'

import { useEffect, useState } from 'react'

type MediaItem = {
  id: string
  url: string
  type?: string | null
  altText?: string | null
  createdAt?: string
}

type MediaPickerProps = {
  onSelect: (url: string) => void
  filterKind?: string
  filterLocale?: string
}

export function MediaPicker({ onSelect, filterKind, filterLocale }: MediaPickerProps) {
  const [items, setItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams()
        if (filterKind) params.set('kind', filterKind)
        if (filterLocale) params.set('locale', filterLocale)
        const res = await fetch(`/api/media?${params.toString()}`)
        if (!res.ok) {
          throw new Error('Medya listesi alınamadı')
        }
        const data = await res.json()
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Hata')
      } finally {
        setLoading(false)
      }
    }
    fetchMedia()
  }, [filterKind, filterLocale])

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-100">Medya kütüphanesi</p>
          <p className="text-xs text-slate-500">Son yüklenen dosyalardan seçin.</p>
        </div>
        {loading && <p className="text-xs text-slate-400">Yükleniyor…</p>}
      </div>
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.url)}
            className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-2 text-left transition hover:border-orange-400"
          >
            <div className="h-20 w-full rounded bg-slate-800" style={{ backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <p className="mt-2 line-clamp-1 text-xs text-slate-300">{item.url}</p>
          </button>
        ))}
        {items.length === 0 && !loading && (
          <p className="col-span-2 text-xs text-slate-400">Medya bulunamadı. Önce yükleyin.</p>
        )}
      </div>
    </div>
  )
}
