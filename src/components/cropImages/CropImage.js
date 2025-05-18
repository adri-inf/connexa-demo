import { useState, useImperativeHandle, forwardRef } from 'react'
import Cropper from 'react-easy-crop'
import { getCroppedImg } from './canvasUtils'

// eslint-disable-next-line react/display-name
const CropImage = forwardRef(({ defaultImgSrc, errors, ...rest }, ref) => {
  // Estados necesarios para gestionar la lógica del recorte y la imagen.
  const [imageSrc, setImageSrc] = useState(null) // Fuente de la imagen cargada.
  const [crop, setCrop] = useState({ x: 0, y: 0 }) // Coordenadas actuales del recorte.
  const [zoom, setZoom] = useState(1) // Nivel de zoom aplicado.
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null) // Área recortada en píxeles.
  const [croppedImage, setCroppedImage] = useState(null) // Imagen recortada generada.

  // Callback que se ejecuta al completar el recorte. Actualiza el área recortada en píxeles.
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  // Genera un archivo de imagen recortada basado en las coordenadas seleccionadas.
  const getCroppedFile = async () => {
    if (imageSrc) {
      const blobURLcroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels) // Obtiene la URL del blob.
      const blob = await fetch(blobURLcroppedImage).then(r => r.blob()) // Convierte el blob en un objeto blob.

      // Definir el tipo MIME y extensión del archivo.
      const mimeType = 'image/webp'
      const extension = mimeType.split('/')[1]
      const filename = `image.${extension}`

      // Crear un archivo basado en el blob, con tipo MIME especificado.
      return blobToFile(blob, filename, mimeType)
    }
    return null
  }

  // Expone la función getCroppedFile mediante la referencia del componente.
  useImperativeHandle(ref, () => ({
    getCroppedFile
  }))

  // Convierte un blob en un archivo con un nombre y tipo MIME especificado.
  const blobToFile = (blob, filename, mimeType) => {
    return new File([blob], filename, { type: mimeType })
  }

  // Maneja la selección de un archivo de imagen y actualiza el estado con su contenido.
  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImageSrc(reader.result) // Guarda la imagen en el estado al cargarla.
      reader.readAsDataURL(file)
    }
  }

  // Elimina la imagen cargada y restablece los estados relacionados.
  const removeImage = () => {
    setImageSrc(null)
    setCroppedImage(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      {/* Si hay una imagen seleccionada, se muestra el recorte */}
      {imageSrc
        ? (
          <>
            <div className='relative w-full h-48 sm:h-52'>
              {/* Componente Cropper que permite recortar la imagen */}
              <Cropper
                image={imageSrc} // La imagen que se va a recortar
                crop={crop} // Coordenadas del recorte
                zoom={zoom} // Nivel de zoom
                aspect={1} // Relación de aspecto (cuadrado)
                cropShape='round' // Forma del recorte (redondo)
                showGrid={false} // No muestra la cuadrícula de recorte
                onCropChange={setCrop} // Actualiza las coordenadas del recorte
                onZoomChange={setZoom} // Actualiza el nivel de zoom
                onCropComplete={onCropComplete} // Ejecuta al completar el recorte
              />
              {/* Botón para eliminar la imagen */}
              <button
                onClick={removeImage} // Elimina la imagen
                className='absolute top-2 right-2 w-8 h-8 bg-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-600'
                aria-label='Eliminar imagen'
              >
                ✕  {/* Símbolo de la "X" para eliminar */}
              </button>
            </div>
            {/* Control de zoom */}
            <div className='flex flex-col w-full gap-x-2'>
              <label
                htmlFor='default-range'
                className='block mb-2 font-medium text-gray-900 dark:text-white'
              >Zoom
              </label>
              <input
                type='range' // Control deslizante para el zoom
                id='default-range'
                min={1} // Valor mínimo de zoom
                max={3} // Valor máximo de zoom
                step={0.1} // Incremento de zoom
                value={zoom} // Valor actual de zoom
                onChange={(e) => setZoom(e.target.value)} // Actualiza el estado al mover el control
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
              />
            </div>

            {/* Muestra la imagen recortada si existe */}
            {croppedImage && (
              <div className='mt-4'>
                <img
                  src={croppedImage} // Muestra la imagen recortada
                  alt='Cropped'
                  className='max-w-full h-auto rounded-md shadow-lg'
                />
              </div>
            )}
          </>
          )
        : (
          <>
            {/* Si no hay imagen seleccionada, se muestra imagen por defecto */}
            <div className='relative w-full h-48 sm:h-52 flex justify-center'>
              <img
                src={`${defaultImgSrc || '/userimg.webp'}`}
                alt='Foto de perfil'
                className='h-full rounded-full '
              />
            </div>

            {/* Si no hay imagen seleccionada, se muestra el input para seleccionar un archivo */}
            <input
              type='file'
              accept='image/*' // Solo acepta archivos de imagen
              onChange={onFileChange} // Maneja el cambio de archivo
              className='block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            />
          </>
          )}

      {errors && (
        <span className='w-full text-left text-xs text-[#f4202e]'>
          {errors.message}
        </span>
      )}

    </div>
  )
})

export default CropImage // Exporta el componente para su uso en otros archivos
