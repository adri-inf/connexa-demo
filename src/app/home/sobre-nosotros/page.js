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
            Una entidad sin ánimo de lucro que trabaja por los derechos y la calidad de vida de las personas con TEA y sus familias.
          </p>
        </header>

        <section className='mt-10 md:mt-20  grid grid-cols-1 md:grid-cols-2 gap-8'>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿Quiénes somos?</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Nacimos en 2010 con el objetivo de agrupar y representar institucionalmente a las personas con TEA y sus familias asociadas a las entidades provinciales de atención directa. Nuestra misión principal es servir como interlocutor y representante ante Administraciones Públicas y agentes sociales.
            </p>
          </article>
          <article className='bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
            <header>
              <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>¿Qué hacemos?</h2>
            </header>
            <p className='mt-4 text-gray-700 dark:text-gray-300'>
              Realizamos incidencia política y social, trabajamos por la convergencia y cohesión asociativa, y defendemos los derechos y la calidad de vida de las personas con TEA y sus familias en una sociedad inclusiva y solidaria.
            </p>
          </article>
        </section>

        <section className='mt-10 bg-blue-100 p-6 rounded-lg dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
          <header>
            <h2 className='text-2xl font-bold text-primary dark:text-primary-dark'>
              Nuestra Misión
            </h2>
          </header>
          <p className='mt-4 text-gray-700 dark:text-gray-300'>
            Apoyar el desarrollo de nuestras entidades y representar institucionalmente al colectivo que agrupamos, con el objetivo de mejorar la calidad de vida de las personas con autismo y sus familias, promoviendo una sociedad inclusiva y solidaria.
          </p>
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
