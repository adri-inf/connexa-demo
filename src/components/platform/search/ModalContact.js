/**
 * Componente Modal para manejar el contacto con un usuario,
 */
import { requestService } from '@/services/request.js'
import { useEffect, useState } from 'react'
import ModalContactSkeleton from './ModalContactSkeleton'
import { useRouter } from 'next/navigation'
import { getIdFromCookieClient } from '@/utils/sessionClient'
import { useNotification } from '@/context/notification'

export default function ModalContact ({ setShowContactModal, userId, firstName, compatibility }) {
  const router = useRouter() // Hook para acceder a la instancia del router
  const { notify } = useNotification()

  const [actualOption, setActualOption] = useState('chat') // Puede valer chat, email o phone
  // Estado para manejar icono cargando
  const [isLoading, setIsLoading] = useState(true)

  // Estado para manejar si la opción de email es seleccionable
  const [emailActive, setEmailActive] = useState(true)
  // Estado para manejar si la opción de teléfono es seleccionable
  const [phoneActive, setPhoneActive] = useState(true)

  // Estado para manejar los días restantes para que una solicitud de contacto email caduque
  const [emailDaysRemaining, setEmailDaysRemaining] = useState(0)
  // Estado para manejar los días restantes para que una solicitud de contacto phone caduque
  const [phoneDaysRemaining, setPhoneDaysRemaining] = useState(0)

  // Al hacer click en botón de contactar
  const handleContactClick = async () => {
    try {
      setIsLoading(true)
      const ownUserId = getIdFromCookieClient() // Id del usuario que lo solicuta
      const result = await requestService.sendRequest(ownUserId, { helperUserId: userId, type: actualOption })

      // Deshabilitamos opción phone, y calculamos días restantes de expiración de la solicitud
      if (actualOption === 'phone') {
        setPhoneActive(false)
        setPhoneDaysRemaining(formatDateToDDMMYYYY(result.data.expirationDate))

        notify(`Solicitud de contacto enviada a ${firstName}.`, 'success')
      }

      // Deshabilitamos opción email, y calculamos días restantes de expiración de la solicitud
      if (actualOption === 'email') {
        setEmailDaysRemaining(formatDateToDDMMYYYY(result.data.expirationDate))
        setEmailActive(false)
        notify(`Solicitud de contacto enviada a ${firstName}.`, 'success')
      }

      // Si la opción es chat, lo llevamos al chat del helper
      if (actualOption === 'chat') {
        // Si se ha creado un nuevo chat
        notify('Ya hay un chat iniciado con Pedro', 'info')

        router.push('/app/platform/chats?userId=bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6')
      }

      setActualOption('chat')
      setIsLoading(false)
    } catch (error) {
      notify('Ha ocurrido un fallo en el servidor', 'error')
      setIsLoading(false)
    }
  }

  // Se utilizará si hay que hacer el fetch de datos en el client side
  useEffect(() => {
    const fetchRequest = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setIsLoading(true)
        }, 100)

        const ownUserId = getIdFromCookieClient() // Id del usuario que lo solicuta
        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const request = await requestService.getAllRequestByHelperId(ownUserId, userId, true)
        // Actualizar los estados con los datos de la solicitud
        updateContactStates(request.data)

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setIsLoading(false)
      } catch (error) {
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
        setIsLoading(false)
      }
    }

    // Función para actualizar los estados basados en los datos de la solicitud
    const updateContactStates = (data) => {
      data.forEach((item) => {
        const isExpired = isDateBeforeNow(item.expirationDate)

        if (item.type === 'email') {
          setEmailDaysRemaining(formatDateToDDMMYYYY(item.expirationDate)) // Actualiza los días restantes para email

          if (isExpired) {
            setEmailActive(false) // Desactiva email si los días restantes son 0 o menos
          }
        } else if (item.type === 'phone') {
          setPhoneDaysRemaining(formatDateToDDMMYYYY(item.expirationDate)) // Actualiza los días restantes para teléfono
          if (isExpired) {
            setPhoneActive(false) // Desactiva teléfono si los días restantes son 0 o menos
          }
        }
      })
    }

    fetchRequest() // Ejecuta la función para obtener los usuarios desde el backend
  }, [userId]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  // Función para calcular los días restantes hasta la expiración
  // const calculateDaysRemaining = (expirationDate) => {
  //   const currentDate = new Date() // Fecha actual
  //   const expiration = new Date(expirationDate) // Fecha de expiración

  //   // Calcular los días restantes hasta la fecha de expiración
  //   const timeDifference = expiration - currentDate
  //   return Math.max(0, Math.floor(timeDifference / (1000 * 3600 * 24))) // Diferencia en días, asegurando que sea al menos 0
  // }

  function formatDateToDDMMYYYY (dateString) {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, '0') // Obtener el día y asegurar que tenga 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0') // Obtener el mes (0 es enero, así que sumamos 1)
    const year = date.getFullYear() // Obtener el año completo

    return `${day}/${month}/${year}` // Devolver el formato DD/MM/YYYY
  }

  function isDateBeforeNow (dateString) {
    const givenDate = new Date(dateString) // Convertir la fecha proporcionada a objeto Date
    const currentDate = new Date() // Obtener la fecha y hora actuales

    return givenDate > currentDate // Comparar si la fecha proporcionada es mayor que la actual
  }

  return (
    <>
      <div
        className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full  max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto'
        onClick={() =>
          setShowContactModal(false)}
      >
        <div
          className='lg:ml-64 relative w-full max-w-lg max-h-screen'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='max-h-[85vh] m-4 p-6 flex flex-col justify-center bg-white rounded-lg shadow dark:bg-gray-800 dark:border border-gray-700 text-black dark:text-white relative'>

            {/* Botón para cerrar */}
            <div className='flex justify-end'>
              <button
                className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
                onClick={() =>
                  setShowContactModal(false)}
              >

                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                  <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
                </svg>

              </button>
            </div>

            {/* Contenido principal del modal */}
            <h2 className='text-center text-lg font-semibold mb-6'>
              ¿Cómo quieres contactar con {firstName}?
            </h2>

            {/* Si no se está cargando nada, cargamos contenido */}
            {!isLoading && (
              <>
                {compatibility < 34
                  ? (
                    <div className='mb-4 bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900 text-center'>
                      <span>Aviso: Este asistente personal no es compatible</span>
                    </div>
                    )
                  : compatibility < 67
                    ? (
                      <div className='mb-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900 text-center'>
                        <span>Aviso: Este asistente no es totalmente compatible</span>
                      </div>
                      )
                    : null}

                {/* Botones de opciones */}
                <div className='flex flex-col gap-y-4'>
                  {/* Botón: Iniciar chat */}
                  <button
                    className={`flex items-center gap-x-3 py-3 px-4 w-full rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                    ${actualOption === 'chat' && 'ring-2 ring-primary dark:ring-primary-dark'}`}
                    onClick={() => { setActualOption('chat') }}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z' />
                    </svg>
                    <div className='text-left flex flex-col items-start'>
                      <span className='text-left font-semibold'>Iniciar chat</span>
                      <span className='text-left text-sm'>Opción recomendada</span>
                    </div>
                  </button>

                  {/* Botón: Contactar por correo */}
                  <div className='relative'>
                    <button
                      className={`flex items-center gap-x-3 py-3 px-4 w-full rounded-lg 
                      ${emailActive
                        ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        : 'bg-gray-300 dark:bg-gray-700 opacity-50 blur-[2px]'}
                      ${actualOption === 'email' && emailActive && 'ring-2 ring-primary dark:ring-primary-dark'}`}
                      onClick={emailActive ? () => setActualOption('email') : undefined}
                      disabled={!emailActive}
                    >
                      {/* SVG del ícono */}
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                        />
                      </svg>

                      {/* Contenido del botón */}
                      <div className='text-left flex flex-col items-start'>
                        <span className='font-semibold'>Contactar por correo</span>
                        <small className='text-sm font-semibold text-yellow-500 dark:text-yellow-200'>
                          Enviaremos tu email al asistente.
                        </small>
                        <small className='text-sm text-black dark:text-white'>
                          El asistente enviará un correo a tu dirección.
                        </small>
                      </div>
                    </button>

                    {/* Overlay con mensaje cuando no está activo */}
                    {!emailActive && (
                      <div className='absolute inset-0 p-4 flex flex-col justify-center bg-black/60 text-white text-md font-semibold rounded-lg'>
                        <span>Solicitud de contacto por email enviada.</span>
                        <span>Disponible de nuevo el {emailDaysRemaining}.</span>
                      </div>
                    )}
                  </div>

                  {/* Botón: Contactar por teléfono */}
                  <div className='relative'>
                    <button
                      className={`flex items-center gap-x-3 py-3 px-4 w-full rounded-lg 
                      ${phoneActive
                        ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                        : 'bg-gray-300 dark:bg-gray-700 opacity-50 blur-[2px]'}
                      ${actualOption === 'phone' && phoneActive && 'ring-2 ring-primary dark:ring-primary-dark'}`}
                      onClick={phoneActive ? () => setActualOption('phone') : undefined}
                      disabled={!phoneActive}
                    >
                      {/* SVG del ícono */}
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z'
                        />
                      </svg>

                      {/* Contenido del botón */}
                      <div className='text-left flex flex-col items-start'>
                        <span className='font-semibold'>Contactar por teléfono</span>
                        <small className='text-sm font-semibold text-yellow-500 dark:text-yellow-200'>
                          Enviaremos tu teléfono al asistente.
                        </small>
                        <small className='text-sm text-black dark:text-white'>
                          El asistente se pondrá en contacto contigo por teléfono.
                        </small>
                      </div>
                    </button>

                    {/* Overlay con mensaje cuando no está activo */}
                    {!phoneActive && (
                      <div className='absolute inset-0 p-4 flex flex-col justify-center bg-black/60 text-white text-md font-semibold rounded-lg'>
                        <span>Solicitud de contacto por teléfono enviada.</span>
                        <span>Disponible de nuevo el {phoneDaysRemaining}.</span>
                      </div>
                    )}
                  </div>

                </div>

                {/* Botón Contactar */}
                <button
                  className='mt-6 py-3 px-6 w-full text-lg text-white rounded-lg bg-green-700 hover:bg-green-800 dark:bg-green-500 dark:hover:bg-green-600'
                  onClick={handleContactClick}
                >
                  Contactar
                </button>
              </>
            )}

            {/* Si se está cargando algo, esqueleto */}
            {isLoading && (
              <ModalContactSkeleton />
            )}

          </div>
        </div>
      </div>

    </>

  )
}
