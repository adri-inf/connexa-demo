/**
 * Botón para alternar entre modo claro y oscuro.
 */
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation' // Para detectar cambios de ruta

export function ButtonThemeSwitcher () {
  const pathname = usePathname() // Obtén la ruta actual

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')
    const themeToggleDarkText = document.getElementById('theme-toggle-dark-text')
    const themeToggleLightText = document.getElementById('theme-toggle-light-text')
    const themeToggleBtn = document.getElementById('theme-toggle')

    // Verifica la preferencia de tema al cargar la página
    const savedTheme = localStorage.getItem('color-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Aplica el tema guardado o el tema del sistema
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      themeToggleLightIcon.classList.remove('hidden')
      themeToggleLightText.classList.remove('hidden')
    } else {
      themeToggleDarkIcon.classList.remove('hidden')
      themeToggleDarkText.classList.remove('hidden')
    }

    // Cambia el tema al hacer clic en el botón
    const handleThemeToggle = () => {
      themeToggleDarkIcon.classList.toggle('hidden')
      themeToggleLightIcon.classList.toggle('hidden')
      themeToggleDarkText.classList.toggle('hidden')
      themeToggleLightText.classList.toggle('hidden')

      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }
    }

    themeToggleBtn?.addEventListener('click', handleThemeToggle)

    // Limpiar el eventListener cuando el componente se desmonta
    return () => {
      themeToggleBtn?.removeEventListener('click', handleThemeToggle)
    }
  }, [pathname]) // Este useEffect se ejecutará cuando la ruta cambie

  return (
    // bg-gray-100 dark:bg-gray-700 focus:outline-none
    <button
      id='theme-toggle'
      type='button'
      className='flex w-full text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm p-2.5'
    >
      <svg
        id='theme-toggle-dark-icon'
        className='hidden w-5 h-5'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
      </svg>
      <svg
        id='theme-toggle-light-icon'
        className='hidden w-5 h-5'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' />
      </svg>

      <span className='ml-2 hidden' id='theme-toggle-dark-text'>Modo Oscuro
      </span>
      <span className='ml-2 hidden' id='theme-toggle-light-text'>Modo Claro</span>
    </button>
  )
}
