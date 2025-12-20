import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  if (!process.env['yeni_blob_READ_WRITE_TOKEN']) {
    return NextResponse.json({ error: 'yeni_blob_READ_WRITE_TOKEN eksik' }, { status: 500 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'Dosya gerekli' }, { status: 400 })
  }

  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env['yeni_blob_READ_WRITE_TOKEN'],
  })

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
  })
}
