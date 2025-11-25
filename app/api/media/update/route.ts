import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 })
  }

  const formData = await request.formData()
  const id = formData.get('id')?.toString()
  const altText = formData.get('altText')?.toString()
  const locale = formData.get('locale')?.toString()

  if (!id) {
    return NextResponse.json({ error: 'ID eksik' }, { status: 400 })
  }

  await prisma.media.update({
    where: { id },
    data: {
      altText: altText ?? null,
      locale: locale || undefined,
    },
  })

  return NextResponse.json({ success: true })
}
