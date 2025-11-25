'use client'

import { useState } from 'react'

export function BlobUpload() {
  const [uploading, setUploading] = useState(false)
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [locale, setLocale] = useState('tr')
  const [altText, setAltText] = useState('')
  const [kind, setKind] = useState<'image' | 'video' | 'document' | ''>('')

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const body = new FormData()
    body.append('file', file)
    body.append('locale', locale)
    if (altText) {
      body.append('altText', altText)
    }
    if (kind) {
      body.append('kind', kind)
    }

    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body,
      })

      if (!res.ok) {
        const message = await res.text()
        throw new Error(message || 'Yükleme başarısız')
      }

      const data = await res.json()
      setUrl(data.url || data.downloadUrl || null)
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('media:uploaded'))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Yükleme hatası')
      setUrl(null)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-100">Vercel Blob yükleme</p>
          <p className="text-xs text-slate-400">Dosya seçin, url çıktısını içerik JSON içinde kullanın.</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            value={locale}
            onChange={(e) => setLocale(e.target.value)}
            className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="locale"
          />
          <input
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-32 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Alt text"
          />
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as typeof kind)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="">Tür</option>
            <option value="image">Görsel</option>
            <option value="video">Video</option>
            <option value="document">Doküman</option>
          </select>
        </div>
        <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-orange-400 hover:text-orange-200">
          {uploading ? 'Yükleniyor…' : 'Dosya Seç'}
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {url && (
        <div className="break-all rounded-lg border border-emerald-700/50 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100">
          {url}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}
    </div>
  )
}
