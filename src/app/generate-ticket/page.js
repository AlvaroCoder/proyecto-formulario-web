import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-center mb-4">Página Rifa</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-md font-bold mb-2 text-gray-800">Números de las Rifas</h3>


        <h3 className="text-md font-bold mb-2 text-gray-800">Formulario de Registro</h3>
        <div className="w-full border border-gray-300 rounded-lg flex items-center justify-center mb-6 p-4">

        </div>

        <button
          className="bg-[#084F96] text-white w-full py-2 rounded-lg flex items-center justify-center mb-4"
        >
          <span className="mr-2">📲</span> Enviar a WhatsApp
        </button>

        <button
          className="text-gray-600 underline text-sm w-full text-center"
        >
          Regresar al inicio
        </button>
      </div>

      <footer className="text-xs text-gray-400 mt-8">
        ©2024 COSAI Brand. Todos los derechos reservados.
      </footer>
    </div>
  )
}
