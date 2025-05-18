/**
 * Modal para editar las localidades y los horarios en el perfil.
 */
import Button from '@/components/form/inputs/Button'
import RangeStepsInput from '@/components/form/inputs/RangeStepsInput'
import SelectInput from '@/components/form/inputs/SelectInput'
import { FormSchema, ratioOptions } from '@/schemas/form'
import { formService } from '@/services/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { locations } from '@/data/locations'
import dynamic from 'next/dynamic'
import { useNotification } from '@/context/notification'
const Map = dynamic(() => import('@/components/map/Map.js'), { ssr: false }) // Importamos en el cliente, cuando hay window. Si no, da error.

export default function ModalEditLocation ({ setShowEditLocationModal, Icon, form, userId }) {
  const { notify } = useNotification()
  // Municipios
  const [locationOptions, setLocationOptions] = useState([]) // Opciones de municipios
  const [selectedLocation, setSelectedLocation] = useState([]) // Municipio seleccionado

  // Adaptamos municipios
  useEffect(() => {
    // Aquí mapeamos para obtener las opciones en el formato correcto
    const options = [
      { value: '', label: 'Selecciona un municipio' }, // Opción predeterminada
      ...locations.map(location => ({
        value: location.Municipio, // El valor será el nombre del municipio
        label: location.Municipio // El label también será el nombre del municipio
      }))
    ]
    setLocationOptions(options)
  }, [])

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      location: form.location,
      formHelperInfo: {
        ratio: 0 // Aquí defines el valor por defecto para ratio
      }
    },
    resolver: zodResolver(FormSchema) // Resolver para validación condicional
  })

  const locationValue = watch('location')
  const ratioValue = watch('formHelperInfo.ratio')

  // Convertimos ratio de realValue a value
  useEffect(() => {
    // Solo si hay formHelperInfo
    if (form.formHelperInfo) {
      // Buscar el objeto correspondiente al valor de form.formHelperInfo.ratio
      const ratioObj = ratioOptions.find(option => option.realValue === Number(form.formHelperInfo.ratio))
      setValue('formHelperInfo.ratio', (ratioObj.value).toString())
    }
  }, [form, setValue])

  // Observa cada cambio en el municipio
  useEffect(() => {
    setSelectedLocation(locationValue)
    // Obtener la location de locations mediante el nombre del municipio
    const foundLocation = locations.find(
      (loc) => loc.Municipio === locationValue
    )
    setSelectedLocation(foundLocation)
    console.log(foundLocation)
  }, [locationValue])

  // Solo se envían los datos que han sido modificados
  const endUpdate = async (data) => {
    // Obtenemos el realValue del ratio
    const newRatio = (ratioOptions.find(option => option.value === Number(ratioValue))).realValue
    // Creamos objeto
    const modifiedFields = {}

    // Comprobamos las condiciones y agregamos los campos modificados, si estos han cambiado.
    // Solo si es un helper
    if (form.formHelperInfo && (Number(newRatio) !== Number(form.formHelperInfo.ratio))) {
      modifiedFields.formHelperInfo = {
        ...modifiedFields.formHelperInfo, // Para no sobrescribir otros valores dentro de formHelperInfo
        ratio: Number(newRatio) // Asignamos el nuevo ratio
      }
    }

    if (locationValue !== form.location) {
      modifiedFields.location = locationValue // Asignamos el nuevo valor de location
    }

    console.log('Los campos modificados son', modifiedFields) // Verifica el resultado

    // Si no se modificó ningún campo, puedes manejarlo de forma específica
    if (Object.keys(modifiedFields).length === 0) {
      console.log('No se han realizado cambios.')
      notify('No se ha modificado nada.', 'info')
      setShowEditLocationModal(false)
    } else {
      console.log('Campos modificados:', modifiedFields)
      // Enviamos datos al backend
      try {
        const result = await formService.sendUpdatedForm(userId, modifiedFields)
        console.log('Respuesta del servidor:', result)
        window.location.reload()
      } catch (error) {
        // console.error(`Error: ${error.message}`)
        notify('Ha ocurrido un fallo en el servidor.', 'error')
      }
    }
  }

  return (
    <div
      className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center  max-h-full inset-0 bg-gray-900 bg-opacity-50 overflow-y-auto'
      onClick={() =>
        setShowEditLocationModal(false)}
    >
      <div
        className='lg:ml-64 w-full max-w-4xl max-h-screen'
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
                setShowEditLocationModal(false)}
            >

              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='size-5'>
                <path d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z' />
              </svg>

            </button>
          </div>

          {/* Contenido principal del modal */}
          <div className='mb-9 flex justify-center gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
            <Icon />
            <h2>Edita tu ubicación y horario</h2>
          </div>
          <form onSubmit={handleSubmit(endUpdate)}>
            <SelectInput
              label='¿En qué municipio te encuentras?'
              options={locationOptions}
              value={locationValue}
              bg
              {...(errors.location ? { errors: errors.location } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('location')}
            />

            {form.formHelperInfo && (
              <RangeStepsInput
                label='¿A qué distancia estás dispuesto a desplazarte?'
                min={0}
                max={70}
                bg
                step={10}
                options={ratioOptions}
                {...(errors.ratio ? { errors: errors.ratio } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('formHelperInfo.ratio')}
                value={ratioValue}
              />
            )}

            {/* Solo cargar en el navegador, ya que da errores */}
            {typeof window !== 'undefined' && (
              <div className='mt-8'>
                <Map lat={selectedLocation?.Latitud || 38.98461352409418} lon={selectedLocation?.Longitud || -3.9281660868497967} radius={(ratioValue || 0) * 1000} />
              </div>
            )}

            <div className='flex justify-end mt-8'>
              <div className='w-auto flex flex-row gap-x-3'>
                <button onClick={() => { setShowEditLocationModal(false) }} className='text-primary hover:text-primary-hover hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-primary-dark hover:dark:text-primary-hover-dark shadow-[inset_0_0_0_2px_theme(colors.primary)] hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover)] dark:shadow-[inset_0_0_0_2px_theme(colors.primary-dark)] dark:hover:shadow-[inset_0_0_0_2px_theme(colors.primary-hover-dark)] font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'>
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
