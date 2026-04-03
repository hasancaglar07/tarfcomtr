import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { format } from 'date-fns'
import { renderToBuffer } from '@react-pdf/renderer'

import { ChairAssistantApplicationPdf } from '@/components/pdf/chair-assistant-application-pdf'
import { authOptions } from '@/lib/auth'
import {
  chairAssistantDocumentDefinitions,
  chairAssistantQuestions,
  chairAssistantStatusLabels,
  formatChairAssistantChair,
  slugifyFilePart,
} from '@/lib/chair-assistant'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const { id } = await params
  const application = await prisma.chairAssistantApplication.findUnique({
    where: { id },
    include: {
      documents: true,
    },
  })

  if (!application) {
    return NextResponse.json({ error: 'Başvuru bulunamadı' }, { status: 404 })
  }

  const documentMap = new Map(application.documents.map((document) => [document.type, document]))
  const questions = chairAssistantQuestions.map((question) => {
    const answer = (() => {
      switch (question.key) {
        case 'fullName':
          return application.fullName
        case 'phone':
          return application.phone
        case 'email':
          return application.email
        case 'city':
          return application.city
        case 'chair':
          return formatChairAssistantChair(application.chair)
        case 'undergraduateInfo':
          return application.undergraduateInfo
        case 'graduateProgramInfo':
          return application.graduateProgramInfo
        case 'academicFields':
          return application.academicFields
        case 'thesisTopic':
          return application.thesisTopic || '-'
        case 'languageScore':
          return application.languageScore
        case 'previousWork':
          return application.previousWork || '-'
        case 'motivation':
          return application.motivation
        case 'contribution':
          return application.contribution
        case 'weeklyAvailability':
          return application.weeklyAvailability
        case 'attendanceCommitment':
          return application.attendanceCommitment
        case 'additionalNotes':
          return application.additionalNotes || '-'
        case 'accuracyDeclarationAccepted':
          return application.accuracyDeclarationAccepted ? 'Evet' : 'Hayır'
        default:
          return '-'
      }
    })()

    return {
      label: question.label,
      answer,
    }
  })

  const pdfDocument = ChairAssistantApplicationPdf({
    createdAtLabel: format(application.createdAt, 'dd.MM.yyyy HH:mm'),
    statusLabel: chairAssistantStatusLabels[application.status],
    candidateName: application.fullName,
    chairLabel: formatChairAssistantChair(application.chair),
    email: application.email,
    phone: application.phone,
    city: application.city,
    adminNote: application.adminNote,
    questions,
    documents: chairAssistantDocumentDefinitions.map((definition) => ({
      label: definition.label,
      fileName: documentMap.get(definition.type)?.fileName || 'Belge yüklenmedi',
    })),
  })

  const pdfBuffer = await renderToBuffer(pdfDocument)

  const candidateSlug = slugifyFilePart(application.fullName) || 'aday'
  const fileName = `tarf-kursu-asistani-basvurusu-${candidateSlug}.pdf`

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    },
  })
}
