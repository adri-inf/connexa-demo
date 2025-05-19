'use client'

import { useRef, useState } from 'react'
import { DefaultBackground } from '../backgrounds/DefaultBackground'
export default function ModalHelp ({ setShowHelpModal, Part }) {
  const totalSlides = Part.totalSlides

  const containerRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [title, setTitle] = useState('')

  const scrollToSlide = (index) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth
      containerRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: 'smooth'
      })
      setCurrentIndex(index)
    }
  }

  const scroll = (dir) => {
    if (currentIndex === totalSlides - 1 && dir === 'right') { return setShowHelpModal(false) }
    const newIndex = dir === 'left'
      ? Math.max(0, currentIndex - 1)
      : Math.min(totalSlides - 1, currentIndex + 1)

    scrollToSlide(newIndex)
  }

  return (
    <>
      <div
        className='fixed top-0 right-0 left-0 z-50 flex justify-center w-full items-center  max-h-full inset-0 overflow-y-auto'
        onClick={() => setShowHelpModal(false)}
      >
        <DefaultBackground />

        <div
          className='max-h-[85vh]  max-w-2xl flex flex-col h-[95vh] overflow-hidden shadow-lg relative w-full lg:m-4 p-4 lg:p-8 bg-white rounded-lg dark:bg-gray-800 text-black dark:text-white border border-gray-100 dark:border-gray-700'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-between mb-4 items-center'>
            {currentIndex !== 0 && (
              <button type='button' className='cursor-pointer group focus:outline-none' onClick={() => scroll('left')}>
                <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary dark:bg-primary-dark group-hover:bg-primary-hover dark:group-hover:bg-primary-hover-dark'>
                  <svg className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                    <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 1 1 5l4 4' />
                  </svg>
                </span>
              </button>
            )}

            <h2 className='text-xl lg:text-3xl font-semibold mx-auto'>{title}</h2>

            <button type='button' className='cursor-pointer group focus:outline-none' onClick={() => scroll('right')}>
              <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary dark:bg-primary-dark group-hover:bg-primary-hover dark:group-hover:bg-primary-hover-dark'>
                <svg className='w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 6 10'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 9 4-4-4-4' />
                </svg>
              </span>
            </button>
          </div>

          {/* Slide container con scroll horizontal */}
          <div
            ref={containerRef}
            className='relative flex-1 flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth'
          >
            <Part setTitle={setTitle} index={currentIndex} />
          </div>

          {/* Paginación */}
          <div className='mx-auto z-30 flex bottom-5 space-x-3 rtl:space-x-reverse p-3'>
            {Array.from({ length: Part.totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === i
                    ? 'bg-primary dark:bg-primary-dark'
                    : 'bg-gray-200 dark:bg-gray-300'
                } hover:bg-primary-hover dark:hover:bg-primary-hover-dark`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
