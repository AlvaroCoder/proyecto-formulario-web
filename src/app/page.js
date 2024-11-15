'use client'
import Loading from '@/comp/loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { getSession, logout } from '@/lib/authentication';
import { getAvailablesTicketsHome, getBookedTicketsHome, getLastTicketSoldHome, getPendingTicketsHome, getQrLinkFormUser, getSoldOutTicketsHome } from '@/lib/conexionTickets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DialogTicket from '@/comp/DialogTicket';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PersonIcon from '@mui/icons-material/Person';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Home() {
  const router = useRouter();

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
  const [availableTickets, setAvailableTickets] = useState([]);
  const [raffleNumbers, setRaffleNumbers] = useState([]);
  const [raffleCount, setRaffleCount] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [dniUser, setDniUser] = useState("");
  useEffect(() => {
    // Simulación de llamada a una API
    const fetchData = async () => {
      setLoading(true);

      const session = await getSession();
      const value = session?.user;            
      const idUser = value?.user_data?.id_user;
      const username = value?.user_data?.first_name + " "+value?.user_data?.last_name
      const group_name = value?.user_data?.team_name
      const dni = value?.user_data?.dni
      
      setUserName(username);
      setGroupName(group_name);
      setDniUser(dni);

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

      setRaffleData(raffleInfo);
      setPaymentConfirmations(responsePendingTicketsJSON?.tickets_data?.tickets);

      setLoading(false);
    };

    fetchData();
  }, []);
  useEffect(()=>{
    setRaffleNumbers(availableTickets.slice(0, raffleCount));
  },[raffleCount, availableTickets]);

  const handleRaffleCountChange=(e)=>{
    const value = parseInt(e.target.value);
    setRaffleCount(isNaN(value) ? 0 : value);
  }
  const handleClickSendForm=async()=>{
    
    const newListTickets = raffleNumbers.map((item)=>({id_ticket : item?.id_ticket, number_ticket: String(item?.number_ticket)}))    
    const jsonToSend ={
      tickets_data : newListTickets,
      seller : userName
    }
    setLoading(true)
    const response = await getQrLinkFormUser(jsonToSend);
    const responseJSON = await response.json();
    const dataJSON = {
      ...jsonToSend,
      image_qr : responseJSON?.qr,
      link_form : responseJSON?.link
    }
    
    setLoading(false)
    const dataString = encodeURIComponent(JSON.stringify(dataJSON))
    router.push(`/generate-ticket?data=${dataString}`)    
  }
  const handleClickSignOut=async()=>{
    await logout();
    router.push(`/login`);
  }
  if (loading) {
    return (<Loading/>)
  }
  return (
    <div className='bg-gray-100 w-full h-full'>
        <div className='h-auto md:h-20 bg-white w-full flex flex-row items-center justify-between px-8'>
            <div className='flex flex-col md:flex-row '>
              <Image
                src={IMG_LOGO_UDEP}
                width={200}
                height={20}
                alt='Logo UDEP'
                priority={false}
                
              />
              <Image
                src={IMG_LOGO_ASME}
                width={120}
                height={50}
                alt='Logo ASME'
                priority={false}
                className='ml-9'
              />
            </div>
           <div className='flex flex-row items-center justify-center'>
            <Image
                src={IMG_LOGO_COSAI}
                width={150}
                height={50}
                alt='Logo COSAI'
                priority
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className='font-bold p-2 rounded-2xl border-black border-2 flex flex-row'>
                  <h1 className=''><PersonIcon/></h1>
                  <h1 className='md:block hidden'>{userName}</h1>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>
                  <Button  variant="ghost  " onClick={handleClickSignOut}>
                    <PowerSettingsNewIcon/>
                    <h1>Cerrar Sesión</h1> 
                  </Button>
                  </DropdownMenuItem>
                  
                </DropdownMenuContent>
              </DropdownMenu>
           </div>
        </div>
        <div className="p-8 bg-gray-100 w-full min-h-screen">
       <div className='flex flex-row items-center justify-between'>
         
        <div className='flex flex-col justify-center my-4' >
        <h1 className="text-2xl font-bold">Bienvenido {dniUser==="72778083"? "Chino 🤍 al ritmo de SAC" : (dniUser === "73885578" ? "El faraon love shady 🤍" : (dniUser==="001906490" ? "Mi parce 🤍" : userName))}</h1>
        <h1 className='py-2 rounded-xl bg-blue-800 text-white w-fit text-sm px-4'>{groupName}</h1>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="bg-blue-600 border-2 border-blue-700 text-white px-4 py-2 rounded-xl float-right">
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

                    <button className="w-full bg-[#084F96] text-white font-semibold py-2 rounded" onClick={handleClickSendForm}>
                      Generar Formulario
                    </button>
                    </div>
            </DialogContent>
        </Dialog>
       </div>
    
        {/* Información de rifas */}
        <div className="bg-gradient-to-r from-blue-200 to-blue-500 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold">Información de rifas</h2>
          <p className="text-sm text-gray-600 mb-4">Información relevante de las rifas que se están vendiendo</p>
          <div className="flex justify-around flex-wrap">
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
            <DialogTicket key={key} {...confirmation} />
          ))}
        </div>
        
    
        <footer className="mt-8 text-center text-gray-500">
          ©2024 COSAI Brand - Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
