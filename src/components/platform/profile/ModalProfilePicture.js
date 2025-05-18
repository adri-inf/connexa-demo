/**
 * Componente Modal para manejar el cambio de imagen de perfil de un usuario
 */
import CropImage from '@/components/cropImages/CropImage'
import Button from '@/components/form/inputs/Button'
import { useNotification } from '@/context/notification'
import { ProfilePictureSchema } from '@/schemas/profilePicture'
import { userService } from '@/services/user'
import { getIdFromCookieClient } from '@/utils/sessionClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

export default function ModalProfilePicture ({ setShowProfilePictureModal, actualImgSrc }) {
  // Referencia al componente CropImage
  const cropImageRef = useRef()
  const { notify } = useNotification()

  // Configuración del formulario utilizando react-hook-form
  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(ProfilePictureSchema) // Usa Zod para validar si está habilitado
  })

  // Función para manejar el final del formulario
  const endProfilePicture = async (data) => {
    const file = data.profilePicture // Obtiene el archivo de la foto de perfil
    if (!file) {
      setShowProfilePictureModal(false)
      return
    }
    // Enviamos datos al backend
    try {
      const userId = getIdFromCookieClient()
      const result = await userService.sendProfilePicture(userId, file)
      if (result.success) {
        console.log('Respuesta del servidor:', result)
        // Agregamos foto al localstorage
        localStorage.setItem('profilePicturePath', result.profilePicturePath)
        window.location.reload()
      } else if (!result.success) {
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    } catch (error) {
      console.error(`Error: ${error.message}`)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor.', 'error')
    }
  }

  // Maneja el envío personalizado del formulario
  const handleCustomSubmit = async (event) => {
    event.preventDefault() // Evita el comportamiento predeterminado del formulario
    // Obtiene el archivo recortado desde el componente CropImage
    const croppedImageFile = await cropImageRef.current?.getCroppedFile()
    console.log(croppedImageFile) // Imprime el archivo recortado en consola
    setValue('profilePicture', croppedImageFile) // Actualiza el valor del formulario

    // Llama al manejador original de envío de react-hook-form
    handleSubmit(endProfilePicture)(event)
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-scroll'
      onClick={() =>
        setShowProfilePictureModal(false)}
    >
      <div
        className='lg:ml-64 relative w-full max-w-lg max-h-screen'
        onClick={(e) => e.stopPropagation()} // Para evitar propagaacion de cerrar modal
      >
        <div
          className='dark:border border-gray-700 m-2 lg:m-4 p-4 lg:p-8 flex flex-col justify-center shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative'
        >
          {/* Botón para cerrar */}
          <div className='flex justify-end'>
            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowProfilePictureModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <h2 className='text-center text-lg font-semibold mb-6'>
            Cambia tu foto de perfil
          </h2>

          <form onSubmit={handleCustomSubmit}>
            <CropImage defaultImgSrc={actualImgSrc} ref={cropImageRef} errors={errors.profilePicture} />

            <Button className='text-white dark:text-black bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover-dark font-medium rounded-lg text-md w-full px-5 py-2.5 text-center mt-8' type='submit' text='Cambiar' />
          </form>
        </div>
      </div>
    </div>
  )
}
