'use client'

import { useFormState, useFormStatus } from 'react-dom'

import type { SettingsActionState } from '@/app/admin/settings/actions'
import { ActionToast } from '@/components/admin/action-toast'

type SettingsFormProps = {
  action: (state: SettingsActionState, formData: FormData) => Promise<SettingsActionState>
  defaultValues?: {
    locale?: string
    siteName?: string
    siteDescription?: string | null
    contactEmail?: string | null
    contactPhone?: string | null
    contactAddress?: string | null
    socialTwitter?: string | null
    socialYoutube?: string | null
    contactContentJson?: string | null
    contactHeroEyebrow?: string | null
    contactHeroTitle?: string | null
    contactHeroSubtitle?: string | null
    contactHeroBody?: string | null
    contactFormTitle?: string | null
    contactFormSubtitle?: string | null
  }
}

const initialState: SettingsActionState = { status: 'idle' }

export function SettingsForm({ action, defaultValues }: SettingsFormProps) {
  const [state, formAction] = useFormState(action, initialState)

  const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    )
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
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
        <div className="space-y-1 sm:col-span-2">
          <label className="text-sm text-slate-300" htmlFor="siteName">
            Site adı
          </label>
          <input
            id="siteName"
            name="siteName"
            required
            defaultValue={defaultValues?.siteName || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="siteDescription">
          Site açıklaması
        </label>
        <textarea
          id="siteDescription"
          name="siteDescription"
          defaultValue={defaultValues?.siteDescription || ''}
          className="min-h-[100px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="contactEmail">
            E-posta
          </label>
          <input
            id="contactEmail"
            name="contactEmail"
            defaultValue={defaultValues?.contactEmail || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="contactPhone">
            Telefon
          </label>
          <input
            id="contactPhone"
            name="contactPhone"
            defaultValue={defaultValues?.contactPhone || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="contactAddress">
            Adres
          </label>
          <input
            id="contactAddress"
            name="contactAddress"
            defaultValue={defaultValues?.contactAddress || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="socialTwitter">
            Twitter (X)
          </label>
          <input
            id="socialTwitter"
            name="socialTwitter"
            defaultValue={defaultValues?.socialTwitter || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="socialYoutube">
            YouTube
          </label>
          <input
            id="socialYoutube"
            name="socialYoutube"
            defaultValue={defaultValues?.socialYoutube || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton />
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow">
        <div>
          <p className="text-sm font-semibold text-slate-200">İletişim sayfası metinleri</p>
          <p className="text-xs text-slate-500">Soldaki hero ve form başlıklarını buradan güncelleyin.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="contactHeroEyebrow">
              Hero üst başlık
            </label>
            <input
              id="contactHeroEyebrow"
              name="contactHeroEyebrow"
              defaultValue={defaultValues?.contactHeroEyebrow || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="Örn: TARF Akademi"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="contactHeroTitle">
              Hero başlık
            </label>
            <input
              id="contactHeroTitle"
              name="contactHeroTitle"
              defaultValue={defaultValues?.contactHeroTitle || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="Bilim, teknoloji ve etik ekseninde ortaklık kurun"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="contactHeroSubtitle">
            Hero alt başlık
          </label>
          <input
            id="contactHeroSubtitle"
            name="contactHeroSubtitle"
            defaultValue={defaultValues?.contactHeroSubtitle || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Kısa açıklama"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="contactHeroBody">
            Hero gövde metni
          </label>
          <textarea
            id="contactHeroBody"
            name="contactHeroBody"
            defaultValue={defaultValues?.contactHeroBody || ''}
            className="min-h-[100px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Bilimsel araştırma, yazılım teknolojileri..."
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="contactFormTitle">
              Form başlık
            </label>
            <input
              id="contactFormTitle"
              name="contactFormTitle"
              defaultValue={defaultValues?.contactFormTitle || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="Başvuru formu"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="contactFormSubtitle">
              Form alt başlık
            </label>
            <input
              id="contactFormSubtitle"
              name="contactFormSubtitle"
              defaultValue={defaultValues?.contactFormSubtitle || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
              placeholder="Ekibimiz 24 saat içinde dönüş yapar."
            />
          </div>
        </div>
      </div>

      <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-200">İletişim sayfası metni (JSON)</p>
          <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Gelişmiş</span>
        </div>
        <p className="text-xs text-slate-500">
          Hero başlıkları, alt metin, form başlıkları ve placeholder metinlerini JSON olarak
          özelleştirin. Boş bırakırsanız varsayılan metinler kullanılır.
        </p>
        <textarea
          name="contactContentJson"
          defaultValue={defaultValues?.contactContentJson || ''}
          className="min-h-[160px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 font-mono text-xs text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          placeholder={`Örnek:\n{\n  "heroTitle": "İletişim kurun",\n  "formSubtitle": "24 saat içinde dönüş yaparız."\n}`}
        />
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
