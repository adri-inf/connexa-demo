import { AccesibilityButton } from '../navigation/AccesibilityButton.js'

/**
 * Este componente es el contenedor (el div principal) en todas las pages de form
 */
export default function FormContainer ({ children }) {
  return (
    <div className='w-full sm:my-5 md:my-12 sm:shadow-md sm:max-w-lg mx-auto bg-white p-6 sm:p-10 pt-6 sm:rounded-lg flex flex-col dark:bg-gray-800 sm:border border-gray-50 dark:border-gray-700'>
      <div className='flex justify-end'>
        <AccesibilityButton />
      </div>
      {children}
    </div>
  )
}
