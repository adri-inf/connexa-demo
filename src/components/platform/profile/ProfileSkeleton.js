/**
 * Esqueleto del perfil de usuario.
 */
export default function ProfileSkeleton () {
  return (
    <>
      <div className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-12 lg:pt-8 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
        <div className='flex flex-col sm:flex-row items-center space-x-6'>
          <div className='h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse' />
          <div className='flex flex-col space-y-2'>
            <div className='h-6 w-48 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse' />
            <div className='h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse' />
          </div>
        </div>
      </div>

      <div className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-12 lg:pt-8 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
        <div className='w-full flex justify-end'>
          <button className='text-sm flex items-center gap-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full'>
            <span className='w-4 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
            <span className='w-16 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
          </button>
        </div>

        <div className='flex gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
          <div className='w-6 h-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
          <div className='w-24 h-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='flex flex-col'>
              <div className='w-24 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full mb-2' />
              <div className='w-full h-12 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

      <div className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-12 lg:pt-8 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
        <div className='w-full flex justify-end'>
          <button className='text-sm flex items-center gap-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full'>
            <span className='w-4 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
            <span className='w-16 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
          </button>
        </div>

        <div className='flex gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
          <div className='w-6 h-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
          <div className='w-24 h-6 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className='flex flex-col'>
              <div className='w-24 h-4 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-full mb-2' />
              <div className='w-full h-12 bg-gray-300 dark:bg-gray-600 animate-pulse rounded-lg' />
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
