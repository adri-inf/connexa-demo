// Función para obtener imagen de perfil completa, con la ruta del backend
export const generateImgSrc = (profilePicture) => {
  const imageUrl = (profilePicture)
    ? `/user-photos/${profilePicture}`
    : '/userimg.webp'

  return imageUrl
}
