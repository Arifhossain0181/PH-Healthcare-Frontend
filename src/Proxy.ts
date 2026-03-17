import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwt.uits";
import { getdefaultDashboardRoute, getRoutesOwner, isAuthROute, UserRole } from "./lib/auth.utilis";
import { getNewTokenWithRefreshToken } from "./services/auth.service";
import { isTokenExpired } from "./lib/token.uitilits";

 async function tryRefreshToken(refreshTokenValue: string): Promise<boolean> {
    try{
        const refresh = await getNewTokenWithRefreshToken(refreshTokenValue)
        if(!refresh){
            return false
        }
        return refresh
    }catch(error){
        console.error("Error refreshing token:", error)
        return false
    }
 }
export async function proxy(request :NextRequest){
    try {
        const { pathname } = request.nextUrl
        const accessToken = request.cookies.get("accessToken")?.value
        const refreshTokenValue = request.cookies.get("refreshToken")?.value

        const jwtSecret = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET ?? ""
        const verifyAccessToken = accessToken && jwtSecret
            ? jwtUtils.verifyToken(accessToken, jwtSecret)
            : null
        const isValidAccessToken = Boolean(verifyAccessToken?.success)

        const decodedAccessToken = verifyAccessToken?.success
            ? verifyAccessToken.data
            : null

        const roleFromToken = decodedAccessToken?.role
        const userRole: UserRole | null =
            roleFromToken === "SUPER_ADMIN" ||
            roleFromToken === "ADMIN" ||
            roleFromToken === "DOCTOR" ||
            roleFromToken === "PATIENT"
                ? roleFromToken
                : null

        const routeOwner = getRoutesOwner(pathname)
        const normalizedUserRole = userRole === "SUPER_ADMIN" ? "ADMIN" : userRole

        if (routeOwner && normalizedUserRole && routeOwner !== normalizedUserRole) {
            return NextResponse.next()
        }
    const isAuth = isAuthROute(pathname)
    if(isValidAccessToken && accessToken && refreshTokenValue && (await isTokenExpired(accessToken))){
        const requestHeaders = new Headers(request.headers)
        try{
            const refreshResult = await tryRefreshToken(refreshTokenValue)
            if(refreshResult){
                requestHeaders.set("X-Token-Refreshed", "true")

            }
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })

        }
        catch(error){
            console.error("Error during token refresh:", error)
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            })
        }

    }




        //rule 1 use is logged in has access to auth routes
        if (isAuth && userRole) {
            return NextResponse.redirect(new URL(getdefaultDashboardRoute(userRole), request.url))
       
                 }
                 // rule 2 user trying to acees Public route while being logged in redirect to dashboard 
                 if(routeOwner=== null){
                    return NextResponse.next()
                 }

                 //rule 3 user is not logged in byut trying to access Protedted route redirect to login 
                 if(!accessToken || !isValidAccessToken){
                    const lgoinurl = new URL("/login", request.url
                    )
                    lgoinurl.searchParams.set("redirect", pathname)
                    return NextResponse.redirect(lgoinurl)

                 }
                 // rule 4 user try to acces commo route while being logged in allow access
                 if(routeOwner === "COMMON"){
                    return NextResponse.next()
                 }
                 //rule 5 user try to visit role based PRoteeted but doesnot have access redirect to dashboard
                 if(routeOwner === "ADMIN" || routeOwner === "DOCTOR" || routeOwner === "PATIENT"){
                    if(routeOwner !== userRole){
                        return NextResponse.redirect(new URL(getdefaultDashboardRoute(userRole as UserRole), request.url))
                    }
                 }

        return NextResponse.next()

    } catch {
        return NextResponse.next()
    }
}

export const config = {
    matcher: "/api/:path*",
}