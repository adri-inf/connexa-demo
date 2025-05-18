import { useState } from 'react'
import ChatUserCard from './ChatUserCard'
import { IconClearSearch } from '@/components/icons/chats'
import Link from 'next/link'

/**
 * Componente que representa la parte de selección de chats.
 * options será un array de objetos. Cada uno tendrá un id, un firstName y un lastMessage
 */
export default function ChatUsersList ({ chats, role, isUserSelected }) {
  const [searchText, setSearchText] = useState('') // Estado para manejar el texto de búsqueda (por nombre de usuario)

  // Filtrar chats en función del texto de búsqueda
  const filteredChats = chats.filter(chat => {
  // Concatenar firstName y lastName para formar el nombre completo
    const userFullName =
    role === 'helper'
      ? `${chat.regularUser.firstName} ${chat.regularUser.lastName}`
      : `${chat.helperUser.firstName} ${chat.helperUser.lastName}`

    // Filtrar solo por nombre completo (firstName + lastName)
    return userFullName.toLowerCase().includes(searchText.toLowerCase())
  })

  // Manejar cambios en el campo de búsqueda
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    // Lógica para visualizar lista de usuarios en pantallas pequeñas
    <div className={`${isUserSelected ? 'hidden lg:block' : 'block'} w-1/2 flex-1 flex flex-col`}>
      <div className='mb-2'>
        <span className='text-lg font-semibold'>Chats</span>
      </div>

      {/* Formulario para buscar chats por nombre */}
      <form className='mb-4'>
        <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>Search</label>
        <div className='relative'>
          <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-primary-dark'
            placeholder='Buscar chats'
            value={searchText} // Vincular el valor con el estado
            onChange={handleSearchChange} // Actualizar el estado cuando cambie el texto
            autoComplete='off'
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault() // Prevenir la acción por defecto al presionar Enter
              }
            }}
          />

          {/* Botón para limpiar el campo de búsqueda */}
          {searchText && (
            <div className='absolute inset-y-0 end-0 flex items-center'>
              <button
                type='button'
                onClick={() => { setSearchText('') }}
                className='flex items-center pe-3 text-gray-500 dark:text-gray-400'
              >
                <IconClearSearch />
              </button>
            </div>

          )}
        </div>
      </form>

      {/* Lista dinámica de chats */}
      <div
        className='flex flex-col gap-y-2 overflow-y-auto'
        style={{ maxHeight: 'calc(100vh - 250px)' }} // Ajuste dinámico de altura
      >

        {filteredChats.length > 0 && (
          filteredChats.map((option) => (
            // Mostramos atributos selectivamente, dependiendo del rol
            <ChatUserCard
              key={option.id}
              id={role === 'helper' ? option.regularUser.id : option.helperUser.id}
              firstName={role === 'helper' ? option.regularUser.firstName : option.helperUser.firstName}
              lastName={role === 'helper' ? option.regularUser.lastName : option.helperUser.lastName}
              lastMessage={option.lastMessage?.content || ''}
              profilePicture={role === 'helper' ? option.regularUser.profilePicture : option.helperUser.profilePicture}
              unreadMessages={option.unreadMessages}
            />
          ))
        )}

        {/* Si se ha realizado una búsqueda y no hay resultados */}
        {filteredChats.length === 0 && searchText !== '' && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              No se ha encontrado ningun chat con ese nombre.
            </div>
          </div>
        )}

        {/* Si un regular no se ha realizado una búsqueda y no hay resultados. */}
        {filteredChats.length === 0 && searchText === '' && role === 'regular' && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              <p>¡Vaya! Todavía no has enviado ninguna solicitud de chat a ningún asistente personal.</p>
              <p>Envía una haciendo click en el botón <strong>'Contactar'</strong> y selecciona la opción <strong>'Chat'</strong> al visualizar un asistente.</p>
              <p><Link className='underline text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark' href='/app/platform/search'>Haz click aquí para buscar asistentes.</Link></p>
            </div>
          </div>
        )}

        {/* Si un helper no se ha realizado una búsqueda y no hay resultados. */}
        {filteredChats.length === 0 && searchText === '' && role === 'helper' && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              Aún no tienes ninguna solicitud de chat. Espera a que un usuario solicite contactar contigo.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
