/**
 * Esqueleto de la página search
 */
export default function RequestsSkeleton () {
  return (
    <>
      <h1 className='text-lg sm:text-2xl my-5 text-center font-semibold dark:text-white'>Historial de Solicitudes de Contacto</h1>

      <div className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-12 lg:pt-8 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
        {/* Contenedor de la barra de búsqueda y las cards */}
        <div className='flex flex-col gap-8'>
          {/* Esqueleto de la barra de búsqueda */}
          <div className='flex justify-center'>
            <form className='flex-1 max-w-lg'>
              <div className='relative'>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-4 text-sm text-transparent border border-gray-300 rounded-lg bg-gray-50 animate-pulse dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-transparent'
                  placeholder='Buscar...'
                  disabled
                />
              </div>
            </form>
          </div>

          {/* Esqueleto de las cards */}
          <div className='flex flex-col gap-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 animate-pulse'
              >
                <div className='flex xm:items-stretch flex-col w-full relative'>
                  <div className='flex flex-col xm:flex-row gap-x-8'>
                    {/* Placeholder para la imagen del usuario */}
                    <div>
                      <div className='mx-auto h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-600' />
                    </div>

                    {/* Placeholder para la información */}
                    <div className='mt-2 w-lg flex flex-col text-md gap-y-2 w-full items-center xm:items-stretch'>
                      <div className='w-1/2 xm:w-full flex flex-col gap-y-3'>
                        {/* Nombre */}
                        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded xm:w-1/2' />

                        {/* Fecha de la solicitud */}
                        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 xm:w-1/4' />

                        {/* Método de contacto */}
                        <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 xm:w-1/6' />
                      </div>
                    </div>

                    {/* Placeholder para los iconos */}
                    <div className='flex flex-col gap-y-2 absolute top-0 right-0'>
                      <div className='h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </>
  )
}
