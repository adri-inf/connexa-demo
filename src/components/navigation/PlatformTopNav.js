/**
 * Menu superior de la app (platform)
 */

'use client'
import { nunito } from '@/app/fonts'
import Link from 'next/link'
import { InitFlowbite } from '../InitFlowbite'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { logoutClick } from '@/utils/sessionClient'
import { AccesibilityButton } from './AccesibilityButton.js'

const logoConnexa = '/logo_connexa.webp'

export default function PlatformTopNav () {
  // Obtenemos la imagen del localStorage (Se crea al cambiar foto de perfil y al iniciar sesión)
  // Null hay que tratarlo como cadena, porque está en localStorage
  // Usamos useState para manejar el estado de la imagen del perfil
  const [imgSrc, setImgSrc] = useState(null)

  const router = useRouter()

  useEffect(() => {
    // Solo se ejecuta en el cliente, después de que el componente se haya montado
    if (typeof window !== 'undefined') {
      const profilePicturePath = localStorage.getItem('profilePicturePath')

      // Establecemos la imagen si está disponible y es válida
      if (profilePicturePath && profilePicturePath !== 'null') {
        setImgSrc(`/user-photos/${profilePicturePath}`)
      }
    }
  }, []) // Solo se ejecuta una vez al montar el componente

  return (
    <>
      <InitFlowbite />

      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700'>
        <div className='px-3 py-3 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start rtl:justify-end'>
              <button id='btnSidebar' data-drawer-target='logo-sidebar' data-drawer-toggle='logo-sidebar' aria-controls='logo-sidebar' type='button' className='relative inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
                <span className='sr-only'>Open sidebar</span>
                <svg className='w-6 h-6' inert fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path clipRule='evenodd' fillRule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z' />
                </svg>

              </button>
              <Link href='/' target='_blank' className='flex ms-2 md:me-24'>
                <img src={logoConnexa} className='h-9 me-3' alt='Connexa Logo' />
                <span className={`${nunito.className} self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white`}>CONNEXA</span>
              </Link>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center ms-3'>
                <div className='flex gap-x-4 items-center'>
                  <AccesibilityButton />
                  <button type='button' className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' aria-expanded='false' data-dropdown-toggle='dropdown-user'>
                    <span className='sr-only'>Open user menu</span>
                    <img className='w-9 h-9 rounded-full' src={imgSrc || '/userimg.webp'} alt='user photo' />
                  </button>
                </div>
                <div className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600' id='dropdown-user'>
                  {/* <div className='px-4 py-3' role='none'>
                    <p className='text-sm text-gray-900 dark:text-white' role='none'>
                      Usuario
                    </p>
                    <p className='text-sm font-medium text-gray-900 truncate dark:text-gray-300' role='none'>
                      usuario@gmail.com
                    </p>
                  </div> */}
                  <ul className='py-1' role='none'>
                    <li>
                      <button onClick={() => logoutClick(router)} className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white' role='menuitem'>
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>

  )
}
