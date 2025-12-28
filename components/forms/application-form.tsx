'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

type Copy = {
  placeholders: {
    name: string
    email: string
    phone: string
    company: string
    topic: string
    message: string
  }
  typeLabel: string
  applicationTypes: string[]
  submit: string
  successTitle?: string
  successBody?: string
  errorTitle?: string
  errorBody?: string
  kvkkLabel?: string
  kvkkLinkText?: string
  kvkkLink?: string
}

export function ApplicationForm({ copy }: { copy: Copy }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    topic: '',
    message: '',
    applicationType: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!kvkkAccepted) {
      setError(copy.kvkkLabel || 'KVKK metnini onaylamanız gerekmektedir.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const selectedType =
        copy.applicationTypes.find((t) => t === formData.applicationType)?.toString() ||
        formData.applicationType
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject:
          selectedType && formData.topic.trim()
            ? `${selectedType} - ${formData.topic.trim()}`
            : selectedType || formData.topic.trim() || formData.company.trim() || undefined,
        message: [
          `Başvuru Türü: ${selectedType || 'Belirtilmedi'}`,
          `Konu: ${formData.topic || '-'}`,
          `Firma: ${formData.company || '-'}`,
          '',
          formData.message,
        ].join('\n'),
      }
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Başvuru gönderilemedi. Lütfen tekrar deneyin.')
      }
      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        topic: '',
        message: '',
        applicationType: '',
      })
      setKvkkAccepted(false)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Başvuru gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-emerald-600/30 bg-emerald-500/15 p-6 text-left shadow-lg">
        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
        <h3 className="text-xl font-semibold text-emerald-900">
          {copy.successTitle || 'Başvurunuz alındı'}
        </h3>
        <p className="text-sm text-emerald-800/90">
          {copy.successBody ||
            'En kısa sürede dönüş yapacağız. Ek bilgi için e-posta kutunuzu kontrol edin.'}
        </p>
      </div>
    )
  }

  return (
    <form className="relative mt-10 space-y-6" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder={copy.placeholders.name}
        required
        value={formData.name}
        onChange={handleChange}
        className="h-14 rounded-2xl border-white/40 bg-white/50 px-6 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Input
          type="email"
          name="email"
          placeholder={copy.placeholders.email}
          required
          value={formData.email}
          onChange={handleChange}
          className="h-14 rounded-2xl border-white/40 bg-white/50 px-6 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        />
        <Input
          type="tel"
          name="phone"
          placeholder={copy.placeholders.phone}
          value={formData.phone}
          onChange={handleChange}
          className="h-14 rounded-2xl border-white/40 bg-white/50 px-6 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        />
      </div>
      <Input
        type="text"
        name="company"
        placeholder={copy.placeholders.company}
        value={formData.company}
        onChange={handleChange}
        className="h-14 rounded-2xl border-white/40 bg-white/50 px-6 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
      />
      <div className="space-y-3">
        <label className="ml-2 text-sm font-bold uppercase tracking-wide text-slate-500">{copy.typeLabel}</label>
        <div className="relative">
          <select
            name="applicationType"
            required
            value={formData.applicationType}
            onChange={handleSelectChange}
            className="h-14 w-full appearance-none rounded-2xl border border-white/40 bg-white/50 px-6 text-base text-slate-800 shadow-sm backdrop-blur-sm outline-none transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 cursor-pointer"
          >
            <option value="" disabled>
              {copy.typeLabel}
            </option>
            {copy.applicationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>
      </div>
      <Input
        type="text"
        name="topic"
        placeholder={copy.placeholders.topic}
        value={formData.topic}
        onChange={handleChange}
        className="h-14 rounded-2xl border-white/40 bg-white/50 px-6 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
      />
      <Textarea
        name="message"
        placeholder={copy.placeholders.message}
        required
        value={formData.message}
        onChange={handleChange}
        className="min-h-[160px] resize-none rounded-2xl border-white/40 bg-white/50 px-6 py-4 text-base text-slate-800 placeholder:text-slate-400 shadow-sm backdrop-blur-sm transition-all focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
      />

      {/* KVKK Onay Checkbox */}
      <div className="flex items-start gap-3 rounded-2xl border border-white/40 bg-white/40 p-5 backdrop-blur-sm transition-colors hover:bg-white/60">
        <input
          type="checkbox"
          id="kvkk-consent"
          checked={kvkkAccepted}
          onChange={(e) => setKvkkAccepted(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded-md border-slate-300 text-primary accent-primary focus:ring-primary/30"
        />
        <label htmlFor="kvkk-consent" className="cursor-pointer text-sm leading-relaxed text-slate-600">
          {copy.kvkkLabel || 'Kişisel verilerimin işlenmesine ilişkin'}{' '}
          <Link
            href={copy.kvkkLink || '/tr/kvkk-aydinlatma-metni'}
            target="_blank"
            className="font-bold text-slate-900 underline decoration-primary/50 decoration-2 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            {copy.kvkkLinkText || 'KVKK Aydınlatma Metni'}
          </Link>
          {"'"}ni okudum ve kabul ediyorum.
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-600">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
          <div>
            <p className="font-bold mb-1">{copy.errorTitle || 'Gönderim hatası'}</p>
            <p>{error || copy.errorBody || 'Lütfen alanları kontrol edin.'}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="h-14 w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-lg font-bold text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/30 disabled:opacity-70 disabled:hover:scale-100"
        disabled={loading || !kvkkAccepted}
      >
        {loading ? 'Gönderiliyor…' : copy.submit}
      </Button>
    </form>
  )
}
