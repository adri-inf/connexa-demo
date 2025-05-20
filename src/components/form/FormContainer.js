/**
 * Este componente es el contenedor (el div principal) en todas las pages de form
 */
export default function FormContainer ({ children }) {
  return (
    <div className='pt-6 w-full sm:my-5 md:my-12 sm:shadow-md sm:max-w-lg mx-auto bg-white p-6 sm:p-10 sm:rounded-lg flex flex-col dark:bg-gray-800 sm:border border-gray-50 dark:border-gray-700'>
      {children}
    </div>
  )
}
