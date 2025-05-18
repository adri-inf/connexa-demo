// Se podría agregar...rest. serían el resto de propiedades (no son )
export default function TextInput ({ type, id, htmlFor, label, errors, ...rest }) {
  return (
    <div className='relative z-0 w-full mb-5 group'>
      <input
        autoComplete='off'
        type={type}
        id={id}
        className={`block py-2.5 px-0 w-full ${errors ? 'border-error focus:border-error dark:border-error-dark dark:focus:border-error-dark' : 'border-gray-300 focus:border-primary dark:focus:border-primary-dark'} 
        text-md text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 peer`}
        placeholder=' '
        {...rest} // Resto de campos, como register de react hook form (si lo pasamos)
      />
      <label
        htmlFor={htmlFor}
        className={`z-0 peer-focus:font-medium ${errors ? 'text-error peer-focus:text-error dark:text-error-dark dark:peer-focus:text-error-dark' : 'text-gray-500 peer-focus:text-primary dark:peer-focus:text-primary-dark'} absolute text-md duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
      >
        {label}
      </label>

      {errors && (
        <span className='text-xs text-error dark:text-error-dark'>
          {errors.message}
        </span>
      )}
    </div>
  )
}
