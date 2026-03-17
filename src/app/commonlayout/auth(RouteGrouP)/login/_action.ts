"use server"

import { getdefaultDashboardRoute, isvalidRedirectForROle, UserRole } from "@/lib/auth.utilis";
import { httpClient } from "@/lib/axios/httPclientt";
import { setTokencookie } from "@/lib/token.uitilits";
import { APiresponse } from "@/tyPes/aPi.tyPes";
import { LoginResponse } from "@/tyPes/auth.tyPes";
import { LoginSchemaPayload, loginSchemaZod } from "@/zod/auth.validation";

import { redirect} from "next/navigation";


export const loginaction = async(payload: LoginSchemaPayload ,redirectPath ?: string) :Promise<LoginResponse | APiresponse> => {
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
        if (!response.success || !response.data) {
            return {
                success: false,
                message: response.message || "Login failed. Please check your credentials and try again.",
                data: null,
            }
        }

        const {accessToken, refreshToken, token, user, needPasswordChange} = response.data
        const { emailVerified } = user
        await setTokencookie("accessToken" ,accessToken)
        await setTokencookie("refreshToken", refreshToken)
        await setTokencookie("better-auth.session_token", token)
        if(!emailVerified){
            redirect("/verify-email")
        }
        else  if(needPasswordChange){
            //todo refacetoring Password change page and logic after implementing it
            redirect(`reset-password?email=${user.email}`)
        }
        else{
            // redirect(redirectPath || "/dashboardlayout/commonProtectedLayout") 
            const roleFromUser = user.role
            const normalizedRole: UserRole | null =
                roleFromUser === "SUPER_ADMIN" ||
                roleFromUser === "ADMIN" ||
                roleFromUser === "DOCTOR" ||
                roleFromUser === "PATIENT"
                    ? roleFromUser
                    : null

            const targetPath =
                redirectPath && normalizedRole && isvalidRedirectForROle(redirectPath, normalizedRole)
                    ? redirectPath
                    : normalizedRole
                        ? getdefaultDashboardRoute(normalizedRole)
                        : "/"
            redirect(targetPath)
        }
        

       
    }
    catch (error ) {
        if(error && typeof error ==="object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")){
            throw error; // Re-throw the redirect error to be handled by Next.js
        }
       return {
            success: false,
            message: "Login failed. Please check your credentials and try again.",
            data: null,
       }
    }

}