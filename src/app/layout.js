/**
 * Layout de Root. Contiene la metadata y el head. También aplica el tipo de letra por defecto.
 */
import { InitTheme } from '@/components/themes/InitTheme'
import { montserrat } from './fonts'
import './globals.css'
import { AccessibilityProvider } from '@/context/accesibility.js'
import { NotificationProvider } from '@/context/notification'

export const metadata = {
  title: 'Connexa',
  description: 'Connexa es una plataforma digital diseñada para conectar a profesionales de la asistencia personal con personas con Trastorno del Espectro Autista (TEA), fomentando su independencia y mejorando su calidad de vida.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <head>
        <meta name='viewport' content='width=device-width' />
      </head>

      {/* Antialiased para mejorar la calidad en ciertos monitores */}
      <body className={`${montserrat.className} antialiased`}>
        <InitTheme />
        <AccessibilityProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AccessibilityProvider>
      </body>
    </html>
  )
}
