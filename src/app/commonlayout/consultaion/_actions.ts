import { httpClient } from "@/lib/axios/httPclientt"


interface IDoctor {
    id: string | number;
    name: string;
    specialization: string;
    experience: number;
    // Add other fields as needed based on API response
    rating: number;
}
export const getdoctor = async () => {
    const doctors = await httpClient.get<IDoctor[]>('/doctors')
    return doctors.data
}