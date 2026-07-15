import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/session'

const protectedRoutes = ['/dashboard']
const authRoutes = ['/login', '/register']

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtected = protectedRoutes.some(r => path.startsWith(r))
  const isAuth = authRoutes.some(r => path === r || path.startsWith(r + '/'))

  const sessionCookie = request.cookies.get('session')?.value
  const session = await decrypt(sessionCookie)

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (isAuth && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
