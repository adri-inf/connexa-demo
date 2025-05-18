/**
 * Schema que usa el formulario de verificación de cuenta (hecho con react hook forms) para validar errores.
 */
import { z } from 'zod'

export const VerifySchema = z.object({
  code: z
    .string()
    .min(1, 'El código no puede estar vacío') // Asegura que no esté vacío
    .max(10, 'El código no puede tener más de 10 caracteres') // Asegura que no exceda los 10 caracteres
    .regex(/^[0-9]*$/, 'El código solo puede contener números') // Asegura que solo contenga números
})
