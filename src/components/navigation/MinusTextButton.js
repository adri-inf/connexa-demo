'use client'

import { useAccessibility } from '@/context/accesibility.js'

export function MinusTextButton () {
  const { accessibilityLevel, setAccessibilityLevel } = useAccessibility()

  const decreaseFontSize = () => {
    if (accessibilityLevel > 1) {
      setAccessibilityLevel(accessibilityLevel - 1)
    }
  }

  return (
    // bg-gray-100 dark:bg-gray-700 focus:outline-none
    <button
      type='button'
      className='flex w-full text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm p-2.5'
      onClick={decreaseFontSize}
    >

      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24' fill='currentColor'
        className='w-5 h-5'
      >
        <path fillRule='evenodd' d='M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Zm4.5 0a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z' clipRule='evenodd' />
      </svg>

      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-5 h-5'
      >
        <path fillRule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z' clipRule='evenodd' />
      </svg> */}

      <span className='ml-2' id='theme-toggle-light-text'>Disminuir texto</span>
    </button>
  )
}
