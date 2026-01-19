'use client'

import { useEffect, useState, useCallback } from 'react'
import { X, Search, Loader2, Check, Image as ImageIcon, Video } from 'lucide-react'

type MediaItem = {
  id: string
  url: string
  type?: string | null
  altText?: string | null
  kind?: string | null
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

// Modal version of MediaPicker for use in editors
type MediaPickerModalProps = {
  isOpen: boolean
  onClose: () => void
  onSelect: (url: string) => void
  filter?: 'image' | 'video' | 'all'
}

export function MediaPickerModal({ isOpen, onClose, onSelect, filter = 'all' }: MediaPickerModalProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)

  const fetchMedia = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter === 'image') params.set('kind', 'image')
      if (filter === 'video') params.set('kind', 'video')
      if (searchQuery) params.set('q', searchQuery)

      const res = await fetch(`/api/media?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setMedia(data)
      }
    } catch (err) {
      console.error('Media fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [filter, searchQuery])

  useEffect(() => {
    if (isOpen) {
      fetchMedia()
      setSelectedUrl(null)
    }
  }, [isOpen, fetchMedia])

  const handleSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl)
      onClose()
    }
  }

  const isImage = (item: MediaItem) => {
    return item.kind === 'image' || item.type?.startsWith('image/')
  }

  const filteredMedia = media.filter(item => {
    if (filter === 'image') return isImage(item)
    if (filter === 'video') return !isImage(item)
    return true
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
            {filter === 'image' ? (
              <><ImageIcon className="h-5 w-5" /> Resim Seç</>
            ) : filter === 'video' ? (
              <><Video className="h-5 w-5" /> Video Seç</>
            ) : (
              <>Medya Seç</>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-slate-700 px-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchMedia()}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-slate-100 outline-none focus:border-orange-400"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              Henüz yüklenmiş medya yok.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {filteredMedia.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedUrl(item.url)}
                  className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition ${selectedUrl === item.url
                    ? 'border-orange-400 ring-2 ring-orange-400/50'
                    : 'border-slate-700 hover:border-slate-500'
                    }`}
                >
                  {isImage(item) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.url}
                      alt={item.altText || ''}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800">
                      <Video className="h-10 w-10 text-slate-500" />
                    </div>
                  )}
                  {selectedUrl === item.url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-orange-400/20">
                      <div className="rounded-full bg-orange-400 p-1">
                        <Check className="h-4 w-4 text-slate-900" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-700 px-4 py-3">
          <p className="text-xs text-slate-500">
            {filteredMedia.length} medya
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              İptal
            </button>
            <button
              type="button"
              onClick={handleSelect}
              disabled={!selectedUrl}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-orange-400 disabled:opacity-50"
            >
              Seç
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
