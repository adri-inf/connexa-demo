/**
 * Middleware genérico para manejar si un usuario helper intenta acceder a la ruta search
 * Son redirecciones basadas en el rol de usuario, que lo obtenemos de la cookie
 */
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export default function handleSearchRedirect (req) {
  const currentPath = req.nextUrl.pathname

  // Aplicar solo a rutas /auth/*
  if (currentPath.startsWith('/app/platform/search')) {
    // Obtener token de acceso
    const token = req.cookies.get('accessToken')?.value || null

    try {
    // Si hay algún error, lanza excepción
      const decoded = jwt.decode(token)

      // Obtenemos rol y rol opuesto
      const userRole = decoded.role

      if (userRole === 'helper' && currentPath.startsWith('/app/platform/search')) {
        const redirectUrl = `${req.nextUrl.origin}/app`
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
    }
  }

  return null // Ninguna redirección fue necesaria.
}
