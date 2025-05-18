'use client'
import { useEffect } from 'react'

// Propiedad totalSlides después de la función HelpProfilePart
export function HelpSearchPart ({ setTitle, index }) {
  useEffect(() => {
    const titles = [
      'Búsqueda de asistentes',
      'Compatibilidad',
      'Visualizar perfil',
      'Contactar',
      'Contactar',
      'Contactar',
      'Favoritos',
      'Favoritos'
    ]
    setTitle(titles[index] || '')
  }, [index, setTitle])

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div
          key={i}
          className='min-w-full snap-center p-4 overflow-y-auto'
        >
          {i === 1 && (
            <>
              <img src='/help/search/search_1.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>🔍 Aquí puedes buscar y contactar con asistentes personales.</p>
                <p>📊 Aquí verás lo compatible que es el asistente contigo.</p>
                <p>⭐ Toca la estrella para que un asistente sea favorito.</p>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <img src='/help/search/search_2.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>📊 En cada asistente aparece un porcentaje.</p>
                <p>ℹ️ Ese número indica lo compatible que es el asistente personal contigo.</p>
              </div>
            </>
          )}
          {i === 3 && (
            <>
              <img src='/help/search/search_3.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>👤 Para ver el perfil de un asistente, toca su foto.</p>
              </div>
            </>
          )}
          {i === 4 && (
            <>
              <img src='/help/search/search_4.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2'>
                <p>📲 Para contactar, toca el botón <strong>Contactar</strong> junto al asistente.</p>
                <p>👤 También puedes contactar desde tu perfil.</p>
                <p>✅ Es recomendable elegir un asistente con alta compatibilidad.</p>
              </div>
            </>
          )}
          {i === 5 && (
            <>
              <img src='/help/search/search_5.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 3' />
              <div className='flex flex-col space-y-2 text-base'>
                <p> Tienes 3 opciones de contacto.</p>
                <p>• 💬 <strong>Iniciar chat:</strong> Empieza una conversación escrita.</p>
                <p>Puedes escribirle un mensaje, o esperar a que él empiece la conversación</p>
                <p>• 📧 <strong>Correo:</strong> Se comparte tu email para que te escriban.</p>
                <p>• 📞 <strong>Teléfono:</strong> Se comparte tu número para que te llamen.</p>
              </div>
            </>
          )}
          {i === 6 && (
            <>
              <img src='/help/search/search_6.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 4' />
              <div className='flex flex-col space-y-2'>
                <p>▶️ Después de elegir tu opción, toca <strong>Contactar</strong>.</p>
                <p>⏳ Solo puedes enviar una solicitud del mismo tipo a un asistente cada 11 días.</p>
              </div>
            </>
          )}
          {i === 7 && (
            <>
              <img src='/help/search/search_7.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 4' />
              <div className='flex flex-col space-y-2'>
                <p>⭐ Para guardar un asistente como favorito, toca la estrella en su tarjeta.</p>
                <p>⭐ También puedes marcarlo dentro de su perfil.</p>
              </div>
            </>
          )}
          {i === 8 && (
            <>
              <img src='/help/search/search_8.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 4' />
              <div className='flex flex-col space-y-2'>
                <p>⭐ Toca la estrella de arriba para ver a tus asistentes favoritos.</p>
                <p>✖️ Toca la estrella de arriba otra vez, para dejar de ver a tus asistentes favoritos.</p>
              </div>
            </>
          )}

        </div>
      ))}
    </>
  )
}

HelpSearchPart.totalSlides = 8
