import { NextRequest } from "next/server";


export async function proxy(request :NextRequest){
    console.log(request)

    
}

export const config = {
    matcher: "/api/:path*",
}