import { DefaultBackground } from '@/components/backgrounds/DefaultBackground'
import Footer from '@/components/Footer'

/**
 * Layout de FormInit. Contiene fondo.
 */
export default function FormInitLayout ({ children }) {
  return (
    <>
      {/* Fondo */}
      <main className='flex-1 flex sm:block relative'>
        <DefaultBackground />
        {/* Contenido */}
        {children}
      </main>
      <Footer />
    </>
  )
}
