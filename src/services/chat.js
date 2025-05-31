/**
 * El servicio de favorite gestiona las peticiones al backend relacionadas con los usuarios helpers favoritos
 */

export const chatService = {

  /**
   * Función GET que obtiene los chats de un usuario.
   */
  async getAllUserChats (userId) {

  },

  /**
   * Función GET que obtiene los mensajes de un chat específico.
   */
  async getChatMessages (userId, chatId, role) {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (role === 'regular') {
      return {
        success: true,
        status: 200,
        data: {

          messages: [
            {
              id: '1',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c', // Usuario (TEA)
              content: 'Hola',
              readAt: null,
              createdAt: '2025-05-18T15:09:04.000Z',
              updatedAt: '2025-05-18T15:09:04.000Z'
            },
            {
              id: '2',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6', // Asistente
              content: 'Hola, encantado de conocerte 😊',
              readAt: null,
              createdAt: '2025-05-18T15:09:06.000Z',
              updatedAt: '2025-05-18T15:09:06.000Z'
            },
            {
              id: '3',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
              content: '¿Para qué necesitas mi ayuda?',
              readAt: null,
              createdAt: '2025-05-18T15:09:10.000Z',
              updatedAt: '2025-05-18T15:09:10.000Z'
            },
            {
              id: '4',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
              content: 'Necesito ayuda para las tareas domésticas.',
              readAt: null,
              createdAt: '2025-05-18T15:09:15.000Z',
              updatedAt: '2025-05-18T15:09:15.000Z'
            }
          ]
        }
      }
    }
    if (role === 'helper') {
      return {
        success: true,
        status: 200,
        data: {

          messages: [
            {
              id: '1',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
              content: 'Hola',
              readAt: null,
              createdAt: '2025-05-18T15:09:04.000Z',
              updatedAt: '2025-05-18T15:09:04.000Z'
            },
            {
              id: '2',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c', // Asistente
              content: 'Hola, encantado de conocerte 😊',
              readAt: null,
              createdAt: '2025-05-18T15:09:06.000Z',
              updatedAt: '2025-05-18T15:09:06.000Z'
            },
            {
              id: '3',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
              content: '¿Para qué necesitas mi ayuda?',
              readAt: null,
              createdAt: '2025-05-18T15:09:10.000Z',
              updatedAt: '2025-05-18T15:09:10.000Z'
            },
            {
              id: '4',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
              content: 'Necesito ayuda para las tareas domésticas.',
              readAt: null,
              createdAt: '2025-05-18T15:09:15.000Z',
              updatedAt: '2025-05-18T15:09:15.000Z'
            }
          ]
        }
      }
    }
  }

}
