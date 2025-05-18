/**
 * En está página server side se realizan los fetch necesarios. Cuando se completen, la página page mostrará el contenido de esta página.
 * Como se realiza fetch, tiene que ser del lado del servidor. Desde aqui se deben incluir las cookies a manualmente, porque no estamos en el client side.
 */
'use server'
import ProfileContent from './profileContent'
import { userService } from '@/services/user'
import { getIdFromCookieServer, getRoleFromCookieServer } from '@/utils/sessionServer'

export default async function ProfileFetcher () {
  // Nos hacen falta las cookes, porque, al no ser 'use client', las cookies no se mandan automáticamente
  const role = await getRoleFromCookieServer()
  const userId = await getIdFromCookieServer()

  try {
    const user = await userService.getUser(false) // Incluimos formularios
    // En caso de error de autenticación, se renderiza el componente con fetchData
    if (user.status === 401) { throw new Error() }

    // Si todo va bien, se carga el profile content server side
    return (
      <>
        {/* Contenido del perfil. Componente client side. */}
        <ProfileContent role={role} userData={user.data} formData={user.data.form} userId={userId} />
      </>
    )
  } catch (error) {
    // Si hay algun error (posiblemente error de autenticación) se intenta hacer el fetch de datos en el componente, y se fuerza
    // interceptor axios para actualizar accessToken
    return (
      <ProfileContent role={role} fetchData userId={userId} />
    )
  }
}
