'use client'

import { useFormState, useFormStatus } from 'react-dom'

import type { SettingsActionState } from '@/app/admin/settings/actions'

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

      {state?.status === 'error' && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {state.message || 'Kaydetme hatası'}
        </div>
      )}
    </form>
  )
}
