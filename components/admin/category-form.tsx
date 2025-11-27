'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { PostType } from '@prisma/client'

import type { CategoryActionState } from '@/app/admin/categories/actions'
import { ActionToast } from '@/components/admin/action-toast'

type CategoryFormProps = {
  action: (state: CategoryActionState, formData: FormData) => Promise<CategoryActionState>
  defaultValues?: {
    id?: string
    name?: string
    slug?: string
    type?: PostType
    locale?: string
  }
}

const initialState: CategoryActionState = { status: 'idle' }

const typeLabels: Record<PostType, string> = {
  blog: 'Blog',
  event: 'Etkinlik',
  video: 'Video',
  podcast: 'Podcast',
  service: 'Hizmet/Eğitim',
}

export function CategoryForm({ action, defaultValues }: CategoryFormProps) {
  const [state, formAction] = useFormState(action, initialState)

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
    <form action={formAction} className="space-y-4">
      {defaultValues?.id ? <input type="hidden" name="id" value={defaultValues.id} /> : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="name">
            İsim
          </label>
          <input
            id="name"
            name="name"
            defaultValue={defaultValues?.name || ''}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={defaultValues?.slug || ''}
            required
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm text-slate-300" htmlFor="type">
            Tür
          </label>
          <select
            id="type"
            name="type"
            defaultValue={defaultValues?.type || 'blog'}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            {Object.keys(typeLabels).map((key) => (
              <option key={key} value={key}>
                {typeLabels[key as PostType]}
              </option>
            ))}
          </select>
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
