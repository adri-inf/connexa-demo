/**
 * Page de chats. Client side, aunque se podría hacer el primer fetch en el servidor.
 */
'use client'
import ChatContainer from '@/components/platform/chat/ChatContainer'
import ChatSkeleton from '@/components/platform/chat/ChatSkeleton'
import ChatUsersList from '@/components/platform/chat/ChatUsersList'
import { getIdFromCookieClient, getRoleFromCookieClient } from '@/utils/sessionClient'
import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function ChatsPage () {
  const searchParams = useSearchParams() // Hook para acceder a los parámetros de la URL

  // Extraer valores directamente de la URL. Id del usuario contrario.
  const [userId, setUserId] = useState(searchParams.get('userId') || '') // Nombre de búsqueda, por defecto es vacío

  const chats = useMemo(() => {
    return [
      {
        id: '9d5541db-e2ae-4725-b3d5-e9dc624e39ec',
        regularUserId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
        helperUserId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
        createdAt: '2025-05-18T15:09:14.000Z',
        updatedAt: '2025-05-18T17:09:18.000Z',
        regularUser: {
          firstName: 'Sofía',
          lastName: 'Moreno',
          profilePicture: 'uploads/profilePictures/22.webp',
          id: '00161b06-cbd0-454a-8f9f-250ceef0cc9c'
        },
        helperUser: {
          firstName: 'Pedro',
          lastName: 'García',
          profilePicture: '3.webp',
          id: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6'
        },
        lastMessage: {
          content: 'Me cuesta organizarme.'
        },
        unreadMessages: 0
      },
      {
        id: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
        regularUserId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
        helperUserId: '0014bbde-3ff6-4123-97bc-d83ab9c3f493',
        createdAt: '2025-05-15T10:33:22.000Z',
        updatedAt: '2025-05-18T17:09:04.000Z',
        regularUser: {
          firstName: 'Sofía',
          lastName: 'Moreno',
          profilePicture: 'uploads/profilePictures/22.webp',
          id: '00161b06-cbd0-454a-8f9f-250ceef0cc9c'
        },
        helperUser: {
          firstName: 'Laura',
          lastName: 'Martínez',
          profilePicture: '6.webp',
          id: '0014bbde-3ff6-4123-97bc-d83ab9c3f493'
        },
        lastMessage: {
          content: 'Hola'
        },
        unreadMessages: 1,
        messages: [
          {
            id: '7207abb5-5c0e-4e6b-8866-cfb46accaaf7',
            chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
            senderId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
            content: 'Hola',
            readAt: null,
            createdAt: '2025-05-18T15:09:04.000Z',
            updatedAt: '2025-05-18T15:09:04.000Z'
          }
        ]
      }
    ]
  }, [])

  const [loading, setLoading] = useState(true) // Estado de carga

  const [actualUser, setActualUser] = useState([])
  const [actualChat, setActualChat] = useState([])

  const [role, setRole] = useState('') // rol del propio usuario
  const [ownUserId, setOwnUserId] = useState('') // Id del propio usuario

  // Obtenemos rol e id del usuario
  useEffect(() => {
    // Obtenemos role del usuario de las cookies
    const ownUserId = getIdFromCookieClient()
    setOwnUserId(ownUserId)

    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  useEffect(() => {
    const simulateLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      setLoading(false)
    }

    simulateLoading()
  }, [])

  // useEffect para obtener userId (usuario del chat actual), actualChat y actualUser
  useEffect(() => {
    // Seleccionamos el userId
    const userId = searchParams.get('userId') || ''
    setUserId(userId)

    if (userId) {
      // Determinar la propiedad de usuario según el rol
      const userKey = role === 'helper' ? 'regularUser' : 'helperUser'

      // Buscar el chat correspondiente
      const chat = chats.find((chat) => chat[userKey].id === userId)

      if (chat) {
        setActualUser(chat[userKey])
        setActualChat(chat)
      }
      // Si no hay ningun usuario seleccionado, establecemos ambos en vacíos (útil para cuando retrocedemos)
    } else {
      setActualChat([])
      setActualUser([])
    }
  }, [role, userId, searchParams, chats])

  return (
    <>
      {/* Esqueleto de carga, si procede */}
      {loading && (
        <ChatSkeleton isUserSelected={userId !== ''} />
      )}

      {/* Contenido de chats */}
      {!loading && (
        <div
          className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white flex flex-row gap-x-4 sm:rounded-xl border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'
          style={{ height: 'calc(100dvh - 100px)' }}
        >

          <>
            {/* Lista de usuarios */}
            <ChatUsersList isUserSelected={userId !== ''} chats={chats} role={role} />

            {/* Contenedor de chats. Le pasamos los chats del chat context */}
            <ChatContainer isUserSelected={userId !== ''} actualChat={actualChat} actualUser={actualUser} ownUserId={ownUserId} />

          </>

        </div>
      )}
    </>

  )
}
