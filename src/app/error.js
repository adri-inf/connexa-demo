'use client'
import { DefaultBackground } from '@/components/backgrounds/DefaultBackground.js'
/**
 * Página personalizada de error 404
 */
import Link from 'next/link'

export default function ErrorPage () {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-gray-800 px-6'>
      {/* Fondo */}
      <DefaultBackground />

      <h1 className='text-6xl font-bold text-primary dark:text-primary-dark'>Error inesperado</h1>
      <p className='text-xl mt-4 dark:text-white'>Lo sentimos, ha ocurrido un error inesperado</p>
      <div className='mt-8 flex justify-center'>
        <Link
          href='/'
          rel='noopener noreferrer'
          className='text-white dark:text-black bg-primary hover:bg-primary-hover font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-primary-dark dark:hover:bg-primary-hover-dark'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
