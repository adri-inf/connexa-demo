/**
 * Modal para editar las preferencias de asistente en el perfil (exclusivo de regulars)
 */
import Button from '@/components/form/inputs/Button'
import CheckboxGroupInput from '@/components/form/inputs/CheckboxGroupInput'
import { agePreferenceOptions, FormSchema, genderPreferenceOptions } from '@/schemas/form'
import RadioButtonGroupInput from '@/components/form/inputs/RadioButtonGroupInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formService } from '@/services/form'
import { useNotification } from '@/context/notification'

export default function ModalEditHelperPreferences ({ setShowEditHelperPreferencesModal, Icon, form, userId }) {
  const { notify } = useNotification()

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      agePreference: form.formRegularInfo.agePreference,
      genderPreference: form.formRegularInfo.genderPreference

    },
    resolver: zodResolver(FormSchema) // Resolver para validación condicional
  })

  // Función para comparar dos arrays (checkboxes)
  const areArraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  // Solo se envían los datos que han sido modificados
  const endUptade = async (data) => {
    // Se comprueba tanto si es un checkboxGroup, como un campo individual (ya que en este form tenemos 2 campos distintos)
    const modifiedFields = Object.entries(data).reduce((acc, [key, value]) => {
      // Comparar si el valor es un array (checkbox group)
      if (Array.isArray(value)) {
        // Compara arrays de manera adecuada
        if (!areArraysEqual(value, form.formRegularInfo[key])) { acc[key] = value }
      } else if (value !== form.formRegularInfo[key]) { acc[key] = value } // Comparar si el valor es un campo select (valor único)
      return acc
    }, {})

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      notify('No se ha modificado nada.', 'info')
      setShowEditHelperPreferencesModal(false)
    } else {
      // Los metemos dentro de objeto formRegularInfo, ya que son camos exclusivos de este
      if (modifiedFields.agePreference) {
        modifiedFields.formRegularInfo = {} // Inicializamos helperInfo
        modifiedFields.formRegularInfo.agePreference = modifiedFields.agePreference
        delete modifiedFields.agePreference
      }
      if (modifiedFields.genderPreference) {
        modifiedFields.formRegularInfo = modifiedFields.formRegularInfo || {} // Inicializamos formRegularInfo solo si es undefined o null
        modifiedFields.formRegularInfo.genderPreference = modifiedFields.genderPreference
        delete modifiedFields.genderPreference
      }
      // Enviamos datos al backend
      try {
        await formService.sendUpdatedForm(userId, modifiedFields)
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
        setShowEditHelperPreferencesModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-2xl max-h-screen'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='max-h-[85vh] m-2 lg:m-4 p-4 lg:p-8 flex flex-col justify-center shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative dark:border border-gray-700'
        >
          {/* Botón para cerrar */}
          <div className='flex justify-end'>
            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowEditHelperPreferencesModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-6 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Edita tus preferencias de asistente</h2>
          </div>
          <form onSubmit={handleSubmit(endUptade)}>
            <CheckboxGroupInput
              bg
              label='¿Tienes alguna preferencia respecto a la edad del asistente?'
              options={agePreferenceOptions}
              {...(errors.agePreference ? { errors: errors.agePreference } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('agePreference')}
            />

            <RadioButtonGroupInput
              bg
              label='¿Tienes alguna preferencia respecto al género del asistente?'
              options={genderPreferenceOptions}
              {...(errors.genderPreference ? { errors: errors.genderPreference } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('genderPreference')}
            />

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditHelperPreferencesModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
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
