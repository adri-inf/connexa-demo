/**
 * Página de verificación de cuentas. Cuando una cuenta es verificada, cuenta como un login.
 * Tras verificar la cuenta, se lleva a la subida de imagen de perfil (/app/form-init/profile-picture)
 */
'use client'
import { useForm } from 'react-hook-form'
import StepTitle from '@/components/form/StepTitle'
import TextInput from '@/components/form/inputs/TextInput'
import LogoHeader from '@/components/form/LogoHeader'
import Button from '@/components/form/inputs/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { VerifySchema } from '@/schemas/verify'
import { authService } from '@/services/auth'
import { useRouter } from 'next/navigation'
import FormContainer from '@/components/form/FormContainer'
import { useNotification } from '@/context/notification'

export default function VerifyPage () {
  // Verificar si la validación está habilitada según el entorno
  const isValidationEnabled = process.env.NEXT_PUBLIC_VERIFY_FORM_VALIDATION === 'true'
  const { notify } = useNotification()

  const router = useRouter()

  // Formulario de verificación (code)
  const { register, handleSubmit, formState: { errors } } = useForm({
    // Para desarrollo, a veces no interesa que haga validación
    resolver: isValidationEnabled ? zodResolver(VerifySchema) : undefined
  })

  const endVerify = async (data) => {
    // Enviamos datos al backend
    try {
      const result = await authService.sendVerify(data)
      if (result.success) {
        console.log('Respuesta del servidor:', result)
        localStorage.setItem('role', result.user.role)
        router.push('/app/form-init/profile-picture')
      } else if (!result.success) {
        notify('El código no es correcto', 'error')
      }
    } catch (error) {
      // console.error(`Error: ${error.message}`)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  return (
    <FormContainer>
      <LogoHeader isLink />
      <StepTitle text='Revisa tu email' />
      <span className='dark:text-white'>
        Hemos mandado un código a tu email para verificar tu cuenta. Introducelo aquí.
      </span>

      <form onSubmit={handleSubmit(endVerify)} className='flex-1 mt-14'>
        <TextInput
          type='text'
          id='code'
          htmlFor='code'
          label='Código'
          errors={errors.code}
          {...register('code')}
        />

        <button type='button' className='mb-10 text-sm mr-auto dark:text-white text-blue-700 font-medium underline hover:text-blue-900 hover:cursor-pointer'>
          ¿No has recibido el código?
        </button>

        <Button type='submit' text='Siguiente' />
      </form>
    </FormContainer>
  )
}
