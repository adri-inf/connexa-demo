import { generateImgSrc } from '@/utils/profilePictures'
import { useRouter } from 'next/navigation'

/**
 * Componente que representa una Card de un usuario en el chat.
 */
export default function ChatUserCard ({ id, firstName, lastName, lastMessage, profilePicture, unreadMessages }) {
  const router = useRouter() // Hook para acceder a la instancia del router

  const handleCardClick = (event) => {
    router.push(`/app/platform/chats?userId=${event.currentTarget.id}`, { shallow: true })
  }

  return (
    <div
      onClick={handleCardClick}
      className='p-2 text-gray-900 rounded-lg dark:border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-white hover:cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-600'
      id={id}
    >
      <div className='flex flex-row gap-x-4 items-center'>
        <img className='h-11 w-11 rounded-full' src={generateImgSrc(profilePicture)} alt='user image' />
        <div className='flex flex-col overflow-hidden'>
          <span className='font-semibold truncate'>
            {firstName} {lastName}
          </span>

          <span className='text-sm text-nowrap text-ellipsis overflow-hidden'>
            {lastMessage}
          </span>

        </div>

        {/* Contador de mensajes no leídos */}
        {unreadMessages > 0 && (
          <div className='flex-1 flex items-end'>
            <div className='ml-auto flex justify-center items-center bg-primary dark:bg-primary-dark text-white dark:text-black text-xs font-semibold h-6 w-6 rounded-full'>
              {unreadMessages}
            </div>
          </div>

        )}
      </div>

    </div>
  )
}
