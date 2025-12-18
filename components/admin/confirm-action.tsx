'use client'

import { useMemo, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { AdminModal } from '@/components/admin/admin-modal'

type ConfirmActionProps = {
  action: (formData: FormData) => void | Promise<void>
  fields: Record<string, string>
  title: string
  description?: string
  triggerLabel: string
  triggerClassName?: string
  confirmLabel?: string
  cancelLabel?: string
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-red-500/60 px-3 py-1.5 text-sm font-semibold text-red-100 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'İşleniyor…' : label}
    </button>
  )
}

export function ConfirmAction({
  action,
  fields,
  title,
  description = 'Bu işlem geri alınamaz.',
  triggerLabel,
  triggerClassName,
  confirmLabel = 'Sil',
  cancelLabel = 'Vazgeç',
}: ConfirmActionProps) {
  const [open, setOpen] = useState(false)
  const fieldEntries = useMemo(() => Object.entries(fields), [fields])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          triggerClassName ??
          'rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/10'
        }
      >
        {triggerLabel}
      </button>

      <AdminModal
        open={open}
        onClose={() => setOpen(false)}
        title={title}
        description={description}
        dismissible
        footer={
          <div className="flex w-full items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              {cancelLabel}
            </button>
            <form action={action}>
              {fieldEntries.map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
              ))}
              <SubmitButton label={confirmLabel} />
            </form>
          </div>
        }
      />
    </>
  )
}

