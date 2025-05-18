export default function TextArea ({ label, htmlFor, id, placeholder, errors, ...rest }) {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={`block mb-2 text-base font-semibold ${errors ? 'text-error dark:text-error-dark' : 'text-gray-900 dark:text-white'}`}
      >{label}
      </label>

      <textarea
        id={id}
        rows='4'
        className='block p-2.5 w-full
        text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder={placeholder}
        {...rest}
      />

      {errors && (
        <span className='text-xs text-error dark:text-error-dark'>
          {errors.message}
        </span>
      )}
    </>
  )
}
