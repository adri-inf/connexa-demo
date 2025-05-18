/**
 * Page de profile. Está en el lado del servidor para aplicar el suspense.
 * Esto es debido a que dentro del supense debe haber como mínimo otro componente del lado del servidor,
 * para hacer uno o varios fetch.
 */
'use server'
import { Suspense } from 'react'
import ProfileFetcher from './profileFetcher'
import ProfileSkeleton from '@/components/platform/profile/ProfileSkeleton'

export default async function ProfilePage () {
  // Realizar el fetching en el servidorar el valor de 'roleToken' (en este caso, 'regular')

  return (
    <div className='flex flex-col gap-y-7'>

      {/* Carga el layout (top menu, left menu...) */}
      {/* Cuando todos los await de Content se resuelvan, se cargará content. Hasta entonces, se carga el fallback (esqueleto) */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileFetcher />
      </Suspense>
    </div>
  )
}
