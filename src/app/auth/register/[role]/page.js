/**
 * Página de registro. Cuando un usuario se registra, recibe un registerToken, necesario para la verificación.
 * Tras el registro, se lleva a verificar la cuenta (/auth/verify)
 */
'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LogoHeader from '@/components/form/LogoHeader'
import StepTitle from '@/components/form/StepTitle'
import TextInput from '@/components/form/inputs/TextInput'
import SelectInput from '@/components/form/inputs/SelectInput'
import Steeper from '@/components/form/Steeper'
import { IconIdentity, IconContact, IconCredentials } from '@/components/icons/register'
import { genderOptions, RegisterSchema } from '@/schemas/register'
import Button from '@/components/form/inputs/Button'
import { authService } from '@/services/auth'
import Link from 'next/link'
import FormContainer from '@/components/form/FormContainer'
import { userService } from '@/services/user'
import { useNotification } from '@/context/notification'

export default function RegisterPage ({ params }) {
  // Manejo de los pasos del formulario
  const [step, setStep] = useState(1)
  // Para redirecciones
  const router = useRouter()
  // Determina el tipo de usuario ('helper' o 'regular')
  const resolvedParams = use(params)
  const role = resolvedParams?.role || null
  // const [userRole, setUserRole] = useState(null)
  // Bandera para mostrar errores en la validación de pasos
  const [showErrors, setShowErrors] = useState(false)
  // Comprueba si la validación está habilitada según el entorno
  const isValidationEnabled = process.env.NEXT_PUBLIC_REGISTER_FORM_VALIDATION === 'true'
  // Para manejar el estado de la existencia del email
  const [emailExists, setEmailExists] = useState(false) // Estado para verificar si el email ya existe
  const emailError = {
    message: 'Este email ya está registrado'
  }
  const { notify } = useNotification()

  // Iconos de los pasos del formulario
  const icons = [IconIdentity, IconContact, IconCredentials]

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm({
    mode: 'onChange', // Modo de validación en tiempo real
    resolver: isValidationEnabled ? zodResolver(RegisterSchema) : undefined, // Resolver para validación condicional
    defaultValues: { role: '' } // Valores predeterminados del formulario
  })

  // Campos correspondientes a cada paso del formulario
  const stepFields = {
    1: ['firstName', 'lastName', 'gender', 'dateBirth'],
    2: ['email', 'phone', 'address'],
    3: ['password', 'confirmPassword', 'privacity']
  }

  // Retrocede al paso anterior
  const prevStep = () => {
    setStep(step - 1)
  }

  // Maneja la validación y transición entre pasos
  const nextStep = async (event) => {
    event.preventDefault() // Evita el comportamiento predeterminado
    const currentFields = stepFields[step]
    let isValid

    // Valida los campos actuales. En el paso 2, también verifica si el email ya existe
    if (step !== 2) {
      isValid = await trigger(currentFields)
    } else { isValid = await trigger(currentFields) && !emailExists }

    if (isValid) {
      setShowErrors(false)
      if (step < 3) setStep(step + 1) // Avanza al siguiente paso si no es el último
      if (step === 3) handleSubmit(endRegister)(event) // Finaliza si es el último paso
    } else {
      setShowErrors(true)
    }
  }

  // Procesa los datos finales del registro y los envía al backend
  const endRegister = async (data) => {
    let registerDataToSend = data
    const { confirmPassword, gender, privacity, ...rest } = registerDataToSend // Excluye ciertos campos

    // Agrega 'helperInfo' o 'regularInfo' según el tipo de usuario
    registerDataToSend = role === 'helper'
      ? { ...rest, helperInfo: { gender } }
      : { ...rest, regularInfo: {} }
    // Enviamos datos al backend
    try {
      await authService.sendRegister(registerDataToSend)
      router.push('/auth/verify')
    } catch (error) {
      // console.error(`Error: ${error.message}`)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
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
    <FormContainer>
      <LogoHeader isLink />
      <div className='mb-5'>
        <Steeper
          options={icons}
          stepActive={step - 1}
        />
      </div>

      <form>
        {step === 1 && (
          <>
            <StepTitle text='Datos personales' />

            <TextInput
              type='text'
              id='firstName'
              htmlFor='firstName'
              label='Nombre'
              {...(showErrors && errors.firstName ? { errors: errors.firstName } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('firstName')}
            />

            <TextInput
              type='text'
              id='lastName'
              htmlFor='lastName'
              label='Apellidos'
              {...(showErrors && errors.lastName ? { errors: errors.lastName } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('lastName')}
            />

            {role === 'helper' && (

              <SelectInput
                id='gender'
                htmlFor='gender'
                label='Género'
                options={genderOptions}
                defaultValue=''
                {...(showErrors && errors.gender ? { errors: errors.gender } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
                {...register('gender')}
              />

            )}

            <TextInput
              type='date'
              id='dateBirth'
              htmlFor='dateBirth'
              label='Fecha de nacimiento'
              {...(showErrors && errors.dateBirth ? { errors: errors.dateBirth } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('dateBirth')}
            />

            <div className='flex flex-row gap-4 mt-10'>
              <Link
                className='text-white dark:text-black bg-primary hover:bg-primary-hover dark:bg-primary-dark hover:dark:bg-primary-hover-dark   font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'
                href='/auth/register-init'
              >Atrás
              </Link>
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}

        {step === 2 && (
          <>
            <StepTitle text='Datos de contacto' />

            <TextInput
              type='text'
              id='email'
              htmlFor='email'
              label='Email'
              {...(emailExists ? { errors: emailError } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...(showErrors && errors.email ? { errors: errors.email } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('email', {
                onBlur: handleEmailBlur,
                onChange: () => setEmailExists(false) // Borra el error al cambiar el valor
              })}
            />

            <TextInput
              type='tel'
              id='phone'
              htmlFor='phone'
              label='Nº de teléfono'
              {...(showErrors && errors.phone ? { errors: errors.phone } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('phone')}
            />

            <TextInput
              type='text'
              id='address'
              htmlFor='address'
              label='Dirección'
              {...(showErrors && errors.address ? { errors: errors.address } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('address')}
            />

            <div className='flex flex-row gap-4 mt-10'>
              <Button onClick={prevStep} text='Atrás' />
              <Button type='button' onClick={nextStep} text='Siguiente' />
            </div>

          </>
        )}

        {step === 3 && (
          <>
            <StepTitle text='Credenciales' />

            <TextInput
              type='password'
              id='password'
              htmlFor='password'
              label='Contraseña'
              {...(showErrors && errors.password ? { errors: errors.password } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('password')}
            />

            <TextInput
              type='password'
              id='confirmPassword'
              htmlFor='confirmPassword'
              label='Confirmar contraseña'
              {...(showErrors && errors.confirmPassword ? { errors: errors.confirmPassword } : {})} // Pasamos los errores cuando intentamos ir al siguiente paso
              {...register('confirmPassword')}
            />

            {/* Política de provacidad */}
            <div className='flex items-center'>
              <input
                id='privacity'
                type='checkbox'
                {...register('privacity')}
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='privacity' className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >Estoy de acuerdo con la <a href='https://www.autismocastillalamancha.org/politica-privacidad/' target='_blank' rel='noopener noreferrer' className='text-blue-600 dark:text-blue-500 hover:underline'>política de privacidad</a>.
              </label>
            </div>

            {(showErrors && errors.privacity) && (
              <span className='text-xs text-[#f4202e]'>
                {errors.privacity.message}
              </span>
            )}

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
