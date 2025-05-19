/**
 * Modal para editar las tasks en el perfil.
 */
import Button from '@/components/form/inputs/Button'
import CheckboxGroupInput from '@/components/form/inputs/CheckboxGroupInput'
import CheckboxInput from '@/components/form/inputs/CheckboxInput'
import { useNotification } from '@/context/notification'
import { FormSchema, tasksOptions, vehicleOption } from '@/schemas/form'
import { formService } from '@/services/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ModalEditTasks ({ setShowEditTasksModal, Icon, form, userId }) {
  const { notify } = useNotification()

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tasks: form.tasks,
      vehicle: form.vehicle
    },
    resolver: zodResolver(FormSchema) // Resolver para validación condicional
  })

  // Función para comparar dos arrays (checkboxes)
  const areArraysEqual = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2)
  }

  // En este caso, se envían ambos campos, ya que hay que comprobar si la tarea desplazamientos
  // en el vehiculo del asistente está seleccionada, y vehicle es true
  const endUptade = async (data) => {
    let modifiedFields = Object.entries(data).reduce((acc, [key, value]) => {
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
      notify('No se ha modificado nada.', 'info')
      setShowEditTasksModal(false)
    } else {
      // Si las tasks contienen desplazamientos en vehiculo, se debe mandar tambien el campo vehicle si no existe
      if (modifiedFields?.tasks?.includes('Desplazamientos en el vehículo personal del asistente') && !modifiedFields.vehicle) {
        modifiedFields = { ...modifiedFields, vehicle: form.vehicle }
      }

      // Enviamos datos al backend
      try {
        await formService.sendUpdatedForm(userId, modifiedFields)
        window.location.reload()
      } catch (error) {
        // Si hay algún fallo en la request, se muestra un error
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    }
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto'
      onClick={() =>
        setShowEditTasksModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-4xl max-h-screen'
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className='max-h-[85vh] overflow-auto m-2 lg:m-4 p-4 lg:p-8 flex flex-col shadow bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white relative dark:border border-gray-700'
        >
          {/* Botón para cerrar */}
          <div className='flex justify-end'>
            <button
              className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
              onClick={() =>
                setShowEditTasksModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-6 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Edita tus tareas y actividades</h2>
          </div>

          <form onSubmit={handleSubmit(endUptade)}>
            <CheckboxGroupInput
              bg
              label='¿Para qué necesitas un asistente personal?'
              options={tasksOptions}
              {...(errors.tasks ? { errors: errors.tasks } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('tasks')}
            />

            <CheckboxInput
              bg
              label='¿Necesitas que el asistente personal disponga de vehículo propio?'
              option={vehicleOption}
              {...(errors.vehicle ? { errors: errors.vehicle } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('vehicle')}
            />

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditTasksModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
                  Cancelar
                </button>
                <Button type='sumbit' text='Guardar' />
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}
