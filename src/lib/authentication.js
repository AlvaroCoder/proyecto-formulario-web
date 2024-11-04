"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey="asme";
const URL_LOGIN_USER="https://asme-backend.fly.dev/login";

const key=new TextEncoder().encode(secretKey);
const timeExpiration =  30 * 60 * 1000;
export async function encrypt(payload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + timeExpiration))
    .sign(key);
}

export async function decrypt(input){
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  }

export async function login(dni="") {
        
    const response= await fetch(URL_LOGIN_USER,{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({dni})
    });
    const responseJson = await response.json(); 
    
    if (!response.ok) {
        return {
            error : true,
            message : responseJson?.detail
        }
    }
    console.log(responseJson);
    
    const expires = new Date(Date.now() + timeExpiration); 
    const user = {user_data : responseJson?.user_data};
    const session = await encrypt({user, expires});

    (await cookies()).set("session", session, 
        {expires, 
        httpOnly : true,
        path : '/',
        secure : true
        })
    
    return {
        error : false,
        message : "Ingreso exitoso"
    }
}
export async function logout() {
   await  cookies().set("session", "", {expires:new Date(0)}) 
}

export async function getSession() {
    const session = (await cookies()).get("session")   
    const sessionUser = session?.value;
    
    if(!sessionUser) return null;
    return await decrypt(sessionUser);
}

export async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;
  
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
      name: "session",
      value: await encrypt(parsed),
      httpOnly: true,
      expires: parsed.expires,
    });
    return res;
}
  