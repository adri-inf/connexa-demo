/**
 * El servicio de autenticación gestiona las peticiones al backend relacionadas con la autenticación.
 */

export const authService = {
  /**
   * Envía una solicitud POST para registrar un usuario.
   * Esta función se utiliza para enviar los datos del nuevo usuario (por ejemplo, nombre, correo electrónico, contraseña)
   * al servidor para su registro en la base de datos. Devuelve un token de registro, necesario para verificar la cuenta.
   */
  async sendRegister (data) {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud PUT para loguear a un usuario.
   * Esta función envía las credenciales del usuario (correo y contraseña) al backend para autenticarlo.
   * Si la autenticación es exitosa, el servidor devolverá un accessToken y un refreshToken.
   */
  async sendLogin (data) {
    return {
      success: true,
      status: 200,
      data: {
        profilePicture: '2.webp',
        role: 'admin'
      }
    }
  },

  /**
   * Envía una solicitud POST para verificar una cuenta.
   * Esta función se utiliza para enviar los datos necesarios para verificar la cuenta de un usuario después de un registro.
   * Es necesario un código enviado al email y un registerToken, creado tras realizar el registro.
   * Si la verificación es exitosa, cuenta como un login, y se devuelve accessToken y refreshToken
   */
  async sendVerify (data) {
    return {
      success: true,
      status: 200,
      user: {}
    }
  },

  /**
   * Envía una solicitud POST para actualizar el accessToken del usuario. Es necesario el refreshToken.
   * Si el refreshToken no es válido o ha expirado, se lanzará una excepción.
   */
  async updateAccessToken () {
    return {
      success: true,
      status: 200
    }
  },

  /**
   * Envía una solicitud DELETE para hacer el logout.
   * Esto elimina cookies accessToken y refreshToken
   */
  async logout () {

  }

}
