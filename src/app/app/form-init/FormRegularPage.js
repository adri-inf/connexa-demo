/**
 * Página de formulario para usuarios regular.
 * Tras completarlo, lleva a /app
 */
'use client'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FormSchema, agePreferenceOptions, daysOfWeekOptions, genderPreferenceOptions, tasksOptions, timeOfDayOptions, vehicleOption } from '@/schemas/form'
import { locations } from '@/data/locations'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckboxGroupInput from '@/components/form/inputs/CheckboxGroupInput'
import StepTitle from '@/components/form/StepTitle'
import LogoHeader from '@/components/form/LogoHeader'
import Button from '@/components/form/inputs/Button'
import TextAreaInput from '@/components/form/inputs/TextAreaInput'
import CheckboxInput from '@/components/form/inputs/CheckboxInput'
import RadioButtonGroupInput from '@/components/form/inputs/RadioButtonGroupInput'
import { IconAboutHelper, IconTasks, IconLocation, IconAvailability, IconAboutMe } from '@/components/icons/form'
import Steeper from '@/components/form/Steeper'
import FormContainer from '@/components/form/FormContainer'
import { formService } from '@/services/form'
import SelectInput from '@/components/form/inputs/SelectInput'
import dynamic from 'next/dynamic'
import { getIdFromCookieClient } from '@/utils/sessionClient'
import { useNotification } from '@/context/notification'
const Map = dynamic(() => import('@/components/map/Map.js'), { ssr: false }) // Importamos en el cliente, cuando hay window. Si no, da error.

