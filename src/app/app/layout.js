/**
 * Actualmente, de lo siguiente se encarga un middleware específico junto con un interceptor axios.
 * Layout de App. A partir de aquí llegamos a la aplicación como tal, y es necesario estar autenticado.
 * Un usuario no autenticado no debe ver esto. En el useEffect, se comprueba si se está autenticado.
 * Si su accessToken está caducado pero el refresh no, se actualiza.
 * Si el refreshToken ha caducado, se redirige a /auth,
 * Si está autenticado, se muestra el contenido (child)
 */

// import { useEffect, useState } from 'react'
// import { authService } from '@/services/auth'
// import { useRouter } from 'next/navigation'

export default function AppLayout ({ children }) {
  // const router = useRouter()
  // Mostrar el child (Necesario para que no se vea el child antes de hacer una redirección, si el usuario no está autenticado)
  // const [showChild, setShowChild] = useState(false)
  // Cada cuántos milisegundos se actualiza (y se comprueba) el accessToken. 15000 = 15 segundos
  // const intervalDuration = Number(process.env.NEXT_PUBLIC_UPDATE__CHECK_ACCESS_TOKEN_INTERVAL) || 15000

  // Si el usuario no está autenticado, se lleva a /auth
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const response = await authService.updateAccessToken()
  //       // Si está autenticado, se queda en app
  //       if (response.success) {
  //         console.log('Access token updated')
  //         setShowChild(true)
  //         // Si no está autenticado, salta expepción
  //       } else if (!response.success) {
  //         router.push('/auth')
  //       }
  //     } catch (error) {
  //       // Si no está autenticado (salta excepción), se lleva a auth
  //       console.error('Error checking authentication:', error)
  //       router.push('/auth')
  //     }
  //   }

  //   // Verificar autenticación al montar
  //   checkAuth()

  //   // Configurar el intervalo para renovar el token
  //   const intervalId = setInterval(() => {
  //     checkAuth()
  //   }, intervalDuration)

  //   // Limpiar el intervalo al desmontar el componente
  //   return () => clearInterval(intervalId)
  // }, [router, intervalDuration]) // Dependencia de router para que se reejecute si cambia

  return (
    <>
      {/* {showChild && children} */}
      {children}
    </>
  )
}
