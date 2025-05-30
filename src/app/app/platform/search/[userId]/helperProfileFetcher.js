/**
 * En está página server side se realizan los fetch necesarios. Cuando se completen, la página page mostrará el contenido de esta página.
 * Como se realiza fetch, tiene que ser del lado del servidor. Desde aqui se deben incluir las cookies a manualmente, porque no estamos en el client side.
 */
'use server'

import { userService } from '@/services/user'
import HelperProfileContent from './helperProfileContent'

export default async function HelperProfileFetcher ({ userId }) {
  // Nos hacen falta las cookes, porque, al no ser 'use client', las cookies no se mandan automáticamente

  try {
    const user = await userService.getUser(true) // Incluimos formularios
    // En caso de error de autenticación, se renderiza el componente con fetchData
    if (user.status === 401) { throw new Error() }

    // Si todo va bien, se carga el profile content con el data cargado
    return (
      <>
        {/* Contenido del perfil. Componente client side. */}
        <HelperProfileContent fetchData userData={user.data} formData={user.data.form} />
      </>
    )
  } catch (error) {
    // Si hay algun error (posiblemente error de autenticación) se intenta hacer el fetch de datos en el componente, y se fuerza
    // interceptor axios para actualizar accessToken
    return (
      <>
        {/* Contenido del perfil. Componente client side. */}
        <HelperProfileContent userId={userId} fetchData />
      </>
    )
  }
}
