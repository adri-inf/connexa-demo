export default function MessagesSkeleton () {
  return (
    <div className='flex flex-col gap-4 p-4 overflow-y-auto overflow-x-hidden h-full'>
      {/* Esqueleto de mensajes */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg shadow break-words ${
                  index % 2 === 0
                    ? 'bg-primary dark:bg-primary-dark text-white dark:text-black'
                    : 'bg-gray-200 text-black'
                } animate-pulse`}
          >
            <div className='h-4 w-32' /> {/* Esqueleto del contenido */}
          </div>
        </div>
      ))}

    </div>
  )
}
