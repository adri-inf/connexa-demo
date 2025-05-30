import { IconChat, IconMail, IconPhone } from '@/components/icons/requests'
import { generateImgSrc } from '@/utils/profilePictures'
import { useRouter } from 'next/navigation'

export default function RequestCard ({ id, firstName, lastName, profilePicture, email, phone, requestDate, type, readAt }) {
  const router = useRouter()

  return (
    <div className='flex items-center xm:items-stretch flex-col w-full relative'>
      <div className='flex gap-2 justify-end w-full'>
        {/* Iconos */}
        {type === 'chat' && (
          <button
            className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
            onClick={() => { router.push(`/app/platform/chats?userId=${id}`) }}
          >
            <IconChat />
          </button>
        )}

        {type === 'phone' && phone && (
          <button
            className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
          >
            <a
              href={`tel:${phone}`}
              target='_blank' rel='noopener noreferrer'
            ><IconPhone />
            </a>
          </button>
        )}

        {type === 'email' && email && (
          <button
            className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full p-1'
            onClick={(e) => {
              e.preventDefault() // Evita la navegación estándar
              window.open(`mailto:${email}`)
            }}
          >
            <IconMail />
          </button>
        )}
      </div>
      <div className='flex flex-col xm:flex-row gap-x-8 gap-y-3 items-center'>
        <div className='relative w-24 h-24 flex-shrink-0'>
          <img
            className='w-full h-full object-cover rounded-full hover:scale-105 cursor-pointer transition-transform'
            src={generateImgSrc(profilePicture)}
            alt='user image'
            onClick={() => { router.push(`/app/platform/search/${id}`) }}
          />
          {readAt === null && (
            <span className='absolute top-2 sm:top-3 right-0 w-4 h-4 bg-red-500 rounded-full' />
          )}
        </div>

        <div className='flex flex-col text-md gap-y-1 w-full'>
          <p className='text-center xm:text-left text-lg font-semibold'>
            {firstName} {lastName}
          </p>
          <p className='flex items-center flex-row gap-x-2'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z' />
            </svg>

            <span className='font-semibold'>Fecha:</span> {new Date(requestDate).toLocaleDateString('es-ES')}
          </p>
          <p className='flex items-center flex-row gap-x-2'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z' />
            </svg>

            <span className='font-semibold'>
              Tipo:
            </span>
            {
              type === 'phone'
                ? ' Teléfono'
                : type === 'email'
                  ? ' Email'
                  : type === 'chat'
                    ? ' Chat'
                    : ' Método desconocido' // En caso de que no sea ninguno de los anteriores
            }
          </p>
          {/* Si se ha incluido email, se muestra */}
          {email && (
            <p className='flex items-center flex-row gap-x-2'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75' />
              </svg>

              <strong>Email: </strong> {email}
            </p>
          )}

          {/* Si se ha incluido teléfono, se muestra */}
          {phone && (
            <p className='flex items-center flex-row gap-x-2'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z' />
              </svg>

              <strong>Teléfono: </strong> {phone}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
