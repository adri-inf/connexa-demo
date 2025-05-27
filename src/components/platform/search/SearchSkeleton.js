export default function SearchSkeleton () {
  return (
    <div id='partContainer' className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-10 lg:pt-6 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>

      {/* Search bar y botón de favoritos */}
      <div className='flex flex-row space-x-3 justify-center'>
        {/* Search input */}
        <div className='flex-1 max-w-lg flex justify-center'>
          <div className='w-full animate-pulse'>
            <div className='relative'>
              <input
                type='search'
                disabled
                className='block w-full p-4 ps-10 text-sm text-transparent border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-transparent'
              />
            </div>
          </div>
        </div>

        {/* Botón favorito */}
        <div className='p-3 aspect-square flex items-center justify-center bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg animate-pulse' />
      </div>

      {/* Grid de helpers */}
      <div className='my-8 grid grid-cols-1 [@media(min-width:420px)]:grid-cols-2 [@media(min-width:700px)]:grid-cols-3 gap-4'>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className='p-5 bg-gray-200 dark:bg-gray-700 rounded-lg shadow animate-pulse flex flex-col items-center'>
            {/* Avatar */}
            <div className='mt-10 mx-auto w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center'>
              <div className='w-full h-full rounded-md bg-gray-300 dark:bg-gray-600' />
            </div>

            {/* Nombre */}
            <div className='w-32 h-5 mt-4 bg-gray-300 dark:bg-gray-600 rounded-full' />

            {/* Ubicación */}
            <div className='w-32 h-4 mt-2 bg-gray-300 dark:bg-gray-600 rounded-full' />

            {/* Compatibilidad */}
            <div className='w-20 h-4 mt-2 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-24 h-8 mt-2' />
          </div>
        ))}
      </div>
    </div>
  )
}
