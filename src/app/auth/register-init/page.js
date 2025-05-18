/**
 * Página de inicio registro, para la eleccióon del tipo de usuario.
 * Lleva a auth/register/helper o auth/register/regular, según la elección.
 */
'use client'
import { useRouter } from 'next/navigation'
import StepTitle from '@/components/form/StepTitle'
import Button from '@/components/form/inputs/Button'
import Link from 'next/link'
import LogoHeader from '@/components/form/LogoHeader'
import FormContainer from '@/components/form/FormContainer'

export default function RegisterInitPage () {
  // Para redirecciones
  const router = useRouter()
  // Maneja la selección del tipo de usuario
  const endSelectUserType = (event) => {
    const buttonType = event.currentTarget.getAttribute('data-type')
    if (buttonType === 'helper') { router.push('/auth/register/helper') }
    if (buttonType === 'regular') { router.push('/auth/register/regular') }
  }

  return (

    <FormContainer>
      <LogoHeader isLink />
      <StepTitle text='¿Cómo quieres registrate?' />

      <div className='mt-5 flex flex-col gap-4'>
        <Button onClick={endSelectUserType} data-type='helper' text='Soy un asistente' />
        <Button onClick={endSelectUserType} data-type='regular' text='Soy un usuario' />
      </div>

      <hr className='mt-10 w-full h-1 mx-auto bg-gray-100 border-0 rounded my-10 dark:bg-gray-700' />

      <span className='text-md text-black dark:text-white flex gap-x-2'>
        ¿Ya tienes una cuenta?
        <Link className='text-primary dark:text-primary-dark  hover:text-primary-hover hover:dark:text-primary-hover-dark font-medium underline' href='/auth'>
          Iniciar sesión
        </Link>
      </span>
    </FormContainer>
  )
}
