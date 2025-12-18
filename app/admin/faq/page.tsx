import Link from 'next/link'

import { deleteFaqAction, upsertFaqAction } from '@/app/admin/faq/actions'
import { FaqForm } from '@/components/admin/faq-form'
import { ConfirmAction } from '@/components/admin/confirm-action'
import { prisma } from '@/lib/prisma'

export default async function FaqPage() {
  const faqs = await prisma.fAQ.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  })

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
              Yönetim
            </p>
            <h1 className="text-3xl font-semibold">SSS (FAQ)</h1>
            <p className="text-sm text-slate-400">
              Soru-cevap ekleyin, sıralayın. Locale bazlı çalışır.
            </p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Panele dön
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
          <h2 className="text-lg font-semibold mb-4">Yeni SSS</h2>
          <FaqForm action={upsertFaqAction} />
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    {faq.locale} · Sıra {faq.order}
                  </p>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-sm text-slate-300 mt-1">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <details className="group">
                    <summary className="cursor-pointer rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500">
                      Düzenle
                    </summary>
                    <div className="mt-2 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
                      <FaqForm
                        action={upsertFaqAction}
                        defaultValues={{
                          id: faq.id,
                          question: faq.question,
                          answer: faq.answer,
                          order: faq.order,
                          locale: faq.locale,
                        }}
                      />
                    </div>
                  </details>
                  <ConfirmAction
                    action={deleteFaqAction}
                    fields={{ id: faq.id }}
                    title="Kaydı sil?"
                    description="SSS kaydı kalıcı olarak silinir. Bu işlem geri alınamaz."
                    triggerLabel="Sil"
                    triggerClassName="rounded-lg border border-red-500/50 px-3 py-1.5 text-xs font-semibold text-red-100 transition hover:bg-red-500/10"
                    confirmLabel="Evet, sil"
                  />
                </div>
              </div>
            </div>
          ))}
          {faqs.length === 0 && (
            <p className="text-sm text-slate-400">Henüz kayıt yok.</p>
          )}
        </div>
      </div>
    </div>
  )
}
