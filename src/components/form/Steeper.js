/**
 * Steeper (marca los pasos con iconos en los formularios)
 */
export default function Steeper ({ options, stepActive }) {
  return (
    <ol className='mt-2 flex items-center mx-auto w-full'>
      {options.map((Icon, index) => (
        <li
          key={index}
          className={`flex  ${index < options.length - 1 ? 'w-full' : ''} items-center ${
            index < options.length - 1
              ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700'
              : ''
          }`}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${
              stepActive === index
                ? 'bg-primary text-white dark:bg-primary-dark dark:text-black'
                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-100'
            }`}
          >
            <Icon />
          </span>
        </li>
      ))}
    </ol>
  )
}
