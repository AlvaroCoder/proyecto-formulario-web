import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/authentication";

export default async function middleware(request=NextRequest) {
    
    const session = await getSession();    
    
    if (session !== null && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (!session && request.nextUrl.pathname.startsWith('/home')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (!session && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher : ['/','/login','/home']
}