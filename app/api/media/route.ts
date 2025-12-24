import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { del } from '@vercel/blob'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const kind = searchParams.get('kind') || undefined
  const locale = searchParams.get('locale') || undefined
  const q = searchParams.get('q') || undefined

  const media = await prisma.media.findMany({
    where: {
      ...(kind ? { kind } : {}),
      ...(locale ? { locale } : {}),
      ...(q
        ? {
            url: {
              contains: q,
              mode: 'insensitive',
            },
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json(media)
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  if (!process.env['yeni_blob_READ_WRITE_TOKEN']) {
    return NextResponse.json({ error: 'yeni_blob_READ_WRITE_TOKEN eksik' }, { status: 500 })
  }

  let body: { id?: string } = {}
  try {
    body = (await request.json()) as { id?: string }
  } catch {
    body = {}
  }

  const id = body.id?.toString()
  if (!id) {
    return NextResponse.json({ error: 'ID eksik' }, { status: 400 })
  }

  const media = await prisma.media.findUnique({
    where: { id },
    select: { url: true },
  })

  if (!media) {
    return NextResponse.json({ error: 'Medya bulunamadı' }, { status: 404 })
  }

  try {
    await del(media.url, { token: process.env['yeni_blob_READ_WRITE_TOKEN'] })
  } catch {
    return NextResponse.json({ error: 'Blob silinemedi' }, { status: 500 })
  }

  await prisma.media.delete({ where: { id } })

  return NextResponse.json({ success: true })
}
