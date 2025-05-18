export default function Button ({ text, ...rest }) {
  return (
    <button
      className='text-white dark:text-black bg-primary hover:bg-primary-hover dark:bg-primary-dark dark:hover:bg-primary-hover-dark font-medium rounded-lg text-md w-full px-5 py-2.5 text-center'
      {...rest}
    >
      {text}
    </button>
  )
}
