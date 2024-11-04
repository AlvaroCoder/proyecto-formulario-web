const BASE_URL = "http://127.0.0.1:8000";
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