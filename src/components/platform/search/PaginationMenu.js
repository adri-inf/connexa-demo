import React, { useState, useEffect, useCallback } from 'react'
import { useAccessibility } from '@/context/accesibility'

export default function PaginationMenu ({ totalPages, actualPage, setPage }) {
  const { accessibilityLevel } = useAccessibility()
  const [visiblePages, setVisiblePages] = useState([])
  const [componentWidth, setComponentWidth] = useState(0)
  const [maxPages, setMaxPages] = useState(0)
  const [minPages, setMinPages] = useState(0) // Mínimo de páginas visibles

  useEffect(() => {
    // Ajusta el valor de maxPages en función del tamaño de los botones de paginación.
    // El valor 80 es una estimación del ancho de cada botón de página en píxeles.
    // Si se necesita que los botones se oculten más rápido, aumentar este valor.
    console.log(accessibilityLevel)
    switch (accessibilityLevel) {
      case 1:
        setMaxPages(Math.floor(componentWidth / 120))
        setMinPages(2)
        break
      case 2:
        setMaxPages(Math.floor(componentWidth / 180))
        setMinPages(1)
        break
      case 3:
        setMaxPages(Math.floor(componentWidth / 200))
        setMinPages(1)
        break
    }
  }, [accessibilityLevel, componentWidth])

  // Función para obtener el ancho del componente con ID "partContainer"
  const getComponentWidth = () => {
    const element = document.getElementById('partContainer')
    return element ? element.getBoundingClientRect().width : window.innerWidth
  }

  // Función para calcular cuántas páginas se deben mostrar según el ancho de la ventana
  const calculateVisiblePages = useCallback(() => {
    // Calcula el número de páginas visibles en función del ancho de la ventana.
    // Se limita entre el número máximo de páginas (maxPages) y el número total de páginas disponibles (totalPages).
    // También se asegura de que haya al menos 3 páginas visibles, incluso si el ancho de la ventana es pequeño.
    const pagesToShow = Math.max(Math.min(maxPages, totalPages), minPages)

    const pages = []

    // Calculamos el rango de páginas que se deben mostrar.
    // Empieza mostrando páginas alrededor de la página actual, manteniendo la página actual en el centro.
    // Si no se pueden mostrar suficientes páginas antes o después de la página actual, ajustamos el rango.
    let start = Math.max(actualPage - Math.floor(pagesToShow / 2), 1)
    const end = Math.min(start + pagesToShow - 1, totalPages)

    // Si el rango de páginas calculado es más corto de lo deseado, ajustamos el valor de 'start' para mostrar más páginas.
    if (end - start + 1 < pagesToShow) {
      start = Math.max(end - pagesToShow + 1, 1)
    }

    // Agregamos todas las páginas dentro del rango calculado a la lista de páginas visibles.
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Asegúrate de que la última página siempre esté presente
    if (!pages.includes(totalPages) && componentWidth > 300) {
      if (pages[pages.length - 1] !== totalPages - 1 && componentWidth > 350) {
        pages.push('...')
      }
      pages.push(totalPages)
    }

    // Actualizamos el estado con las páginas visibles calculadas.
    setVisiblePages(pages)
  }, [componentWidth, actualPage, totalPages, maxPages, minPages]) // Dependencias específicas

  // Hook para escuchar el cambio de tamaño del componente y recalcular las páginas visibles
  useEffect(() => {
    const handleResize = () => {
      setComponentWidth(getComponentWidth())
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Inicializa el ancho al montar el componente

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    calculateVisiblePages()
  }, [calculateVisiblePages])

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber)
  }

  const handlePreviousClick = () => {
    if (actualPage > 1) {
      setPage(actualPage - 1)
    }
  }

  const handleNextClick = () => {
    if (actualPage < totalPages) {
      setPage(actualPage + 1)
    }
  }

  return (
    <div className='overflow-hidden mx-auto mb-16 lg:mb-0'>
      <nav aria-label='Page navigation example' className='mx-auto'>
        <ul className='flex items-center -space-x-px h-10 text-base'>
          {/* Botón de "Previous" */}
          <li>
            <a
              onClick={handlePreviousClick}
              className='hover:cursor-pointer flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              aria-disabled={actualPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='w-3 h-3 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 1 1 5l4 4'
                />
              </svg>
            </a>
          </li>

          {/* Generación de las páginas */}
          {visiblePages.map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <a
                  onClick={() => handlePageClick(pageNumber)}
                  aria-current={pageNumber === actualPage ? 'page' : undefined}
                  className={`hover:cursor-pointer flex items-center justify-center px-4 h-10 leading-tight ${
                  pageNumber === actualPage
                    ? 'z-10 text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
                >
                  {pageNumber}
                </a>
              </li>
            )
          })}

          {/* Botón de "Next" */}
          <li>
            <a
              onClick={handleNextClick}
              className='hover:cursor-pointer  flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              aria-disabled={actualPage === totalPages}
            >
              <span className='sr-only'>Next</span>
              <svg
                className='w-3 h-3 rtl:rotate-180'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 9 4-4-4-4'
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>

  )
}
