'use client'
import Image from 'next/image'
import {  useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
import {QRCodeSVG} from 'qrcode.react'
import Link from 'next/link'

export default function page() {
  const params = useSearchParams();
  const data = JSON.parse(params.get("data"));
  const handleClick=()=>{
    const message = `Gracias por colaborar con nuestra rifas, puedes llenar el formulario en : ${data?.link_form}`
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }
  return (
   <Suspense>
     <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h2 className="text-lg font-semibold text-center mb-4">Página Rifa</h2>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-md font-bold mb-2 text-gray-800">Números de las Rifas</h3>
        <ul className='mb-4 text-gray-700'>
          {
            data?.tickets_data?.map((item, index)=><li key={index} className='text-blue-700 font-medium mb-1'>Nro {item?.number_ticket}</li>)
          }
        </ul>

        <h3 className="text-md font-bold mb-2 text-gray-800">Formulario de Registro</h3>
        <div className="w-full border border-gray-300 rounded-lg flex items-center justify-center mb-6 p-4">
          <QRCodeSVG
            value={data?.link_form}
            size={256} bgColor="#ffffff" fgColor="#084F96" 
          />
        </div>

        <button
          onClick={handleClick}
          className="bg-[#084F96] text-white w-full py-2 rounded-lg flex items-center justify-center mb-4"
        >
          <span className="mr-2">📲</span> Enviar a WhatsApp
        </button>

        <button
          className="text-gray-600 underline text-sm w-full text-center"
        >
          <Link href={"/"}>Regresar al inicio</Link>
        </button>
      </div>

      <footer className="text-xs text-gray-400 mt-8">
        ©2024 COSAI Brand. Todos los derechos reservados.
      </footer>
    </div>
   </Suspense>
  )
}
