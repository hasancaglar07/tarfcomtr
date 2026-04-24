import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ChairAssistantDocumentType } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sanitizeUploadFileName } from '@/lib/chair-assistant'

export const runtime = 'nodejs'

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string; type: string }>
  },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const { id, type } = await params
  const documentTypeValues = Object.values(ChairAssistantDocumentType)
  if (!documentTypeValues.includes(type as ChairAssistantDocumentType)) {
    return NextResponse.json({ error: 'Belge tipi geçersiz' }, { status: 400 })
  }

  const document = await prisma.chairAssistantApplicationDocument.findUnique({
    where: {
      applicationId_type: {
        applicationId: id,
        type: type as ChairAssistantDocumentType,
      },
    },
  })

  if (!document) {
    return NextResponse.json({ error: 'Belge bulunamadı' }, { status: 404 })
  }

  const upstream = await fetch(document.url, { cache: 'no-store' })
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: 'Belge indirilemedi' }, { status: 502 })
  }

  const safeName = sanitizeUploadFileName(document.fileName) || 'evrak'
  const disposition = new URL(request.url).searchParams.get('inline') === '1' ? 'inline' : 'attachment'

  return new Response(upstream.body, {
    headers: {
      'Content-Type':
        document.mimeType || upstream.headers.get('content-type') || 'application/octet-stream',
      'Content-Disposition': `${disposition}; filename="${safeName}"`,
      'Cache-Control': 'no-store',
    },
  })
}
