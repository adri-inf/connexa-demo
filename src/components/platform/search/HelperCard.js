import Link from 'next/link'
import ButtonFavorite from './ButtonFavorite'
import { generateImgSrc } from '@/utils/profilePictures'

/**
 * Componente que representa una Card de un usuario helper. Se muestra cuando un regular realiza una consulta de búsqueda.
 */
export default function HelperCard ({ favorite, userId, firstName, lastName, locations, profilePicture, handleContactClick, compatibility }) {
  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='h-full flex flex-col items-center p-4'>

        <div className='flex justify-between w-full items-center mb-2'>

          {compatibility !== undefined && (
            <span className={`flex flex-row items-center text-nowrap text-xl
            font-medium px-2.5 py-0.5 rounded-sm
                ${Math.floor(compatibility) <= 33 ? 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900' : ''}  // Si la compatibilidad es entre 0 y 33
                ${Math.floor(compatibility) > 33 && Math.floor(compatibility) <= 66 ? 'bg-yellow-100 text-yellow-800 dark:text-yellow-900 dark:bg-yellow-200 ' : ''}  // Si está entre 34 y 66
                ${Math.floor(compatibility) > 66 ? 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900' : ''}  // Si está entre 67 y 100
            `}
            >
              {Math.floor(compatibility)}%
            </span>
          )}

          <ButtonFavorite iconClassName='size-6 sm:size-7' helperId={userId} isDefaultFavorite={favorite} />

        </div>

        <Link href={`/app/platform/search/${userId}`}>
          <img
            className='w-24 h-24 sm:w-32 sm:h-32 mb-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110'
            src={generateImgSrc(profilePicture)} alt='User image'
          />
        </Link>

        <span className='mt-1 px-5 h-30 overflow-clip text-ellipsis whitespace-nowrap mb-0 text-center text-lg font-medium text-gray-900 dark:text-white w-full'>
          {firstName} {lastName}
        </span>

        <span className='text-sm text-center text-gray-500 dark:text-gray-400'>
          {locations}
        </span>

        <div className='mt-auto'>
          <div className='w-full justify-center items-end flex mt-4'>
            <button
              onClick={() => handleContactClick(userId, firstName)}
              className='py-2 px-4 mt-2 text-sm sm:text-base font-medium focus:outline-none  rounded-lg border border-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-primary-dark bg-primary text-white hover:bg-primary-hover dark:bg-primary-dark dark:text-black dark:hover:bg-primary-hover-dark'
            >
              Contactar
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
