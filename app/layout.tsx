import { Inter } from 'next/font/google'
import './globals.css'
import { buildPageMetadata } from '@/lib/seo'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" dir="ltr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  )
}
