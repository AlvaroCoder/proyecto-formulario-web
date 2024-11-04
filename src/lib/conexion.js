const BASE_URL = "https://asme-backend.fly.dev";
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