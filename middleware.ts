import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get isAuthenticated from cookies
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'

  // Get the pathname
  const pathname = request.nextUrl.pathname

  // Logic for protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Logic for auth routes
  if (pathname.startsWith('/auth/login')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
