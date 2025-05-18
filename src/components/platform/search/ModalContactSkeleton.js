/**
 * Esqueleto del modal de contacto.
 */
export default function ModalContactSkeleton () {
  return (
    <>
      {/* Botones de opciones */}
      <div className='flex flex-col gap-y-4'>
        {/* Botón: Iniciar chat */}
        <div className='flex items-center gap-x-3 py-3 px-4 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse'>
          <div className='w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full' />
          <div className='text-left flex flex-col items-start space-y-2 overflow-hidden'>
            <div className='w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
          </div>
        </div>

        {/* Botón: Contactar por correo */}
        <div className='flex items-center gap-x-3 py-3 px-4 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse'>
          <div className='w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full' />
          <div className='text-left flex flex-col items-start space-y-2 overflow-hidden'>
            <div className='w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-56 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-48 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
          </div>
        </div>

        {/* Botón: Contactar por teléfono */}
        <div className='flex items-center gap-x-3 py-3 px-4 w-full rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse'>
          <div className='w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full' />
          <div className='text-left flex flex-col items-start space-y-2 overflow-hidden'>
            <div className='w-48 h-3 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-56 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
            <div className='w-40 h-4 bg-gray-300 dark:bg-gray-600 rounded-full' />
          </div>
        </div>
      </div>

      {/* Botón Contactar */}
      <div className='mt-6 py-3 px-6 w-full rounded-lg bg-gray-300 dark:bg-gray-600 animate-pulse h-14' />
    </>
  )
}
