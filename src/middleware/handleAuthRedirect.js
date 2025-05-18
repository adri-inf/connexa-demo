/**
 * Middleware para comprobar que, si un usuario autenticado va a la ruta /auth (inicio sesión), se le redirija a /app/plattform
 */
import { NextResponse } from 'next/server'

export function handleAuthRedirect (req) {
  const currentPath = req.nextUrl.pathname
  // Aplicar solo a rutas /auth/*
  if (currentPath.startsWith('/auth')) {
    const accessToken = req.cookies.get('accessToken')

    // Si no hay accessToken, continuamos el flujo normal
    if (!accessToken) {
      return null
    }

    const redirectUrl = `${req.nextUrl.origin}/app/platform`
    return NextResponse.redirect(redirectUrl)
  }

  // Si no aplica ninguna regla, continuar normalmente
  return null
}
