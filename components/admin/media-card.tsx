'use client'

import { useState } from 'react'
import { useAdminToast } from '@/components/admin/admin-toast-provider'
import { AdminModal } from '@/components/admin/admin-modal'

type MediaCardProps = {
  id: string
  url: string
  locale?: string | null
  type?: string | null
  altText?: string | null
  createdAt?: string
  onDeleted?: () => void
}

export function MediaCard({ id, url, locale, type, altText: initialAlt, onDeleted }: MediaCardProps) {
  const { showToast } = useAdminToast()
  const [altText, setAltText] = useState(initialAlt || '')
  const [saving, setSaving] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const saveAlt = async () => {
    setSaving(true)
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
      showToast('success', 'Alt metin kaydedildi')
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Hata')
    } finally {
      setSaving(false)
    }
  }

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url)
      showToast('success', 'URL kopyalandı')
    } catch {
      showToast('error', 'Kopyalanamadı')
    }
  }

  const deleteMedia = async () => {
    if (deleting) return
    setDeleting(true)
    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Silinemedi')
      }
      showToast('success', 'Medya silindi')
      setConfirmingDelete(false)
      onDeleted?.()
    } catch (err) {
      showToast('error', err instanceof Error ? err.message : 'Hata')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
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
          <div className="flex items-center gap-2">
            <span>{locale || 'tr'}</span>
            <span>•</span>
            <span>{type || 'dosya'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copyUrl}
              className="text-orange-300 underline underline-offset-2"
            >
              Kopyala
            </button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="text-red-300 underline underline-offset-2"
            >
              Sil
            </button>
          </div>
        </div>
      </div>

      <AdminModal
        open={confirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        title="Medya silinsin mi?"
        description="Bu medya kaydı ve dosyası kalıcı olarak silinir. Bu işlem geri alınamaz."
        dismissible={!deleting}
        footer={
          <div className="flex w-full items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmingDelete(false)}
              disabled={deleting}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500 disabled:opacity-60"
            >
              Vazgeç
            </button>
            <button
              type="button"
              onClick={deleteMedia}
              disabled={deleting}
              className="rounded-lg border border-red-500/60 px-3 py-1.5 text-sm font-semibold text-red-100 transition hover:bg-red-500/10 disabled:opacity-60"
            >
              {deleting ? 'Siliniyor…' : 'Evet, sil'}
            </button>
          </div>
        }
      >
        <p className="text-xs text-slate-400 break-all">{url}</p>
      </AdminModal>
    </>
  )
}
