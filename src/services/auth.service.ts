
"use server"

import { setTokencookie } from "@/lib/token.uitilits"

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
if(!BASE_API_URL){
    throw new Error("API base URL is not defined in environment variables.")
}

export async function getNewTokenWithRefreshToken (refreshToken : string): Promise<boolean> {
    try{
        const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookies: `refreshToken=${refreshToken}`,
            },
            body: JSON.stringify({ refreshToken }),
        })
        if (!res.ok) {
            console.error("Failed to refresh token:", res.statusText)
            return false
        }
        const {data}  = await res.json()
        const { accessToken, refreshToken: newRefreshToken, token } = data 
        if(accessToken){
            await setTokencookie("accessToken", accessToken)
        } 
            if(newRefreshToken){
                await setTokencookie("refreshToken", newRefreshToken)
            }
           if(token){
            await setTokencookie("better-auth.session_token", token ,3600)
           }
            return true
        }catch(error){
        console.error("Error refreshing token:", error)
        return false
       

    }

}