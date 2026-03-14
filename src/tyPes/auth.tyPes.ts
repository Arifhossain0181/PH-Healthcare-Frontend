export interface LoginResponse {
    token: string
    accessToken: string
    refreshToken: string
    needPasswordChange:  boolean
    user: {
        id: string | number
        name: string
        email: string
        role: string
        emailVerified: boolean
        phoneNumber: string
        profilePicture: string
        status: string
        createdAt: string
        updatedAt: string
        isDeleted: boolean
        image: string
        
    } 

}