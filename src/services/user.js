/**
 * El servicio de autenticación gestiona las peticiones al backend relacionadas con los usuarios y su información
 * (datos básicos, formulario compatibilidad, imagen de perfil).
 */
export const userService = {

  /**
   * Envía una solicitud POST para subir la imagen de perfil del usuario.
   */
  async sendProfilePicture (userId, file) {
    return {
      success: true,
      status: 200,
      profilePicturePath: '2.webp'
    }
  },

  /**
   * Función GET que obtiene los datos de un usuario.
   * Incluimos las cookies a mano porque esta función se usará desde el lado del servidor para prerenderizar los datos.
   * Desde el servidor, las cookies no se mandan automáticamente.
   * Con simulate error, haremos que no haga la petición al backend, y vaya directamente al interceptor axios para intentar actualizar
   * el accessToken. Esto es para ahorrarnos una petición que sabemos que dará error.
   */
  async getUser (isRequest) {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (isRequest) {
      return {
        success: true,
        status: 200,
        data: {
          id: '5bb6a09e-7f17-4557-b6c4-18059cd390fe',
          profilePicture: '3.webp',
          firstName: 'Pedro',
          lastName: 'García',
          dateBirth: '1990-09-17',
          role: 'helper',
          helperInfo: {
            gender: 'male'
          },
          form: {
            id: '7d6a03bc-d45f-4746-a8f5-0726d2f1cc24',
            userId: '5bb6a09e-7f17-4557-b6c4-18059cd390fe',
            tasks: [
              'Apoyo en la organización y planificación',
              'Apoyo en la organización y planificación'
            ],
            vehicle: false,
            location: 'Ciudad Real',
            daysOfWeek: [
              'Miércoles',
              'Viernes',
              'Domingo',
              'Jueves'
            ],
            timeOfDay: [
              'Noche',
              'Mañana'
            ],
            aboutMe: 'Me gusta ayudar en Apoyo en la organización y planificación, Apoyo en la organización y planificación.',
            formHelperInfo: {
              formId: '7d6a03bc-d45f-4746-a8f5-0726d2f1cc24',
              userId: '5bb6a09e-7f17-4557-b6c4-18059cd390fe',
              ratio: '100',
              skills: [
                'Capacidad de adaptación a los cambios',
                'Aceptación de críticas y sugerencias de mejora'
              ]
            }
          },
          total_compatibility_percentage: 82.72838291025492,
          compatibility_location_percentage: 86.14191455127458,
          ratio_met: 1,
          compatibility_tasks_percentage: 0,
          compatibility_vehicle_percentage: 100,
          compatibility_days_percentage: 100,
          compatibility_time_percentage: 50,
          helper_age: 71,
          compatibility_age_percentage: 100,
          compatibility_gender_percentage: 100,
          favorite: false
        }
      }
    } else {
      return {
        success: true,
        status: 200,
        data: {
          id: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
          firstName: 'Isabel',
          lastName: 'Jiménez',
          email: 'isabel@example.com',
          phone: '626403857',
          address: 'Calle 69, Henarejos',
          dateBirth: '1978-12-19',
          role: 'regular',
          profilePicture: '1.webp',
          regularInfo: { userId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c' },
          form: {
            id: 'fa850fa4-8623-4e00-8916-cc58000f035a',
            userId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
            tasks: [
              'Desplazamientos en el vehículo personal del asistente',
              'Desplazamientos en transporte público',
              'Apoyo en toma de decisiones',
              'Acompañamiento gestiones médicas'
            ],
            vehicle: true,
            location: 'Madrigueras',
            daysOfWeek: ['Martes', 'Jueves', 'Viernes'],
            timeOfDay: ['Tarde'],
            aboutMe: 'Necesito ayuda en Apoyo en entorno laboral, Apoyo en entorno académico.',
            formRegularInfo: {
              formId: 'fa850fa4-8623-4e00-8916-cc58000f035a',
              userId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
              genderPreference: 'Mujer',
              agePreference: ['25-30', 'Mayor de 40']
            }
          }
        }
      }
    }
  },

  /**
   * Envía una solicitud PATCH para actualizar un usuario.
   */
  async sendUpdatedUser (userId, user) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud PATCH para actualizar la password de un usuario.
   */
  async sendUpdatedUserPassword (userId, user) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud PATCH para actualizar el email de usuario.
   */
  async sendUpdatedUserEmail (userId, user) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud PATCH para verificar el nuevo email de usuario.
   */
  async verifyNewUserEmail (userId, newEmailToken) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud DELETE para eliminar un usuario.
   */
  async deleteUser (userId) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud GET para comprobar si un email existe.
   */
  async emailExists (email) {
    return {
      success: true,
      status: 200,
      response: {}
    }
  }

}
