/**
 * Componente de input para buscar usuarios por nombre de usuario.
 */
import { useState } from 'react'

export default function SearcherInput ({ handleSearchClick, defaultValue }) {
  // No podemos cambiar directamente el useState de fullName del padre, ya que cada vez que cambia, se actualiza la página.
  // En su lugar, creamos un nuevo useState aqui, y cuando le damos al botón de buscar, actualizamos el useState en el padre (y vamos a la page 1)
  const [fullName, setFullName] = useState(defaultValue)

  const handleFullNameChange = (event) => {
    setFullName(event.target.value) // Actualiza el estado con el valor del input
  }

  // Función para manejar el clic en el botón
  const handleSubmit = (event) => {
    event.preventDefault()
    handleSearchClick(fullName)
  }

  return (
    <div className='flex-1 max-w-lg flex justify-center'>
      <form className='flex-1' onSubmit={handleSubmit}>
        <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
          Buscar
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-primary dark:focus:border-primary-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
            placeholder='Buscar...'
            defaultValue={defaultValue}
            onChange={handleFullNameChange}
          />
          <button type='submit' className='text-white dark:text-black absolute end-2.5 bottom-2.5 bg-primary hover:bg-primary-hover font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-dark dark:hover:bg-primary-hover-dark'>
            Buscar
          </button>
        </div>
      </form>
    </div>
  )
}
