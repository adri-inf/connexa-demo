/**
 * Fondo por defecto. Cambiará a dark o light según el campo className de la etiqueta html.
 */
export const DefaultBackground = () => (

  <div className='absolute inset-0 -z-10 bg-white dark:bg-gray-900'>
    <div className='h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]
     dark:bg-none'
    />
  </div>

)
