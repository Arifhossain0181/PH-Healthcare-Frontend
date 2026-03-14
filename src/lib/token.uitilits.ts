import jwt from 'jsonwebtoken'
import { setCookie } from './cookies.uitiliy'
const JWT_ACCESS_SECRET =process.env.NEXT_PUBLIC_JWT_ACCESS_TOKEN 
const getTokenSecoundRemanin = (token: string): number => {
    if(!token){
        return 0
    } 
      try{
                const tokenPayload =JWT_ACCESS_SECRET ?jwt.verify(token, JWT_ACCESS_SECRET as string) as { exp: number } : jwt.decode(token) as { exp: number }
                if(tokenPayload && !tokenPayload.exp){
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
    token: string,
    name: string

)=>{
    const maxAge = getTokenSecoundRemanin(token)
    await setCookie(name, token, maxAge)
}
