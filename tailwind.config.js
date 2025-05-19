/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  './node_modules/flowbite/**/*.js',
  flowbite.content()
]

// Colores y tamaños de pantalla personalizados
export const theme = {
  extend: {
    colors: {
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      // Colores
      primary: '#1d4ed8',
      'primary-hover': '#1e40af',
      'primary-complementary': '#D81D4E',

      'primary-dark': '#7dd3fc',
      'primary-dark-complementary': '#ffffff',
      'primary-hover-dark': '#38bdf8',

      error: '#f4202e',
      'error-dark': '#ff4a4a'
    }
  },
  screens: {
    'hide-logo': '400px',
    'hide-nav-elements': '1100px',
    xs: '300px', // Nuevo breakpoint para pantallas de 300px en adelante
    xm: '510px', // Nuevo breakpoint para pantallas de 500px en adelante
    sm: '640px', // Pantalla pequeña (por defecto de Tailwind)
    md: '768px', // Pantalla mediana
    lg: '1024px', // Pantalla grande
    xl: '1280px', // Pantalla extra grande
    '2xl': '1536px' // Pantalla muy grande
  }
}
export const plugins = [
  flowbite.plugin()
]

// Necesario para aplicar el modo oscuro de tailwind
export const darkMode = 'class'

// Valores por defecto:
// {
//   'sm': '640px',    // Pantallas pequeñas: 640px o más
//   'md': '768px',    // Pantallas medianas: 768px o más
//   'lg': '1024px',   // Pantallas grandes: 1024px o más
//   'xl': '1280px',   // Pantallas extra grandes: 1280px o más
//   '2xl': '1536px'   // Pantallas muy grandes: 1536px o más
// }
