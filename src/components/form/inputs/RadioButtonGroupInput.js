/**
 * Cada option debe tener un value y una label, como
 * export const genderPreferenceOptions = [
 * { label: 'Indiferente2', value: 'Indiferente' },
 * { label: 'Mujer', value: 'Mujer' },
 * { label: 'Hombre', value: 'Hombre' }
 * ]
 */
export default function RadioButtonGroupInput ({ label, options, errors, bg, ...rest }) {
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
              id={option.label}
              type='radio'
              value={option.value}
              className='w-4 h-4 border-gray-300'
              {...rest}
            />
            <label
              htmlFor={option.label}
              className='block ms-2  text-base font-medium text-gray-900 dark:text-gray-300'
            >
              {option.value}
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
