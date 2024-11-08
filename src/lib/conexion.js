const BASE_URL = "https://asme-backend-l2jt.onrender.com";
export async function conexionLogin(dni="") {
    return fetch(`${BASE_URL}/login`,{
        method : 'POST',
        headers :  {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({dni})
    })
}
export async function conexionSignUp() {
    return 
}