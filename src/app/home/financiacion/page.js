'use server'
export default async function FinanciacionPage () {
  return (
    <section className='py-16 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>

        <header className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl dark:text-gray-100'>
            ¿Cómo se puede financiar la Asistencia Personal?
          </h1>
        </header>

        <section className='mt-10 mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Contexto Legal
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            La Ley 39/2006, de 14 de diciembre, de promoción de la autonomía personal y
            atención a las personas en situación de dependencia (en adelante, la Ley de
            Dependencia), define la asistencia personal como “el servicio prestado por un
            asistente personal que realiza o colabora en tareas de la vida cotidiana de una
            persona en situación de dependencia, de cara a fomentar su vida independiente,
            promoviendo y potenciando su autonomía personal”.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Prestaciones Económicas
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            El artículo 19 de la Ley 39/2006 contempla como forma de provisión una
            prestación económica directa a la persona en situación de dependencia para la
            contratación de la asistencia personal (AP). Esta prestación tiene como
            objetivo facilitar la autonomía y el acceso a la educación, el trabajo y otras
            actividades básicas de la vida diaria.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Regulación en Castilla-La Mancha
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            En Castilla-La Mancha, el Decreto 3/2016 regula la prestación económica de AP,
            destacando que la persona beneficiaria debe tener capacidad para determinar las
            tareas requeridas y gestionar las instrucciones hacia la persona encargada de
            la AP.
          </p>
          <ul className='list-disc list-inside mt-4 dark:text-gray-300'>
            <li>Tener situación de dependencia reconocida en cualquiera de sus grados.</li>
            <li>Tener tres años o más.</li>
            <li>
              Requerir apoyos para desarrollar un proyecto de vida que permita la
              participación plena en ámbitos educativos, laborales, sociales y de ocio.
            </li>
          </ul>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Marco Común
          </h2>
          <p className='leading-relaxed dark:text-gray-300'>
            El Consejo Territorial de Servicios Sociales y del SAAD estableció en mayo de
            2023 un acuerdo que regula las condiciones específicas de acceso a la AP,
            unificando criterios a nivel nacional en el marco de la Ley de Dependencia.
          </p>
        </section>
      </div>
    </section>
  )
}
