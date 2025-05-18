'use client'
import React, { createContext, useContext, useState } from 'react'
import NotificationList from '../components/notifications/NotificationList.js'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const notify = (message, type = 'info') => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotification must be used within NotificationProvider')
  return context
}
