// Se podría agregar...rest. serían el resto de propiedades (no son )
/**
 * Options debe ser estilo:
 * options={[
    { value: 'female', label: 'Mujer' },
    { value: 'male', label: 'Hombre' },
    { value: 'other', label: 'Otro' }
  ]}
 */
export default function SelectInput ({ bg, id, htmlFor, options, label, value, errors, ...rest }) {
  return (
    <div className='relative z-0 w-full mb-5 group'>

      <div className={bg && 'bg-gray-50 dark:bg-gray-700 p-3 pt-0 rounded-lg'}>
        <select
          id={id}
          value={value}
          className={`block w-full py-2.5 px-0 ${errors ? 'border-error focus:border-error dark:border-error-dark dark:focus:border-error-dark' : 'border-gray-300 focus:border-primary dark:focus:border-primary-dark'}  text-base text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0  peer dark:text-white border-0`}
          {...rest}
        >
          {/* La primera opción será del estilo 'Selecciona un género'. Estará deshabilitada */}
          {options.map((option, index) => (
            <option
              key={index}
              value={option.value}
              disabled={index === 0}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <label
        htmlFor={htmlFor}
        className={`z-0 peer-focus:font-medium ${errors ? 'text-error peer-focus:text-error dark:text-error-dark dark:peer-focus:text-error-dark' : 'text-gray-500 peer-focus:text-primary dark:peer-focus:text-primary-dark'}  absolute text-md dark:text-gray-400 duration-300 transform -translate-y-6 ${bg && '-translate-y-8'} scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
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
