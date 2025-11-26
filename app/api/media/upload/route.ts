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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN eksik' }, { status: 500 })
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

  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
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
