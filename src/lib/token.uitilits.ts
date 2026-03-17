import jwt from 'jsonwebtoken'
import { setCookie } from './cookies.uitiliy'
const getTokenSecoundRemanin = (token: string): number => {
    if(!token){
        return 0
    } 
      try{
                const tokenPayload = jwt.decode(token) as { exp?: number } | null
                if(tokenPayload && !tokenPayload.exp){
                    return 0
                }
                if (!tokenPayload?.exp) {
                    return 0
                }
                const remainigSecounds = tokenPayload.exp - Math.floor(Date.now() / 1000)
                return remainigSecounds > 0 ? remainigSecounds : 0
      }
      catch(error){

        console.error("Error decoding token:", error)
        return 0
      }

}
export  const setTokencookie = async (
    name: string,
    token: string ,
    fallbackMaxAge: number = 3600

)=>{
    let maxAge 
    if(name !== "better-auth.session_token"){
        maxAge = getTokenSecoundRemanin(token) }
    
    await setCookie(name, token,maxAge 
    || fallbackMaxAge
    )
}

export async function isTokenExpired(token: string ,thresholdSeconds: number = 300): Promise<boolean> {
    const secondsRemaining = getTokenSecoundRemanin(token)
    return secondsRemaining <= thresholdSeconds
}

export async function isTokenexpired(token: string ): Promise<boolean>  {
    const secondsRemaining = getTokenSecoundRemanin(token)
    return secondsRemaining  ===0 
}