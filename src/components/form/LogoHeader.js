/**
 * En los formularios, aparece este logo de Connexa.
 */
import Link from 'next/link'
import { nunito } from '@/app/fonts'

export default function LogoHeader ({ isLink = true }) {
  const Wrapper = isLink ? Link : 'div'

  return (
    <Wrapper
      {...(isLink ? { href: '/' } : {})}
      className='mb-3 flex items-center space-x-3 rtl:space-x-reverse mx-auto'
    >
      <img src='/logo_connexa.webp' className='h-9' alt='Connexa Logo' />
      <span className={`${nunito.className} text-3xl antialiased self-center font-semibold whitespace-nowrap dark:text-white`}>
        CONNEXA
      </span>
    </Wrapper>
  )
}
