'use client'

import { useAccessibility } from '@/context/accesibility'

export function GrayScaleButton () {
  const { setIsGrayScale, isGrayScale } = useAccessibility()

  const toggleGrayScale = () => {
    setIsGrayScale(!isGrayScale)
  }

  return (
    <button
      type='button'
      onClick={toggleGrayScale}
      className={`${isGrayScale ? 'bg-gray-200 dark:bg-gray-600' : ''} flex w-full text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500 text-sm p-2.5`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='w-5 h-5'
      >
        <path d='M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z' />
      </svg>

      <span className='ml-2' id='theme-toggle-light-text'>
        Escala de grises
      </span>
    </button>
  )
}
