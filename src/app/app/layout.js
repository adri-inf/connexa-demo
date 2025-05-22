import { AccesibilityButton } from '@/components/navigation/AccesibilityButton'

export default function AppLayout ({ children }) {
  return (
    <>
      {/* {showChild && children} */}
      {children}
      <AccesibilityButton />
    </>
  )
}
