import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import './globals.css'
import { buildPageMetadata } from '@/lib/seo'
import { normalizeLocale, isSupportedLocale, type SupportedLocale } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  ...buildPageMetadata({ locale: 'tr', page: 'home' }),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  themeColor: '#FF8C00',
}

const detectLocaleFromHeaders = (): SupportedLocale => {
  try {
    const headerList = headers()
    const requestUrl = headerList.get('x-middleware-request-url')
    if (requestUrl) {
      const pathname = new URL(requestUrl).pathname
      const maybeLocale = pathname.split('/').filter(Boolean)[0]
      if (maybeLocale && isSupportedLocale(maybeLocale)) {
        return normalizeLocale(maybeLocale)
      }
    }
  } catch {
    // Ignore header parsing failures and use default locale
  }
  return 'tr'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = detectLocaleFromHeaders()
  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={direction} className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
