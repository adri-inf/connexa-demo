/**
 * Page server side que contiene la parte estática y no interactiva.
 */
'use server'
import { InteractiveFaq } from './InteractiveFaq'

export default async function AsistenciaPersonalPage () {
  return (
    <section className='py-12 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <header className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
            Servicio de Asistencia Personal: Un cambio hacia la independencia
          </h1>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Un modelo transformador de apoyo para las personas con TEA, basado en la autodeterminación y la inclusión social.
          </p>
        </header>

        {/* Carga dinámica del componente interactivo */}
        <div className='mt-12'>
          <InteractiveFaq />
        </div>
      </div>
    </section>
  )
}
