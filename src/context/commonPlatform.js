'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CommonPlatformContext = createContext()

export const CommonPlatformProvider = ({ children }) => {
  const [showBackgroundLeftMenuModal, setShowBackgroundLeftMenuModal] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  useEffect(() => {

  }, [openSidebar])

  return (
    <CommonPlatformContext.Provider value={{
      showBackgroundLeftMenuModal,
      setShowBackgroundLeftMenuModal,
      openSidebar,
      setOpenSidebar
    }}
    >
      {children}
    </CommonPlatformContext.Provider>
  )
}

export const useCommonPlatform = () => useContext(CommonPlatformContext)
