/**
 * Modal para editar la información personal en el perfil, como firstName, lastName, etc. (si el userRole es helper, habrá un campo adicional gender)
 * No incluye el email y la contraseña, ya que se editan desde los ajustes (requieren lógica y protección adicional)
 */
import Button from '@/components/form/inputs/Button'
import TextInput from '@/components/form/inputs/TextInput'
import { useNotification } from '@/context/notification'
import { RegisterSchema } from '@/schemas/register'
import { userService } from '@/services/user'
import { logoutClick } from '@/utils/sessionClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function ModalEditCredentials ({ setShowEditCredentialsModal, userId, Icon, user }) {
  const [index, setIndex] = useState(0)
  const router = useRouter()
  const { notify } = useNotification()

  // Para manejar el estado de la existencia del email
  const [emailExists, setEmailExists] = useState(false) // Estado para verificar si el email ya existe
  const emailError = {
    message: 'Este email ya está registrado'
  }

  // Configuración de react-hook-form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(RegisterSchema), // Resolver para validación condicional
    defaultValues: {
      // Para que zod lo tenga en cuenta, pero no se modificarán.
      dateBirth: user.dateBirth
    }
  })

  // Solo se envían los datos que han sido modificados
  const endUptadeEmail = async (data) => {
    // Si el email ya existe, no se envía la petición
    if (emailExists) { return }
    // Comparar los datos originales (user) con los datos modificados (data)
    const modifiedFields = {}
    if (user.email !== data.email) { modifiedFields.email = data.email }

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios.')
      notify('No se ha modificado nada.', 'info')
      setShowEditCredentialsModal(false)
    } else {
      // Aquí puedes realizar la petición al servidor con los campos modificados
      console.log('Campos modificados:', modifiedFields)
      // Enviamos datos al backend
      try {
        const response = await userService.sendUpdatedUserEmail(userId, modifiedFields)
        if (response.status === 200) {
          notify(`Se ha enviado email de verificación a ${user.email}.`, 'success')
          setShowEditCredentialsModal(false)
        }
      } catch (error) {
        // console.error(`Error: ${error.message}`)
        // Si hay algún fallo en la request, se muestra un error
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    }
  }

  // Solo se envían los datos que han sido modificados
  const endUptadePassword = async (data) => {
    // Comparar los datos originales (user) con los datos modificados (data)
    const modifiedFields = {}
    if (data.password) { modifiedFields.password = data.password }

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios.')
      notify('No se ha modificado nada.', 'info')
      setShowEditCredentialsModal(false)
    } else {
      // Aquí puedes realizar la petición al servidor con los campos modificados
      console.log('Campos modificados:', modifiedFields)
      // Enviamos datos al backend
      try {
        const response = await userService.sendUpdatedUserPassword(userId, modifiedFields)
        if (response.status === 200) {
          notify('Se ha actualizado la contraseña.', 'success')
          setShowEditCredentialsModal(false)
        }
      } catch (error) {
        // console.error(`Error: ${error.message}`)
        // Si hay algún fallo en la request, se muestra un error
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    }
  }

  const deleteAccount = async () => {
    try {
      const result = await userService.deleteUser(userId)
      if (result.status === 200) {
        logoutClick(router)
      }
    } catch (error) {
      notify('Ha ocurrido un fallo en el servidor.', 'error')
    }
  }

  const backBtnClick = () => {
    reset()
    setIndex(0)
  }

  // Maneja el evento de pérdida de foco en el campo de email
  const handleEmailBlur = async (e) => {
    const email = e.target.value.trim()

    // Expresión regular simple para validar email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (isValidEmail) {
      try {
        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const response = await userService.emailExists(email)
        const exists = response.response.exists
        if (exists) {
          setEmailExists(true)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center  max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto'
      onClick={() =>
        setShowEditCredentialsModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-xl max-h-screen'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='m-2 lg:m-4 min-h-[390px] p-4 lg:p-8 flex flex-col justify-start shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative dark:border border-gray-700'
        >
          {/* Botón para cerrar */}
          <div className={`flex ${index > 0 ? 'justify-between' : 'justify-end'}`}>

            {index > 0 && (
              <button
                className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
                onClick={backBtnClick}
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                </svg>
              </button>
            )}

            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowEditCredentialsModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-6 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Ajustes avanzados</h2>
          </div>

          {index === 0 && (
            <div className='mt-5 flex flex-col gap-4'>
              <Button onClick={() => { setIndex(2) }} text='Cambiar email' />
              <Button onClick={() => { setIndex(3) }} text='Cambiar contraseña' />
              <Button
                className='text-white dark:text-black bg-red-600 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500 font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'
                onClick={() => { setIndex(4) }} text='Eliminar cuenta'
              />
            </div>
          )}

          {index === 2 && (
            <form className='flex-1 flex flex-col justify-between' autoComplete='off' onSubmit={handleSubmit(endUptadeEmail)}>
              <TextInput
                type='text'
                id='email'
                htmlFor='email'
                label='Email'
                defaultValue={user.email}
                disabled
              />

              <TextInput
                type='text'
                id='nemail'
                htmlFor='nemail'
                label='Nuevo email'
                {...(emailExists ? { errors: emailError } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...(errors.email ? { errors: errors.email } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('email', {
                  onBlur: handleEmailBlur,
                  onChange: () => setEmailExists(false) // Borra el error al cambiar el valor
                })}
              />

              <div className='flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300' role='alert'>
                <svg className='shrink-0 inline w-4 h-4 me-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                </svg>
                <span className='sr-only'>Info</span>
                <div>
                  Se enviará un correo al nuevo email para verificarlo.
                </div>
              </div>

              <div className='flex justify-end mt-8'>
                <div className='w-auto flex flex-row gap-x-3'>
                  <button onClick={() => { setShowEditCredentialsModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                    Cancelar
                  </button>
                  <Button type='submit' text='Guardar' />
                </div>
              </div>
            </form>
          )}

          {index === 3 && (
            <form className='flex-1 flex flex-col justify-between' autoComplete='off' onSubmit={handleSubmit(endUptadePassword)}>
              <TextInput
                type='password'
                autoComplete='off'
                id='password'
                htmlFor='password'
                label='Nueva contraseña'
                {...(errors.password ? { errors: errors.password } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('password')}
              />

              <TextInput
                type='password'
                id='confirmPassword'
                autoComplete='off'
                htmlFor='confirmPassword'
                label='Confirmar nueva contraseña'
                {...(errors.confirmPassword ? { errors: errors.confirmPassword } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('confirmPassword')}
              />

              <div className='flex justify-end mt-8'>
                <div className='w-auto flex flex-row gap-x-3'>
                  <button onClick={() => { setShowEditCredentialsModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                    Cancelar
                  </button>
                  <Button type='submit' text='Guardar' />
                </div>
              </div>
            </form>
          )}

          {index === 4 && (
            <div className='flex-1 flex flex-col justify-between'>
              <p className='text-center text-lg'>¿Seguro que quieres eliminar tu cuenta?</p>

              <Button
                className='text-white font-semibold dark:text-black bg-red-600 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500 rounded-lg text-md w-full px-5 py-2.5 text-center'
                onClick={deleteAccount} text='Si, eliminar cuenta'
              />

              <div className='flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
                <svg className='shrink-0 inline w-4 h-4 me-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                </svg>
                <span className='sr-only'>Info</span>
                <div>
                  No podrás recuperar tu cuenta después de eliminarla.
                </div>
              </div>

              <div className='flex justify-end mt-8'>
                <div className='w-auto flex flex-row gap-x-3'>
                  <button onClick={() => { setShowEditCredentialsModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
