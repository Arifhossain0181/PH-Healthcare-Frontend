export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT"

export const authRoutes = [
    "/login","/register","/forgot-password","/reset-password",
    "/verify-email"]
    export const isAuthROute = (path: string): boolean => {
        return authRoutes.some((route :string)=>route === path

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

    export const isRouteProtected = (path: string, routes: RouteConfig)  => {
        if(routes.exact.includes(path)){
            return true
        }
        return routes.pattern.some((pattern: RegExp) => pattern.test(path))



    }

    export const getRoutesOwner= (path: string): "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT"  | "COMMON" | null=> {
        if(isRouteProtected(path,doctorProtectedRoutes,)){
            return "DOCTOR"
        }
        if(isRouteProtected(path,adminProtectedRoutes)){
            return "ADMIN"
        }
        // if(isRouteProtected(path,superAdminProtectedRoutes)){
        //     return "SUPER_ADMIN"
        // }
        if(isRouteProtected(path,PatientProtiectedRoutes)){
            return "PATIENT"
        }
        if(isRouteProtected(path,commonPRotectedRoutes)){
            return "COMMON"
        }
        return null



    }