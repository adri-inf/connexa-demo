/**
 * Modal para editar la información personal en el perfil, como firstName, lastName, etc. (si el userRole es helper, habrá un campo adicional gender)
 * No incluye el email y la contraseña, ya que se editan desde los ajustes (requieren lógica y protección adicional)
 */
import Button from '@/components/form/inputs/Button'
import SelectInput from '@/components/form/inputs/SelectInput'
import TextInput from '@/components/form/inputs/TextInput'
import { useNotification } from '@/context/notification'
import { genderOptions, RegisterSchema } from '@/schemas/register'
import { userService } from '@/services/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ModalEditPersonalInfo ({ setShowEditPersonalInfoModal, userId, userRole, Icon, user }) {
  const { notify } = useNotification()

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(RegisterSchema), // Resolver para validación condicional
    defaultValues: {
      // Para que zod lo tenga en cuenta, pero no se modificarán.
    }
  })

  // Solo se envían los datos que han sido modificados
  const endUptade = async (data) => {
    // Comparar los datos originales (user) con los datos modificados (data)
    const modifiedFields = Object.entries(data).reduce((acc, [key, value]) => {
    // Agregar al objeto solo los campos que hayan cambiado
      if (value !== user[key]) {
        acc[key] = value
      }
      return acc
    }, {})

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios.')
      notify('No se ha modificado nada.', 'info')
      setShowEditPersonalInfoModal(false)
    } else {
      // Aquí puedes realizar la petición al servidor con los campos modificados
      console.log('Campos modificados:', modifiedFields)
      if (modifiedFields.gender) {
        modifiedFields.helperInfo = {} // Inicializamos helperInfo
        modifiedFields.helperInfo.gender = modifiedFields.gender
        delete modifiedFields.gender
      }
      // Enviamos datos al backend
      try {
        const result = await userService.sendUpdatedUser(userId, modifiedFields)
        console.log('Respuesta del servidor:', result)
        window.location.reload()
      } catch (error) {
        // console.error(`Error: ${error.message}`)
        // Si hay algún fallo en la request, se muestra un error
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    }
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center  max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto'
      onClick={() =>
        setShowEditPersonalInfoModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-2xl max-h-screen'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='m-2 lg:m-4 p-4 lg:p-8 flex flex-col justify-center shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative dark:border border-gray-700'
        >
          {/* Botón para cerrar */}
          <div className='flex justify-end'>
            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowEditPersonalInfoModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-6 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Edita tu información personal</h2>
          </div>

          <form onSubmit={handleSubmit(endUptade)}>
            <TextInput
              type='text'
              id='firstName'
              htmlFor='firstName'
              label='Nombre'
              defaultValue={user.firstName}
              {...(errors.firstName ? { errors: errors.firstName } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('firstName')}
            />

            <TextInput
              type='text'
              id='lastName'
              htmlFor='lastName'
              label='Apellidos'
              defaultValue={user.lastName}
              {...(errors.lastName ? { errors: errors.lastName } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('lastName')}
            />

            {userRole === 'helper' && (

              <SelectInput
                id='gender'
                htmlFor='gender'
                label='Género'
                options={genderOptions}
                defaultValue={user.helperInfo.gender}
                {...(errors.gender ? { errors: errors.gender } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('gender')}
              />

            )}

            <TextInput
              type='date'
              id='dateBirth'
              htmlFor='dateBirth'
              label='Fecha de nacimiento'
              defaultValue={user.dateBirth}
              {...(errors.dateBirth ? { errors: errors.dateBirth } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('dateBirth')}
            />

            <TextInput
              type='tel'
              id='phone'
              htmlFor='phone'
              label='Nº de teléfono'
              defaultValue={user.phone}
              {...(errors.phone ? { errors: errors.phone } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('phone')}
            />

            <TextInput
              type='text'
              id='address'
              htmlFor='address'
              label='Dirección'
              defaultValue={user.address}
              {...(errors.address ? { errors: errors.address } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('address')}
            />

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditPersonalInfoModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                  Cancelar
                </button>
                <Button type='submit' text='Guardar' />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
