/**
 * Page server side que contiene la parte estática y no interactiva.
 */
'use server'
import { InteractiveFaq } from './InteractiveFaq'

export default async function AsistenciaPersonalPage () {
  return (
    <section className='py-6 h-full px-6 '>
      <div className='max-w-4xl mx-auto'>
        <header>
          <h1 className='lg:text-center text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
            Servicio de Asistencia Personal
          </h1>
          <h1 className='lg:text-center text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
            Un cambio hacia la independencia
          </h1>
          <div className='mx-auto max-w-5xl'>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
              Este servicio ofrece apoyo a las personas con autismo (TEA).
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Se basa en que cada persona decida por sí misma.
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              También busca su inclusión en la sociedad.
            </p>
          </div>
        </header>

        {/* Carga dinámica del componente interactivo */}
        <div className='mt-6 max-w-4xl mx-auto'>
          <InteractiveFaq />
        </div>
      </div>
    </section>
  )
}
