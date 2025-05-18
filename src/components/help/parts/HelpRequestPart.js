'use client'
import { useEffect } from 'react'

// Propiedad totalSlides después de la función HelpProfilePart
export function HelpRequestPart ({ setTitle, index }) {
  useEffect(() => {
    const titles = [
      'Solicitudes',
      'Acceder al chat',
      'Visualizar perfil'
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
              <img src='/help/request/request_1.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>👤 Aquí puedes ver un registro de las solicitudes que has hecho.</p>
                <p>📅 Puedes ver la fecha en que realizaste cada solicitud.</p>
                <p>☎️ También puedes ver el método de contacto que elegiste</p>
                <p>🛠 Si quieres ver el perfil del asistente, toca su imagen.</p>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <img src='/help/request/request_2.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2'>
                <p>💬 Si tu solicitud es un chat, puedes abrirlo desde el botón en la parte superior derecha de la solicitud.</p>
                <p>🗂️ También puedes entrar al chat desde la ventana <strong>Chats</strong>.</p>
              </div>
            </>
          )}
          {i === 3 && (
            <>
              <img src='/help/request/request_3.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2'>
                <p>🛠  Si quieres ver el perfil del asistente, toca su imagen.</p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}

HelpRequestPart.totalSlides = 3
