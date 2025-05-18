'use client'
import { useEffect } from 'react'

// Propiedad totalSlides después de la función HelpProfilePart
export function HelpChatPart ({ setTitle, index }) {
  useEffect(() => {
    const titles = [
      'Chat',
      'Iniciar un chat',
      'Iniciar un chat'
    ]
    setTitle(titles[index] || '')
  }, [index, setTitle])

  return (
    <>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='min-w-full snap-center p-4 overflow-y-auto'
        >
          {i === 1 && (
            <>
              <img src='/help/chat/chat_1.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>💬 Estos son tus chats.</p>
                <p>👥 Aquí puedes hablar con asistentes personales.</p>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <img src='/help/chat/chat_2.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2'>
                <p>🔍 Si quieres empezar un chat nuevo, primero tienes que buscar un asistente desde la ventana <strong>Asistentes</strong>.</p>
                <p>📲 Cuando veas el asistente que te interesa, toca el botón que dice <strong>Contactar</strong>.</p>
              </div>
            </>
          )}
          {i === 3 && (
            <>
              <img src='/help/chat/chat_3.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 3' />
              <div className='flex flex-col space-y-2 text-base'>
                <p>➡️ Después, verás un botón que dice <strong>Iniciar chat</strong>.</p>
                <p>✅ Selecciona ese botón y pulsa <strong>Contactar</strong> para empezar a hablar con el asistente.</p>
              </div>
            </>
          )}

        </div>
      ))}
    </>
  )
}

HelpChatPart.totalSlides = 3
