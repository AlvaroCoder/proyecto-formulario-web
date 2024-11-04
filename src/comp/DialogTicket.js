'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react'

import { updateStatusTicketSold } from '@/lib/conexionTickets';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DialogTicket({
    id_ticket,
    number_ticket,
    first_name,
    last_name,
    DNI,
    email,
    cell_phone,
    booking_time,
    evidence
}) {
    const [showEvidence, setShowEvidence] = useState(false);
    const {toast} = useToast();
    const router = useRouter();
    const handleClickSave=async()=>{
        const jsonToSend = {
            id_ticket,
            confirm : true
        }
        const response = await updateStatusTicketSold(jsonToSend);
        const responseJSON = await response.json();
        console.log(responseJSON);
        
        if (!response.ok) {
            toast({
                variant : 'destructive',
                title : "Error",
                description : "Algo salio mal en la API" 
            })
            return;
        }
        toast({
            title : "Exito",
            description : "Se confirmo la venta"
        });

        router.refresh()
    }
    const handleClickCancel=async()=>{
        const jsonToSend = {
            id_ticket,
            confirm : false
        }
        const response = await updateStatusTicketSold(jsonToSend);
        const responseJSON = await response.json();
        console.log(responseJSON);
        
        if (!response.ok) {
            toast({
                variant : 'destructive',
                title : "Error",
                description : "Algo salio mal en la API" 
            })
            return;
        }
        toast({
            title : "Exito",
            description : "Se confirmo la venta"
        });

        router.refresh()
    }

    const handleClickShowEvidence=()=>{
        setShowEvidence(!showEvidence);
    }
  return (
    <Dialog className="max-h-screen overflow-y-auto">
        <DialogTrigger  asChild>
            <Button className="w-full h-60 flex items-center justify-between mb-2 py-4 border rounded" variant="ghost">
                <div>
                    <p className='font-bold'>Transacción</p>
                    <p>Tickets: {number_ticket}</p>
                </div>
            </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto ">
            <DialogTitle>
                Ticket Nro {number_ticket}
            </DialogTitle>
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-6 h-fit ">
                <div className="space-y-2">
                    <p className="text-gray-700"><span className="font-semibold">Comprador:</span> {first_name || "N/A"} {last_name || "N/A"}</p>
                    <p className="text-gray-700"><span className="font-semibold">DNI:</span> {DNI || "N/A"}</p>
                    <p className="text-gray-700"><span className="font-semibold">Email:</span> {email || "N/A"}</p>
                    <p className="text-gray-700"><span className="font-semibold">Celular:</span> {cell_phone || "N/A"}</p>
                    <p className="text-gray-700"><span className="font-semibold">Hora de reserva:</span> {booking_time || "N/A"}</p>
                </div>
                {showEvidence ? (evidence && (
                    <div className="mt-4">
                    <p className="text-gray-700 font-semibold">Voucher:</p>
                    <Image
                        onClick={handleClickShowEvidence}
                        src={evidence}
                        alt="Evidence"
                        width={100}
                        height={200}
                        className="w-full h-auto rounded-md border border-gray-200 mt-2 object-cover"
                    />
                    </div>
                )) : <button onClick={handleClickShowEvidence}>
                        <p>Mostrar Imagen</p>
                    </button>}
                <div className='flex flex-col mt-12 '>
                    <Button variant="ghost" className="mt-4"  onClick={handleClickSave}>
                        Confirmar Compra
                    </Button>
                    <Button className="mt-4" onClick={handleClickCancel}>
                        Cancelar Compra
                    </Button>
                </div>
            </div>

        </DialogContent>
    </Dialog>
  )
}