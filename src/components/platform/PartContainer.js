/**
 * Dentro de platform, las distintas partes de cada página (formadas por bloques) tienen un estilo por defecto.
 */

export default function PartContainer ({ children }) {
  return (
    // El id es necesario porque el componente paginationMenu usa la anchura de este componente para calcular cuántas páginas muestra
    <div id='partContainer' className='p-4 dark:text-white w-full sm:shadow-md sm:max-w-6xl mx-auto bg-white pt-4 lg:p-10 lg:pt-6 sm:rounded-xl flex flex-col border-t sm:dark:border dark:bg-gray-800 sm:border dark:border-gray-700'>
      {children}
    </div>
  )
}
