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
const httPget =async (endPoint : string, options?: APiRequestOPtions)=>{
    try{
        const response = await axiosInstance().get(endPoint, {
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    } catch (error) {
        console.error(`Error fetching data from ${endPoint}:`, error)
        throw error
    }
}
const httPpost =async (endPoint : string, data: unknown, options?: APiRequestOPtions)=>{
    try{
        const response = await axiosInstance().post(endPoint, data, {   
            params: options?.params,
            headers: options?.headers,
        })
        return response.data
    } catch (error) {
        console.error(`Error posting data to ${endPoint}:`, error)
        throw error
    }
}
const httPput =async (endPoint : string, data: unknown, options?: APiRequestOPtions)=>{
    try{
        const response = await axiosInstance().put(endPoint, data, {
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
const httPdelete =async (endPoint : string, options?: APiRequestOPtions)=>{
    try{    

        const response = await axiosInstance().delete(endPoint, {
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
const httPpatch =async (endPoint : string, data: unknown, options?: APiRequestOPtions)=>{
    try{
        const response = await axiosInstance().patch(endPoint, data, {
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