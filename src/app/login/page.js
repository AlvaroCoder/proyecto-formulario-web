'use client'
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/authentication';
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
  
    const validateDNI = (dni) => {
      const dniRegex = /^[0-9]{8}$/;
      return dniRegex.test(dni);
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
<div className="flex justify-center items-center h-screen bg-gray-100">
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