export default function FormRegularPage () {
  // Estado para controlar el paso actual del formulario
  const [step, setStep] = useState(0)
  // Bandera para mostrar errores de validación
  const [showErrors, setShowErrors] = useState(false)
  // Habilita o deshabilita validaciones basadas en el entorno
  const isValidationEnabled = process.env.NEXT_PUBLIC_COMPATIBILITY_FORM_VALIDATION === 'true'
  // Para redirecciones
  const router = useRouter()
  // Array con los iconos correspondientes a cada paso
  const icons = [IconAboutHelper, IconTasks, IconLocation, IconAvailability, IconAboutMe]
  // Id del usuario
  const [userId, setUserId] = useState('') // Id del propio usuario
  // Municipios
  const [locationOptions, setLocationOptions] = useState([])

  const [selectedLocation, setSelectedLocation] = useState([])

  const { notify } = useNotification()

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

  useEffect(() => {
    const userId = getIdFromCookieClient()
    setUserId(userId)
  }, [])

  // Configuración del formulario utilizando react-hook-form
  const {
    register, // Para registrar campos
    handleSubmit, // Controlador para envío de formulario
    trigger, // Validar campos específicos
    watch,
    formState: { errors } // Errores del formulario
  } = useForm({
    defaultValues: { // Valores iniciales para los campos del formulario. Es necesario hacerlo, ya que, si un campo no completado se envía como nulo, zod da error
      agePreference: [],
      genderPreference: '',
      tasks: [],
      vehicle: false,
      location: '',
      daysOfWeek: [],
      timeOfDay: [],
      aboutMe: '' // Si queda vacío, al enviar el formulario se elimina
    },
    mode: 'onChange', // Valida cada vez que cambian los valores
    resolver: isValidationEnabled ? zodResolver(FormSchema) : undefined // Usa Zod si la validación está habilitada
  })

  const locationsValue = watch('location')

  // Observa cada cambio en el municipio
  useEffect(() => {
    setSelectedLocation(locationsValue)
    // Obtener la location de locations mediante el nombre del municipio
    const foundLocation = locations.find(
      (loc) => loc.Municipio === locationsValue
    )
    setSelectedLocation(foundLocation)
  }, [locationsValue])

  // Define los campos específicos que se validan por paso
  const stepFields = {
    1: ['agePreference', 'genderPreference'],
    2: ['tasks', 'vehicle'],
    3: ['location'],
    4: ['daysOfWeek', 'timeOfDay'],
    5: ['aboutMe']
  }

  // Función para retroceder al paso anterior
  const prevStep = () => {
    setStep(step - 1)
  }

  // Función para avanzar al siguiente paso o completar el formulario
  const nextStep = async (event) => {
    event.preventDefault() // Evita el envío predeterminado del formulario

    const currentFields = stepFields[step] // Obtiene los campos del paso actual
    const isValid = await trigger(currentFields) // Valida los campos actuales
    if (isValid) {
      setShowErrors(false)
      if (step < 5) {
        setStep(step + 1) // Avanza al siguiente paso
      }
      if (step === 5) {
        handleSubmit(endForm)(event) // Si es el último paso, envía el formulario
      }
    } else {
      setShowErrors(true) // Muestra errores si los campos no son válidos
    }
  }

  // Función para manejar el envío final del formulario
  const endForm = async (data) => {
    let formDataToSend = data

    // Elimina el campo 'aboutMe' si está vacío
    if (formDataToSend.aboutMe === '') {
      delete formDataToSend.aboutMe
    }

    // Estructura los datos para el backend
    const { agePreference, genderPreference, ...rest } = formDataToSend
    formDataToSend = {
      ...rest,
      formRegularInfo: {
        agePreference,
        genderPreference
      }
    }
    // Enviamos datos al backend
    try {
      const result = await formService.sendForm(userId, formDataToSend)
      if (result.success) {
        router.push('/app')
      } else if (!result.success) {
        notify('Ha ocurrido un fallo en el servidor', 'error')
      }
    } catch (error) {
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  return (

    <FormContainer>
      <LogoHeader isLink={false} />

      {(step > 0) &&
        <div className='mb-5'>
          <Steeper
            options={icons}
            stepActive={step - 1}
          />
        </div>}

      {step === 0 && (
        <>
          <StepTitle text='Completa el registro' />

          <span className='mb-10 dark:text-white'>
            Completar este formulario de compatibilidad es importante para que podamos encontrar un asistente personal que se ajuste a tus necesidades.
          </span>

          <img
            src='/party.svg'
            alt='party'
            className='h-36 sm:h-52'
          />

          <Button onClick={() => setStep(step + 1)} text='Adelante' />
        </>
      )}

      <form>
        {step === 1 && (
          <>
            <StepTitle text='Preferencias sobre asistente' />

            <CheckboxGroupInput
              label='1. ¿ Tienes alguna preferencia respecto a la edad del asistente?'
              options={agePreferenceOptions}
              {...(showErrors && errors.agePreference ? { errors: errors.agePreference } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('agePreference')}
            />

            <RadioButtonGroupInput
              label='2. ¿Tienes alguna preferencia respecto al género del asistente?'
              options={genderPreferenceOptions}
              {...(showErrors && errors.genderPreference ? { errors: errors.genderPreference } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('genderPreference')}
            />

            <Button type='button' onClick={nextStep} text='Siguiente' />

          </>
        )}

        {step === 2 && (
          <>

            <StepTitle text='Tareas' />

            <CheckboxGroupInput
              label='3. ¿Para qué necesitas un asistente personal?'
              options={tasksOptions}
              {...(showErrors && errors.tasks ? { errors: errors.tasks } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('tasks')}
            />

            <CheckboxInput
              label='4. ¿Necesitas que el asistente personal disponga de vehículo propio?'
              option={vehicleOption}
              {...(showErrors && errors.vehicle ? { errors: errors.vehicle } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('vehicle')}
            />

            <div className='flex flex-row gap-4 mt-10'>
              <Button onClick={prevStep} text='Atrás' />
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}

        {step === 3 && (
          <>

            <StepTitle text='Ubicación' />

            <SelectInput
              label='3. ¿En qué municipio te encuentras?'
              options={locationOptions}
              {...(showErrors && errors.location ? { errors: errors.location } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('location')}
            />

            {/* Solo cargar en el navegador, ya que da errores */}
            {typeof window !== 'undefined' && selectedLocation && (
              <div className='mt-8'>
                <Map lat={selectedLocation?.Latitud || 38.98461352409418} lon={selectedLocation?.Longitud || -3.9281660868497967} radius={0} />
              </div>
            )}

            {/* <CheckboxGroupInput
              label='5. ¿En qué provincia necesitarás al asistente?'
              options={locationsOptions}
              {...(showErrors && errors.locations ? { errors: errors.locations } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('locations')}
            /> */}

            <div className='flex flex-row gap-4 mt-10'>
              <Button onClick={prevStep} text='Atrás' />
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}

        {step === 4 && (
          <>

            <StepTitle text='Disponibilidad' />

            <CheckboxGroupInput
              label='6. ¿Qué días de la semana necesitarás al asistente?'
              options={daysOfWeekOptions}
              {...(showErrors && errors.daysOfWeek ? { errors: errors.daysOfWeek } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('daysOfWeek')}
            />

            <CheckboxGroupInput
              label='7. En general, ¿En qué franja horaria necesitarás al asistente?'
              options={timeOfDayOptions}
              {...(showErrors && errors.timeOfDay ? { errors: errors.timeOfDay } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('timeOfDay')}
            />

            <div className='flex flex-row gap-4 mt-10'>
              <Button onClick={prevStep} text='Atrás' />
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}

        {step === 5 && (
          <>

            <StepTitle text='Cuéntamos más sobre ti' />

            <TextAreaInput
              label='8. Si quieres, puedes escribir algo más que un asistente necesite saber, tus gustos, tu personalidad...'
              htmlFor='aboutMe'
              id='aboutMe'
              placeholder='Escribe algo...'
              {...(showErrors && errors.aboutMe ? { errors: errors.aboutMe } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('aboutMe')}
            />

            <div className='flex flex-row gap-4 mt-14'>
              <Button onClick={prevStep} text='Atrás' />
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}
      </form>
    </FormContainer>

  )
}
