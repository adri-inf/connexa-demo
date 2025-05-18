// Estos métodos deben usarse desde el server side
import { cookies } from 'next/headers'

// Función para obtener el valor de 'role' desde las cookies en el server side
export const getRoleFromCookieServer = async () => {
  const cookieStore = await cookies()
  const userInfoToken = cookieStore._parsed.get('userInfoToken')?.value

  if (userInfoToken) {
    try {
      const parsedData = JSON.parse(decodeURIComponent(userInfoToken))
      return parsedData.role
    } catch (error) {
      console.error('Error al parsear la cookie userInfoToken en el servidor:', error)
      return null
    }
  }

  return null
}

// Función para obtener el valor de 'id' desde las cookies en el server side
export const getIdFromCookieServer = async () => {
  const cookieStore = await cookies()
  const userInfoToken = cookieStore._parsed.get('userInfoToken')?.value

  if (userInfoToken) {
    try {
      const parsedData = JSON.parse(decodeURIComponent(userInfoToken))
      return parsedData.id
    } catch (error) {
      console.error('Error al parsear la cookie userInfoToken en el servidor:', error)
      return null
    }
  }

  return null
}
