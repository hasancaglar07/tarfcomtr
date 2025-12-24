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
    <form className="relative mt-6 space-y-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="name"
        placeholder={copy.placeholders.name}
        required
        value={formData.name}
        onChange={handleChange}
        className="h-12 border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          type="email"
          name="email"
          placeholder={copy.placeholders.email}
          required
          value={formData.email}
          onChange={handleChange}
          className="h-12 border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
        />
        <Input
          type="tel"
          name="phone"
          placeholder={copy.placeholders.phone}
          value={formData.phone}
          onChange={handleChange}
          className="h-12 border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
        />
      </div>
      <Input
        type="text"
        name="company"
        placeholder={copy.placeholders.company}
        value={formData.company}
        onChange={handleChange}
        className="h-12 border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
      />
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">{copy.typeLabel}</label>
        <select
          name="applicationType"
          required
          value={formData.applicationType}
          onChange={handleSelectChange}
          className="h-12 w-full rounded-lg border border-white/70 bg-white/85 px-3 text-base text-slate-900 shadow-sm outline-none transition focus:border-primary/40 focus-visible:ring-primary/30"
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
      </div>
      <Input
        type="text"
        name="topic"
        placeholder={copy.placeholders.topic}
        value={formData.topic}
        onChange={handleChange}
        className="h-12 border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
      />
      <Textarea
        name="message"
        placeholder={copy.placeholders.message}
        required
        value={formData.message}
        onChange={handleChange}
        className="min-h-[160px] resize-none border-white/70 bg-white/85 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-primary/30"
      />

      {/* KVKK Onay Checkbox */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
        <input
          type="checkbox"
          id="kvkk-consent"
          checked={kvkkAccepted}
          onChange={(e) => setKvkkAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary/30"
        />
        <label htmlFor="kvkk-consent" className="cursor-pointer text-sm leading-relaxed text-slate-600">
          {copy.kvkkLabel || 'Kişisel verilerimin işlenmesine ilişkin'}{' '}
          <Link
            href={copy.kvkkLink || '/tr/kvkk-aydinlatma-metni'}
            target="_blank"
            className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-primary/80 hover:decoration-primary/50"
          >
            {copy.kvkkLinkText || 'KVKK Aydınlatma Metni'}
          </Link>
          {"'"}ni okudum ve kabul ediyorum.
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700">
          <AlertTriangle className="h-4 w-4 mt-0.5 text-red-500" />
          <div>
            <p className="font-semibold">{copy.errorTitle || 'Gönderim hatası'}</p>
            <p>{error || copy.errorBody || 'Lütfen alanları kontrol edin.'}</p>
          </div>
        </div>
      )}
      <Button
        type="submit"
        className="h-12 w-full text-base font-semibold shadow-lg"
        disabled={loading || !kvkkAccepted}
      >
        {loading ? 'Gönderiliyor…' : copy.submit}
      </Button>
    </form>
  )
}
