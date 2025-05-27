/**
 * Meú lateral de la app (platform)
 */
'use client'
import Link from 'next/link'
import { IconChats, IconSearchHelpers, IconProfile, IconRequests, IconLogout } from '../icons/platformLeftMenu'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getRoleFromCookieClient, logoutClick } from '@/utils/sessionClient'
import { useCommonPlatform } from '@/context/commonPlatform'

export default function PlatformLeftMenu () {
  const pathname = usePathname() // Si el pathname acaba el helper o regular, no se tiene en cuenta
  const [role, setRole] = useState('')
  const router = useRouter()
  const { setOpenSidebar, openSidebar } = useCommonPlatform()

  // Obtener role de cookies
  useEffect(() => {
    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  const menuItems = [
    role === 'regular' && { href: '/app/platform/search', label: 'Asistentes', Icon: IconSearchHelpers }, // Si es un usuario regular, añadimos búsqueda de usuarios helpers
    { href: '/app/platform/profile', label: 'Perfil', Icon: IconProfile },
    { href: '/app/platform/requests', label: 'Solicitudes', Icon: IconRequests },
    { href: '/app/platform/chats', label: 'Chats', Icon: IconChats }
    // role === 'regular' && { href: '/app/platform/favorites', label: 'Favoritos', Icon: IconFavorites }
  ].filter(Boolean) // Filtrar los elementos nulos o falsos (si no es regular, se agrega false)

  return (
    <>
      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-700
        ${openSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-[calc(100dvh-80px)] flex flex-col justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-900'>
          {role && (
            <>
              <ul className='space-y-2 font-medium'>

                {/* Pasamos icon a Icon porque los componentes deben empezar por mayúscula */}
                {menuItems.map(({ href, label, Icon }, index) => (
                  <li key={index}>
                    <Link
                      href={href}
                      className={`relative flex items-center p-2 text-gray-900 rounded-lg dark:text-white group
                    ${pathname.startsWith(href) // El elemento activo será el que si href empiece igual que el pathName
                      ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800' // Elemento activo
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    >

                      <Icon active={pathname.startsWith(href)} /> {/* El icono activo será el que si href empiece igual que el pathName */}

                      <span className='ms-3'>{label}</span>
                    </Link>
                  </li>
                ))}

              </ul>

              <ul>
                <li>
                  <button
                    onClick={() => { logoutClick(router); setOpenSidebar(false) }}
                    className='relative w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white group hover:bg-gray-100 dark:hover:bg-gray-700'
                  >
                    <IconLogout />
                    <span className='ms-3'>Cerrar sesión</span>
                  </button>
                </li>
              </ul>
            </>
          )}

        </div>
      </aside>

      <div
        className={`bg-gray-900/50 h-screen dark:bg-gray-900/80 fixed inset-0 z-30 ${openSidebar ? 'visible' : 'hidden'}`}
        onClick={() => setOpenSidebar(false)}
      />

    </>
  )
}
