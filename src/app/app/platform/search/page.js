/**
 * Page para que los regulars busquen helpers.
 */
'use client'

import PartContainer from '@/components/platform/PartContainer'
import HelpersGrid from '@/components/platform/search/HelpersGrid'
import PaginationMenu from '@/components/platform/search/PaginationMenu'
import SearcherInput from '@/components/platform/search/SearcherInput'
import SearchSkeleton from '@/components/platform/search/SearchSkeleton'
import { searchService } from '@/services/search'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ModalContact from '@/components/platform/search/ModalContact'
import { IconSolidFavorite } from '@/components/icons/platform'
import Link from 'next/link'
import DangerAlert from '@/components/form/DangerAlert'

export default function SearchPage () {
  const router = useRouter() // Hook para acceder a la instancia del router
  const searchParams = useSearchParams() // Hook para acceder a los parámetros de la URL

  // Extraer valores directamente de la URL
  const page = parseInt(searchParams.get('page')) || 1 // Página actual de la búsqueda, por defecto es la página 1
  const fullName = searchParams.get('name') || '' // Nombre de búsqueda, por defecto es vacío
  const favorites = searchParams.get('favorites') === 'true' // Mostrar sólo usuarios favoritos

  // Estado para almacenar los resultados de la búsqueda y la paginación
  const [helpers, setHelpers] = useState([]) // Lista de usuarios que cumplen con el filtro de búsqueda
  const [totalPages, setTotalPages] = useState(0) // Total de páginas disponibles para la paginación
  const [loading, setLoading] = useState(true) // Estado de carga, inicialmente en "true" para mostrar el esqueleto de carga
  const [showContactModal, setShowContactModal] = useState(false) // Mostrar modal de contacto
  const [incomplete, setIncomplete] = useState(false) // Controla si un usuario no tiene form
  const [actualContactHelper, setActualContactHelper] = useState({
    userId: '', // Id de usuario seleccionado
    firstName: '', // firstName de usuario seleccionado
    compatibility: ''
  })// id y firstName de Helper actual (al hacer click en contacto)

  const pageLimit = 6 // Número de elementos por página

  // 👇 useEffect para bloquear/desbloquear el scroll del body
  useEffect(() => {
    const helpButton = document.getElementById('help-button')

    if (showContactModal) {
      document.body.classList.add('overflow-hidden')
      if (helpButton) helpButton.style.visibility = 'hidden'
    } else {
      document.body.classList.remove('overflow-hidden')
      if (helpButton) helpButton.style.visibility = 'visible'
    }
  }, [showContactModal])

  // useEffect para ejecutar la búsqueda cada vez que cambian los parámetros de la URL (page o fullName)
  useEffect(() => {
    const fetchUsers = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)

        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL
        const responseHelpers = await searchService.searchHelpers(page, pageLimit, favorites, fullName, null, true)

        if (responseHelpers.success !== false && responseHelpers.message !== 'Usuario no tiene form, necesario para buscar asistentes') {
          setHelpers(responseHelpers.data.users) // Actualiza el estado de los resultados
          setTotalPages(responseHelpers.data.totalPages) // Actualiza el total de páginas
        } else {
          setIncomplete(true)
        }

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setLoading(false)
      } catch (error) {
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
      }
    }

    fetchUsers() // Ejecuta la función para obtener los usuarios desde el backend
  }, [page, fullName, favorites]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  // Función para manejar el clic en el botón de búsqueda y actualizar los parámetros de la URL
  const handleSearchClick = (name) => {
    const params = new URLSearchParams() // Crea un nuevo objeto URLSearchParams para manipular los parámetros de la URL

    if (name) params.set('name', name) // Si se ha proporcionado un nombre, lo agrega a los parámetros
    params.set('page', '1') // Resetea la página a la 1 cuando se realiza una nueva búsqueda
    params.set('favorites', favorites)
    // Actualiza la URL sin hacer un full reload de la página (shallow routing)
    router.push(`?${params.toString()}`, { shallow: true })
  }

  // Función para manejar el cambio de página en la paginación
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      setLoading(true)
      const params = new URLSearchParams(searchParams.toString()) // Copia los parámetros actuales de la URL

      params.set('page', newPage) // Actualiza el parámetro 'page' con la nueva página seleccionada

      // Actualiza la URL con el nuevo parámetro 'page' sin hacer un full reload (shallow routing)
      router.push(`?${params.toString()}`, { shallow: true })
    }
  }

  // Función para manejar el click en el botón de favorite
  const handleFavoriteClick = () => {
    const params = new URLSearchParams(searchParams.toString()) // Copia los parámetros actuales de la URL
    params.set('page', '1') // Resetea la página a la 1 cuando se realiza una nueva búsqueda
    if (favorites) { params.set('favorites', false) } else { params.set('favorites', true) }
    // Actualiza la URL sin hacer un full reload de la página (shallow routing)
    router.push(`?${params.toString()}`, { shallow: true })
  }

  // Función para manejar el click del botón contactar
  const handleContactClick = (userId, firstName, compatibility) => {
    setActualContactHelper({ userId, firstName, compatibility })
    setShowContactModal(true)
  }

  return (
    <div className='flex flex-col gap-y-6'>
      {showContactModal && (
        <ModalContact compatibility={actualContactHelper.compatibility} userId={actualContactHelper.userId} firstName={actualContactHelper.firstName} setShowContactModal={setShowContactModal} />
      )}
      {loading
        ? (
          // Si está cargando, muestra el esqueleto de carga
          <SearchSkeleton />
          )
        : (
          <PartContainer>
            {/* Si el user no tiene form, se muestra mensaje */}
            {incomplete && (
              <Link href='/app/form-init' className='mb-2'>
                <DangerAlert text='Haz click aqui para completar el formulario de compatibilidad. Esto es necesario para poder recomendarte asistentes que se ajusten a tus necesidades.' />
              </Link>
            )}
            <div className='flex flex-row space-x-3 justify-center'>
              {/* Campo de búsqueda */}
              <SearcherInput handleSearchClick={handleSearchClick} defaultValue={fullName} />
              {/* Boton filtrar por favoritos */}
              <button
                className={`p-3 aspect-square inline-flex justify-center items-center text-gray-400 border border-gray-300 rounded-lg bg-gray-50 focus:border-primary dark:focus:border-primary-dark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 ${favorites && 'text-yellow-300 dark:text-yellow-300'}`}
                onClick={handleFavoriteClick}
              >
                <IconSolidFavorite />
              </button>
            </div>

            {/* Muestra los resultados de la búsqueda */}
            <HelpersGrid handleContactClick={handleContactClick} options={helpers} />

            {/* Componente de paginación */}
            <PaginationMenu
              refreshUsers={() => {}} // La función de refresh está vacía porque el refresh se maneja automáticamente con los cambios en la URL
              setPage={handlePageChange} // Función para manejar el cambio de página
              totalPages={totalPages} // Total de páginas disponibles para la paginación
              actualPage={page}
            />
          </PartContainer>
          )}
    </div>
  )
}
