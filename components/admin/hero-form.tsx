'use client'

import { useFormState, useFormStatus } from 'react-dom'

import type { HeroActionState } from '@/app/admin/hero/actions'
import { ActionToast } from '@/components/admin/action-toast'

type HeroFormProps = {
  action: (state: HeroActionState, formData: FormData) => Promise<HeroActionState>
  defaultValues?: {
    id?: string
    locale?: string
    title?: string
    subtitle?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
    backgroundImage?: string
    videoUrl?: string
    videoCover?: string
    videoUrl2?: string
    videoCover2?: string
  }
}

const initialState: HeroActionState = { status: 'idle' }

export function HeroForm({ action, defaultValues }: HeroFormProps) {
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
      {defaultValues?.id ? <input type="hidden" name="id" value={defaultValues.id} /> : null}

      <div className="grid gap-3 sm:grid-cols-2">
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
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="title">
          Başlık
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title || ''}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="subtitle">
          Alt başlık
        </label>
        <input
          id="subtitle"
          name="subtitle"
          required
          defaultValue={defaultValues?.subtitle || ''}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="description">
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={defaultValues?.description || ''}
          className="min-h-[100px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="buttonText">
            CTA metni
          </label>
          <input
            id="buttonText"
            name="buttonText"
            defaultValue={defaultValues?.buttonText || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="buttonUrl">
            CTA link
          </label>
          <input
            id="buttonUrl"
            name="buttonUrl"
            defaultValue={defaultValues?.buttonUrl || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="backgroundImage">
            Arka plan görseli URL
          </label>
          <input
            id="backgroundImage"
            name="backgroundImage"
            defaultValue={defaultValues?.backgroundImage || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="videoUrl">
            Video URL (opsiyonel)
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            defaultValue={defaultValues?.videoUrl || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
          <p className="text-xs text-slate-500">Hero üst kısmındaki video bağlantısı (YouTube).</p>
          <input
            id="videoCover"
            name="videoCover"
            placeholder="Video kapak görseli URL"
            defaultValue={defaultValues?.videoCover || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="videoUrl2">
            İkinci video URL (opsiyonel)
          </label>
          <input
            id="videoUrl2"
            name="videoUrl2"
            defaultValue={defaultValues?.videoUrl2 || ''}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="videoCover2">
            İkinci video kapak URL
          </label>
          <input
            id="videoCover2"
            name="videoCover2"
            defaultValue={defaultValues?.videoCover2 || ''}
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

      <ActionToast state={state} />
    </form>
  )
}
