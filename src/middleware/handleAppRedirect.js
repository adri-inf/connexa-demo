/**
 * Middleware para gestionar si, si un usuario no tiene cookies, no pueda acceder a nunguna ruta de /app. Se le redireccionará a /home/
*/
import { NextResponse } from 'next/server'

export function handleAppRedirect (req) {
  const currentPath = req.nextUrl.pathname
  // Aplicar solo a rutas /app/*
  if (currentPath.startsWith('/app')) {
    const accessToken = req.cookies.get('accessToken')
    // Si no hay accessToken, redirijimos a auth
    if (!accessToken) {
      const redirectUrl = `${req.nextUrl.origin}/home`
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Si no aplica ninguna regla, continuar normalmente
  return null
}
