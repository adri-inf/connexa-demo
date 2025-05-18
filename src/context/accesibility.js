'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext()

export const AccessibilityProvider = ({ children }) => {
  const [accessibilityLevel, setAccessibilityLevel] = useState(1) // Estado inicial seguro para SSR
  const [hydrated, setHydrated] = useState(false) // Para evitar el desajuste de hidratación

  const [isGrayScale, setIsGrayScale] = useState(() => {
    // Leer de localStorage al cargar la app
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isGrayScale') === 'true'
    }
    return false
  })

  // Aplicar escala de grises cuando cambia el estado
  useEffect(() => {
    const html = document.documentElement // Obtiene la etiqueta <html>

    html.style.filter = isGrayScale ? 'grayscale(100%)' : 'none'

    // Guardar en localStorage
    localStorage.setItem('isGrayScale', isGrayScale)
  }, [isGrayScale])

  useEffect(() => {
    const storedLevel = localStorage.getItem('accessibilityLevel')
    if (storedLevel) {
      setAccessibilityLevel(parseInt(storedLevel, 10))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return

    document.documentElement.classList.remove(
      'accessibility-level-1',
      'accessibility-level-2',
      'accessibility-level-3'
    )
    document.documentElement.classList.add(`accessibility-level-${accessibilityLevel}`)
    localStorage.setItem('accessibilityLevel', accessibilityLevel)
  }, [accessibilityLevel, hydrated])

  return (
    <AccessibilityContext.Provider value={{
      accessibilityLevel,
      setAccessibilityLevel,
      isGrayScale,
      setIsGrayScale
    }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
