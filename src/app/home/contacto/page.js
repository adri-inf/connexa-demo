'use server'
export default async function ContactoPage () {
  return (
    <section className='py-16 h-full'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        {/* Información de contacto */}
        <section className='bg-white shadow-md rounded-lg p-6 dark:bg-gray-800'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Datos de contacto
          </h2>
          <p className='text-gray-700 leading-relaxed dark:text-gray-300'>
            Puedes escribirnos o llamarnos a cualquiera de los siguientes medios:
          </p>
          <ul className='mt-4 space-y-3 text-gray-800 dark:text-gray-300'>
            <li>
              📧 <strong>Email:</strong>
              <a href='mailto:info@autismocastillalamancha.org' className='text-primary dark:text-primary-dark  hover:text-primary-hover hover:dark:text-primary-hover-dark hover:underline break-words'> info@autismocastillalamancha.org</a>
            </li>
            <li>
              📞 <strong>Teléfono fijo:</strong> <a href='tel:925970073' className='text-primary dark:text-primary-dark  hover:text-primary-hover hover:dark:text-primary-hover-darkhover:underline'>925 97 00 73</a>
            </li>
            <li>
              📱 <strong>Móvil:</strong> <a href='tel:695865991' className='text-primary dark:text-primary-dark  hover:text-primary-hover hover:dark:text-primary-hover-dark hover:underline'>695 86 59 91</a>
            </li>
          </ul>
        </section>

        <section className='bg-white shadow-md rounded-lg p-6 mt-10 dark:bg-gray-800'>
          <h2 className='text-2xl font-semibold mb-4 dark:text-gray-100'>
            Nuestra ubicación
          </h2>
          <p className='text-gray-700 leading-relaxed dark:text-gray-100'>
            Puedes localizarnos en Escalerillas de la Vega, 1 - Bajo Derecha 45004 - Toledo
          </p>

          {/* Mapa de Google */}
          <div className='mt-10 rounded-lg overflow-hidden shadow-md'>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.4199317655753!2d-4.0285723237367295!3d39.864830671533554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6a0bb78fbf657b%3A0xcd3e6989ce940fa0!2sFederaci%C3%B3n%20Autismo%20Castilla-La%20Mancha!5e0!3m2!1ses!2ses!4v1732395369617!5m2!1ses!2ses'
              width='100%'
              height='400'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            />
          </div>

        </section>

      </div>
    </section>
  )
}
