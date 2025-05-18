/**
 * En los formularios, esto es el título de cada paso
 */
export default function StepTitle ({ text }) {
  return (
    <p className='mb-5 text-center text-2xl font-semibold dark:text-white'>
      {text}
    </p>
  )
}
