import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { ChairAssistantChair, ChairAssistantDocumentType } from '@prisma/client'
import nodemailer from 'nodemailer'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import {
  chairAssistantDocumentDefinitions,
  chairAssistantMaxFileSize,
  formatChairAssistantChair,
  formatChairAssistantDocumentType,
  isChairAssistantMimeTypeAllowed,
  sanitizeUploadFileName,
} from '@/lib/chair-assistant'

export const runtime = 'nodejs'

const schema = z.object({
  fullName: z.string().min(1).max(120),
  phone: z.string().min(1).max(40),
  email: z.string().email().max(120),
  city: z.string().min(1).max(120),
  chair: z.nativeEnum(ChairAssistantChair),
  undergraduateInfo: z.string().min(1).max(240),
  graduateProgramInfo: z.string().min(1).max(320),
  academicFields: z.string().min(1).max(400),
  thesisTopic: z.string().max(400).optional(),
  languageScore: z.string().min(1).max(160),
  previousWork: z.string().max(1200).optional(),
  motivation: z.string().min(1).max(3000),
  contribution: z.string().min(1).max(3000),
  weeklyAvailability: z.string().min(1).max(160),
  attendanceCommitment: z.string().min(1).max(500),
  additionalNotes: z.string().max(1200).optional(),
  accuracyDeclarationAccepted: z.literal(true),
  kvkkAccepted: z.literal(true),
})

async function sendMail({
  to,
  subject,
  text,
}: {
  to: string
  subject: string
  text: string
}) {
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_PORT ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.warn('[chair-assistant-application] SMTP bilgileri eksik, mail gönderilmedi')
    return
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
  })
}

function readText(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() || ''
}

function readOptionalText(formData: FormData, key: string) {
  const value = formData.get(key)?.toString().trim()
  return value && value.length > 0 ? value : undefined
}

function ensureFile(
  formData: FormData,
  type: ChairAssistantDocumentType,
) {
  const entry = formData.get(type)
  if (!entry || !(entry instanceof File) || entry.size === 0) {
    return { file: null } as const
  }

  const fileName = entry.name?.toLowerCase() || ''
  const extensionAllowed = /\.(pdf|jpg|jpeg)$/.test(fileName)
  if (!isChairAssistantMimeTypeAllowed(entry.type) && !extensionAllowed) {
    return {
      error: `${formatChairAssistantDocumentType(type)} yalnızca PDF veya JPG olabilir.`,
    } as const
  }

  if (entry.size > chairAssistantMaxFileSize) {
    return {
      error: `${formatChairAssistantDocumentType(type)} en fazla 10 MB olabilir.`,
    } as const
  }

  return { file: entry } as const
}

