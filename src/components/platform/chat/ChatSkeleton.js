import MessagesSkeleton from './MessagesSkeleton'

/**
 * Esqueleto del perfil de usuario.
 */
export default function ChatSkeleton ({ isUserSelected }) {
  return (
    <div
      className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white flex flex-row gap-x-4 sm:rounded-xl border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'
      style={{ height: 'calc(100vh - 100px)' }}
    >
      {/* Esqueleto de la lista */}
      <div className={`${isUserSelected ? 'hidden lg:block' : 'block'} w-1/2 flex-1 flex flex-col rounded-lg`}>
        <div className='mb-2'>
          <span className='text-lg font-semibold'>Chats</span>
        </div>

        {/* Esqueleto de la barra de búsqueda */}
        <div className='flex justify-center'>
          <form className='flex-1'>
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

        {/* Lista de chats con esqueleto de carga */}
        <div className='pt-3 flex flex-col gap-y-2 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 250px)' }}>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className='flex flex-row gap-x-4 items-center p-2 text-gray-900 rounded-lg dark:border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white hover:bg-gray-200'>
              <div className='animate-pulse'>
                <div className='h-11 w-11 rounded-full bg-gray-300' /> {/* Esqueleto de imagen de perfil */}
              </div>
              <div className='flex flex-col overflow-hidden'>
                <div className='h-4 bg-gray-300 rounded w-24 mb-2' /> {/* Esqueleto del nombre */}
                <div className='h-4 bg-gray-300 rounded w-36' /> {/* Esqueleto del último mensaje */}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Esqueleto del chat */}
      <div className={`${isUserSelected ? 'block' : 'hidden lg:block'} p-3 w-1/2 flex-1 flex flex-col rounded-lg bg-gray-50 dark:bg-gray-700`}>

        {/* Si hay un usuario seleccionado */}
        {isUserSelected && (
          <>
            {/* Cabecera chat */}
            <div className='flex flex-row items-center gap-x-4 text-lg bg-gray-200 dark:bg-gray-800 p-2 rounded-lg'>
              <button className='lg:hidden hover:cursor-default'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                </svg>
              </button>

              <div className='animate-pulse'>
                <div className='h-12 w-12 rounded-full bg-gray-300' /> {/* Esqueleto de imagen de perfil */}
              </div>
              <div className='w-24 h-6 bg-gray-300 rounded' /> {/* Esqueleto del nombre del usuario */}
            </div>

            <MessagesSkeleton />

            {/* Esqueleto de la barra de búsqueda */}
            <div className='flex justify-center mt-auto px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700'>
              <form className='flex-1'>
                <div className='relative flex flex-row justify-center items-center'>
                  <input
                    type='search'
                    id='default-search'
                    className='h-10 block w-full p-4 text-sm text-transparent border border-gray-300 rounded-lg bg-gray-50 animate-pulse dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-transparent'
                    placeholder='Escribe un mensaje...'
                    disabled
                  />
                  <svg className='ml-5 text-primary w-5 h-5 rotate-90 rtl:-rotate-90' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 20'>
                    <path d='m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
                  </svg>
                </div>
              </form>
            </div>
          </>
        )}

        {/* Si no hay usuario seleccionado */}
        {!isUserSelected && (
          <div className='mt-20 text-lg text-center'>
            <span>Selecciona un chat</span>
          </div>
        )}

      </div>

    </div>
  )
}
