'use client'
import { IconFavorite, IconSolidFavorite } from '@/components/icons/platform'
import { useNotification } from '@/context/notification'
import { favoriteService } from '@/services/favorite'
import { getIdFromCookieClient } from '@/utils/sessionClient'
import { useState } from 'react'

/**
 * Componente botón favoritos para agregar como favorito a un usuari ohelper
 */
export default function ButtonFavorite ({ helperId, isDefaultFavorite, iconClassName = 'size-7' }) {
  // Estado para manejar si un usuario es o no favorito
  const [isFavorite, setIsFavorite] = useState(isDefaultFavorite)
  // Estado para manejar icono cargando
  const [isLoading, setIsLoading] = useState(false)
  const { notify } = useNotification()

  async function handleFavoriteClick () {
    const userId = getIdFromCookieClient() // Id del propio usuario
    try {
      setIsLoading(true)
      if (isFavorite) {
        await favoriteService.deleteFavorite(userId, helperId)
        setIsFavorite(false)
      } else {
        await favoriteService.sendFavorite(userId, { favoriteUserId: helperId })
        setIsFavorite(true)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      // Si hay algún fallo en la request, se muestra un error
      notify('Ha ocurrido un fallo en el servidor', 'error')
    }
  }

  return (

    <button
      disabled={isLoading}
      onClick={handleFavoriteClick}
      className={`text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1 ${isFavorite && 'text-yellow-300 hover:text-yellow-400 dark:text-yellow-300 dark:hover:text-yellow-500'}`}
    >
      {isFavorite ? <IconSolidFavorite className={iconClassName} /> : <IconFavorite className={iconClassName} />}
    </button>

  )
}
