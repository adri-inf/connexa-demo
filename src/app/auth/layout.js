/**
 * Actualmente, de lo siguiente se encarga un middleware específico junto con un interceptor axios.
 * Layout de Auth. A partir de aquí llegamos al login, registro, y verificación de cuentas.
 * Un usuario autenticado no debe ver esto. En el useEffect, se comprueba si se está autenticado. Si lo está, se redirige a /app,
 * Si no lo está, se muestra el contenido (child)
 */

import Footer from '@/components/Footer'
// import { authService } from '@/services/auth.js'
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation.js'
import { DefaultBackground } from '@/components/backgrounds/DefaultBackground.js'

export default function AuthLayout ({ children }) {
  // const router = useRouter()
  // // Mostrar el child (Necesario para que no se vea el child antes de hacer una redirección, si el usuario está autenticado)
  // const [showChild, setShowChild] = useState(false)

  // // Si el usuario está autenticado, se lleva a /app
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await authService.updateAccessToken()
  //       // Si está autenticado, se lleva a la app
  //       if (response.success) {
  //         console.log('Access token updated')
  //         router.push('/app')
  //         // Si no está autenticado, salta expepción
  //       } else if (!response.success) {
  //         setShowChild(true)
  //       }
  //     } catch (error) {
  //       // Si no está autenticado (salta excepción), se queda en auth
  //       console.error('Error checking authentication:', error)
  //       setShowChild(true)
  //     }
  //   }
  //   // Verificar autenticación al montar
  //   checkAuth()
  // }, [router]) // Dependencia de router para que se reejecute si cambia

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
