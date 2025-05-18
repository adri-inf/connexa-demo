'use client'

import { useState } from 'react'
import ModalHelp from './ModalHelp'
import { usePathname } from 'next/navigation'
import { HelpProfilePart } from './parts/HelpProfilePart'
import { HelpChatPart } from './parts/HelpChatPart'
import { HelpRequestPart } from './parts/HelpRequestPart'
import { HelpSearchPart } from './parts/HelpSearchPart'
import { HelpSearchProfilePart } from './parts/HelpSearchProfilePart'

export function HelpButton () {
  const [showHelpModal, setShowHelpModal] = useState(false) // Mostrar modal de contacto
  const pathname = usePathname()

  return (
    <>
      <button
        onClick={() => setShowHelpModal(true)}
        type='button'
        className='z-50 fixed bottom-4 right-4 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md text-primary-complementary dark:text-primary-dark-complementary'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='z-30 relative size-16'>
          <path fillRule='evenodd' d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z' clipRule='evenodd' />
        </svg>
      </button>

      {/* Modales de ayuda */}
      {showHelpModal && pathname.includes('search') && (
        <ModalHelp setShowHelpModal={setShowHelpModal} title='Búsqueda de Asistentes' Part={HelpSearchPart} />
      )}

      {showHelpModal && pathname.includes('search/') && (
        <ModalHelp setShowHelpModal={setShowHelpModal} title='Perfil de Asistente' Part={HelpSearchProfilePart} />
      )}

      {showHelpModal && pathname.includes('profile') && (
        <ModalHelp setShowHelpModal={setShowHelpModal} title='Perfil' Part={HelpProfilePart} />
      )}

      {showHelpModal && pathname.includes('requests') && (
        <ModalHelp setShowHelpModal={setShowHelpModal} title='Solicitudes' Part={HelpRequestPart} />
      )}

      {showHelpModal && pathname.includes('chats') && (
        <ModalHelp setShowHelpModal={setShowHelpModal} title='Chats' Part={HelpChatPart} />
      )}

    </>

  )
}
