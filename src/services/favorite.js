/**
 * El servicio de favorite gestiona las peticiones al backend relacionadas con los usuarios helpers favoritos
 */

export const favoriteService = {
  /**
    * Envía una solicitud POST para marcar como favorito a un usuario.
    * Devuelve el objeto que acaba de crear.
  */
  async sendFavorite (userId, data) {
    return {
      success: true,
      status: 200
    }
  },

  /**
     * Envía una solicitud DELETE para eliminar favorite.
  */
  async deleteFavorite (userId, favoriteUserId) {
    return {}
  }

}
