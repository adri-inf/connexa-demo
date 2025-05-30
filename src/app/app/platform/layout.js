/**
 * Layot de Platform. A partir de aquí, veremos un menu top y un menu left. Es la 'aplicación' como tal.
 */
'use client'
import { DefaultBackground } from '@/components/backgrounds/DefaultBackground'
import { HelpButton } from '@/components/help/HelpButton.js'
import PlatformLeftMenu from '@/components/navigation/PlatformLeftMenu'
import PlatformTopNav from '@/components/navigation/PlatformTopNav'
import { CommonPlatformProvider } from '@/context/commonPlatform'
import { getRoleFromCookieClient } from '@/utils/sessionClient'
import { Suspense, useEffect, useState } from 'react'

export default function PlatformLayout ({ children }) {
  const [role, setRole] = useState('')

  useEffect(() => {
    const role = getRoleFromCookieClient()
    setRole(role)
  }, [])

  return (
    <>
      <CommonPlatformProvider>
        <main className='flex-1 flex'>
          {/* Fondo */}
          <DefaultBackground />

          <PlatformTopNav />
          <PlatformLeftMenu />

          {/* Contenido */}
          {/* El overflow hidden es importante (para text-nowrap, por ejemplo) */}
          <Suspense>
            <div className='flex-1 sm:p-4 mt-16 lg:ml-64 overflow-hidden'>
              {children}
            </div>
          </Suspense>

          {role === 'regular' && (
            <HelpButton />
          )}
        </main>

      </CommonPlatformProvider>

    </>
  )
}
