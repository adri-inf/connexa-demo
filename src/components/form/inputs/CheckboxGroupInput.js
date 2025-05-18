export default function CheckboxGroupInput ({ label, options, errors, bg, ...rest }) {
  return (
    <div className='mb-5'>
      <label
        className={`block mb-2 text-base font-semibold ${errors ? 'text-error dark:text-error-dark' : 'text-gray-900 dark:text-white'}`}
      >{label}
      </label>

      <div className={bg && 'bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'}>
        {options.map((option, index) => (
          <div key={index} className='flex items-center mb-2'>
            <input
              id={option}
              type='checkbox'
              value={option}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              {...rest}
            />
            <label
              htmlFor={option}
              className='ms-2 text-base font-medium text-gray-900 dark:text-gray-300'
            >
              {option}
            </label>
          </div>
        ))}
      </div>

      {errors && (
        <span className='text-xs text-error dark:text-error-dark'>
          {errors.message}
        </span>
      )}
    </div>

  )
}
