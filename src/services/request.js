/**
 * El servicio de request gestiona las peticiones al backend relacionadas con las solicitudes de contacto de regulars a helpers
 */

export const requestService = {
  /**
    * Envía una solicitud POST para enviar soliciutd
    * Devuelve el objeto que acaba de crear.
  */
  async sendRequest (userId, data) {
    return {
      data: {},
      success: true,
      status: 200
    }
  },

  /**
   * Función GET que obtiene todas las request de un usuario.
   */
  async getAllUserRequests (userId, accessToken = null, page, limit, fullName) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      status: 200,
      data: {
        requests: [
          {
            id: '1e0b587f-a9aa-4948-9ff4-edd7267071b9',
            regularUserId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
            helperUserId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
            requestDate: '2025-05-18T15:09:14.000Z',
            expirationDate: '2025-05-29',
            readByRegularAt: '2025-05-18T15:10:01.000Z',
            readByHelperAt: null,
            type: 'chat',
            helperUser: {
              firstName: 'Pedro',
              lastName: 'García',
              profilePicture: '3.webp',
              id: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6'
            }
          },
          {
            id: '2e0de45c-22fa-4891-aa32-c2bec4aaeafc',
            regularUserId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
            helperUserId: '0014bbde-3ff6-4123-97bc-d83ab9c3f493',
            requestDate: '2025-05-15T10:33:22.000Z',
            expirationDate: '2025-05-26',
            readByRegularAt: '2025-05-18T15:10:01.000Z',
            readByHelperAt: null,
            type: 'chat',
            helperUser: {
              firstName: 'Laura',
              lastName: 'Martínez',
              profilePicture: '6.webp',
              id: '0014bbde-3ff6-4123-97bc-d83ab9c3f493'
            }
          },
          {
            id: '2e0de45c-22fa-4891-aa32-c2bec4aaeafd',
            regularUserId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
            helperUserId: '0014bbde-3ff6-4123-97bc-d83ab9c3f493',
            requestDate: '2025-05-15T10:33:22.000Z',
            expirationDate: '2025-05-26',
            readByRegularAt: '2025-05-18T15:10:01.000Z',
            readByHelperAt: null,
            type: 'email',
            helperUser: {
              firstName: 'Fernando',
              lastName: 'López',
              profilePicture: '9.webp',
              id: '0014bbde-3ff6-4123-97bc-d83ab9c3f493'
            }
          },
          {
            id: '2e0de45c-22fa-4891-aa32-c2bec4aaeafe',
            regularUserId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
            helperUserId: '0014bbde-3ff6-4123-97bc-d83ab9c3f493',
            requestDate: '2025-03-15T10:33:22.000Z',
            expirationDate: '2025-05-26',
            readByRegularAt: '2025-05-18T15:10:01.000Z',
            readByHelperAt: null,
            type: 'phone',
            helperUser: {
              firstName: 'Fernando',
              lastName: 'López',
              profilePicture: '9.webp',
              id: '0014bbde-3ff6-4123-97bc-d83ab9c3f493'
            }
          }
        ],
        totalPages: 3,
        totalCount: 2,
        page: '1'
      }
    }
  },

  /**
   * Función GET que obtiene todas las requests realizadas a un usuario. Con active = true indicamos que queremos obtener una que esté activa.
   */
  async getAllRequestByHelperId (userId, helperUserId = null, active = false, accessToken = null) {
    return {
      success: true,
      status: 200,
      data: {}
    }
  },

  /**
   * Función GET que comprueba si un usuario tiene peticiones sin leer.
   */
  async checkUserHasunreadRequests (userId) {
    return {
      success: true,
      status: 200,
      data: {}
    }
  }

}
