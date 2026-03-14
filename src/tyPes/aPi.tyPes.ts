
export interface APiresponse<TData =unknown> {
    success: boolean
    message: string
    data: TData
    meta?: Painagtion


}
export interface Painagtion {

        total: number
        page: number
        limit: number
        totalPages: number
    
}
export interface APiError {
    success: boolean
    message: string
    error?: unknown
}