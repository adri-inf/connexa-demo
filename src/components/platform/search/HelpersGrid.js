import HelperCard from './HelperCard'

/**
 * Grid con los helpers actuales que se acaban de buscar (dependerán de los filtros y la búsqueda)
 * Options será una colección de usuarios con imgSrc, name, lastName y provincias.
 */
export default function HelpersGrid ({ handleContactClick, options }) {
  return (
    <div className='my-8'>
      {/* Si se encontraron usuarios */}
      {options.length > 0
        ? (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {options.map((user) => (
              <HelperCard
                handleContactClick={() => handleContactClick(user.id, user.firstName, user.total_compatibility_percentage)}
                key={user.id}
                favorite={user.favorite}
                userId={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                locations={user.form?.location} // Si es un array, lo convierte a string
                profilePicture={user.profilePicture}
                compatibility={user.total_compatibility_percentage}
              />
            ))}
          </div>
          )
        : (
          <>
            {/* No se encontraron usuarios */}
            <div className='text-center text-lg'>
              <div className='p-4 rounded-xl mx-auto max-w-xs'>
                <img src='/no-helpers.svg' alt='No se encontraron usuarios' />
              </div>
              <span>
                ¡Vaya! No se encontró ningún usuario con esos filtros, prueba a cambiarlos.
              </span>
            </div>

          </>

          )}
    </div>
  )
}
