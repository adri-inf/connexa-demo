/**
 * Dentro de profile, la parte de mostrar datos, como información personal y de compatibilidad.
 * Acepta boolean editable. Si es editable, mostrará un botón 'Editar' para hacer modificaciones.
 */
'use client'
import { IconEdit, IconMailPass } from '../../icons/platform'
import PartContainer from '../PartContainer'

export default function ProfilePartInfo ({
  setShowEditModal,
  setShowEditCredentialsModal,
  title,
  Icon,
  options,
  editable, // Si editable es true, se podrá editar.
  mailPassEdit, // Si mailPassEdit, se muestra botón editar mail o password.
  highlightFirst, // Si es true, el primer elemento del grid ocupará toda la fila (para el campo sobre mí)
  compatibilityAgePercentage, // Si hay compatibilidad de edad (porque se está visualizando el perfil de otro usuario) se tiene en cuenta
  compatibilityGenderPercentage, // Si hay compatibilidad de edad (porque se está visualizando el perfil de otro usuario) se tiene en cuenta
  compatibilityLocationPercentage,
  compatibilityDaysPercentage,
  compatibilityTimePercentage,
  compatibilityTasksPercentage,
  compatibilityVehiclePercentage,
  role, // Rol del usuario que se está visualizando
  ownRole // Rol del propio usuario
}) {
  // Función para calcular la edad a partir de la fecha de nacimiento
  function calculateAge (birthDate) {
    if (!birthDate) return null
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const month = today.getMonth() - birth.getMonth()

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const compatibilities = {
    compatibilityAgePercentage,
    compatibilityGenderPercentage,
    compatibilityLocationPercentage,
    compatibilityDaysPercentage,
    compatibilityTimePercentage,
    compatibilityTasksPercentage,
    compatibilityVehiclePercentage
  }

  return (
    <PartContainer>
      {/* Si es editable, añadimos botón */}
      {editable && (
        <>
          <div className='flex justify-end gap-x-3 mb-2'>
            {/* Si además, se puede modificar usuario y contraseña, agregamos botón extra */}
            {mailPassEdit && (
              <button
                onClick={() => { setShowEditCredentialsModal(true) }}
                className='text-xs flex items-center gap-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full'
              >
                <IconMailPass />
                <span>Ajustes avanzados</span>
              </button>
            )}

            {/* Botón editar */}
            <button
              onClick={() => { setShowEditModal(true) }}
              className='text-xs flex items-center gap-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full'
            >
              <IconEdit />
              <span>Editar</span>
            </button>
          </div>
        </>
      )}

      {/* Título de la info e icono */}
      <div className='flex gap-x-2 items-center text-xl text-primary dark:text-primary-dark font-semibold'>
        <Icon />
        <h2>{title}</h2>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-stretch'>
        {options.map(({ label, value }, index) => {
          const isBirthDate = label === 'Fecha de nacimiento' && role !== 'regular'
          const isGender = label === 'Género'
          const isLocation = label === 'Ofrece asistencia en el municipio' || label === 'Ofrece asistencia en un ratio de (km)' || label === 'Necesita un asistente en el municipio'
          const isDay = label === 'Ofrece asistencia los días de la semana' || label === 'Necesita asistencia los días de la semana'
          const isBirthDateHelperPreferences = label === 'Preferencia de edad de asistente'
          const isGenderHelperPreferences = label === 'Preferencia de género de asistente'

          let compatibility = null// Para guardar cualquier compatibilidad, y mostrar span o no

          const isTime = label === 'En general, ofrece asistencia en las franjas horarias' || label === 'En general, necesita asistencia en las franjas horarias'
          const isTasks = label === 'Tareas en las que puede asistir' || label === 'Tareas para las que necesita apoyo'
          const isVehicle = label === 'Dispone de vehículo propio' || label === 'Necesita que asistente tenga vehículo'

          const age = label === 'Fecha de nacimiento' ? calculateAge(value) : null

          // Determinar la clase de fondo según CompatibilityAgePercentage
          let labelCompatibilityClass = ''
          let labelCompatibilityContent = ''

          // Compatibilidad que se ha pasado
          const activeCompatibilityKey = Object.keys(compatibilities).find(
            key => compatibilities[key] !== undefined && compatibilities[key] !== null
          )

          if (isBirthDate) {
            compatibility = compatibilityAgePercentage
          }

          if (isBirthDateHelperPreferences) {
            compatibility = compatibilityAgePercentage
          }

          if (isGender) {
            compatibility = compatibilityGenderPercentage
          }

          if (isGenderHelperPreferences) {
            compatibility = compatibilityGenderPercentage
          }

          if (isLocation) {
            compatibility = compatibilityLocationPercentage
          }

          if (isDay) {
            compatibility = compatibilityDaysPercentage
          }

          if (isTime) {
            compatibility = compatibilityTimePercentage
          }

          if (isVehicle) {
            compatibility = compatibilityVehiclePercentage
          }

          if (isTasks) {
            compatibility = compatibilityTasksPercentage
          }

          if (compatibility !== null) {
            if (compatibility < 34) {
              labelCompatibilityClass = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
              labelCompatibilityContent = 'Incompatible'
            } else if (compatibility < 67) {
              labelCompatibilityClass = 'bg-yellow-100 text-yellow-800 dark:text-yellow-900 dark:bg-yellow-200'
              labelCompatibilityContent = 'Parcialmente compatible'
            } else {
              labelCompatibilityClass = 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
              labelCompatibilityContent = 'Compatible'
            }
          }

          return (
            <div
              key={index}
              className={
              highlightFirst && index === 0 ? 'col-span-1 lg:col-span-2' : ''
            }
            >
              <div className='flex flex-col h-full p-2 rounded-md'>

                {compatibility !== null && ownRole !== role && (
                  <div className='flex justify-end'>
                    <span data-tooltip-target={`tooltip-default-${index}-${activeCompatibilityKey}`} className={`px-2 rounded-full text-sm ${labelCompatibilityClass} flex flex-row`}>

                      {labelCompatibilityContent === 'Compatible' && (
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' />
                        </svg>

                      )}

                      {labelCompatibilityContent === 'Parcialmente compatible' && (
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-8'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm4.5 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75ZM9 15h6' />
                        </svg>

                      )}

                      {labelCompatibilityContent === 'Incompatible' && (
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-8'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z' />
                        </svg>

                      )}

                    </span>

                    <div id={`tooltip-default-${index}-${activeCompatibilityKey}`} role='tooltip' className='absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-xs opacity-0 tooltip dark:bg-gray-700'>
                      {labelCompatibilityContent === 'Compatible' && 'Compatible'}
                      {labelCompatibilityContent === 'Parcialmente compatible' && 'Parcialmente compatible'}
                      {labelCompatibilityContent === 'Incompatible' && 'Incompatible'}
                      <div className='tooltip-arrow' data-popper-arrow />
                    </div>

                  </div>
                )}

                <label className='text-sm font-semibold mb-1 } '>{label}</label>
                {/* Si el campo es una lista, se muestra como una ul */}
                {Array.isArray(value)
                  ? (
                    <ul className='text-base p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm list-disc pl-8 h-full'>
                      {value.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    )
                  : (
                    <span className='text-base p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm h-full'>
                      {age !== null ? `${value} (${age} años)` : value || 'N/A'}
                    </span>
                    )}
              </div>
            </div>
          )
        })}
      </div>
    </PartContainer>
  )
}
