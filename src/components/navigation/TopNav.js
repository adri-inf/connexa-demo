/**
 * Menu superior del home
 */
'use client'
import { nunito } from '@/app/fonts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { InitFlowbite } from '../InitFlowbite'
import { AccesibilityButton } from './AccesibilityButton.js'

const logoConnexa = '/logo_connexa.webp'

export default function TopNav () {
  const pathname = usePathname()

  return (
    <nav className='bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0'>

      <InitFlowbite />

      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link href='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src={logoConnexa} className='h-9' alt='Connexa Logo' />
          <span className={`${nunito.className} hidden hide-logo:block text-xl antialiased self-center font-semibold whitespace-nowrap dark:text-white`}>CONNEXA</span>
        </Link>
        <div className='flex hide-nav-elements:order-2 items-center space-x-2 hide-nav-elements:gap-x-4 hide-nav-elements:space-x-0 rtl:space-x-reverse'>
          <AccesibilityButton />
          {/* Boton acceder */}
          <Link href='/auth'>
            <button
              type='button'
              className='text-white dark:text-black bg-primary hover:bg-primary-hover font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-primary-dark dark:hover:bg-primary-hover-dark dark:focus:ring-blue-800'
            >
              Acceder
            </button>
          </Link>

          <button data-collapse-toggle='navbar-sticky' type='button' className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hide-nav-elements:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls='navbar-sticky' aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
        </div>
        <div className='items-center justify-between hidden w-full hide-nav-elements:flex hide-nav-elements:w-auto hide-nav-elements:order-1' id='navbar-sticky'>
          <ul className='flex flex-col p-4 hide-nav-elements:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 hide-nav-elements:space-x-8 rtl:space-x-reverse hide-nav-elements:flex-row hide-nav-elements:mt-0 hide-nav-elements:border-0 hide-nav-elements:bg-white dark:bg-gray-800 hide-nav-elements:dark:bg-gray-900 dark:border-gray-700'>
            {/* Creamos los elementos de forma dinámica para detectar en qué página estamos, y resaltar en elemento del nav correspondiente */}
            {[
              { href: '/home/descubre-connexa', label: 'Descubre Connexa' },
              { href: '/home/sobre-nosotros', label: 'Sobre nosotros' },
              { href: '/home/asistencia-personal', label: 'Asistencia personal' },
              { href: '/home/financiacion', label: 'Financiación' },
              { href: '/home/contacto', label: 'Contacto' }
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block py-2 px-3 text-black rounded hide-nav-elements:hover:bg-transparent hide-nav-elements:hover:text-primary-hover hide-nav-elements:p-0 hide-nav-elements:dark:hover:text-primary-hover-dark dark:hover:bg-gray-700 hide-nav-elements:dark:hover:bg-transparent dark:border-gray-700 ${
                    pathname === href
                      ? 'text-white dark:text-black bg-primary dark:bg-primary-dark hide-nav-elements:dark:bg-transparent  hover:bg-primary-hover rounded hide-nav-elements:bg-transparent hide-nav-elements:text-primary hide-nav-elements:dark:text-primary-dark dark:hover:bg-primary-hover-dark' // Clases activas
                      : 'hover:bg-gray-100 dark:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}

          </ul>
        </div>
      </div>
    </nav>

  )
}
