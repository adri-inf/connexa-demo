/**
 * Lo que visualiza un usuario regular cuando ve un perfil helper (La parte de la imagen y el nombre). Similar a ProfilePartImage.js
 */

import PartContainer from '../../PartContainer'
import ButtonFavorite from '../ButtonFavorite'

// Si own es true, es que se está visualizando el propio perfil. Si no, un regular está viendo el perfil de un helper
// Se controla el role, porque es necesario si un helper visualiza el perfil de un regular
export default function HelperProfilePartImage ({ setShowContactModal, user, imgSrc }) {
  return (
    <PartContainer>

      <div className='flex justify-between w-full items-center mb-2'>

        {user.total_compatibility_percentage !== undefined && (
          <span className={`text-nowrap text-xl
            font-medium px-3.5 py-1.5 rounded-sm
                ${Math.floor(user.total_compatibility_percentage) <= 33 ? 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900' : ''}  // Si la compatibilidad es entre 0 y 33
                ${Math.floor(user.total_compatibility_percentage) > 33 && Math.floor(user.total_compatibility_percentage) <= 66 ? 'bg-yellow-100 text-yellow-800 dark:text-yellow-900 dark:bg-yellow-200' : ''}  // Si está entre 34 y 66
                ${Math.floor(user.total_compatibility_percentage) > 66 ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' : ''}  // Si está entre 67 y 100
            `}
          >
            {Math.floor(user.total_compatibility_percentage)}% Compatible
          </span>
        )}
        {user.role === 'helper' && (
          <ButtonFavorite iconClassName='size-8' helperId={user.id} isDefaultFavorite={user.favorite} />
        )}
      </div>

      <div className='flex flex-col sm:flex-row items-center space-x-6'>
        {/* <img className='h-36 w-36 sm:h-44 sm:w-44 rounded-full' src={imgSrc || '/userimg.webp'} alt='User profile picture' /> */}

        {/* div de imagen con icono */}
        <img
          className='h-36 w-36 sm:h-44 sm:w-44 rounded-full transition-transform duration-300'
          src={imgSrc || '/userimg.webp'}
          alt='User profile picture'
        />

        <div className='flex flex-col'>
          <span className='text-3xl font-semibold'>{user.firstName} {user.lastName}</span>
          <span className='text-lg font-semibold text-primary dark:text-primary-dark'>
            {user.role === 'helper' && 'Asistente personal'}
            {user.role === 'regular' && 'En busca de asistente personal'}
          </span>

          {/* Si no es perfil propio, se muestra botón contactar */}
          {user.role === 'helper' && (
            <div className='mt-6'>
              <button
                className='py-2 px-4 mt-2 text-base sm:text-lg font-medium focus:outline-none  rounded-lg border border-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-primary-dark bg-primary text-white hover:bg-primary-hover dark:bg-primary-dark dark:text-black dark:hover:bg-primary-hover-dark'
                onClick={() => { setShowContactModal(true) }}
              >
                Contactar
              </button>
            </div>
          )}

        </div>
      </div>
    </PartContainer>
  )
}
