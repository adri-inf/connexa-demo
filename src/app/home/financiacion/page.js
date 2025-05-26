'use server'
export default async function FinanciacionPage () {
  return (
    <section className='py-6 h-full mx-auto max-w-4xl'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>

        <header className='lg:text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
            ¿Cómo se puede financiar la Asistencia Personal?
          </h1>
        </header>

        <section className='mt-10 mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Contexto Legal
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            La <strong>Ley 39/2006</strong>, del 14 de diciembre, habla sobre el apoyo a personas en situación de dependencia.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Define la asistencia personal como un servicio que da apoyo en tareas diarias.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Este apoyo ayuda a que la persona sea más autónoma y viva de forma independiente
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            ¿Hay ayudas económicas?
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            Sí.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            El <strong>artículo 19 de la Ley 39/2006</strong> permite dar una ayuda económica directa.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Esta ayuda sirve para contratar a un asistente personal.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            El objetivo es facilitar la autonomía y el acceso a actividades como la educación o el trabajo.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            ¿Qué pasa en Castilla-La Mancha?
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            En Castilla-La Mancha existe el <strong>Decreto 3/2016</strong>.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Este decreto explica cómo se da la ayuda económica para la asistencia personal.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            La persona debe cumplir tres condiciones:
          </p>
          <ul className='list-disc list-inside mt-4 dark:text-gray-300'>
            <li>Tener reconocida una situación de dependencia (de cualquier grado).</li>
            <li> <strong>Tener al menos 3 años</strong>.</li>
            <li>
              Necesitar apoyos para desarrollar un proyecto de vida, por ejemplo en el colegio, en el trabajo o en actividades de ocio.
            </li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            ¿Qué normas hay para toda España?
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            En mayo de 2023, el Consejo de Servicios Sociales y el SAAD aprobaron un <span>acuerdo común</span>.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Este acuerdo unifica las condiciones para acceder a la asistencia personal en toda España.
          </p>
          <p className='leading-relaxed dark:text-gray-300'>
            Se aplica dentro del marco de la Ley de Dependencia.
          </p>
        </section>
      </div>
    </section>
  )
}
