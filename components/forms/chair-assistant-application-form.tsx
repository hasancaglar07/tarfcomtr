'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send,
  UploadCloud,
} from 'lucide-react'
import type { ChairAssistantChair, ChairAssistantDocumentType } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  chairAssistantAcceptedFileExtensions,
  chairAssistantChairs,
  chairAssistantDocumentDefinitions,
  chairAssistantMaxFileSize,
} from '@/lib/chair-assistant'

type FileNamesState = Partial<Record<ChairAssistantDocumentType, string>>

const inputClassName =
  'h-12 rounded-2xl border-slate-200 bg-white px-4 text-base text-slate-900 shadow-none transition-colors duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'

const textareaClassName =
  'min-h-[132px] resize-y rounded-2xl border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-none transition-colors duration-200 placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-200'

function SectionBlock({
  step,
  title,
  description,
  children,
}: {
  step: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
            {step}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function FieldLabel({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string
  children: React.ReactNode
  optional?: boolean
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-medium text-slate-800">
      <span>{children}</span>
      {optional ? (
        <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-500">
          Opsiyonel
        </span>
      ) : null}
    </label>
  )
}

export function ChairAssistantApplicationForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedChair, setSelectedChair] = useState<ChairAssistantChair | ''>('')
  const [fileNames, setFileNames] = useState<FileNamesState>({})

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chair-assistant-applications', {
        method: 'POST',
        body: formData,
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.error || 'Başvuru gönderilemedi. Lütfen tekrar deneyin.')
      }

      setSuccess(true)
      setSelectedChair('')
      setFileNames({})
      form.reset()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Başvuru gönderilemedi. Lütfen bilgileri kontrol edip tekrar deneyin.',
      )
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (type: ChairAssistantDocumentType, file: File | null) => {
    setFileNames((prev) => ({
      ...prev,
      [type]: file?.name || '',
    }))
  }

  if (success) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 className="h-6 w-6" />
          </span>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
              Başvurunuz başarıyla alındı
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Form ve eklediğiniz belgeler başarıyla alındı. Değerlendirme sürecinde gerekirse
              sizinle telefon veya e-posta üzerinden iletişime geçilecektir.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-[28px] border border-sky-100 bg-sky-50 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-sky-700">
            <Send className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-medium text-slate-900">Başvuru tek akışta tamamlanır.</p>
            <p className="mt-1 text-sm leading-7 text-slate-600">
              Zorunlu alanları doldurup başvurunuzu hemen gönderebilirsiniz. İsterseniz belge de
              ekleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <SectionBlock
        step="Bölüm 1"
        title="Kişisel ve temel başvuru bilgileri"
        description="Adayın iletişim bilgileri ve başvurmak istediği kürsü bu bölümde alınır."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel htmlFor="fullName">1. Adınız ve soyadınız nedir?</FieldLabel>
            <Input id="fullName" name="fullName" required placeholder="Ad Soyad" className={inputClassName} />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="phone">2. Telefon numaranız nedir?</FieldLabel>
            <Input id="phone" name="phone" required placeholder="05xx xxx xx xx" className={inputClassName} />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="email">3. E-posta adresiniz nedir?</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              required
              placeholder="ornek@eposta.com"
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="city">4. İkamet ettiğiniz şehir nedir?</FieldLabel>
            <Input id="city" name="city" required placeholder="Ankara" className={inputClassName} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <FieldLabel htmlFor="chair-selection">5. Başvurmak istediğiniz kürsü hangisidir?</FieldLabel>
          <div id="chair-selection" className="grid gap-3 md:grid-cols-2">
            {chairAssistantChairs.map((chair) => {
              const isSelected = selectedChair === chair.value
              return (
                <label
                  key={chair.value}
                  className={`cursor-pointer rounded-2xl border px-4 py-4 transition-colors duration-200 ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50'
                      : 'border-slate-200 bg-white hover:border-sky-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="chair"
                    value={chair.value}
                    checked={isSelected}
                    onChange={() => setSelectedChair(chair.value)}
                    className="sr-only"
                    required
                  />
                  <div className="text-sm font-medium text-slate-900">{chair.shortLabel}</div>
                  <div className="mt-1 text-xs leading-6 text-slate-500">{chair.label}</div>
                </label>
              )
            })}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        step="Bölüm 2"
        title="Akademik geçmiş ve uzmanlık"
        description="Lisans, lisansüstü program, çalışma alanı ve dil yeterliliği bu bölümde sorulur."
      >
        <div className="grid gap-5">
          <div className="space-y-2">
            <FieldLabel htmlFor="undergraduateInfo">
              6. Lisans mezuniyet bölümünüz ve üniversiteniz nedir?
            </FieldLabel>
            <Input
              id="undergraduateInfo"
              name="undergraduateInfo"
              required
              placeholder="Örn. Psikoloji, Ankara Üniversitesi"
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="graduateProgramInfo">
              7. Hâlen yüksek lisans mı yoksa doktora mı yapıyorsunuz? (Program ve üniversite ile birlikte yazınız)
            </FieldLabel>
            <Input
              id="graduateProgramInfo"
              name="graduateProgramInfo"
              required
              placeholder="Örn. Doktora, Sosyoloji, Hacettepe Üniversitesi"
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="academicFields">8. Akademik çalışma alanlarınız nelerdir?</FieldLabel>
            <Textarea
              id="academicFields"
              name="academicFields"
              required
              placeholder="Çalıştığınız başlıca temaları ve uzmanlık alanlarınızı yazın."
              className={textareaClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="thesisTopic" optional>
              9. Varsa tez konunuz veya yoğunlaştığınız araştırma başlığı nedir?
            </FieldLabel>
            <Textarea
              id="thesisTopic"
              name="thesisTopic"
              placeholder="Bu alan opsiyoneldir."
              className={textareaClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="languageScore">
              10. Yabancı dil bilginiz nedir? (Dil + sınav + puan)
            </FieldLabel>
            <Input
              id="languageScore"
              name="languageScore"
              required
              placeholder="Örn. İngilizce, YDS 82"
              className={inputClassName}
            />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="previousWork" optional>
              11. Daha önce yer aldığınız akademik, sosyal veya kurumsal çalışmalar nelerdir?
            </FieldLabel>
            <Textarea
              id="previousWork"
              name="previousWork"
              placeholder="Bu alan opsiyoneldir."
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        step="Bölüm 3"
        title="Motivasyon ve katkı"
        description="Bu bölüm, adayın kürsüye neden başvurduğunu ve nasıl katkı sunacağını anlamaya yöneliktir."
      >
        <div className="grid gap-5">
          <div className="space-y-2">
            <FieldLabel htmlFor="motivation">
              12. Başvurduğunuz kürsüye neden katılmak istiyorsunuz?
            </FieldLabel>
            <Textarea id="motivation" name="motivation" required className={textareaClassName} />
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="contribution">
              13. Bu kürsüye nasıl bir katkı sunabilirsiniz?
            </FieldLabel>
            <Textarea id="contribution" name="contribution" required className={textareaClassName} />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="weeklyAvailability">
                14. Haftalık ortalama ne kadar zaman ayırabilirsiniz?
              </FieldLabel>
              <Input
                id="weeklyAvailability"
                name="weeklyAvailability"
                required
                placeholder="Örn. Haftada 8-10 saat"
                className={inputClassName}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel htmlFor="attendanceCommitment">
                15. Online ve yüz yüze çalışmalara düzenli katılım sağlayabilir misiniz?
              </FieldLabel>
              <Input
                id="attendanceCommitment"
                name="attendanceCommitment"
                required
                placeholder="Örn. Evet, düzenli katılım sağlayabilirim."
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <FieldLabel htmlFor="additionalNotes" optional>
              16. Eklemek istediğiniz bir husus var mı?
            </FieldLabel>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              placeholder="Bu alan opsiyoneldir."
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        step="Bölüm 4"
        title="Opsiyonel evrak yükleme"
        description={`Aşağıdaki belgeleri isterseniz başvuru sırasında ekleyebilirsiniz. Her dosya PDF veya JPG formatında olmalı ve ${Math.round(
          chairAssistantMaxFileSize / (1024 * 1024),
        )} MB sınırını aşmamalıdır.`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {chairAssistantDocumentDefinitions.map((document) => (
            <div key={document.type} className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <FieldLabel htmlFor={document.type}>{document.label}</FieldLabel>
                  <p className="mt-1 text-xs leading-6 text-slate-500">{document.helper}</p>
                </div>
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              </div>

              <input
                id={document.type}
                name={document.type}
                type="file"
                accept={chairAssistantAcceptedFileExtensions}
                onChange={(event) =>
                  handleFileChange(document.type, event.currentTarget.files?.[0] || null)
                }
                className="mt-4 block w-full cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-sky-700 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-sky-800"
              />
              <p className="mt-2 text-xs leading-6 text-slate-500">
                {fileNames[document.type]
                  ? `Seçilen dosya: ${fileNames[document.type]}`
                  : 'Henüz dosya seçilmedi.'}
              </p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        step="Bölüm 5"
        title="Onay ve gönderim"
        description="Başvuru gönderilmeden önce beyan ve KVKK onayının tamamlanması gerekir."
      >
        <div className="space-y-4">
          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            <input
              type="checkbox"
              name="accuracyDeclarationAccepted"
              required
              className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-sky-600"
            />
            <span>17. Verdiğim bilgilerin doğru olduğunu beyan ediyorum.</span>
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
            <input
              type="checkbox"
              name="kvkkAccepted"
              required
              className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-sky-600"
            />
            <span>
              Kişisel verilerimin işlenmesine ilişkin{' '}
              <Link
                href="/tr/kvkk-aydinlatma-metni"
                target="_blank"
                className="font-medium text-slate-900 underline decoration-sky-400 underline-offset-4"
              >
                KVKK Aydınlatma Metni
              </Link>{' '}
              ’ni okudum ve kabul ediyorum.
            </span>
          </label>

          {error ? (
            <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          ) : null}

          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full rounded-full bg-emerald-500 text-base font-semibold text-white transition-colors duration-200 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="flex items-center gap-2">
              {loading ? 'Başvuru gönderiliyor…' : 'Başvuruyu gönder'}
              {!loading ? <ArrowRight className="h-5 w-5" /> : null}
            </span>
          </Button>
        </div>
      </SectionBlock>

      <div className="flex items-start gap-3 rounded-[28px] border border-slate-200 bg-white px-5 py-5 text-sm leading-7 text-slate-600">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <UploadCloud className="h-4 w-4" />
        </span>
        <p>
          Formu gönderdikten sonra bilgileriniz ve eklediğiniz belgeler kayıt altına alınır.
          Belge yüklemeden de başvuru yapabilirsiniz.
        </p>
      </div>
    </form>
  )
}
