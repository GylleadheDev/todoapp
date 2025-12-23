import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Rotas protegidas - requer autenticação
  const protectedRoutes = ['/home', '/account']
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Rotas de auth - usuários logados não podem acessar
  const authRoutes = ['/auth/login', '/auth/register']
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Se tentar acessar rota protegida sem token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Se já está logado e tenta acessar login/register
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/home/:path*',
    '/account/:path*',
    '/auth/:path*'
  ]
}