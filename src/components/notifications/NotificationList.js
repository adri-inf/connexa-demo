import React from 'react'

const styles = {
  success: {
    border: 'border-green-500',
    bg: 'bg-green-100',
    bar: 'bg-green-500'
  },
  error: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    bar: 'bg-red-500'
  },
  info: {
    border: 'border-blue-500',
    bg: 'bg-blue-100',
    bar: 'bg-blue-500'
  }
}

const NotificationList = ({ notifications }) => {
  return (
    <div className='fixed top-3 left-1/2 -translate-x-1/2 sm:-translate-x-0 sm:left-auto sm:right-4 z-50 space-y-2 w-80'>
      {notifications.map((n) => {
        const style = styles[n.type] || styles.info
        return (
          <div
            key={n.id}
            className={`rounded-lg shadow-md p-4 border-l-4 ${style.border} ${style.bg} transition`}
          >
            <div className='flex flex-row items-center'>
              <svg className='shrink-0 inline w-4 h-4 me-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
              </svg>
              <div className='text-sm text-gray-800'>{n.message}</div>
            </div>

            <div className='h-1 mt-2 rounded bg-white dark:bg-gray-700 overflow-hidden'>
              <div className={`h-full ${style.bar} animate-progressBar`} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NotificationList
