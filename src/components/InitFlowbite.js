/**
 * Este script es necesario, ya que lo necesitan los componentes de flowbite que usan js para alguna función.
 * Hay que hacer un import dinámico, ya que, al importar initFlowbite, el mero hecho de importarlo
 * utiliza alguna función del document. El problema es que document solo está disponible en el navegador,
 * así que, el cuando el useEffect es llamado(que se llama en el navegador), se hace la importación.
 */
'use client'

import { useEffect } from 'react'

export function InitFlowbite () {
  useEffect(() => {
    // Carga e inicializa Flowbite solo en el cliente
    import('flowbite').then(({ initFlowbite }) => {
      initFlowbite() // Inicialización de Flowbite
    })
  }, [])

  return null // No se renderiza nada
}
