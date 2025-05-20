/**
 * El servicio de favorite gestiona las peticiones al backend relacionadas con los usuarios helpers favoritos
 */

export const chatService = {

  /**
   * Función GET que obtiene los chats de un usuario.
   */
  async getAllUserChats (userId) {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      success: true,
      status: 200,
      data: [
        {
          id: '9d5541db-e2ae-4725-b3d5-e9dc624e39ec',
          regularUserId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
          helperUserId: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6',
          createdAt: '2025-05-18T15:09:14.000Z',
          updatedAt: '2025-05-18T17:09:18.000Z',
          regularUser: {
            firstName: 'Sofía',
            lastName: 'Moreno',
            profilePicture: 'uploads/profilePictures/22.webp',
            id: '00161b06-cbd0-454a-8f9f-250ceef0cc9c'
          },
          helperUser: {
            firstName: 'Pedro',
            lastName: 'García',
            profilePicture: '3.webp',
            id: 'bdcaf3e1-e8be-45d1-8220-5e3bc4515dd6'
          },
          lastMessage: {
            content: 'Me cuesta organizarme.'
          },
          unreadMessages: 0
        },
        {
          id: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
          regularUserId: '00161b06-cbd0-454a-8f9f-250ceef0cc9c',
          helperUserId: '0014bbde-3ff6-4123-97bc-d83ab9c3f493',
          createdAt: '2025-05-15T10:33:22.000Z',
          updatedAt: '2025-05-18T17:09:04.000Z',
          regularUser: {
            firstName: 'Sofía',
            lastName: 'Moreno',
            profilePicture: 'uploads/profilePictures/22.webp',
            id: '00161b06-cbd0-454a-8f9f-250ceef0cc9c'
          },
          helperUser: {
            firstName: 'Laura',
            lastName: 'Martínez',
            profilePicture: '6.webp',
            id: '0014bbde-3ff6-4123-97bc-d83ab9c3f493'
          },
          lastMessage: {
            content: 'Hola'
          },
          unreadMessages: 1,
          messages: [
            {
              id: '7207abb5-5c0e-4e6b-8866-cfb46accaaf7',
              chatId: '9f131d0f-dbf7-46b4-b0d0-ec14d3a93d1d',
              senderId: '0329c225-bfc5-4b9b-8e06-517c330fc41a',
              content: 'Hola',
              readAt: null,
              createdAt: '2025-05-18T15:09:04.000Z',
              updatedAt: '2025-05-18T15:09:04.000Z'
            }
          ]
        }
      ]
    }
  },

  /**
   * Función GET que obtiene los mensajes de un chat específico.
   */
  async getChatMessages (userId, chatId) {
    await new Promise(resolve => setTimeout(resolve, 500))
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

}
