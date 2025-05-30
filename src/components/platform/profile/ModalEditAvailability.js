/**
 * Modal para editar la información personal en el perfil, como firstName, lastName, etc. (si el userRole es helper, habrá un campo adicional gender)
 * No incluye el email y la contraseña, ya que se editan desde los ajustes (requieren lógica y protección adicional)
 */
import Button from '@/components/form/inputs/Button'
import { useNotification } from '@/context/notification'
import { userService } from '@/services/user'

export default function ModalEditAvailability ({ setShowEditAvailabilityModal, user, Icon }) {
  const { notify } = useNotification()

  async function handleAvailableClick () {
    try {
      if (user.helperInfo.available) {
        await userService.sendUpdatedUser(user.id, {
          helperInfo: {
            available: false
          }
        })
      } else {
        await userService.sendUpdatedUser(user.id, {
          helperInfo: {
            available: true
          }
        })
      }

      window.location.reload()
    } catch (error) {
      console.error(`Error: ${error.message}`)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center  max-h-full inset-0 bg-gray-900 bg-opacity-50'
      onClick={() =>
        setShowEditAvailabilityModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='overflow-y-auto max-h-[85dvh] m-2 lg:m-4 p-4 lg:p-8 flex flex-col shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative dark:border border-gray-700'
        >
          {/* Botón para cerrar */}
          <div className='flex justify-end'>
            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowEditAvailabilityModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          <div className='mb-2 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2 className='text-base lg:text-lg'>Cambia tu disponibilidad</h2>
          </div>

          {user.helperInfo.available
            ? (
              <>
                <div
                  className='mt-2 flex-1 flex items-center p-2 py-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-300 dark:text-red-900'
                  role='alert'
                >
                  <svg
                    className='flex-shrink-0 inline w-4 h-4 me-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                  </svg>
                  <span className='sr-only'>Info</span>
                  {/* Text no wrap quizá es necesario */}
                  <span className='overflow-auto text-base lg:text-lg'>Tu estado cambiará a <span className='font-semibold'>'No disponible'</span>.</span>

                </div>

                <p className='mt-4'>No aparecerás en las búsquedas del resto de usuarios.</p>
                <p>Nadie podrá enviarte solicitudes de contacto.</p>

                <h1 className='text-lg lg:text-xl text-center mt-4 font-semibold'>¿Deseas continuar?</h1>
              </>
              )

            : (
              <>
                <div
                  className='mt-2 flex-1 flex items-center p-2 py-3 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-green-300 dark:text-green-900'
                  role='alert'
                >
                  <svg
                    className='flex-shrink-0 inline w-4 h-4 me-2'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                  </svg>
                  <span className='sr-only'>Info</span>
                  {/* Text no wrap quizá es necesario */}
                  <span className='overflow-auto text-base lg:text-lg'>Tu estado cambiará a <span className='font-semibold'>'Disponible'</span>.</span>

                </div>

                <p className='mt-4'>Aparecerás en las búsquedas del resto de usuarios.</p>
                <p>Podrán enviarte solicitudes de contacto.</p>

                <h1 className='text-lg lg:text-xl text-center mt-4 font-semibold'>¿Deseas continuar?</h1>
              </>
              )}

          <div className='pt-2 overflow-y-auto'>

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditAvailabilityModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                  Cancelar
                </button>
                <Button text='Aceptar' onClick={() => handleAvailableClick()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
