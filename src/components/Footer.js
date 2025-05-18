/**
 * Footer
 */
import Link from 'next/link'

export default function Footer () {
  return (

    <footer className='bg-[#f2f2f2] dark:bg-gray-800'>
      <div className='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
        <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2024 - Connexa
        </span>
        <ul className='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
          <li>
            <Link href='/home/sobre-nosotros' className='hover:underline me-4 md:me-6'>Sobre nosotros</Link>
          </li>
          <li>
            <a
              href='https://www.autismocastillalamancha.org/politica-privacidad/' className='hover:underline me-4 md:me-6 '
              target='_blank'
              rel='noopener noreferrer'
            >Política de privacidad
            </a>
          </li>
          <li>
            <Link href='/home/contacto' className='hover:underline'>Contacto</Link>
          </li>
        </ul>
      </div>
    </footer>

  )
}
