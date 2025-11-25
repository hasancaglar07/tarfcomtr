'use client'

import { useState } from 'react'

type MediaCardProps = {
  id: string
  url: string
  locale?: string | null
  type?: string | null
  altText?: string | null
  createdAt?: string
}

export function MediaCard({ id, url, locale, type, altText: initialAlt }: MediaCardProps) {
  const [altText, setAltText] = useState(initialAlt || '')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const saveAlt = async () => {
    setSaving(true)
    setMessage(null)
    const body = new FormData()
    body.append('id', id)
    body.append('altText', altText)
    if (locale) body.append('locale', locale)
    try {
      const res = await fetch('/api/media/update', { method: 'POST', body })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Kaydedilemedi')
      }
      setMessage('Kaydedildi')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Hata')
    } finally {
      setSaving(false)
    }
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setMessage('Kopyalandı')
    } catch {
      setMessage('Kopyalanamadı')
    }
  }

  return (
    <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow">
      <div
        className="relative h-32 w-full rounded-lg bg-slate-800"
        style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <p className="text-xs text-orange-200 break-all">{url}</p>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto] items-center">
        <input
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder="Alt text"
        />
        <button
          type="button"
          onClick={saveAlt}
          disabled={saving}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-orange-400 disabled:opacity-60"
        >
          {saving ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </div>
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>{locale || 'tr'}</span>
        <span>{type || 'dosya'}</span>
        <button
          type="button"
          onClick={copyUrl}
          className="text-orange-300 underline underline-offset-2"
        >
          Kopyala
        </button>
      </div>
      {message && <p className="text-[11px] text-slate-400">{message}</p>}
    </div>
  )
}
