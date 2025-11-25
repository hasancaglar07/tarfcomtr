import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

import { prisma } from '@/lib/prisma'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(1),
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
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[application] SMTP bilgileri eksik, mail gönderilmedi')
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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Form verisi eksik veya hatalı' }, { status: 400 })
    }
    const data = parsed.data

    const saved = await prisma.application.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      },
    })

    if (process.env.INFO_EMAIL) {
      await sendMail({
        to: process.env.INFO_EMAIL,
        subject: `Yeni Başvuru: ${data.subject || data.name}`,
        text: [
          `İsim: ${data.name}`,
          `E-posta: ${data.email}`,
          data.phone ? `Telefon: ${data.phone}` : '',
          data.subject ? `Konu: ${data.subject}` : '',
          `Mesaj: ${data.message}`,
        ]
          .filter(Boolean)
          .join('\n'),
      })
    }

    return NextResponse.json({ success: true, id: saved.id })
  } catch (error) {
    console.error('[application] submit error', error)
    return NextResponse.json({ error: 'Başvuru kaydedilemedi' }, { status: 500 })
  }
}
