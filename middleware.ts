import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const locales = ['tr', 'en', 'ar']
const defaultLocale = 'tr'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authSecret = 'tarfakademi-fixed-secret'

  // Admin auth guard
  if (pathname.startsWith('/admin')) {
    if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }

    const token = await getToken({ req: request, secret: authSecret })
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  // Locale redirect
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = defaultLocale
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|img|css|js|fonts).*)'],
}
