'use client'

import { useAccessibility } from '@/context/accesibility.js'

export function PlusTextButton () {
  const { accessibilityLevel, setAccessibilityLevel } = useAccessibility()

  const increaseFontSize = () => {
    if (accessibilityLevel < 3) {
      setAccessibilityLevel(accessibilityLevel + 1)
    }
  }

  return (
    // bg-gray-100 dark:bg-gray-700 focus:outline-none
    <button
      type='button'
      className='flex w-full text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm p-2.5'
      onClick={increaseFontSize}
    >

      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-5 h-5'
      >
        <path fillRule='evenodd' d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm8.25-3.75a.75.75 0 0 1 .75.75v2.25h2.25a.75.75 0 0 1 0 1.5h-2.25v2.25a.75.75 0 0 1-1.5 0v-2.25H7.5a.75.75 0 0 1 0-1.5h2.25V7.5a.75.75 0 0 1 .75-.75Z' clipRule='evenodd' />
      </svg>

      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24' fill='currentColor'
        className='w-5 h-5'
      >
        <path fillRule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z' clipRule='evenodd' />
      </svg> */}

      <span className='ml-2' id='theme-toggle-light-text'>Aumentar texto</span>
    </button>
  )
}