export async function POST(request: Request) {
  let applicationId: string | null = null

  try {
    const formData = await request.formData()
    const parsed = schema.safeParse({
      fullName: readText(formData, 'fullName'),
      phone: readText(formData, 'phone'),
      email: readText(formData, 'email'),
      city: readText(formData, 'city'),
      chair: readText(formData, 'chair'),
      undergraduateInfo: readText(formData, 'undergraduateInfo'),
      graduateProgramInfo: readText(formData, 'graduateProgramInfo'),
      academicFields: readText(formData, 'academicFields'),
      thesisTopic: readOptionalText(formData, 'thesisTopic'),
      languageScore: readText(formData, 'languageScore'),
      previousWork: readOptionalText(formData, 'previousWork'),
      motivation: readText(formData, 'motivation'),
      contribution: readText(formData, 'contribution'),
      weeklyAvailability: readText(formData, 'weeklyAvailability'),
      attendanceCommitment: readText(formData, 'attendanceCommitment'),
      additionalNotes: readOptionalText(formData, 'additionalNotes'),
      accuracyDeclarationAccepted:
        formData.get('accuracyDeclarationAccepted')?.toString() === 'on',
      kvkkAccepted: formData.get('kvkkAccepted')?.toString() === 'on',
    })

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message ?? 'Form verisi eksik veya hatalı.' },
        { status: 400 },
      )
    }

    const files = chairAssistantDocumentDefinitions.map((definition) => {
      const result = ensureFile(formData, definition.type)
      return { type: definition.type, result }
    })

    const fileError = files.find((entry) => 'error' in entry.result)
    if (fileError && 'error' in fileError.result) {
      return NextResponse.json({ error: fileError.result.error }, { status: 400 })
    }

    const hasUploads = files.some((entry) => entry.result.file instanceof File)
    if (hasUploads && !process.env['yeni_blob_READ_WRITE_TOKEN']) {
      return NextResponse.json({ error: 'Dosya yükleme servisi hazır değil.' }, { status: 500 })
    }

    const data = parsed.data

    const created = await prisma.chairAssistantApplication.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        chair: data.chair,
        undergraduateInfo: data.undergraduateInfo,
        graduateProgramInfo: data.graduateProgramInfo,
        academicFields: data.academicFields,
        thesisTopic: data.thesisTopic,
        languageScore: data.languageScore,
        previousWork: data.previousWork,
        motivation: data.motivation,
        contribution: data.contribution,
        weeklyAvailability: data.weeklyAvailability,
        attendanceCommitment: data.attendanceCommitment,
        additionalNotes: data.additionalNotes,
        accuracyDeclarationAccepted: data.accuracyDeclarationAccepted,
        kvkkAccepted: data.kvkkAccepted,
      },
    })

    applicationId = created.id

    const uploadedDocuments = []

    for (const entry of files) {
      const file = 'file' in entry.result ? entry.result.file : null

      if (!file) {
        continue
      }

      const safeName =
        file.name && file.name.trim().length > 0
          ? sanitizeUploadFileName(file.name.trim())
          : `${entry.type}-${randomUUID()}`

      const blob = await put(
        `chair-assistant-applications/${created.id}/${entry.type}/${safeName}`,
        file,
        {
          access: 'public',
          token: process.env['yeni_blob_READ_WRITE_TOKEN'],
          contentType: file.type || undefined,
          addRandomSuffix: true,
          cacheControlMaxAge: 60 * 60 * 24 * 365,
        },
      )

      uploadedDocuments.push({
        type: entry.type,
        url: blob.url,
        fileName: file.name || safeName,
        mimeType: file.type || null,
        size: file.size || null,
      })
    }

    if (uploadedDocuments.length > 0) {
      await prisma.chairAssistantApplicationDocument.createMany({
        data: uploadedDocuments.map((document) => ({
          applicationId: created.id,
          ...document,
        })),
      })
    }

    if (process.env.INFO_EMAIL) {
      await sendMail({
        to: process.env.INFO_EMAIL,
        subject: `Yeni Kürsü Asistan Başvurusu: ${data.fullName}`,
        text: [
          `Başvuru No: ${created.id}`,
          `Ad Soyad: ${data.fullName}`,
          `Telefon: ${data.phone}`,
          `E-posta: ${data.email}`,
          `Şehir: ${data.city}`,
          `Kürsü: ${formatChairAssistantChair(data.chair)}`,
          `Lisans Bilgisi: ${data.undergraduateInfo}`,
          `Lisansüstü Bilgisi: ${data.graduateProgramInfo}`,
          `Akademik Alanlar: ${data.academicFields}`,
          `Tez / Araştırma Başlığı: ${data.thesisTopic || '-'}`,
          `Dil Bilgisi: ${data.languageScore}`,
          `Önceki Çalışmalar: ${data.previousWork || '-'}`,
          `Katılma Nedeni: ${data.motivation}`,
          `Katkı: ${data.contribution}`,
          `Haftalık Zaman: ${data.weeklyAvailability}`,
          `Katılım Durumu: ${data.attendanceCommitment}`,
          `Ek Not: ${data.additionalNotes || '-'}`,
          '',
          'Yüklenen Evraklar:',
          ...(uploadedDocuments.length > 0
            ? uploadedDocuments.map(
                (document) =>
                  `- ${formatChairAssistantDocumentType(document.type)}: ${document.fileName}`,
              )
            : ['- Evrak eklenmedi']),
        ].join('\n'),
      })
    }

    return NextResponse.json({ success: true, id: created.id })
  } catch (error) {
    if (applicationId) {
      await prisma.chairAssistantApplication
        .delete({ where: { id: applicationId } })
        .catch(() => null)
    }

    console.error('[chair-assistant-application] submit error', error)
    return NextResponse.json({ error: 'Başvuru kaydedilemedi.' }, { status: 500 })
  }
}
