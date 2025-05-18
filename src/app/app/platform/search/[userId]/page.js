/**
 * Page de profile de un helper, cuando un regular lo busca. Está en el lado del servidor para aplicar el suspense.
 * Esto es debido a que dentro del supense debe haber como mínimo otro componente del lado del servidor,
 * para hacer uno o varios fetch.
 */
'use server'

import ProfileSkeleton from '@/components/platform/profile/ProfileSkeleton'
import { Suspense } from 'react'
import HelperProfileFetcher from './helperProfileFetcher'

export default async function HelperProfilePage ({ params }) {
  const { userId } = await params

  return (
    <div className='flex flex-col gap-y-7'>

      {/* Carga el layout (top menu, left menu...) */}
      {/* Cuando todos los await de Content se resuelvan, se cargará content. Hasta entonces, se carga el fallback (esqueleto) */}
      <Suspense fallback={<ProfileSkeleton />}>
        <HelperProfileFetcher userId={userId} />
      </Suspense>
    </div>
  )
}
