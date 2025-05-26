'use server'
export default async function SobreNosotrosPage () {
  return (
    <section className='py-12 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <header className='text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100'>
            Federación Autismo Castilla-La Mancha
          </h1>
          <p className='mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300'>
            La Federación Autismo Castilla-La Mancha es una organización sin ánimo de lucro.
          </p>
          <p className='text-lg leading-7 text-gray-600 dark:text-gray-300'>
            Trabaja por los derechos y la calidad de vida de las personas con autismo (TEA) y sus familias.
          </p>
        </header>

        <section className='mt-10 md:mt-20  grid grid-cols-1 md:grid-cols-2 gap-8'>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿Quiénes somos?</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              La Federación existe desde el año 2010.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              Su objetivo es unir y representar a las personas con TEA y a sus familias.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              También representa a las entidades que dan atención directa a las personas con TEA y a sus familias.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              La Federación habla en nombre del colectivo ante las instituciones públicas y otros grupos sociales.
            </p>
          </article>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿Qué hacemos?</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              La Federación defiende los derechos de las personas con TEA y sus familias.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              Trabajamos para crear una sociedad más justa, inclusiva y solidaria.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              También apoyamos a las asociaciones de la región para que estén unidas y sean más fuertes.
            </p>
          </article>
        </section>

        <section className='justify-center mt-10 bg-blue-100 p-6 rounded-lg dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
          <header>
            <h2 className='text-center text-2xl font-bold text-primary dark:text-primary-dark'>
              Nuestra Misión
            </h2>
          </header>
          <div className='max-w-3xl mx-auto'>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Apoyar a nuestras entidades y representar al colectivo que formamos.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              Queremos mejorar la calidad de vida de las personas con TEA y sus familias.
            </p>
            <p className='text-gray-700 dark:text-gray-300'>
              Promovemos una sociedad donde todas las personas tengan las mismas oportunidades.
            </p>
          </div>
          <div className='mt-6 text-center'>
            <a
              href='https://www.autismocastillalamancha.org/presentacion/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-primary dark:text-primary-dark text-xl underline hover:text-primary-hover hover:dark:text-primary-hover-dark'
            >
              Visita nuestra web oficial
            </a>
          </div>
        </section>
      </div>
    </section>

  )
}
