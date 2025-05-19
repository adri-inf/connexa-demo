// Estos métodos deben usarse desde el client side

import { authService } from '@/services/auth'

// Cuando cerramos sesión
export const handleLogOut = () => {
  localStorage.removeItem('profilePicturePath')
  localStorage.removeItem('role')
}

export const handleLogIn = (profilePicture, role) => {
  localStorage.setItem('profilePicturePath', profilePicture)
  localStorage.setItem('role', 'regular')
}

// export const getRoleFromLocalStorage = () => {
//   const role = localStorage.getItem('role') // useEffect para inicializar role
//   return role
// }

// Función para obtener el valor de 'role' desde las cookies en el cliente
export const getRoleFromCookieClient = () => {
  if (typeof window === 'undefined') return null // Solo ejecuta en cliente

  const role = localStorage.getItem('role')
  return role || null
}

// Función para obtener el valor de 'id' desde las cookies en el cliente
export const getIdFromCookieClient = () => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  }

  const userInfoToken = getCookie('userInfoToken')
  if (userInfoToken) {
    try {
      const parsedData = JSON.parse(decodeURIComponent(userInfoToken))
      return parsedData.id
    } catch (error) {
      return null
    }
  }
  return null
}

// Función usada cuando se pulsa botón logout
export const logoutClick = async (router) => {
  // Enviamos datos al backend
  try {
    await authService.logout()
    handleLogOut()
    router.push('/auth')
  } catch (error) {
    router.push('/auth')
  }
}
