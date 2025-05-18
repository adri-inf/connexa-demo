'use server'
import Link from 'next/link'

export default async function DescubreConnexaPage () {
  return (
    <section className='py-12 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Sección de Introducción con imagen */}
        <section className='flex flex-col md:flex-row items-center gap-10'>
          {/* Contenido del texto */}
          <div className='md:w-1/2'>
            <header className='text-left'>
              <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
                Connexa: Conectando a Profesionales con Personas con TEA
              </h1>

              <p className='mt-4 text-lg text-gray-600 tracking-wide dark:text-gray-300'>
                Connexa es una herramienta digital que conecta a profesionales de la asistencia personal con personas con trastorno del espectro del autismo (TEA), apoyando el desarrollo de su vida independiente.
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
              ¿Cómo Funciona Connexa?
            </h2>
            <p className='mt-6 text-lg text-gray-600 dark:text-gray-300'>
              Connexa proporciona a las personas con TEA un asistente personal adaptado a sus necesidades individuales, facilitando el acceso a un perfil profesional de asistencia personalizada en el marco de apoyo.
            </p>
          </div>
        </section>

        {/* Sección de Público Objetivo */}
        <section className='mt-16 grid grid-cols-1 md:grid-cols-2 gap-12'>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿A Quién Está Dirigido Connexa?</h2>
            </header>
            <ul className='mt-4 list-inside list-disc text-gray-700 dark:text-gray-300'>
              <li><strong>Personas con diagnóstico de TEA</strong> que desean desarrollar su vida independiente.</li>
              <li><strong>Profesionales de asistencia personal</strong> interesados en trabajar con personas con TEA.</li>
              <li><strong>Familias</strong> que se benefician del apoyo indirecto brindado por la herramienta.</li>
            </ul>
          </article>

          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>Beneficios Indirectos</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Las familias de las personas con TEA, así como los profesionales de los servicios de apoyo y la sociedad en general, se benefician de este proyecto integral que promueve la inclusión y la calidad de vida.
            </p>
          </article>
        </section>

        {/* Sección de Misión */}
        {/* <section className='mt-16 bg-blue-100 p-6 rounded-lg text-center'>
          <header>
            <h2 className='text-2xl font-bold text-blue-600'>Nuestra Misión</h2>
          </header>
          <p className='mt-4 text-lg text-gray-700'>
            Apoyar el desarrollo de las personas con TEA y las entidades que las representan, garantizando una integración social y un acceso a los servicios necesarios para mejorar su calidad de vida.
          </p>
        </section> */}
      </div>
    </section>
  )
}
