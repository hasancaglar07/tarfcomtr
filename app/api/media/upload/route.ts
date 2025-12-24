import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  if (!process.env['yeni_blob_READ_WRITE_TOKEN']) {
    return NextResponse.json({ error: 'yeni_blob_READ_WRITE_TOKEN eksik' }, { status: 500 })
  }

  const formData = await request.formData()
  const fileEntry = formData.get('file')
  const locale = formData.get('locale')?.toString() || 'tr'
  const altText = formData.get('altText')?.toString() || null

  if (!fileEntry || !(fileEntry instanceof File)) {
    return NextResponse.json({ error: 'Dosya gerekli' }, { status: 400 })
  }

  const file = fileEntry
  const kind = formData.get('kind')?.toString() || file.type?.split('/')[0] || null

  const safeName =
    file.name && file.name.trim().length > 0
      ? file.name.trim().replace(/[^a-zA-Z0-9._-]/g, '-')
      : `upload-${Date.now()}`

  const blob = await put(safeName, file, {
    access: 'public',
    token: process.env['yeni_blob_READ_WRITE_TOKEN'],
    contentType: file.type || undefined,
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  })

  await prisma.media.create({
    data: {
      url: blob.url,
      type: file.type || undefined,
      altText,
      uploadedBy: session.user?.email ?? 'admin',
      locale,
      kind: kind || null,
    },
  })

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
  })
}
