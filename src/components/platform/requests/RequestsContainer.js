import Link from 'next/link'
import RequestCard from './RequestCard'

export default function RequestsContainer ({ requests, search, role }) {
  return (
    <>
      <div className='flex flex-col gap-4 my-8'>
        {requests.length > 0 && (
          requests.map((request) => (
            <div
              key={request.id}
              className='p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'
            >
              <RequestCard
                id={request.helperUser?.id || request.regularUser?.id}
                firstName={request.helperUser?.firstName || request.regularUser?.firstName}
                lastName={request.helperUser?.lastName || request.regularUser?.lastName}
                profilePicture={request.helperUser?.profilePicture || request.regularUser?.profilePicture}
                email={request.helperUser?.email || request.regularUser?.email}
                phone={request.helperUser?.phone || request.regularUser?.phone}
                requestDate={request.requestDate}
                type={request.type}
                readAt={role === 'helper' ? request.readByHelperAt : request.readByRegularAt}
              />
            </div>
          ))
        )}

        {/* Si se ha realizado una búsqueda y no hay resultados */}
        {requests.length === 0 && search && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              No se ha encontrado ninguna solicitud con ese nombre.
            </div>
          </div>
        )}

        {/* Si un regular no se ha realizado una búsqueda y no hay resultados. */}
        {requests.length === 0 && !search && role === 'regular' && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              <p>¡Vaya! Todavía no has enviado ninguna solicitud a ningún asistente personal.</p>
              <p>Envía una haciendo click en el botón <strong>'Contactar'</strong> al visualizar un asistente.</p>
              <p><Link className='underline text-primary hover:text-primary-hover dark:text-primary-dark dark:hover:text-primary-hover-dark' href='/app/platform/search'>Haz click aquí para buscar asistentes.</Link></p>
            </div>
          </div>
        )}

        {/* Si un helper no se ha realizado una búsqueda y no hay resultados. */}
        {requests.length === 0 && !search && role === 'helper' && (
          <div className='text-center text-lg'>
            <div className='p-4 rounded-xl mx-auto max-w-xs'>
              <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
            </div>
            <div className='text-center text-gray-500 dark:text-gray-400'>
              Aún no tienes ninguna solicitud. Espera a que un usuario solicite contactar contigo.
            </div>
          </div>
        )}
      </div>
    </>
  )
}
