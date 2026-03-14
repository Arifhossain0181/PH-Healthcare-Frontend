"use client"

import { httpClient } from "@/lib/axios/httPclientt";
import { setTokencookie } from "@/lib/token.uitilits";
import { APiresponse } from "@/tyPes/aPi.tyPes";
import { LoginResponse } from "@/tyPes/auth.tyPes";
import { LoginSchemaPayload, loginSchemaZod } from "@/zod/auth.validation";

import { redirect} from "next/navigation";


export const loginaction = async(payload: LoginSchemaPayload) :Promise<LoginResponse | APiresponse> => {
    const ParsedPayload =loginSchemaZod.safeParse(payload)
    if (!ParsedPayload.success) {
        const firstError = ParsedPayload.error.issues[0] || "Invalid login payload"
        return {
            success: false,
            message: firstError.message || "Invalid login payload",
            data: null,
        }
       
    }
    try{
        const response =await httpClient.post<LoginResponse>('/auth/login', ParsedPayload.data)
        const {accessToken, refreshToken, user ,token} = response.data
        await setTokencookie(accessToken, "accessToken")
        await setTokencookie(refreshToken, "refreshToken")
        await setTokencookie(token, "better-auth-session_token")
        redirect("/dashboard")

       
    }
    catch (error ) {
        console.log(error)
       return {
            success: false,
            message: "Login failed. Please check your credentials and try again.",
            data: null,
       }
    }

}