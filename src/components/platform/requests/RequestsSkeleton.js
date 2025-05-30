export default function RequestsSkeleton () {
  return (
    <>
      <h1 className='text-lg sm:text-2xl my-5 text-center font-semibold dark:text-white'>
        Historial de Solicitudes de Contacto
      </h1>

      <div className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-10 lg:pt-6 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
        {/* Input de búsqueda */}
        <div className='flex justify-center'>
          <form className='flex-1 max-w-lg'>
            <div className='relative'>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 text-sm text-transparent border border-gray-300 rounded-lg bg-gray-50 animate-pulse dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-transparent'
                disabled
              />
            </div>
          </form>
        </div>

        {/* Cards */}
        <div className='flex flex-col gap-4 my-8'>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className='p-5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow animate-pulse'
            >
              <div className='flex flex-col xm:flex-row gap-x-8 gap-y-4 items-center'>
                {/* Avatar */}
                <div className='mx-auto w-24 h-24 flex items-center justify-center'>
                  <div className='aspect-square rounded-full w-full h-full bg-gray-300 dark:bg-gray-600' />
                </div>

                {/* Texto simulado */}
                <div className='flex flex-col gap-2 mx-auto xm:w-full'>
                  <div className='w-48 h-4 bg-gray-300 dark:bg-gray-600 rounded' />
                  <div className='w-44 h-4 bg-gray-300 dark:bg-gray-600 rounded' />
                  <div className='w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded' />
                  <div className='w-40 h-4' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
