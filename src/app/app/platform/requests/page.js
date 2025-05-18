/**
 * Componente del lado del cliente. Hace fetch de las solicitudes de contacto, y las muestra paginadas. Puede aplicar filtro por nombre.
 */
'use client'
import { useEffect, useState } from 'react'
import { requestService } from '@/services/request'
import RequestsContainer from '@/components/platform/requests/RequestsContainer'
import PartContainer from '@/components/platform/PartContainer'
import RequestsSkeleton from '@/components/platform/requests/RequestsSkeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import SearcherInput from '@/components/platform/search/SearcherInput'
import PaginationMenu from '@/components/platform/search/PaginationMenu'
import { getIdFromCookieClient, getRoleFromCookieClient } from '@/utils/sessionClient'

export default function RequestsContent () {
  const [role, setRole] = useState('')
  const router = useRouter() // Hook para acceder a la instancia del router

  const [loading, setLoading] = useState(true) // Estado de carga. Si hay que hacer fetch de data, iniciará en true.

  const searchParams = useSearchParams() // Hook para acceder a los parámetros de la URL

  // Extraer valores directamente de la URL
  const page = parseInt(searchParams.get('page')) || 1 // Página actual de la búsqueda, por defecto es la página 1
  const fullName = searchParams.get('name') || '' // Nombre de búsqueda, por defecto es vacío

  // Estado para almacenar los resultados de la búsqueda y la paginación
  const [requests, setRequests] = useState([])
  const [totalPages, setTotalPages] = useState(0) // Total de páginas disponibles para la paginación

  const pageLimit = 4 // Número de elementos por página

  // Obtener role de cookies
  useEffect(() => {
    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  // Para el fetch de datos
  useEffect(() => {
    const fetchRequests = async () => {
      let loadingTimeout

      try {
        // Activar el "loading" después de 100ms si la carga es lenta
        loadingTimeout = setTimeout(() => {
          setLoading(true)
        }, 100)

        const userId = getIdFromCookieClient() // Id del propio usuario
        // Hacer fetch a la API para obtener los resultados de búsqueda con los parámetros de la URL.
        const responseRequests = await requestService.getAllUserRequests(userId, null, page, pageLimit, fullName)

        console.log('Las requests son: ', responseRequests.data.requests)

        setRequests(responseRequests.data.requests)

        setTotalPages(responseRequests.data.totalPages) // Actualiza el total de páginas

        // Desactiva el estado de carga y limpia el timeout
        clearTimeout(loadingTimeout)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching requests:', error)
        clearTimeout(loadingTimeout) // Resetea el timeout en caso de error
        setLoading(false)
      }
    }

    fetchRequests() // Ejecuta la función para obtener los usuarios desde el backend
  }, [page, fullName]) // Dependencias: se vuelve a ejecutar cuando cambia la página o el nombre

  // Función para manejar el clic en el botón de búsqueda y actualizar los parámetros de la URL
  const handleSearchClick = (name) => {
    const params = new URLSearchParams() // Crea un nuevo objeto URLSearchParams para manipular los parámetros de la URL

    if (name) params.set('name', name) // Si se ha proporcionado un nombre, lo agrega a los parámetros
    params.set('page', '1') // Resetea la página a la 1 cuando se realiza una nueva búsqueda
    // Actualiza la URL sin hacer un full reload de la página (shallow routing)
    router.push(`?${params.toString()}`, { shallow: true })
  }

  // Función para manejar el cambio de página en la paginación
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString()) // Copia los parámetros actuales de la URL

    params.set('page', newPage) // Actualiza el parámetro 'page' con la nueva página seleccionada

    // Actualiza la URL con el nuevo parámetro 'page' sin hacer un full reload (shallow routing)
    router.push(`?${params.toString()}`, { shallow: true })
  }

  return (
    <>
      {loading && (
        <RequestsSkeleton />
      )}
      {!loading && (
        <>
          <h1 className='text-lg sm:text-2xl my-5 text-center font-semibold dark:text-white'>Historial de Solicitudes de Contacto</h1>

          <PartContainer>
            <div className='flex flex-row space-x-3 justify-center'>
              <SearcherInput handleSearchClick={handleSearchClick} defaultValue={fullName} />
            </div>
            <RequestsContainer requests={requests} search={fullName !== ''} role={role} />
            {/* Componente de paginación */}
            <PaginationMenu
              refreshUsers={() => {}} // La función de refresh está vacía porque el refresh se maneja automáticamente con los cambios en la URL
              setPage={handlePageChange} // Función para manejar el cambio de página
              totalPages={totalPages} // Total de páginas disponibles para la paginación
              actualPage={page}
            />
          </PartContainer>
        </>
      )}
    </>
  )
}
