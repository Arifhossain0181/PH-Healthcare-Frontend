import { APiresponse } from "@/tyPes/aPi.tyPes"
import axios from "axios"


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
if(!API_BASE_URL){
    throw new Error("API_BASE_URL is not defined in environment variables")
}
const axiosInstance = ()=>{
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 50000,
        headers:{
            "Content-Type": "application/json",
        }


    })
    return instance
}
export interface APiRequestOPtions{
    params?: Record<string, unknown>
    headers?: Record<string, string>

}
const httPget =async <TData > (endPoint : string, options?: APiRequestOPtions) :Promise<APiresponse<TData>>=>{
    try{
        const instance=  axiosInstance()
        const response = await instance.get<APiresponse<TData>>(endPoint, {
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    } catch (error) {
        console.error(`Error fetching data from ${endPoint}:`, error)
        throw error
    }
}
const httPpost =async <TData > (endPoint : string, data: unknown, options?: APiRequestOPtions) :Promise<APiresponse<TData>>=>{
    try{
        const response = await axiosInstance().post<APiresponse<TData>>(endPoint, data, {   
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    } catch (error) {
        console.error(`Error posting data to ${endPoint}:`, error)
        throw error
    }
}
const httPput =async <TData > (endPoint : string, data: unknown, options?: APiRequestOPtions) :Promise<APiresponse<TData>>=>{
    try{
        const response = await axiosInstance().put<APiresponse<TData>>(endPoint, data, {
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    }
    catch (error) {
        console.error(`Error putting data to ${endPoint}:`, error)
        throw error
    }
}
const httPdelete =async <TData > (endPoint : string, options?: APiRequestOPtions) :Promise<APiresponse<TData>>=>{
    try{    

        const response = await axiosInstance().delete<APiresponse<TData>>(endPoint, {
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    }
    catch (error) {
        console.error(`Error deleting data from ${endPoint}:`, error)
        throw error
    }
}
const httPpatch =async <TData > (endPoint : string, data: unknown, options?: APiRequestOPtions) :Promise<APiresponse<TData>>=>{
    try{
        const response = await axiosInstance().patch<APiresponse<TData>>(endPoint, data, {
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    }
    catch (error) {
        console.error(`Error patching data to ${endPoint}:`, error)
        throw error
    }
}
export const httpClient = {
    get: httPget,
    post: httPpost,
    put: httPput,
    delete: httPdelete,
    patch: httPpatch
}