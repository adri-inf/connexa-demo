'use server'
import Link from 'next/link'

export default async function DescubreConnexaPage () {
  return (
    <section className='py-6 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Sección de Introducción con imagen */}
        <section className='flex flex-col md:flex-row items-center gap-10'>
          {/* Contenido del texto */}
          <div className='md:w-1/2'>
            <header className='text-left'>
              <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
                Connexa: conecta a personas con TEA y profesionales
              </h1>

              <p className='mt-4 text-lg text-gray-600 tracking-wide dark:text-gray-300'>
                Connexa es una herramienta digital.
              </p>
              <p className='text-lg text-gray-600 tracking-wide dark:text-gray-300'>
                Esta herramienta sirve para poner en contacto a personas con autismo (TEA) y a profesionales de asistencia personal.
              </p>
              <p className='text-lg text-gray-600 tracking-wide dark:text-gray-300'>
                El objetivo es ayudar a las personas con TEA a vivir de forma más independiente.
              </p>
              <div className='mt-8 flex justify-center'>
                <Link
                  href='/auth'
                  className='text-white dark:text-black bg-primary hover:bg-primary-hover font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-primary-dark dark:hover:bg-primary-hover-dark'
                >
                  Acceder a Connexa
                </Link>
              </div>
            </header>
          </div>

          {/* Imagen representativa */}
          <div className='md:w-1/2'>
            <img
              src='/home-image.jpg'
              alt='Personas siendo ayudadas'
              className='w-full h-auto rounded-lg shadow-lg'
            />
          </div>
        </section>

        {/* Sección de Descripción Detallada */}
        <section className='mt-16'>
          <div className='max-w-3xl mx-auto'>
            <h2 className='text-3xl text-center font-bold text-gray-900 dark:text-gray-100'>
              ¿Cómo funciona Connexa?
            </h2>
            <p className='mt-6 text-lg text-gray-600 dark:text-gray-300'>
              Connexa busca un profesional adecuado para cada persona con TEA.
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              El profesional ayuda según las necesidades de la persona.
            </p>
            <p className='text-lg text-gray-600 dark:text-gray-300'>
              Así se da un apoyo personalizado para cada caso.
            </p>
          </div>
        </section>

        {/* Sección de Público Objetivo */}
        <section className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-12'>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿A quién está dirigido Connexa?</h2>
            </header>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>Connexa está pensado para:</p>
            <ul className='list-inside list-disc text-gray-700 dark:text-gray-300'>
              <li><strong>Personas con TEA</strong> que quieren vivir de forma independiente.</li>
              <li><strong>Profesionales</strong> que quieren trabajar apoyando a personas con TEA.</li>
              <li><strong>Familias</strong> que también se benefician del apoyo que da la herramienta.</li>
            </ul>
          </article>

          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>Beneficios para otras personas</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Connexa no solo ayuda a las personas con TEA.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              También ayuda a sus familias y a los profesionales.
            </p>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              La sociedad también gana:
            </p>
            <ul className='list-inside list-disc text-gray-700 dark:text-gray-300'>
              <li><strong>Hay más inclusión</strong>, más apoyos y mejor calidad de vida para todos.</li>
            </ul>
          </article>
        </section>
      </div>
    </section>
  )
}
