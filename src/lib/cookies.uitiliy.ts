"use server"
import { cookies } from "next/headers"


export const setCookie = async (
    name: string,
    value:string,
    maxAgeInSecounds: number,

)=>{
    const isProduction = process.env.NODE_ENV === "production"
    const cookiesStore = await cookies()
    cookiesStore.set(name, value, {
        maxAge: maxAgeInSecounds,
        httpOnly: true,
        secure:isProduction,
        sameSite: "strict",
        path: "/",  
    })
}
export const getCookie = async (name: string) => {
    const cookiesStore = await cookies()
    return cookiesStore.get(name)?.value || null
}
export const deleteCookie = async (name: string) => {
    const cookiesStore = await cookies()
    cookiesStore.delete(name)
}




