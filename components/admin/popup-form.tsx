'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'

import type { PopupActionState } from '@/app/admin/popup/actions'
import { ActionToast } from '@/components/admin/action-toast'
import { ImageInput } from '@/components/admin/image-input'
import { useInvalidToast } from '@/components/admin/use-invalid-toast'
import type { PopupContent, PopupTargetMode } from '@/lib/popup-content'

export type PopupTargetGroup = {
  label: string
  options: Array<{
    value: string
    label: string
  }>
}

type PopupFormProps = {
  action: (state: PopupActionState, formData: FormData) => Promise<PopupActionState>
  locale: string
  defaultValues: PopupContent
  targetGroups: PopupTargetGroup[]
}

const initialState: PopupActionState = { status: 'idle' }

export function PopupForm({
  action,
  locale,
  defaultValues,
  targetGroups,
}: PopupFormProps) {
  const router = useRouter()
  const [state, formAction] = useFormState(action, initialState)
  const onInvalid = useInvalidToast()
  const [enabled, setEnabled] = useState(defaultValues.enabled)
  const [imageUrl, setImageUrl] = useState(defaultValues.imageUrl)
  const [targetMode, setTargetMode] = useState<PopupTargetMode>(defaultValues.targetMode)
  const [internalTarget, setInternalTarget] = useState(
    defaultValues.targetMode === 'internal' ? defaultValues.targetValue : '',
  )
  const [manualUrl, setManualUrl] = useState(
    defaultValues.targetMode === 'url' ? defaultValues.targetValue : '',
  )
  const [ctaText, setCtaText] = useState(defaultValues.ctaText)
  const [buttonLabel, setButtonLabel] = useState(defaultValues.buttonLabel)

  useEffect(() => {
    if (state?.status === 'success') {
      router.refresh()
    }
  }, [router, state])

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
    <form action={formAction} className="space-y-6" onInvalid={onInvalid}>
      <input type="hidden" name="locale" value={locale} />

      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <label className="flex items-start gap-3">
          <input
            id="enabled"
            name="enabled"
            type="checkbox"
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-orange-500 focus:ring-orange-400"
          />
          <span className="space-y-1">
            <span className="block text-sm font-semibold text-slate-100">Popup aktif</span>
            <span className="block text-xs text-slate-400">
              Kapatırsanız anasayfada popup görünmez. Kaydı yine de saklanır.
            </span>
          </span>
        </label>
      </div>

      <ImageInput
        label="Popup görseli"
        id="imageUrl"
        name="imageUrl"
        value={imageUrl}
        onChange={setImageUrl}
        helpText="Medya kütüphanesinden seçebilir veya yeni bir görsel yükleyebilirsiniz."
      />

      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="ctaText">
            Buton üstü metin
          </label>
          <textarea
            id="ctaText"
            name="ctaText"
            value={ctaText}
            onChange={(event) => setCtaText(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Kürsü Asistan Alımı Formu için aşağıdaki butona tıklayınız."
          />
          <p className="text-xs text-slate-500">
            Popup görselinin altında gösterilecek açıklama metni.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="buttonLabel">
            Buton metni
          </label>
          <input
            id="buttonLabel"
            name="buttonLabel"
            value={buttonLabel}
            onChange={(event) => setButtonLabel(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="Başvuru Formuna Git"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="targetMode">
            Hedef tipi
          </label>
          <select
            id="targetMode"
            name="targetMode"
            value={targetMode}
            onChange={(event) => setTargetMode(event.target.value as PopupTargetMode)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="internal">İç sayfa / içerik</option>
            <option value="url">Manuel URL</option>
          </select>
          <p className="text-xs text-slate-500">
            İç hedef seçerseniz locale prefix otomatik eklenir.
          </p>
        </div>
      </div>

      {targetMode === 'internal' ? (
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="internalTarget">
            İç hedef
          </label>
          <select
            id="internalTarget"
            name="internalTarget"
            value={internalTarget}
            onChange={(event) => setInternalTarget(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
          >
            <option value="">(Seçiniz)</option>
            {targetGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-xs text-slate-500">
            Seçilen yol `{locale}` locale’i ile birlikte açılır.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm text-slate-300" htmlFor="manualUrl">
            Manuel URL
          </label>
          <input
            id="manualUrl"
            name="manualUrl"
            value={manualUrl}
            onChange={(event) => setManualUrl(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-2 ring-transparent transition focus:border-orange-400 focus:ring-orange-500/40"
            placeholder="https://ornek.com veya /kampanya"
          />
          <p className="text-xs text-slate-500">
            Harici URL ya da root-relative yol kullanabilirsiniz.
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-xs text-slate-400">
        Popup sadece anasayfada açılır. Görsel, açıklama metni ve buton birlikte gösterilir;
        kullanıcı anasayfayı yeniden açtığında popup tekrar görünür.
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Locale: <span className="font-semibold text-slate-300">{locale}</span>
        </div>
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
