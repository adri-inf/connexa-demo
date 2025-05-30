// Estos métodos deben usarse desde el client side

import { authService } from '@/services/auth'

// Cuando cerramos sesión
export const handleLogOut = () => {
  localStorage.removeItem('profilePicturePath')
  localStorage.removeItem('role')
}

export const handleLogIn = (profilePicture, role) => {
  localStorage.setItem('profilePicturePath', profilePicture)
  localStorage.setItem('role', role)
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
  return '00161b06-cbd0-454a-8f9f-250ceef0cc9c'
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
