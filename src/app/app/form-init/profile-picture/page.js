/**
 * Página para subir una foto de perfil en el registro.
 * Tras hacerlo, lleva a /app/form-init
 */
'use client'
import LogoHeader from '@/components/form/LogoHeader'
import { useForm } from 'react-hook-form'
import { ProfilePictureSchema } from '@/schemas/profilePicture'
import { zodResolver } from '@hookform/resolvers/zod'
import CropImage from '@/components/cropImages/CropImage'
import Button from '@/components/form/inputs/Button'
import StepTitle from '@/components/form/StepTitle'
import { useRef, useEffect, useState } from 'react'
import { userService } from '@/services/user'
import { useRouter } from 'next/navigation'
import FormContainer from '@/components/form/FormContainer'
import { getIdFromCookieClient, getRoleFromCookieClient } from '@/utils/sessionClient'
import { useNotification } from '@/context/notification'

export default function FormProfilePicturePage ({ params }) {
  // Comprueba si las validaciones están habilitadas según el entorno
  const isValidationEnabled = process.env.NEXT_PUBLIC_COMPATIBILITY_FORM_VALIDATION === 'true'
  // Obtenemos el role. En función del valor, renderizamos una page u otra
  const [role, setRole] = useState('')
  // Referencia al componente CropImage
  const cropImageRef = useRef()
  // Para redirecciones
  const router = useRouter()
  const { notify } = useNotification()

  // Obtener role de cookies y el userId
  useEffect(() => {
    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  // Configuración del formulario utilizando react-hook-form
  const { handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: isValidationEnabled ? zodResolver(ProfilePictureSchema) : undefined // Usa Zod para validar si está habilitado
  })

  // Función para manejar el final del formulario
  const endProfilePicture = async (data) => {
    const file = data.profilePicture // Obtiene el archivo de la foto de perfil
    if (!file) {
      router.push('/app/form-init')
      return
    }
    // Enviamos datos al backend
    try {
      const userId = getIdFromCookieClient()
      const result = await userService.sendProfilePicture(userId, file)
      if (result.success) {
        router.push('/app/form-init')
      } else if (!result.success) {
        notify('Ha ocurrido un fallo en el servidor', 'error')
      }
    } catch (error) {
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  // Maneja el envío personalizado del formulario
  const handleCustomSubmit = async (event) => {
    event.preventDefault() // Evita el comportamiento predeterminado del formulario

    // Obtiene el archivo recortado desde el componente CropImage
    const croppedImageFile = await cropImageRef.current?.getCroppedFile()
    setValue('profilePicture', croppedImageFile) // Actualiza el valor del formulario

    // Llama al manejador original de envío de react-hook-form
    handleSubmit(endProfilePicture)(event)
  }

  return (
    <FormContainer>
      <LogoHeader isLink />

      <form onSubmit={handleCustomSubmit}>
        <StepTitle text='Foto de perfil' />

        <p className='mt-5 mb-10 dark:text-white'>
          {role === 'helper'
            ? 'Recomendamos subir una foto de perfil. Será útil para que las personas con TEA.'
            : 'Opcionalmente puedes subir una foto de perfil. Solo podrán verla los asistentes con los que decidas contactar.'}
        </p>

        <CropImage ref={cropImageRef} errors={errors.profilePicture} />

        <Button className='text-white dark:text-black bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover-dark font-medium rounded-lg text-md w-full px-5 py-2.5 text-center mt-14' type='submit' text='Siguiente' />
      </form>
    </FormContainer>
  )
}
