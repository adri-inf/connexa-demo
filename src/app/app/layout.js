import { AccesibilityButton } from '@/components/navigation/AccesibilityButton'

export default function AppLayout ({ children }) {
  return (
    <>
      {/* {showChild && children} */}
      {children}
      <div className='fixed top-[65px] left-0 z-50'>
        <AccesibilityButton />
      </div>
    </>
  )
}
