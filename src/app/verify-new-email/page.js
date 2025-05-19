'use client'
import { userService } from '@/services/user'
import { getIdFromCookieClient } from '@/utils/sessionClient'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyNewEmailPage () {
  const searchParams = useSearchParams()
  const newEmailToken = searchParams.get('token')
  const [loading, setLoading] = useState(true)
  const [emailUpdated, setEmaiUpdated] = useState(false)

  // Se utilizará si hay que hacer el fetch de datos en el client side
  useEffect(() => {
    const verifyEmail = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)
        const userId = getIdFromCookieClient()
        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const data = await userService.verifyNewUserEmail(userId, newEmailToken)
        if (data.status === 200) {
          setEmaiUpdated(true)
        }

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setLoading(false)
      } catch (error) {
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
        setLoading(false)
      }
    }

    verifyEmail() // Ejecuta la función para obtener los usuarios desde el backend
  }, [newEmailToken]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  return (
    <div className='mt-10 flex flex-col items-center min-h-screen dark:text-white px-6'>
      <div className='p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700'>
        {loading && (
          <div className='flex flex-col items-center space-y-4'>
            <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin' />
            <p>Verificando tu correo...</p>
          </div>
        )}

        {!loading && emailUpdated === true && (
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-green-600 dark:text-green-300'>¡Correo verificado correctamente!</h2>
            <p>Tu nueva dirección de email está activa.</p>
            <p>Puedes cerrar esta ventana.</p>
            <p className='font-bold'>Si los cambios no se ven en tu perfil, actualiza la página</p>
          </div>
        )}

        {!loading && emailUpdated === false && (
          <div className='space-y-2'>
            <h2 className='text-2xl font-semibold text-red-600 dark:text-red-300'>Error al verificar</h2>
            <p>El enlace puede haber expirado o ser inválido.</p>
          </div>
        )}
      </div>
    </div>
  )
}
