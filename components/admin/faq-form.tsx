'use client'

import { useFormState, useFormStatus } from 'react-dom'

import type { FaqActionState } from '@/app/admin/faq/actions'
import { ActionToast } from '@/components/admin/action-toast'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'

type FaqFormProps = {
  action: (state: FaqActionState, formData: FormData) => Promise<FaqActionState>
  defaultValues?: {
    id?: string
    question?: string
    answer?: string
    order?: number
    locale?: string
  }
}

const initialState: FaqActionState = { status: 'idle' }

export function FaqForm({ action, defaultValues }: FaqFormProps) {
  const [state, formAction] = useFormState(action, initialState)
  const onInvalid = useInvalidToast()

  const SubmitButton = () => {
    const { pending } = useFormStatus()
    return (
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? 'Kaydediliyor…' : defaultValues?.id ? 'Güncelle' : 'Ekle'}
      </button>
    )
  }

  return (
    <form action={formAction} className="space-y-4" onInvalid={onInvalid}>
      {defaultValues?.id ? <input type="hidden" name="id" value={defaultValues.id} /> : null}
      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="question">
          Soru
        </label>
        <input
          id="question"
          name="question"
          defaultValue={defaultValues?.question || ''}
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-slate-300" htmlFor="answer">
          Cevap
        </label>
        <textarea
          id="answer"
          name="answer"
          defaultValue={defaultValues?.answer || ''}
          required
          className="min-h-[120px] w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="order">
            Sıra
          </label>
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={defaultValues?.order ?? 1}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
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
