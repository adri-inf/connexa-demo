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
        <p>
          La Asistencia Personal supone un cambio radical respecto a la forma
          de entender y atender la discapacidad. Ahora, el destinatario es quien
          decide el tipo de apoyo, cuándo y cómo lo recibirá, haciendo efectivo
          el ejercicio de su autodeterminación.
        </p>
      )
    },
    {
      question: '¿Cuáles son los beneficios de la asistencia personal?',
      answer: (
        <p>
          La asistencia personal mejora el desarrollo de la autonomía personal
          de las personas dependientes, lo que conlleva un aumento en las
          oportunidades de participación e inclusión social.
        </p>
      )
    },
    {
      question: '¿Qué tareas realiza un Asistente Personal?',
      answer: (
        <ul className='list-disc pl-5 space-y-2'>
          <li>Aseo y autocuidado</li>
          <li>Alimentación y actividades diarias</li>
          <li>Apoyo a la comunicación (uso de sistemas alternativos y aumentativos)</li>
          <li>Gestión del hogar (limpieza, mantenimiento, compras, comidas)</li>
          <li>Acompañamiento (desplazamientos al médico, trabajo, ocio, etc.)</li>
          <li>Apoyo en la planificación del día a día y toma de decisiones</li>
        </ul>
      )
    },
    {
      question: '¿Qué diferencias existen entre un Asistente Personal y un Cuidador?',
      answer: (
        <p>
          El rol del Asistente Personal NO es el de un cuidador. Un Asistente
          Personal apoya en las actividades de la vida diaria, mientras que el
          cuidador se centra en el cuidado personal. El Asistente Personal
          permite la vida independiente, respetando la autodeterminación de la
          persona.
        </p>
      )
    },
    {
      question: '¿Cómo se adaptan las tareas a las necesidades de la persona?',
      answer: (
        <p>
          Las tareas deben ajustarse a las necesidades particulares de cada
          persona con TEA, y serán acordadas por ambas partes, garantizando la
          flexibilidad necesaria para un apoyo personalizado y efectivo.
        </p>
      )
    },
    {
      question: '¿Cómo contribuye la asistencia personal a la inclusión social?',
      answer: (
        <p>
          La asistencia personal actúa como un agente de cambio, facilitando la
          inclusión social y la participación activa en la comunidad.
          Proporciona a las personas con TEA la libertad y autonomía necesarias
          para decidir sobre su propia vida, contribuyendo a su bienestar y
          satisfacción.
        </p>
      )
    },
    {
      question: '¿Qué impacto tiene la asistencia personal en las personas con TEA?',
      answer: (
        <p>
          La asistencia personal permite a las personas con TEA vivir de forma
          independiente, tomando decisiones sobre su vida, lo que mejora su
          calidad de vida y reduce la sobrecarga familiar. Además, posibilita
          alternativas a los ingresos residenciales no deseados.
        </p>
      )
    },
    {
      question:
        '¿Cómo se relaciona la asistencia personal con la Convención de los Derechos de las Personas con Discapacidad?',
      answer: (
        <p>
          La asistencia personal es un modelo de apoyo inclusivo que está
          alineado con los derechos fundamentales de las personas con
          discapacidad, recogidos en la Convención Internacional de la ONU.
          Facilita la participación plena en la sociedad como individuos de
          pleno derecho.
        </p>
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
