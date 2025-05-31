/**
 * Componente que representa el contenedor del chat. Cuenta con la lógica del manejo de mensajes.
 */
import { chatService } from '@/services/chat'
import { generateImgSrc } from '@/utils/profilePictures'
import { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'
import MessagesSkeleton from './MessagesSkeleton'
import Link from 'next/link'
import { useNotification } from '@/context/notification'
import { getRoleFromCookieClient } from '@/utils/sessionClient'

export default function ChatContainer ({ isUserSelected, actualChat, actualUser, ownUserId }) {
  const [loading, setLoading] = useState(false) // Estado de carga
  const [messages, setMessages] = useState([])
  const { notify } = useNotification()

  // Enviar un mensaje
  const submitForm = (event) => {
    event.preventDefault()
    const input = document.getElementById('input')

    if (input.value.trim() !== '') {
      try {
        input.value = '' // Limpiar el input después de enviar
      } catch (error) {
        notify('Ha ocurrido un fallo en el servidor', 'error')
      }
    }
  }

  // Fetch inicial de mensajes
  useEffect(() => {
    const fetchMessages = async () => {
      // Si los mensajes del chat no se han cargado previamente, y hay un chat seleccionado
      if (isUserSelected && !actualChat.messages && actualChat.id) {
        try {
          setLoading(true)
          const role = getRoleFromCookieClient()
          const { data } = await chatService.getChatMessages(ownUserId, actualChat.id, role)
          setMessages(data.messages)
          actualChat.messages = data.messages // Actualizar los mensajes del chat actual
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
        // Si los mensajes del chat ya se han cargado antes, porque el chat ha sido seleccionado
      } else if (isUserSelected && actualChat.messages) {
        setMessages(actualChat.messages) // Si ya están cargados, solo los establecemos
      }
    }

    fetchMessages()
  }, [ownUserId, actualChat, isUserSelected])

  return (
    <div className={`${isUserSelected ? 'block' : 'hidden lg:block'} w-1/2 p-3 flex-1 flex flex-col bg-gray-50 dark:bg-gray-700 rounded-lg`}>
      {isUserSelected
        ? (
          <>
            {/* Cabecera del chat */}
            <div className='flex items-center gap-x-4 text-lg bg-gray-200 dark:bg-gray-800 p-2 rounded-lg'>

              {/* Boton para volver hacia atrás, en pantallas pequeñas */}
              <Link
                className='lg:hidden'
                href='/app/platform/chats'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18' />
                </svg>
              </Link>

              {/* Imagen del usuario */}
              <Link className='flex flex-shrink-0' href={`/app/platform/search/${actualUser.id}`}>
                <img
                  className='h-10 w-10 rounded-full shadow-lg transition-transform duration-300 hover:scale-110'
                  src={generateImgSrc(actualUser.profilePicture)} alt='User image'
                />
              </Link>
              <span className='truncate'>{`${actualUser.firstName} ${actualUser.lastName || ''}`}</span>

              {/*
              <img
                className='h-12 w-12 rounded-full'
                src={generateImgSrc(actualUser.profilePicture)}
                alt='user image'
              />
              <span className='truncate'>{`${actualUser.firstName} ${actualUser.lastName}`}</span> */}
            </div>

            {/* Lista de mensajes */}
            {loading ? <MessagesSkeleton /> : <ChatMessages messages={messages} ownUserId={ownUserId} />}

            {/* Formulario para enviar mensajes */}
            <form onSubmit={submitForm} className='mt-auto'>
              <div className='flex items-center px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <input
                  type='text'
                  id='input'
                  className='min-w-0 flex-1 p-2 text-sm bg-white dark:bg-gray-800 rounded-lg'
                  placeholder='Escribe un mensaje...'
                  autoComplete='off'
                />
                <button type='submit' className='p-2 text-primary dark:text-primary-dark rounded-full'>
                  <svg className='w-5 h-5 rotate-90' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 20'>
                    <path d='M17.914 18.594l-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z' />
                  </svg>
                </button>
              </div>
            </form>
          </>
          )
        : (
          <div className='mt-20 text-center text-lg'>Selecciona un chat</div>
          )}
    </div>
  )
}
