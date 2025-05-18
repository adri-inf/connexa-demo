'use client'
import { getRoleFromCookieClient } from '@/utils/sessionClient'
import { useEffect, useState } from 'react'
import FormHelperPage from './FormHelperPage'
import FormRegularPage from './FormRegularPage'

export default function FormInitPage () {
// Obtenemos el role. En función del valor, renderizamos una page u otra
  const [role, setRole] = useState('')

  // Obtener role de cookies
  useEffect(() => {
    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  return (
    <>
      {role === 'helper' && (
        <FormHelperPage />
      )}

      {role === 'regular' && (
        <FormRegularPage />
      )}
    </>
  )
}
