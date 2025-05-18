/**
 * Página de auth, es la de inicio de sesión. Desde esta página, puedes iniciar sesión o ir a la página de registro.
 * Tras iniciar sesión, se lleva a /app
 */
'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import TextInput from '@/components/form/inputs/TextInput'
import LogoHeader from '@/components/form/LogoHeader'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas/login'
import Button from '@/components/form/inputs/Button'
import { authService } from '@/services/auth'
import FormContainer from '@/components/form/FormContainer'
import { handleLogIn } from '@/utils/sessionClient'
import { useNotification } from '@/context/notification'

export default function AuthPage () {
  // Para redirigir
  const router = useRouter()
  // Verificar si la validación está habilitada según el entorno
  const isValidationEnabled = process.env.NEXT_PUBLIC_LOGIN_FORM_VALIDATION === 'true'
  const { notify } = useNotification()

  // Formulario login (email y password).
  // Usamos register para 'registrar los campos' en el formulario react
  // Lo usamos con zod, para simplificar validaciones
  const { register, handleSubmit, formState: { errors } } = useForm({
    // Para desarrollo, a veces no interesa que haga validación
    resolver: isValidationEnabled ? zodResolver(LoginSchema) : undefined
  })

  // Lo que ocurre al finalizar login
  const endLogin = async (data) => {
    console.log(data)

    // Enviamos datos al backend
    try {
      const result = await authService.sendLogin(data)
      console.log('Respuesta del servidor:', result.data)

      if (result.success) {
        handleLogIn(result.data.profilePicture, result.data.role)
        router.push('/app')
      } else if (!result.success) {
        console.log('Credenciales inválidas')
        notify('Credenciales inválidas', 'error')
      }
    } catch (error) {
      // console.error(`Error: ${error.message}`)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  return (
    <FormContainer>
      {/* Logo corportándose como enlace (isLink === true) */}
      <LogoHeader isLink />
      {/* Formulario de inicio de sesión */}
      <form className='mt-8' onSubmit={handleSubmit(endLogin)}>
        <TextInput
          type='email'
          id='email'
          htmlFor='email'
          label='Email'
          errors={errors.email}
          {...register('email')}
        />

        <TextInput
          type='password'
          id='password'
          htmlFor='password'
          label='Contraseña'
          errors={errors.password}
          {...register('password')}
        />

        <Button type='submit' text='Iniciar sesión' />
      </form>

      <hr className='mt-10 w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700' />

      <span className='text-md text-black dark:text-white flex gap-x-2'>
        ¿No tienes una cuenta?
        <Link
          className='text-primary dark:text-primary-dark  hover:text-primary-hover hover:dark:text-primary-hover-dark font-medium underline'
          href='/auth/register-init'
        >Regístrate
        </Link>
      </span>
    </FormContainer>
  )
}
