export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT"

export const authRoutes = [
    "/login","/register","/forgot-password","/reset-password",
    "/verify-email"]
    export const isAuthROute = (pathname: string): boolean => {
        return authRoutes.some((route :string)=>route === pathname

        )
    }
    export type RouteConfig ={
        exact :string[]
        pattern:RegExp[]
    }
    export const commonPRotectedRoutes : RouteConfig ={
        pattern:[],
        exact:['/my-Profile',"/change-password"]
    }
    export const doctorProtectedRoutes : RouteConfig ={
        pattern:[/^\/doctor\/dashboard/],
        exact:["/payment/success"]
    }
    export const adminProtectedRoutes : RouteConfig ={
        pattern:[/^\/admin\/dashboard/],
        exact:["/payment/success"]
    }
    export const superAdminProtectedRoutes : RouteConfig ={
        pattern:[/^\/super-admin\/dashboard/],
        exact:["/payment/success"]
    }
    export const PatientProtiectedRoutes : RouteConfig={

        pattern:[/^\/dashboard/ ],
        exact:["/payment/success"]  

    }

    export const isRouteProtected = (pathname: string, routes: RouteConfig)  => {
        if(routes.exact.includes(pathname   )){
            return true
        }
        return routes.pattern.some((pattern: RegExp) => pattern.test(pathname))



    }

    export const getRoutesOwner= (pathname: string): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT"  | "COMMON" | null=> {
        if(isRouteProtected(pathname,doctorProtectedRoutes)){
            return "DOCTOR"
        }
        if(isRouteProtected(pathname,adminProtectedRoutes)){
            return "ADMIN"
        }
        // if(isRouteProtected(pathname,superAdminProtectedRoutes)){
        //     return "SUPER_ADMIN"
        // }
        if(isRouteProtected(pathname,PatientProtiectedRoutes)){
            return "PATIENT"
        }
        if(isRouteProtected(pathname,commonPRotectedRoutes)){
            return "COMMON"
        }
        return null



    }
    export const getdefaultDashboardRoute = (role: UserRole) => {
        if(role ==="SUPER_ADMIN" || role === "ADMIN"){
            return "/admin/dashboard"
        }
        if(role === "DOCTOR"){
            return "/doctor/dashboard"
        }
        if(role === "PATIENT"){
            return "/dashboard"
        }
        return "/"
    }

    export const isvalidRedirectForROle = (redirectPath: string, role: UserRole): boolean => {
        const unifiSuPerAdminAndAdmin = role === "SUPER_ADMIN" ? "ADMIN" :role 
         role = unifiSuPerAdminAndAdmin as UserRole
        const routeOwner = getRoutesOwner(redirectPath)
        if(routeOwner=== null || routeOwner === "COMMON"){
            return true
        }
        
        if(routeOwner === role){
            return true
        }
        return false

    }