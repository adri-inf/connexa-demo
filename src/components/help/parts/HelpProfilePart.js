'use client'
import { useEffect } from 'react'

// Propiedad totalSlides después de la función HelpProfilePart
export function HelpProfilePart ({ setTitle, index }) {
  useEffect(() => {
    const titles = [
      'Perfil',
      'Cambiar foto de perfil',
      'Actualizar datos',
      'Actualizar datos'
    ]
    setTitle(titles[index] || '')
  }, [index, setTitle])

  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className='min-w-full snap-center p-4 overflow-y-auto'
        >
          {i === 1 && (
            <>
              <img src='/help/profile/profile_1.webp' className='mb-4 mx-auto w-[400px] border rounded-md' alt='Slide 1' />
              <div className='flex flex-col space-y-2 text-base'>
                <p>👤 Este es tu perfil.</p>
                <p>👁️ Solo lo verán los asistentes con los que hayas solicitado contactar.</p>
                <p>🖼️ Puedes cambiar tu foto de perfil.</p>
                <p>📝 También puedes actualizar tus datos personales, tus preferencias y tus necesidades.</p>
                <p>🔍 La información de tu perfil sirve para buscar asistentes adecuados para ti.</p>
              </div>
            </>
          )}
          {i === 2 && (
            <>
              <img src='/help/profile/profile_2.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 2' />
              <div className='flex flex-col space-y-2 text-base'>
                <p>🖼️ Para cambiar tu imagen de perfil, toca tu foto actual.</p>
                <p>📷 Después elige otra foto de tu móvil.</p>
                <p>👌 No es obligatorio tener una foto, pero es recomendable.</p>
              </div>
            </>
          )}
          {i === 3 && (
            <>
              <img src='/help/profile/profile_3.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 3' />
              <div className='flex flex-col space-y-2 text-base'>
                <p>🔄 Si quieres actualizar algún dato, primero búscalo en tu perfil.</p>
                <p>✏️ Luego toca el botón <strong>Editar</strong> que está al lado del texto para cambiarlo.</p>
              </div>
            </>
          )}
          {i === 4 && (
            <>
              <img src='/help/profile/profile_4.webp' className='mb-4 mx-auto w-[450px] border rounded-md' alt='Slide 4' />
              <div className='flex flex-col space-y-2 text-base'>
                <p>💾 Cuando termines de editar, toca <strong>Guardar</strong> para guardar los cambios.</p>
                <p>❌ Si cambias de idea y no quieres guardar, toca <strong>Cancelar</strong>.</p>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  )
}

HelpProfilePart.totalSlides = 4
