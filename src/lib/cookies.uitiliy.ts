"use server"
import { cookies } from "next/dist/server/request/cookies"


export const setCookie = async (
    name: string,
    value:string,
    maxAgeInSecounds: number,

)=>{
    const cookiesStore = await cookies()
    cookiesStore.set(name, value, {
        maxAge: maxAgeInSecounds,
        httpOnly: true,
        secure:true,
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




