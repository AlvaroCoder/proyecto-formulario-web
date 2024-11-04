'use client'
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getSession } from '@/lib/authentication';
import { getAvailablesTicketsHome, getBookedTicketsHome, getLastTicketSoldHome, getPendingTicketsHome, getSoldOutTicketsHome } from '@/lib/conexionTickets';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {

    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(false);

    const IMG_LOGO_UDEP = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1723319328/udep_logo_eqcizp.png";
  const IMG_LOGO_ASME = "https://res.cloudinary.com/ddcb3fk7s/image/upload/v1729865992/logo-ASME-1_qazzct.png";
  const IMG_LOGO_COSAI = "https://res.cloudinary.com/dabyqnijl/image/upload/v1730493843/laztvzw7ytanqrdj161e.png";

  const [raffleData, setRaffleData] = useState({
    remainingRaffles: 0,
    soldRaffles: 0,
    lastSoldNumber: 0,
    availableRaffles : 0
  });
  const [paymentConfirmations, setPaymentConfirmations] = useState([]);
  const [pendingNumbers, setPendingNumbers] = useState([]);
  const [availableTickets, setAvailableTickets] = useState([]);
  const [raffleNumbers, setRaffleNumbers] = useState([]);
  const [raffleCount, setRaffleCount] = useState(0);

  useEffect(() => {
    // Simulación de llamada a una API
    const fetchData = async () => {
        setLoading(true);

        const session = await getSession();
      const value = session?.user;            
      const idUser = value?.user_data?.id_user;
      setUserName(value?.user_data?.first_name)


      const responseBookedTickets = await getBookedTicketsHome(idUser);
      const responseBookedJSON = await responseBookedTickets.json();
      
      const responseSoldOutTicket = await getSoldOutTicketsHome(idUser);
      const responseSoldOutTicketJSON = await responseSoldOutTicket.json();

      const responseAvailableTickets = await getAvailablesTicketsHome(idUser);
      const responseAvailableTicketsJSON = await responseAvailableTickets.json();
        setAvailableTickets(responseAvailableTicketsJSON?.tickets_data?.tickets);

        const responsePendingTickets = await getPendingTicketsHome(idUser);
        const responsePendingTicketsJSON = await responsePendingTickets.json();

        const responseLastNumSoldOutTickets = await getLastTicketSoldHome(idUser);
        const responseLastNumSoldOutTicketJSON = await responseLastNumSoldOutTickets.json();

      const raffleInfo = {
        availableRaffles : responseAvailableTicketsJSON?.tickets_data?.amount,
        remainingRaffles: responseBookedJSON?.tickets_data?.amount,
        soldRaffles: responseSoldOutTicketJSON?.amount?.amount,
        lastSoldNumber: responseLastNumSoldOutTicketJSON?.number ? parseInt(responseLastNumSoldOutTicketJSON?.number) : 0,
      };


      const pendingNumbersData = [
        { id: 1, raffle: '1', number: 'N37001' },
        { id: 2, raffle: '2', number: 'N37001' },
        { id: 3, raffle: '3', number: 'N37001' },
        { id: 4, raffle: '4', number: 'N37001' },
        { id: 5, raffle: '5', number: 'N37001' },
      ];

      setRaffleData(raffleInfo);
      setPaymentConfirmations(responsePendingTicketsJSON?.tickets_data?.tickets);
      setPendingNumbers(pendingNumbersData);
      setLoading(false);
    };

    fetchData();
  }, []);
  useEffect(()=>{
    setRaffleNumbers(availableTickets.slice(0, raffleCount));
  },[raffleCount, availableTickets])
  const handleRaffleCountChange=(e)=>{
    const value = parseInt(e.target.value);
    setRaffleCount(isNaN(value) ? 0 : value);
  }
  if (loading) {
    return (<div><h1>Cargando ...</h1></div>)
  }
  return (
    <div className='bg-gray-100 w-full h-full'>
        <div className='h-20 bg-white w-full flex flex-row items-center justify-between px-8'>
            <div className='flex flex-row'>
              <Image
                src={IMG_LOGO_UDEP}
                width={200}
                height={20}
                alt='Logo UDEP'
              />
              <Image
                src={IMG_LOGO_ASME}
                width={120}
                height={50}
                alt='Logo ASME'
              />
            </div>
            <Image
              src={IMG_LOGO_COSAI}
              width={150}
              height={50}
              alt='Logo COSAI'
            />
        </div>
        <div className="p-8 bg-gray-100 w-full h-screen">
       <div className='flex flex-row items-center justify-between'>
         
        <h1 className="text-2xl font-bold mb-4">Bienvenido {userName}</h1>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="bg-blue-600 text-white px-4 py-2 rounded-lg float-right">
                    Vender Rifa
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Nueva Venta</DialogTitle>
                <div className="w-full mx-auto py-2">
                    <h1 className="text-lg font-semibold mb-4">Cantidad de Rifas</h1>
                    <input
                        type="number"
                        onChange={handleRaffleCountChange}
                        value={raffleCount}
                        className="w-full p-2 border border-gray-300 rounded mb-4 text-center"
                    />

                    <h2 className="text-lg font-semibold mb-2">Números de las Rifas</h2>

                    <ul className="mb-4 flex flex-row flex-wrap">
                        {raffleNumbers.length > 0 ? (
                        raffleNumbers.map((number, index) => (
                            <li key={index} className="text-blue-600 p-2 ">
                                Nro : {number?.number_ticket}  
                            </li>
                        ))
                        ) : (
                        <li className="text-gray-500">No hay números de rifas disponibles</li>
                        )}
                    </ul>
                    <h2 className="text-lg font-semibold mb-2">Formulario de Registro</h2>
                    <div className="w-full h-48 border border-gray-300 flex items-center justify-center text-gray-500 mb-6">
                        No hay formulario para mostrar
                    </div>

                    <button className="w-full bg-[#084F96] text-white font-semibold py-2 rounded" >
                        <Link href={"/generate-ticket"}>
                        Generar Formulario
                        </Link>
                    </button>
                    </div>
            </DialogContent>
        </Dialog>
       </div>
    
        {/* Información de rifas */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-500 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Información de rifas</h2>
          <p className="text-sm text-gray-600 mb-4">Información relevante de las rifas que se están vendiendo</p>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-4xl font-bold">{raffleData.availableRaffles}</p>
              <p>Rifas Disponibles</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{raffleData.remainingRaffles}</p>
              <p>Rifas Pendientes</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{raffleData.soldRaffles}</p>
              <p>Rifas Vendidas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold">{raffleData.lastSoldNumber}</p>
              <p>Último Nro Vendido</p>
            </div>
          </div>
        </div>
    
        {/* Confirmaciones de pago */}
        <div className="bg-white p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Confirmaciones de pago ({paymentConfirmations.length})</h2>
          <p className="text-sm text-gray-600 mb-4">
            Información de las rifas que están por ser confirmadas por el encargado
          </p>
          {paymentConfirmations?.map((confirmation, key) => (
            <div key={key} className="flex items-center justify-between mb-2 p-2 border rounded">
              <div>
                <p className="font-semibold">Transacción {}</p>
                <p>Tickets: {}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-500">

                </button>
                <button className="text-red-500">
                </button>
              </div>
            </div>
          ))}
        </div>
        
    
        <footer className="mt-8 text-center text-gray-500">
          ©2024 COSAI Brand - Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
