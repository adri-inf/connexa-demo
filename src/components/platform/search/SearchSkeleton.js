/**
 * Esqueleto de la página search
 */
export default function SearchSkeleton () {
  return (
    <>
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
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6'>
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className='flex flex-col p-4 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg animate-pulse'
              >
                <div className='w-full h-36 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-lg mb-4' />
                <div className='w-32 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full mb-2' />
                <div className='w-24 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full mb-2' />
                <div className='w-28 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
