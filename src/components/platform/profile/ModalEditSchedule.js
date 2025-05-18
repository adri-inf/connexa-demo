/**
 * Modal para editar las localidades y los horarios en el perfil.
 */
import Button from '@/components/form/inputs/Button'
import CheckboxGroupInput from '@/components/form/inputs/CheckboxGroupInput'
import { useNotification } from '@/context/notification'
import { daysOfWeekOptions, FormSchema, timeOfDayOptions } from '@/schemas/form'
import { formService } from '@/services/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ModalEditSchedule ({ setShowEditScheduleModal, Icon, form, userId }) {
  const { notify } = useNotification()

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      daysOfWeek: form.daysOfWeek,
      timeOfDay: form.timeOfDay

    },
    resolver: zodResolver(FormSchema) // Resolver para validación condicional
  })

  // Función para comparar dos arrays (checkboxes)
  const areArraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  // Solo se envían los datos que han sido modificados
  const endUptade = async (data) => {
    const modifiedFields = Object.entries(data).reduce((acc, [key, value]) => {
      // Comparar arrays de manera adecuada
      if (Array.isArray(value)) {
        if (!areArraysEqual(value, form[key])) {
          acc[key] = value
        }
      } else {
        // Comparar otros tipos de valores (por ejemplo, strings, números)
        if (value !== form[key]) {
          acc[key] = value
        }
      }
      return acc
    }, {})

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios.')
      notify('No se ha modificado nada.', 'info')
      setShowEditScheduleModal(false)
    } else {
      console.log('Campos modificados:', modifiedFields)
      // Enviamos datos al backend
      try {
        const result = await formService.sendUpdatedForm(userId, modifiedFields)
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
        setShowEditScheduleModal(false)}
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
                setShowEditScheduleModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-6 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Edita tu ubicación y horario</h2>
          </div>
          <form onSubmit={handleSubmit(endUptade)}>
            {/* <CheckboxGroupInput
              bg
              label='¿En qué provincia necesitarás al asistente?'
              options={locationsOptions}
              {...(errors.locations ? { errors: errors.locations } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('locations')}
            /> */}

            <CheckboxGroupInput
              bg
              label='¿Qué días de la semana necesitarás al asistente?'
              options={daysOfWeekOptions}
              {...(errors.daysOfWeek ? { errors: errors.daysOfWeek } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('daysOfWeek')}
            />

            <CheckboxGroupInput
              bg
              label='En general, ¿En qué franja horaria necesitarás al asistente?'
              options={timeOfDayOptions}
              {...(errors.timeOfDay ? { errors: errors.timeOfDay } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('timeOfDay')}
            />

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditScheduleModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
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
