/**
 * Dentro de profile, la parte de la imagen y el nombre del usuario.
 * Acepta boolean incomplete, para mostrar mensaje de error si un usuario no ha completado el formulario
 * de compatibilidad. Si hace click en el error, le lleva a la parte de ' Información compatibilidad'
 */
import Link from 'next/link'
import DangerAlert from '../../form/DangerAlert'
import PartContainer from '../PartContainer'

export default function ProfilePartImage ({ user, imgSrc, incomplete, setShowProfilePictureModal, setShowEditAvailableModal }) {
  return (
    <PartContainer>
      {
        incomplete && (
          <Link href='/app/form-init' className='mb-2'>
            <DangerAlert text='Haz click aqui para completar el formulario de compatibilidad. Esto es necesario para poder recomendarte asistentes que se ajusten a tus necesidades.' />
          </Link>
        )
      }
      <div className='flex flex-col sm:flex-row items-center space-x-6'>
        {/* <img className='h-36 w-36 sm:h-44 sm:w-44 rounded-full' src={imgSrc || '/userimg.webp'} alt='User profile picture' /> */}

        {/* div de imagen con icono. Al hacer click, se abre modal para cambiar imagen */}
        <div className='relative inline-block'>
          <img
            className='h-36 w-36 sm:h-44 sm:w-44 rounded-full transition-transform duration-300 hover:scale-105 hover:cursor-pointer'
            src={imgSrc || '/userimg.webp'}
            alt='User profile picture'
            onClick={() => { setShowProfilePictureModal(true) }}
          />
          <div className='absolute bottom-0 right-0 bg-gray-100 dark:bg-gray-600 p-2 rounded-full'>
            {/* Icono de cámara */}
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z' />
              <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z' />
            </svg>

          </div>
        </div>

        <div className='flex flex-col'>
          <span className='text-3xl font-semibold'>{user.firstName} {user.lastName}</span>
          <span className='text-lg font-semibold text-primary dark:text-primary-dark'>
            {user.helperInfo && 'Asistente personal'}
            {user.regularInfo && 'En busca de asistente personal'}
          </span>
          {/* Si es perfil propio, se muestra email */}
          <span className='text-base font-semibold mt-0'>{user.email}</span>
          {user.role === 'helper' && (
            <div className='mt-4'>
              <button
                className={`py-2 px-4 text-base sm:text-lg font-medium focus:outline-none  rounded-lg border ${user.helperInfo.available ? 'bg-green-100 text-green-800 border-green-800 dark:bg-green-200 dark:text-green-900 dark:border-green-900 hover:bg-green-200 dark:hover:bg-green-300' : 'bg-red-100 text-red-800 border-red-800 dark:bg-red-200 dark:text-red-900 dark:border-red-900 hover:bg-red-200 dark:hover:bg-red-300'} `}
                onClick={() => { setShowEditAvailableModal(true) }}
              >
                {user.helperInfo.available ? 'Disponible' : 'No disponible'}
              </button>
            </div>
          )}
        </div>
      </div>
    </PartContainer>
  )
}
