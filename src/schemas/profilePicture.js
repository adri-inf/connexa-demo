/**
 * Schema que usa el formulario de subida de foto de perfil (hecho con react hook forms) para validar errores.
 */
import { z } from 'zod'

export const ProfilePictureSchema = z.object({
  profilePicture: z
    .any() // Acepta cualquier valor
    .optional() // Hace que el campo sea opcional
    .refine(file => !file || (file instanceof File && file.type.startsWith('image/')), { message: 'Debe ser una imagen' }) // Verifica si existe y es una imagen
    .refine(file => !file || (file instanceof File && file.size <= 8 * 1024 * 1024), { message: 'El archivo no puede superar los 8MB' }) // Verifica si existe y el tamaño
})
