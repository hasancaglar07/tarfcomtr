import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

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
