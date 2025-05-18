// Componente que renderiza los mensajes. ownUserId es el id del usuario actual, el que está usando la app
import { useEffect, useRef } from 'react'

export default function ChatMessages ({ messages, ownUserId }) {
  const bottomRef = useRef(null) // Referencia para el final del contenedor

  useEffect(() => {
    // Desplazar el scroll directamente hacia abajo sin animación
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' }) // Sin animación
    }
  }, [messages]) // Ejecuta el efecto cada vez que los mensajes cambian

  return (
    <div className='flex flex-col gap-4 p-4 overflow-y-auto overflow-x-hidden h-full'>
      {messages &&
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex   leading-1.5 w-auto ${
              message.senderId === ownUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg w-fit max-w-[80%] shadow break-words ${
                message.senderId === ownUserId
                  ? 'bg-primary dark:bg-primary-dark text-white dark:text-black'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      {/* Elemento invisible al final para mantener el scroll */}
      <div ref={bottomRef} />
    </div>
  )
}
