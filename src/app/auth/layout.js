/**
 * Actualmente, de lo siguiente se encarga un middleware específico junto con un interceptor axios.
 * Layout de Auth. A partir de aquí llegamos al login, registro, y verificación de cuentas.
 * Un usuario autenticado no debe ver esto. En el useEffect, se comprueba si se está autenticado. Si lo está, se redirige a /app,
 * Si no lo está, se muestra el contenido (child)
 */

import Footer from '@/components/Footer'
import { DefaultBackground } from '@/components/backgrounds/DefaultBackground.js'

export default function AuthLayout ({ children }) {
  return (
    <>
      <main className='flex-1 flex sm:block relative'>
        <DefaultBackground />
        {/* Contenido */}
        {/* {showChild && children} */}
        {children}
      </main>
      <Footer />
    </>
  )
}
