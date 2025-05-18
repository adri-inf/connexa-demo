/**
 * Schema que usa el register (hecho con react hook forms) para validar errores.
 * Contiene las Options necesarias para cada campo.
 */
import { z } from 'zod'

export const genderOptions = [
  { value: '', label: 'Selecciona un género' },
  { value: 'female', label: 'Mujer' },
  { value: 'male', label: 'Hombre' },
  { value: 'other', label: 'Otro' }
]

export const RegisterSchema = z
  .object({
    firstName: z.string({
      invalid_type_error: 'Nombre inválido',
      required_error: 'Debe introducir un nombre'
    }).min(1, 'Debe introducir un nombre').max(20, 'El nombre no puede ocupar más de 20 caracteres')
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El nombre no puede incluir números ni caracteres no permitidos') // Se permite el espacio
      .trim().optional(),

    lastName: z.string({
      invalid_type_error: 'Apellido inválido',
      required_error: 'Debe introducir el apellido'
    }).min(1, 'Debe introducir el apellido').max(40, 'El apellido no puede ocupar más de 40 caracteres')
      .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/, 'El apellido no puede incluir números ni caracteres no permitidos') // Se permite el espacio
      .trim().optional(),

    gender: z.enum(['female', 'male', 'other'], {
      errorMap: () => {
        return { message: 'Debe seleccionar un género' }
      }
    }).optional(),

    dateBirth: z.string({
      invalid_type_error: 'Debe ser una fecha en formato YYYY-MM-DD.',
      required_error: 'La fecha de nacimiento es obligatoria.'
    }).optional()
    // Validar que sea una fecha válida
      .refine((date) => isValidDate(date), { message: 'Debe introducir una fecha válida.' })
    // Validar que sea mayor de 18 años
      .refine((date) => isAtLeast18(date), { message: 'Debe ser mayor de 18 años.' })
    // Validar que no sea mayor de 120 años
      .refine((date) => isUnder120(date), { message: 'La edad no puede superar los 120 años.' }),

    email: z.string({
      invalid_type_error: 'Email inválido',
      required_error: 'Debe introducir un email'
    }).email('Debe introducir un email válido').trim().optional(),

    phone: z.string({
      invalid_type_error: 'Nº de teléfono inválido',
      required_error: 'Debe introducir un Nº de teléfono'
    }).length(9, 'El Nº de teléfono debe contener 9 dígitos')
      .regex(/^(6|7|9)\d{8}$/, 'El Nº de teléfono debe ser de España (empezando con 6, 7 o 9).').trim().optional(),

    address: z.string({
      invalid_type_error: 'Dirección inválida',
      required_error: 'Debe introducir una dirección'
    }).min(1, 'Debe introducir una dirección').max(50, 'La dirección no puede superar los 50 caracteres').trim().optional(),

    password: z.string({
      invalid_type_error: 'La contraseña es inválida',
      required_error: 'Debe introducir una contraseña'
    })
      .min(8, 'La contraseña debe contener al menos 8 caracteres')
      .regex(/[A-Z]/, 'La contraseña debe contener una mayúscula')
      .regex(/\d/, 'La contraseña debe contener un número')
      .regex(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~\u00BF\u00A1]/, 'La contraseña debe contener al menos un carácter especial (?, ¡, ¿, etc.)')
      .max(30, 'La contraseña no puede tener más de 30 caracteres')
      .trim().optional(),

    confirmPassword: z.string({
      required_error: 'Debe confirmar la contraseña'
    })
      .min(8, 'La contraseña debe contener al menos 8 caracteres')
      .max(30, 'La contraseña no puede tener más de 30 caracteres')
      .trim().optional(),

    privacity: z.literal(true, {
      errorMap: () => ({ message: 'Debe aceptar la política de privacidad' })
    }).optional()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  })

// Función para validar que la fecha es válida
const isValidDate = (dateString) => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

// Función para verificar si el usuario tiene al menos 18 años
const isAtLeast18 = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  const dayDifference = today.getDate() - birthDate.getDate()

  return age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)))
}

// Función para verificar que la edad no sea mayor de 120 años
const isUnder120 = (dateString) => {
  const today = new Date()
  const birthDate = new Date(dateString)
  const age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  const dayDifference = today.getDate() - birthDate.getDate()

  const maxAgeLimit = 120
  return (
    age < maxAgeLimit ||
    (age === maxAgeLimit && (monthDifference < 0 || (monthDifference === 0 && dayDifference <= 0)))
  )
}
