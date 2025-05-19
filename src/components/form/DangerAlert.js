/**
 * La usamos para mostrar mensaje de error si algo falla en el fecth de los registros/formularios.
 */
export default function DangerAlert ({ boldText, text }) {
  return (
    <div
      className='flex-1 flex items-center p-2 py-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-900'
      role='alert'
    >
      <svg
        className='flex-shrink-0 inline w-4 h-4 me-2'
        inert
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 20 20'
      >
        <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
      </svg>
      <span className='sr-only'>Info</span>
      {/* Text no wrap quizá es necesario */}
      <span className='overflow-auto'>{text}</span>

    </div>
  )
}
