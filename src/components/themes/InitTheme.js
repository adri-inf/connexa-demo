/**
 * Script para aplicar fondo claro u oscuro según el localStorage. Usado en el layout Root.
 */
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function InitTheme () {
  const pathname = usePathname()

  useEffect(() => {
    // const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    // const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
    // Verifica la preferencia de tema al cargar la página
    const savedTheme = localStorage.getItem('color-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Aplica el tema guardado o el tema del sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
      // themeToggleLightIcon.classList.remove('hidden')
    } else {
      document.documentElement.classList.remove('dark')
      // themeToggleDarkIcon.classList.remove('hidden')
    }
  }, [pathname]) // Dependencia del pathname para que se ejecute cuando la ruta cambie

  return null // Este componente no necesita renderizar nada
}
