/**
 * Page client side que contiene la parte interactiva de la page asistencia-personal (las preguntas y respuestas desplegables)
 */
'use client'
import { useState } from 'react'

export function InteractiveFaq () {
  const [activeIndexes, setActiveIndexes] = useState([])

  const toggleAnswer = (index) => {
    setActiveIndexes((prevState) =>
      prevState.includes(index)
        ? prevState.filter((i) => i !== index)
        : [...prevState, index]
    )
  }

  const faqItems = [
    {
      question: '¿Qué es la asistencia personal?',
      answer: (
        <>
          <p>La asistencia personal es una forma nueva de apoyar a las personas con discapacidad.</p>
          <p>Ahora, la persona decide qué apoyo necesita, cuándo y cómo lo quiere.</p>
          <p>Así se respeta su derecho a tomar decisiones.</p>
        </>
      )
    },
    {
      question: '¿Qué beneficios tiene?',
      answer: (
        <>
          <p>
            La asistencia personal ayuda a que la persona sea más autónoma.
          </p>
          <p>
            También mejora su participación social.
          </p>
        </>
      )
    },
    {
      question: '¿Qué tareas hace un asistente personal?',
      answer: (
        <>
          <p>
            Un asistente personal puede ayudar en:
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Aseo y autocuidado</li>
            <li>Comidas y tareas del hogar</li>
            <li>Comunicación (por ejemplo, con sistemas aumentativos)</li>
            <li>Compras, gestiones y trámites</li>
            <li>Acompañamiento (en el trabajo, en el ocio, etc.)</li>
            <li>Organización del día y toma de decisiones</li>
          </ul>
        </>
      )
    },
    {
      question: '¿Qué diferencia hay entre un asistente personal y un cuidador?',
      answer: (
        <>
          <p>
            El asistente personal no es un cuidador.
          </p>
          <p>
            El cuidador decide y cuida.
          </p>
          <p>
            El asistente respeta la autonomía de la persona.
          </p>
          <p>
            Le ayuda a vivir de forma independiente.
          </p>
        </>

      )
    },
    {
      question: '¿Se adaptan las tareas a cada persona?',
      answer: (
        <>
          <p>
            Sí.
          </p>
          <p>
            Las tareas se ajustan a las necesidades de cada persona con TEA.
          </p>
          <p>
            Se acuerdan entre ambas partes.
          </p>
          <p>
            Así se consigue un apoyo flexible y útil.
          </p>
        </>
      )
    },
    {
      question: '¿Cómo ayuda a la inclusión social?',
      answer: (
        <>
          <p>
            La asistencia personal permite que la persona con TEA participe más en la sociedad.
          </p>
          <p>
            Le da apoyo para tomar decisiones y vivir como quiera.
          </p>
          <p>
            Eso mejora su bienestar y su felicidad.
          </p>
        </>
      )
    },
    {
      question: '¿Qué impacto tiene en las personas con TEA?',
      answer: (
        <>
          <p>
            Las personas con TEA pueden vivir de forma más independiente.
          </p>
          <p>
            Toman decisiones sobre su vida.
          </p>
          <p>
            Esto mejora su calidad de vida y reduce el esfuerzo de sus familias.
          </p>
          <p>
            También se evitan ingresos en centros no deseados.
          </p>
        </>
      )
    },
    {
      question:
        '¿Qué relación tiene con los derechos de las personas con discapacidad?',
      answer: (
        <>
          <p>
            La asistencia personal respeta los derechos de las personas con discapacidad.
          </p>
          <p>
            Está basada en la Convención de la ONU.
          </p>
          <p>
            Ayuda a que puedan participar en la sociedad como cualquier otra persona.
          </p>
        </>
      )
    }
  ]

  return (
    <div className='space-y-10'>
      {faqItems.map((item, index) => (
        <div
          key={index}
          className='bg-white shadow-lg rounded-lg overflow-hidden'
        >
          <div
            className='flex items-start w-full text-left px-4 py-1 bg-primary hover:bg-primary-hover dark:bg-primary-dark hover:dark:bg-primary-hover-dark text-white dark:text-black text-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
            onClick={() => toggleAnswer(index)}
          >
            <div className='h-full mr-2 mt-1'>
              {activeIndexes.includes(index)
                ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='w-5 h-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  )
                : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='size-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  )}
            </div>
            {item.question}
          </div>
          {activeIndexes.includes(index) && (
            <div className='px-6 py-4 text-gray-700 dark:text-gray-300 dark:bg-gray-800 border border-gray-50 dark:border-gray-700'>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
