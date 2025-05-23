'use client'

import { useState, useRef, useEffect } from 'react'
import { ButtonThemeSwitcher } from '../themes/ButtonThemeSwitcher.js'
import { PlusTextButton } from './PlusTextButton.js'
import { MinusTextButton } from './MinusTextButton.js'
import { GrayScaleButton } from './GrayScaleButton.js'

export function AccesibilityButton () {
  const [showModal, setShowModal] = useState(false)
  const [topPosition, setTopPosition] = useState(100)
  const dropdownRef = useRef(null)
  const isDragging = useRef(false)
  const hasDragged = useRef(false)
  const startY = useRef(0)
  const offsetY = useRef(0)
  const DRAG_THRESHOLD = 5 // px
  const [openUpward, setOpenUpward] = useState(false)

  useEffect(() => {
    const savedTop = localStorage.getItem('accessibility-button-top')
    const defaultTop = window.innerHeight * 0.25
    setSafeTopPosition(savedTop ? parseInt(savedTop, 10) : defaultTop)
  }, [])

  const setSafeTopPosition = (newY) => {
    const buttonHeight = dropdownRef.current?.offsetHeight || 0
    const minY = 0
    const maxY = window.innerHeight - buttonHeight
    const safeY = Math.max(minY, Math.min(newY, maxY))
    setTopPosition(safeY)
    localStorage.setItem('accessibility-button-top', safeY)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return

      const deltaY = e.clientY - startY.current
      if (!hasDragged.current && Math.abs(deltaY) >= DRAG_THRESHOLD) {
        setShowModal(false) // ⬅️ Cierra el modal al empezar el drag
        hasDragged.current = true
      }

      if (hasDragged.current) {
        const newY = e.clientY - offsetY.current
        setSafeTopPosition(newY)
        localStorage.setItem('accessibility-button-top', newY)
      }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside (event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('click', handleClickOutside)
    } else {
      document.removeEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showModal])

  const handleMouseDown = (e) => {
    isDragging.current = true
    hasDragged.current = false
    startY.current = e.clientY
    offsetY.current = e.clientY - dropdownRef.current.getBoundingClientRect().top
  }

  const handleClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    const screenMiddle = window.innerHeight / 2
    setOpenUpward(topPosition > screenMiddle)

    setShowModal(prev => !prev)
  }

  // Para moviles
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return

      const deltaY = e.clientY - startY.current
      if (!hasDragged.current && Math.abs(deltaY) >= DRAG_THRESHOLD) {
        setShowModal(false) // ⬅️ Cierra el modal al empezar el drag
        hasDragged.current = true
      }

      if (hasDragged.current) {
        const newY = e.clientY - offsetY.current
        setSafeTopPosition(newY)
        localStorage.setItem('accessibility-button-top', newY)
      }
    }

    const handleTouchMove = (e) => {
      if (!isDragging.current || e.touches.length === 0) return

      const touch = e.touches[0]
      const deltaY = touch.clientY - startY.current
      if (!hasDragged.current && Math.abs(deltaY) >= DRAG_THRESHOLD) {
        setShowModal(false) // ⬅️ Cierra el modal al empezar el drag
        hasDragged.current = true
      }

      if (hasDragged.current) {
        e.preventDefault() // Evita que el body haga scroll
        const newY = touch.clientY - offsetY.current
        setSafeTopPosition(newY)
        localStorage.setItem('accessibility-button-top', newY)
      }
    }

    const stopDragging = () => {
      isDragging.current = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', stopDragging)
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('touchend', stopDragging)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', stopDragging)
      window.removeEventListener('touchmove', handleTouchMove, { passive: false })
      window.removeEventListener('touchend', stopDragging)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (dropdownRef.current) {
        const buttonHeight = dropdownRef.current.offsetHeight
        const maxY = window.innerHeight - buttonHeight
        if (topPosition > maxY) {
          setSafeTopPosition(maxY)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [topPosition])

  const handleTouchStart = (e) => {
    if (e.touches.length === 0) return

    const touch = e.touches[0]
    isDragging.current = true
    hasDragged.current = false
    startY.current = touch.clientY
    offsetY.current = touch.clientY - dropdownRef.current.getBoundingClientRect().top
  }

  return (
    <div
      className='inline-block fixed left-0 z-50'
      style={{ top: `${topPosition}px` }}
      ref={dropdownRef}
    >
      <button
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        type='button'
        className='text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none rounded-tr-lg rounded-br-lg text-sm p-1 cursor-move'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 122.88 122.88'
          fill='currentColor'
          className='w-7 h-7 text-primary-complementary dark:text-primary-dark-complementary'
        >
          <path d='M61.44,0A61.46,61.46,0,1,1,18,18,61.21,61.21,0,0,1,61.44,0Zm-.39,74.18L52.1,98.91a4.94,4.94,0,0,1-2.58,2.83A5,5,0,0,1,42.7,95.5l6.24-17.28a26.3,26.3,0,0,0,1.17-4,40.64,40.64,0,0,0,.54-4.18c.24-2.53.41-5.27.54-7.9s.22-5.18.29-7.29c.09-2.63-.62-2.8-2.73-3.3l-.44-.1-18-3.39A5,5,0,0,1,27.08,46a5,5,0,0,1,5.05-7.74l19.34,3.63c.77.07,1.52.16,2.31.25a57.64,57.64,0,0,0,7.18.53A81.13,81.13,0,0,0,69.9,42c.9-.1,1.75-.21,2.6-.29l18.25-3.42A5,5,0,0,1,94.5,39a5,5,0,0,1,1.3,7,5,5,0,0,1-3.21,2.09L75.15,51.37c-.58.13-1.1.22-1.56.29-1.82.31-2.72.47-2.61,3.06.08,1.89.31,4.15.61,6.51.35,2.77.81,5.71,1.29,8.4.31,1.77.6,3.19,1,4.55s.79,2.75,1.39,4.42l6.11,16.9a5,5,0,0,1-6.82,6.24,4.94,4.94,0,0,1-2.58-2.83L63,74.23,62,72.4l-1,1.78Zm.39-53.52a8.83,8.83,0,1,1-6.24,2.59,8.79,8.79,0,0,1,6.24-2.59Zm36.35,4.43a51.42,51.42,0,1,0,15,36.35,51.27,51.27,0,0,0-15-36.35Z' />
        </svg>
      </button>

      {showModal && (
        <div
          className={`border absolute left-0 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 dark:divide-gray-600
          ${openUpward ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          id='dropdown-user'
        >
          <ul className='py-1 space-y-2' role='none'>
            <li><ButtonThemeSwitcher /></li>
            <li><PlusTextButton /></li>
            <li><MinusTextButton /></li>
            <li><GrayScaleButton /></li>
          </ul>
        </div>
      )}

    </div>
  )
}
