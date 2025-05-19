// Función para crear una imagen a partir de una URL.
export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image() // Crea un nuevo elemento de imagen.
    image.addEventListener('load', () => resolve(image)) // Resuelve la promesa cuando la imagen se carga.
    image.addEventListener('error', (error) => reject(error)) // Rechaza la promesa si ocurre un error.
    image.setAttribute('crossOrigin', 'anonymous') // Habilita el atributo crossOrigin para evitar problemas con imágenes de dominios externos.
    image.src = url // Establece la URL de la imagen.
  })

// Función que recorta una imagen basándose en las coordenadas y dimensiones especificadas.
// Función que recorta una imagen y la devuelve en formato WebP con calidad reducida.
export async function getCroppedImg (imageSrc, pixelCrop, quality = 0.8) {
  const image = await createImage(imageSrc) // Crea la imagen desde la fuente.
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No se pudo obtener el contexto del canvas')
  }

  // Establece las dimensiones del canvas según el recorte.
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // Dibuja la imagen en el canvas.
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // Convierte el canvas a un blob en formato WebP con calidad ajustada.
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob)) // Devuelve la URL del blob.
        } else {
          reject(new Error('Error al generar la imagen WebP'))
        }
      },
      'image/webp', // ✅ Cambiado a formato WebP
      quality // ✅ Parámetro de calidad (0.7 por defecto)
    )
  })
}
