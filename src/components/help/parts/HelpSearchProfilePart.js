'use client'
import { useEffect } from 'react'

// Propiedad totalSlides después de la función HelpProfilePart
export function HelpSearchProfilePart ({ setTitle, index }) {
  useEffect(() => {
    const titles = [
      'Perfil de asistente',
      'Compatibilidad',
      'Compatibilidad',
      'Contactar',
      'Contactar',
      'Contactar',
      'Favoritos'
    ]
    setTitle(titles[index] || '')
  }, [index, setTitle])

  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className='min-w-full snap-center p-4 overflow-y-auto'
        >
          {i === 1 && (
            <>
              <img src='/help/searchProfile/searchProfile_1.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>👤 Este es el perfil del asistente.</p>
                <p>📊 Aquí puedes ver la compatibilidad que tienen los asistentes personales contigo.</p>
                <p>👀 Puedes leer su información y comprobar si se ajusta a lo que buscas.</p>
                <p>✉️ Si te interesa, puedes mandar una solicitud de contacto.</p>
                <p>⭐ También puedes marcarlo como favorito para encontrarlo rápido después.</p>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <img src='/help/searchProfile/searchProfile_2.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>📊 En la parte superior aparece un porcentaje.</p>
                <p>ℹ️ Este número indica lo bien que encaja con tus necesidades en base a los datos de tu perfil.</p>
              </div>
            </>
          )}
          {i === 3 && (
            <>
              <img src='/help/searchProfile/searchProfile_3.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2'>
                <p>🔎 En cada parte de su perfil, verás un icono en la parte superior derecha correspondiente.</p>
                <p>📊 Ese icono muestra la compatibilidad de ese aspecto con tus preferencias.</p>
                <p className='flex items-center space-x-2'>
                  <span className='text-lg'>•</span>
                  <span className='inline-flex items-center rounded-full px-2 py-1 bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' />
                    </svg>
                  </span>
                  <span>
                    Es totalmente compatible.
                  </span>
                </p>

                <p className='flex items-center space-x-2'>
                  <span className='text-lg'>•</span>
                  <span className='inline-flex items-center rounded-full px-2 py-1 bg-yellow-100 text-yellow-800 dark:text-yellow-900 dark:bg-yellow-200'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75ZM9 15h6' />
                    </svg>
                  </span>
                  <span>
                    Es parcialmente compatible.
                  </span>
                </p>

                <p className='flex items-center space-x-2'>
                  <span className='text-lg'>•</span>
                  <span className='inline-flex items-center rounded-full px-2 py-1 bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' />
                    </svg>
                  </span>
                  <span>
                    Es incompatible.
                  </span>
                </p>
              </div>
            </>
          )}
          {i === 4 && (
            <>
              <img src='/help/searchProfile/searchProfile_4.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2'>
                <p>📲 Para contactar, toca el botón <strong>Contactar</strong> junto a la foto de perfil del asistente.</p>
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
              <img src='/help/searchProfile/searchProfile_7.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 4' />
              <div className='flex flex-col space-y-2'>
                <p>⭐ Para guardar un asistente como favorito, toca la estrella en la parte superior del perfil.</p>
                <p>⭐ Para ver tus asistentes favoritos, toca la estrella junto al buscador en la ventana <strong>Asistentes</strong>.</p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}

HelpSearchProfilePart.totalSlides = 7
