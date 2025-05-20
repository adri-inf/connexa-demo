/**
 * Layout de Home. Contiene el Footer, la TopNavy el fondo que se mostrará dentro de /home/*.
 */

import TopNav from '../../components/navigation/TopNav.js'
import Footer from '@/components/Footer.js'
import { DefaultBackground } from '@/components/backgrounds/DefaultBackground.js'
import { AccesibilityButton } from '@/components/navigation/AccesibilityButton.js'

export default async function HomeLayout ({ children }) {
  return (
    <>

      <TopNav /> {/* Este es el componente de la barra de navegación */}
      <main className='pt-[68px] flex-1 relative'>
        {/* <div class='absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' /> */}

        {/* Fondo */}
        <DefaultBackground />
        {/* Contenido */}
        {children}
      </main>
      <div className='fixed top-[65px] left-0 z-50'>
        <AccesibilityButton />
      </div>
      <Footer />

    </>
  )
}
