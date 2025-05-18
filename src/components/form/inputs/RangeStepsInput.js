/**
 * Este componente es poco reutilizable
 */
import { useEffect, useState } from 'react'

export default function RangeStepsInput ({
  label, // Texto que se muestra como etiqueta del control deslizante.
  options,
  value,
  bg, // Para aplicar fondo gris
  defaultValue = 0, // Valor actual del rango (por defecto es 2.5).
  step = 0.5, // Tamaño del paso entre valores (por defecto es 0.5).
  errors, // Errores del formulario
  ...rest // Propiedades adicionales
}) {
  // Estado para el valor del rango
  const [rangeValue, setRangeValue] = useState(defaultValue)

  useEffect(() => {
    setRangeValue(value)
  }, [value])

  // Encontramos el valor actual más cercano en el array de duplas
  const currentLabel = options.find(item => item.value === parseFloat(rangeValue))

  return (
    <div className='relative z-0 w-full mb-5 flex flex-col'>
      <label
        htmlFor='steps-range'
        className={`block mb-2 text-base font-semibold ${errors ? 'text-error dark:text-error-dark' : 'text-gray-900 dark:text-white'}`}
      >
        {label}
      </label>

      <div className={bg && 'bg-gray-50 dark:bg-gray-700 p-3 rounded-lg'}>
        <input
          id='steps-range'
          type='range'
          min={Math.min(...options.map(item => item.value))}
          max={Math.max(...options.map(item => item.value))}
          step={step}
          className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'
          {...rest}
        />
      </div>

      {/* Mostrar solo la etiqueta correspondiente al valor actual */}
      {currentLabel && (
        <div className='mt-2'>
          <span className='text-base text-gray-500 dark:text-gray-400 font-semibold'>
            {currentLabel.label}
          </span>
        </div>
      )}

      {errors && (
        <span className='text-xs text-error dark:text-error-dark'>
          {errors.message}
        </span>
      )}
    </div>
  )
}
