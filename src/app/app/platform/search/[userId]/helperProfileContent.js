/**
 * Componente del lado del cliente. Acepta form y user, que son pedidos al backend por profileFetcher.
 */
'use client'
import { IconAboutMeInfo, IconTasks, IconScheduleInfo, IconPersonalInfo, IconLocationInfo, IconHelperPreferencesInfo } from '@/components/icons/platform'
import { InitFlowbite } from '@/components/InitFlowbite'
import ProfilePartInfo from '@/components/platform/profile/ProfilePartInfo'
import ProfileSkeleton from '@/components/platform/profile/ProfileSkeleton'
import HelperProfilePartImage from '@/components/platform/search/helper-profile/HelperProfilePartImage'
import ModalContact from '@/components/platform/search/ModalContact'
import { userService } from '@/services/user'
import { generateImgSrc } from '@/utils/profilePictures'
import { getRoleFromCookieClient } from '@/utils/sessionClient'
import { useEffect, useState } from 'react'

// fetchData es una variable boolean que nos indicará si debemos hacer el fetching de datos o no, según si ha habido un error
// al hacerlo en el server side. Esto es porque desde el server side no podemos actualizar el accessToken en caso de 401.
export default function ProfileContent ({ userId, userData, formData, fetchData = false }) {
  const [user, setUser] = useState(userData)
  const [form, setForm] = useState(formData)
  const [loading, setLoading] = useState(fetchData === true) // Estado de carga. Si hay que hacer fetch de data, iniciará en true.
  const [showContactModal, setShowContactModal] = useState(false) // Mostrar modal de contacto
  const [ownUserRole, setOwnUserRole] = useState(null)

  // 👇 useEffect para bloquear/desbloquear el scroll del body
  useEffect(() => {
    if (showContactModal) {
      document.body.classList.add('overflow-hidden')
      document.getElementById('help-button').style.visibility = 'hidden'
    } else {
      document.body.classList.remove('overflow-hidden')
      document.getElementById('help-button').style.visibility = 'visible'
    }
  }, [showContactModal])

  // Se utilizará si hay que hacer el fetch de datos en el client side
  useEffect(() => {
    const ownUserRole = getRoleFromCookieClient()
    setOwnUserRole(ownUserRole)
    // Si no hay que hacer fetch de data, retornamos
    if (!fetchData) {
      return
    }

    const fetchUsers = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)

        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const user = await userService.getUser(true)
        setUser(user.data)
        setForm(user.data.form)

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setLoading(false)
      } catch (error) {
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
        setLoading(false)
      }
    }

    fetchUsers() // Ejecuta la función para obtener los usuarios desde el backend
  }, [fetchData, userId, userData]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  return (
    <>
      <InitFlowbite />

      {loading && (
        <ProfileSkeleton />
      )}

      {!loading && (
        <>
          {showContactModal && (
            <ModalContact compatibility={user.total_compatibility_percentage} userId={user.id} firstName={user.firstName} setShowContactModal={setShowContactModal} />
          )}

          {/* Nombre e imagen */}
          <HelperProfilePartImage setShowContactModal={setShowContactModal} user={user} imgSrc={generateImgSrc(user?.profilePicture)} />
          {/* Información personal */}
          <ProfilePartInfo role={user?.role} compatibilityAgePercentage={user?.compatibility_age_percentage} compatibilityGenderPercentage={user?.compatibility_gender_percentage} type='partPersonalInfo' title='Información personal' options={userToInfo(user)} Icon={IconPersonalInfo} />
          {/* Si el form no esta completo, no se muestra. Se mostrará mensaje de error */}
          {form && (
            <>
              {/* {Perfil} */}
              <ProfilePartInfo ownRole={ownUserRole} type='partProfile' highlightFirst title='Perfil' options={aboutMeToInfo(form)} Icon={IconAboutMeInfo} />
              {form.formRegularInfo && user?.role === 'regular' && (
                // Preferencias sobre asistente
                <ProfilePartInfo ownRole={ownUserRole} role={user?.role} compatibilityAgePercentage={user?.compatibility_age_percentage} compatibilityGenderPercentage={user?.compatibility_gender_percentage} type='partHelperPreferences' title='Preferencias sobre el asistente' options={helperPreferencesToInfo(form)} Icon={IconHelperPreferencesInfo} />
              )}

              {/* Ubicacion */}
              <ProfilePartInfo ownRole={ownUserRole} compatibilityLocationPercentage={user?.compatibility_location_percentage} type='partLocation' highlightFirst={Boolean(form.formRegularInfo)} title='Ubicación' options={locationToInfo(form)} Icon={IconLocationInfo} />
              {/* Horario */}
              <ProfilePartInfo ownRole={ownUserRole} compatibilityDaysPercentage={user?.compatibility_days_percentage} compatibilityTimePercentage={user?.compatibility_time_percentage} type='partSchedule' title='Horario' options={scheduleToInfo(form)} Icon={IconScheduleInfo} />
              {/* Tareas */}
              <ProfilePartInfo ownRole compatibilityTasksPercentage={user?.compatibility_tasks_percentage} compatibilityVehiclePercentage={user?.compatibility_vehicle_percentage} type='partTasks' title='Tareas y actividades' options={tasksToInfo(form)} Icon={IconTasks} />
              <div className='mb-16 lg:mb-0' />
              {/* <ProfilePartInfo highlightFirst title='Información compatibilidad' editable options={formToInfo(form)} Icon={IconCompatibilityInfo} /> */}
            </>
          )}
        </>
      )}
    </>
  )

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function userToInfo (user) {
    const gender = user.helperInfo?.gender
    const userInfo = [
      { label: 'Nombre', value: user.firstName },
      { label: 'Apellidos', value: user.lastName }
      // { label: 'Email', value: user.email }
    ]

    // Si existe el género (es helper), lo añadimos después del email
    if (gender) {
      userInfo.push({
        label: 'Género',
        value: gender === 'male'
          ? 'Masculino'
          : gender === 'female'
            ? 'Femenino'
            : gender === 'other'
              ? 'Otro'
              : 'Desconocido'
      })
    }

    // Añadimos el resto de los campos
    userInfo.push(
      { label: 'Fecha de nacimiento', value: user.dateBirth }
      // { label: 'Contraseña', value: '**********' }
    )

    return userInfo
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function aboutMeToInfo (form) {
    return [
      { label: 'Sobre mí', value: form.aboutMe || 'No respondido' }]
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function locationToInfo (form) {
    if (form.formRegularInfo) {
      return [
        // { label: 'Necesitas asistencia en el municipio', value: form.location },
        { label: 'Necesita un asistente en el municipio', value: form.location }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Ofrece asistencia en el municipio', value: form.location },
        { label: 'Ofrece asistencia en un ratio de (km)', value: form.formHelperInfo.ratio }
      ]
    }
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function scheduleToInfo (form) {
    if (form.formRegularInfo) {
      return [
        { label: 'Necesita asistencia los días de la semana', value: form.daysOfWeek },
        { label: 'En general, necesita asistencia en las franjas horarias', value: form.timeOfDay }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Ofrece asistencia los días de la semana', value: form.daysOfWeek },
        { label: 'En general, ofrece asistencia en las franjas horarias', value: form.timeOfDay }
      ]
    }
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function helperPreferencesToInfo (form) {
    return [
      { label: 'Preferencia de edad de asistente', value: form.formRegularInfo?.agePreference },
      { label: 'Preferencia de género de asistente', value: form.formRegularInfo?.genderPreference }
    ]
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function tasksToInfo (form) {
    if (form.formRegularInfo) {
      return [
        { label: 'Tareas para las que necesita apoyo', value: form.tasks },
        { label: 'Necesita que asistente tenga vehículo', value: form.vehicle ? 'Sí' : 'No' }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Tareas en las que puede asistir', value: form.tasks },
        { label: 'Dispone de vehículo propio', value: form.vehicle ? 'Sí' : 'No' }
      ]
    }
  }
}
