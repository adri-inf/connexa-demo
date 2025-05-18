export const formService = {

  /**
   * Envía una solicitud PATCH para actualizar un form.
   */
  async sendUpdatedForm (userId, form) {
    return {
      success: true,
      status: 200
    }
  },
  /**
   * Envía una solicitud POST para subir el formulario de compatibilidad de un usuario.
   */
  async sendForm (userId, data) {
    return {
      success: true,
      status: 200
    }
  }
}
