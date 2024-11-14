'use client'
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/authentication';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function page() {
  const router = useRouter();
  const {toast} = useToast()
    const [dni, setDni] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (e) => {
      setDni(e.target.value);
    };
  
    const validateDNI = (dni='') => {
      const dniRegex = /^[0-9]{8}$/;
      return dniRegex.test(dni) || dni.trim() === "001906490";
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
  
      if (!validateDNI(dni)) {
        toast({
          variant:"destructive",
          title : "Error",
          description : "Numero de DNI incorrecto"
        })
        return;
      }
      setLoading(true);
      
      try {
        const response = await login(String(dni));
        if (response.error) {
          toast({
            title :"Error",
            variant : "destructive",
            description : `Error : ${response.message}`
          })
          return;
        }
        router.push("/")
        toast({
          title :"Exito",
          description : "Incio de sesion exitoso"
        });

      } catch (error) {
        toast({
          variant:"destructive",
          title:"Error",
          description : "Sucedio un problema con el inicio de sesión."
        })
      } finally {
        setLoading(false);
      }
    };
  return (
<div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div className='grid gap-2 grid-cols-3  mb-10'>

      <Image
        src={"https://res.cloudinary.com/ddcb3fk7s/image/upload/v1729865992/logo-ASME-1_qazzct.png"}
        alt='Logo de ASME'
        width={150}
        height={100}
        className='place-self-center'
      />
      <Image
        src={"https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png"}
        alt='Logo de la UDEP'
        width={300}
        height={100}
        className='place-self-center'

      />
      <Image
        src={"https://res.cloudinary.com/ddcb3fk7s/image/upload/v1731603076/Navy_Blue_and_White_Futuristic_Tech_Company_Presentation_1_zpaubk.png"}
        alt='Logo de la COSAI'
        width={200}
        height={100}
        className='place-self-center'

      />
    </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
        style={{ borderColor: "#084F96", borderWidth: "2px" }}
      >
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: "#084F96" }}>
          Iniciar Sesión
        </h2>
        <div className="mb-4">
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
            DNI
          </label>
          <input
            type="number"
            id="dni"
            value={dni}
            onChange={handleInputChange}
            placeholder="Ingresa tu DNI"
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            style={{ borderColor: "#084F96" }}
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white font-semibold rounded-md"
          style={{ backgroundColor: loading ? "#000000" : "#084F96" }}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );  
}
