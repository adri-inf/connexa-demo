/**
 * Componente del lado del cliente. Acepta form y user, que son pedidos al backend por profileFetcher.
 */
'use client'
import { IconAboutMeInfo, IconTasks, IconHelperPreferencesInfo, IconLocationInfo, IconScheduleInfo, IconPersonalInfo, IconMailPass } from '@/components/icons/platform'
import ProfilePartInfo from '@/components/platform/profile/ProfilePartInfo'
import ProfilePartImage from '@/components/platform/profile/ProfilePartImage'
import { useEffect, useState } from 'react'
import ModalEditProfile from '@/components/platform/profile/ModalEditProfile'
import ModalEditSchedule from '@/components/platform/profile/ModalEditSchedule'
import ModalEditPersonalInfo from '@/components/platform/profile/ModalEditPersonalInfo'
import ModalEditHelperPreferences from '@/components/platform/profile/ModalEditHelperPreferences'
import ModalEditTasks from '@/components/platform/profile/ModalEditTasks'
import { userService } from '@/services/user'
import ProfileSkeleton from '@/components/platform/profile/ProfileSkeleton'
import { generateImgSrc } from '@/utils/profilePictures'
import ModalEditLocation from '@/components/platform/profile/ModalEditLocation'
import ModalEditCredentials from '@/components/platform/profile/ModalEditCredentials'
import ModalProfilePicture from '@/components/platform/profile/ModalProfilePicture'

