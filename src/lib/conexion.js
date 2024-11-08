const BASE_URL = "http://200.48.235.251:6969";
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