const BASE_URL = "http://200.48.235.251:6969";
export async function getBookedTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/booked_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getRemainTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/available_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getSoldTicketsHome(id_user) {
    return await fetch(`${BASE_URL}/home/sold_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getLastTicketSoldHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/last_sold_ticket/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getSoldOutTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/sold_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getAvailablesTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/available_tickets?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getPendingTicketsHome(id_user=1) {
    return await fetch(`${BASE_URL}/home/pending_tickets/?id_user=${id_user}`,{
        method : 'GET'
    })
}
export async function getQrLinkFormUser(data) {
    return fetch(`${BASE_URL}/home/qr_section`,{
        method : 'POST',
        headers :{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    })
}
export async function updateStatusTicketSold(data) {
    return fetch(`${BASE_URL}/home/confirm_ticket_sale`,{
        method : 'PUT',
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(data)
    })
}