// fetchData es una variable boolean que nos indicará si debemos hacer el fetching de datos o no, según si ha habido un error
// al hacerlo en el server side. Esto es porque desde el server side no podemos actualizar el accessToken en caso de 401.
export default function ProfileContent ({ role, userData, formData, fetchData = false, userId }) {
  // Comprobar si form es null y asignar incomplete a true. Esto significará que el usuario no ha completado el formulario de compatibilidad.
  const [user, setUser] = useState(userData)
  const [form, setForm] = useState(formData)
  // Comprobar si form es null y asignar incomplete a true. Esto significará que el usuario no ha completado el formulario de compatibilidad.
  const [incomplete, setIncomplete] = useState(!formData)
  const [loading, setLoading] = useState(fetchData === true) // Estado de carga. Si hay que hacer fetch de data, iniciará en true.

  // Modales de edición
  const [showEditCredentialsModal, setShowEditCredentialsInfoModal] = useState(false)
  const [showEditPersonalInfoModal, setShowEditPersonalInfoModal] = useState(false)
  const [showEditProfileModal, setShowEditProfileModal] = useState(false)
  const [showEditLocationModal, setShowEditLocationModal] = useState(false)
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false)
  const [showEditHelperPreferencesModal, setShowEditHelperPreferencesModal] = useState(false)
  const [showEditTasksModal, setShowEditTasksModal] = useState(false)
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false)

  // Obtenemos la imagen del localStorage (Se crea al cambiar foto de perfil y al iniciar sesión)
  // Null hay que tratarlo como cadena, porque está en localStorage
  // Estado para la imagen del perfil
  const [imageUrl, setImageUrl] = useState(null)

  // Obtenemos la imagen desde el client side, ya que tenemos que usar el local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profilePicturePath = localStorage.getItem('profilePicturePath')
      if (profilePicturePath && profilePicturePath !== 'null') {
        setImageUrl(generateImgSrc(profilePicturePath))
      }
    }
  }, [])

  // 👇 useEffect para bloquear/desbloquear el scroll del body
  useEffect(() => {
    const anyModalOpen =
      showEditCredentialsModal ||
      showEditPersonalInfoModal ||
      showEditProfileModal ||
      showEditLocationModal ||
      showEditScheduleModal ||
      showEditHelperPreferencesModal ||
      showEditTasksModal ||
      showProfilePictureModal

    if (anyModalOpen) {
      document.body.classList.add('overflow-hidden')
      document.getElementById('help-button').style.visibility = 'hidden'
    } else {
      document.body.classList.remove('overflow-hidden')
      document.getElementById('help-button').style.visibility = 'visible'
    }
  }, [
    showEditCredentialsModal,
    showEditPersonalInfoModal,
    showEditProfileModal,
    showEditLocationModal,
    showEditScheduleModal,
    showEditHelperPreferencesModal,
    showEditTasksModal,
    showProfilePictureModal
  ])

  // Se utilizará si hay que hacer el fetch de datos en el client side
  useEffect(() => {
    if (!fetchData) { return } // Si no hay que hacer fetch de data, retornamos

    const fetchUsers = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)

        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const user = await userService.getUser(false)
        setUser(user.data)
        setForm(user.data.form)
        if (user.data.form) { setIncomplete(false) } else { setIncomplete(true) } // Manejamos estado incompleto

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setLoading(false)
      } catch (error) {
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
        setLoading(false)
      }
    }

    fetchUsers() // Ejecuta la función para obtener los usuarios desde el backend
  }, [fetchData, userId]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  return (
    <>
      {loading && (
        <ProfileSkeleton />
      )}
      {!loading && (
        <>
          {/* Nombre e imagen */}
          <ProfilePartImage own user={user} incomplete={incomplete} imgSrc={imageUrl} setShowProfilePictureModal={setShowProfilePictureModal} />
          <ProfilePartInfo userRole={role} title='Información personal' setShowEditModal={setShowEditPersonalInfoModal} setShowEditCredentialsModal={setShowEditCredentialsInfoModal} editable mailPassEdit options={userToInfo(user)} Icon={IconPersonalInfo} />
          
          {/* Modales de edición */}
          {showProfilePictureModal && ( <ModalProfilePicture actualImgSrc={imageUrl} setShowProfilePictureModal={setShowProfilePictureModal} />)}
          {showEditPersonalInfoModal && (<ModalEditPersonalInfo userId={userId} user={user} Icon={IconPersonalInfo} userRole={role} setShowEditPersonalInfoModal={setShowEditPersonalInfoModal} />)}
          {showEditCredentialsModal && (<ModalEditCredentials userId={userId} user={user} Icon={() => <IconMailPass size={6} />} setShowEditCredentialsModal={setShowEditCredentialsInfoModal} />)}

          {/* Si el form no esta completo, no se muestra. Se mostrará mensaje de error */}
          {form && (
            <>
              {/* Partes de información de compatibilidad */}
              <ProfilePartInfo highlightFirst title='Perfil' setShowEditModal={setShowEditProfileModal} editable options={aboutMeToInfo(form)} Icon={IconAboutMeInfo} />
              {/* Parte exclusiva de usuarios regulares */}
              {role === 'regular' && (
                <ProfilePartInfo title='Preferencias sobre asistente' setShowEditModal={setShowEditHelperPreferencesModal} editable options={helperPreferencesToInfo(form)} Icon={IconHelperPreferencesInfo} />
              )}
              <ProfilePartInfo highlightFirst={Boolean(form.formRegularInfo)} title='Ubicación' setShowEditModal={setShowEditLocationModal} editable options={locationToInfo(form)} Icon={IconLocationInfo} />
              <ProfilePartInfo title='Horario' setShowEditModal={setShowEditScheduleModal} editable options={scheduleToInfo(form)} Icon={IconScheduleInfo} />
              <ProfilePartInfo title='Tareas y actividades' setShowEditModal={setShowEditTasksModal} editable options={tasksToInfo(form)} Icon={IconTasks} />

              {/* Modales de edición */}
              {showEditProfileModal && (<ModalEditProfile userId={userId} form={form} Icon={IconAboutMeInfo} setShowEditProfileModal={setShowEditProfileModal} />)}
              {showEditLocationModal && (<ModalEditLocation userId={userId} form={form} Icon={IconLocationInfo} setShowEditLocationModal={setShowEditLocationModal} />)}
              {showEditScheduleModal && (<ModalEditSchedule userId={userId} form={form} Icon={IconScheduleInfo} setShowEditScheduleModal={setShowEditScheduleModal} />)}
              {showEditHelperPreferencesModal && (<ModalEditHelperPreferences userId={userId} form={form} Icon={IconHelperPreferencesInfo} setShowEditHelperPreferencesModal={setShowEditHelperPreferencesModal} />)}
              {showEditTasksModal && (<ModalEditTasks userId={userId} form={form} Icon={IconTasks} setShowEditTasksModal={setShowEditTasksModal} />)}
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
      { label: 'Teléfono', value: user.phone },
      { label: 'Dirección', value: user.address },
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
        { label: 'Necesitas un asistente en el municipio', value: form.location }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Ofreces asistencia en el municipio', value: form.location },
        { label: 'Ofreces asistencia en un ratio de (km)', value: form.formHelperInfo.ratio }
      ]
    }
  }

  // Transformar datos de un usuario recibidos del backend a un formato para pasarlos al componente
  function scheduleToInfo (form) {
    if (form.formRegularInfo) {
      return [
        { label: 'Necesitas asistencia los días de la semana', value: form.daysOfWeek },
        { label: 'En general, necesitas asistencia en las franjas horarias', value: form.timeOfDay }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Ofreces asistencia los días de la semana', value: form.daysOfWeek },
        { label: 'En general, ofreces asistencia en las franjas horarias', value: form.timeOfDay }
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
        { label: 'Tareas para las que necesitas apoyo', value: form.tasks },
        { label: 'Necesitas que asistente tenga vehículo', value: form.vehicle ? 'Sí' : 'No' }
      ]
    } else if (form.formHelperInfo) {
      return [
        { label: 'Tareas en las que puedes asistir', value: form.tasks },
        { label: 'Dispones de vehículo propio', value: form.vehicle ? 'Sí' : 'No' }
      ]
    }
  }
}
