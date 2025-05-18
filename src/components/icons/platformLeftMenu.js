/**
 * Iconos del menu izquierdo de la app (platform)
 */
export const IconSearchHelpers = ({ active }) => (
  <svg className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'} size-6 flex-shrink-0  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='2.5' stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
  </svg>

)

export const IconProfile = ({ active }) => (
  <svg className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'} size-6 flex-shrink-0  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' fillRule='size-6'>
    <path fillRule='evenodd' d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z' clipRule='evenodd' />
  </svg>
)

export const IconRequests = ({ active }) => (
  <svg className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'} size-6 flex-shrink-0  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
    <path d='M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z' />
  </svg>
)

export const IconChats = ({ active }) => (
  <svg className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'} size-6 flex-shrink-0  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
    <path fillRule='evenodd' d='M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z' clipRule='evenodd' />
  </svg>
)

export const IconFavorites = ({ active }) => (
  <svg className={`${active ? 'text-gray-900 dark:text-white' : 'text-gray-500'} size-6 flex-shrink-0  transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
    <path fillRule='evenodd' d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z' clipRule='evenodd' />
  </svg>
)

export const IconLogout = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
    <path fillRule='evenodd' d='M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z' clipRule='evenodd' />
  </svg>

)
