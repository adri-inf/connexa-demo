/**
 * Schema que usa el formulario de compatibilidad (hecho con react hook forms) para validar errores.
 * Contiene las Options necesarias para cada campo. El value y el label será lo mismo.
 */
import { z } from 'zod'
import { locations } from '@/data/locations'

export const agePreferenceOptions = [
  'Indiferente', '20-25', '25-30', '30-35', '35-40', 'Mayor de 40'
]

// Necesario para diferenciar label Indiferente de agePreferenceOptions.
// El componente RadioButtonGroupInput lo tendrá en cuenta
export const genderPreferenceOptions = [
  { label: 'Indiferente2', value: 'Indiferente' },
  { label: 'Mujer', value: 'Mujer' },
  { label: 'Hombre', value: 'Hombre' }
]

// Será la label, pero es true o false
export const vehicleOption = [
  'Sí'
]

export const tasksOptions = [
  'Tareas domésticas',
  'Apoyo higiene personal',
  'Desplazamientos en el vehículo personal del asistente',
  'Desplazamientos en transporte público',
  'Apoyo en tiempo de ocio',
  'Apoyo en entorno laboral',
  'Apoyo en entorno académico',
  'Apoyo en toma de decisiones',
  'Apoyo compras',
  'Apoyo en la organización y planificación',
  'Acompañamiento gestiones administrativas',
  'Acompañamiento gestiones médicas'
]

const locationOptions = [
  'Selecciona un municipio', // Opción predeterminada
  ...locations.map(location => location.Municipio) // Solo los nombres de los municipios
]

export const ratioOptions = [

  { value: 0, label: 'Dentro de mi municipio', realValue: 0 },
  { value: 10, label: '2km', realValue: 2 },
  { value: 20, label: '5km', realValue: 5 },
  { value: 30, label: '10km', realValue: 10 },
  { value: 40, label: '20km', realValue: 20 },
  { value: 50, label: '40km', realValue: 40 },
  { value: 60, label: '60km', realValue: 60 },
  { value: 70, label: '100km', realValue: 100 },
  { value: 80, label: '200km', realValue: 200 }

]

export const daysOfWeekOptions = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

export const timeOfDayOptions = [
  'Mañana',
  'Tarde',
  'Noche'
]

export const skillsOptions = [
  'Tener en cuenta los intereses y necesidades de las personas',
  'Respetar las diferencias individuales',
  'Capacidad de adaptación a los cambios',
  'Equilibrio emocional',
  'Aceptación de críticas y sugerencias de mejora',
  'Escucha activa'
]

export const FormSchema = z.object({
  tasks: z.array(z.enum(tasksOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos una tarea' })
    .max(12, 'No puede elegir más de 12 tareas')
    .optional(),

  vehicle: z.boolean({
    error_map: () => ({ message: 'El valor debe ser true o false' })
  }).optional(),

  location: z.string(z.enum(locationOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos un municipio' })
    .optional(),

  ratio: z
    .union([z.string(), z.number()]) // Acepta tanto string como number
    .refine(value => {
      const valueAsNumber = typeof value === 'string' ? Number(value) : value
      return ratioOptions.some(option => option.value === valueAsNumber)
    }, {
      message: 'Debe seleccionar un valor válido'
    })
    .optional(),

  daysOfWeek: z.array(z.enum(daysOfWeekOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos un día' })
    .max(7, { message: 'No puede elegir más de 7 días' })
    .optional(),

  timeOfDay: z.array(z.enum(timeOfDayOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos una franja horaria' })
    .max(3, { message: 'No puede elegir más de 3 franjas horarias' })
    .optional(),

  aboutMe: z.string().max(500, 'Esta entrada no puede tener más de 500 caracteres').optional(),

  // regularFormInfo:
  agePreference: z.array(z.enum(agePreferenceOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos una preferencia de edad' })
    .max(6, { message: 'No puede elegir más de 6 preferencias de edad' })
    .refine(
      (values) => !(values.includes('Indiferente') && values.length > 1),
      { message: 'No puede seleccionar "Indiferente" con otras opciones' }
    )
    .refine(
      (preferences) =>
        !(preferences.length === 5 && !preferences.includes('Indiferente')),
      {
        message:
        'Si no tienes preferencia, indica "Indiferente"'
      }
    ).optional(),

  genderPreference: z.string(z.enum(genderPreferenceOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  }))
    .min(1, { message: 'Debe elegir al menos una preferencia de género' })
    .optional(),

  // helperFormInfo
  skills: z.array(z.enum(skillsOptions, {
    error_map: () => ({ message: 'Solo puede seleccionar los valores permitidos' })
  })).optional()

}).refine((data) => {
  // Verificar si el campo tasks está definido y es un array
  if (Array.isArray(data.tasks) &&
      data.tasks.includes('Desplazamientos en el vehículo personal del asistente') &&
      data.vehicle !== true) {
    return false // Se marcará un error en vehicle
  }
  return true
}, {
  message: 'Debe marcar esta casilla si ha seleccionado la tarea "Desplazamientos en el vehículo personal del asistente"',
  path: ['vehicle']
})
