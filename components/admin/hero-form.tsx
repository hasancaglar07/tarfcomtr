'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import type { HeroActionState } from '@/app/admin/hero/actions'
import { ActionToast } from '@/components/admin/action-toast'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'

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
    videoUrl3?: string
    videoUrl4?: string
    videoUrl5?: string
  }
}

const initialState: HeroActionState = { status: 'idle' }

type VideoKey = 'videoUrl' | 'videoUrl2' | 'videoUrl3' | 'videoUrl4' | 'videoUrl5'

const getYouTubeVideoId = (url?: string) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export function HeroForm({ action, defaultValues }: HeroFormProps) {
  const [state, formAction] = useFormState(action, initialState)
  const onInvalid = useInvalidToast()
  const [videoUrls, setVideoUrls] = useState(() => ({
    videoUrl: defaultValues?.videoUrl || '',
    videoUrl2: defaultValues?.videoUrl2 || '',
    videoUrl3: defaultValues?.videoUrl3 || '',
    videoUrl4: defaultValues?.videoUrl4 || '',
    videoUrl5: defaultValues?.videoUrl5 || '',
  }))

  const videoFields = useMemo(
    () =>
      [
        { key: 'videoUrl' as const, label: 'Video 1 URL', value: videoUrls.videoUrl },
        { key: 'videoUrl2' as const, label: 'Video 2 URL', value: videoUrls.videoUrl2 },
        { key: 'videoUrl3' as const, label: 'Video 3 URL', value: videoUrls.videoUrl3 },
        { key: 'videoUrl4' as const, label: 'Video 4 URL', value: videoUrls.videoUrl4 },
        { key: 'videoUrl5' as const, label: 'Video 5 URL', value: videoUrls.videoUrl5 },
      ] as const,
    [videoUrls],
  )

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
    <form action={formAction} className="space-y-4" onInvalid={onInvalid}>
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
            Video URL’leri (1 → 5 sıralı)
          </label>
          <p className="text-xs text-slate-500">
            Anasayfa hero’daki kayan videoları bu sıraya göre gösterilir. Kapak görseli otomatik olarak YouTube’dan çekilir.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {videoFields.map((field) => {
          const id = getYouTubeVideoId(field.value)
          const cover = id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
          return (
            <div key={field.key} className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              <div className="space-y-1">
                <label className="text-sm text-slate-300" htmlFor={field.key}>
                  {field.label}
                </label>
                <input
                  id={field.key}
                  name={field.key}
                  placeholder="https://www.youtube.com/watch?v=..."
                  defaultValue={field.value}
                  onChange={(e) =>
                    setVideoUrls((prev) => ({
                      ...prev,
                      [field.key as VideoKey]: e.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
                />
              </div>

              {field.value.trim() ? (
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-24 overflow-hidden rounded-md border border-slate-800 bg-slate-900">
                    {cover ? (
                      <Image src={cover} alt={`${field.label} kapak`} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                        Kapak yok
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs text-slate-400">{id ? `Video ID: ${id}` : 'Geçerli YouTube URL bulunamadı'}</p>
                    <p className="text-xs text-slate-500">Boş bırakırsanız otomatik olarak sonraki videoya geçer.</p>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <details className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
        <summary className="cursor-pointer text-sm text-slate-300">
          İleri düzey (kapak URL’leri) – genelde gerekmez
        </summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="videoCover">
              Video 1 kapak URL (opsiyonel)
            </label>
            <input
              id="videoCover"
              name="videoCover"
              defaultValue={defaultValues?.videoCover || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300" htmlFor="videoCover2">
              Video 2 kapak URL (opsiyonel)
            </label>
            <input
              id="videoCover2"
              name="videoCover2"
              defaultValue={defaultValues?.videoCover2 || ''}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            />
          </div>
        </div>
      </details>

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
