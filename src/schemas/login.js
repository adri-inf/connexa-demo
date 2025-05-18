/**
 * Schema que usa el login (hecho con react hook forms) para validar errores.
 */
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string({
    invalid_type_error: 'El email es inválido',
    required_error: 'Debe introducir un email.'
  }).email('El email debe tener una dirección válida').trim(),

  password: z.string({
    invalid_type_error: 'La contraseña es inválida',
    required_error: 'Debe introducir una contraseña'
  })
    .min(8, 'La contraseña debe contener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener una mayúscula')
    .regex(/\d/, 'La contraseña debe contener un número')
    .regex(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u00BF\u00A1]/, 'La contraseña debe contener al menos un carácter especial (?, ¡, ¿, etc.)')
    .max(30, 'La contraseña no puede tener más de 30 caracteres')
    .trim()
})
