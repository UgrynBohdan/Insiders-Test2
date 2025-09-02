import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/trips"

interface ITrip {
    _id: string
    title: string
    description?: string
    owner: string
    collaborators: string[]
    places: string[]
    startDate: Date
    endDate: Date
}

export async function getUserTrips(): Promise<ITrip[]> {
    try {
        const res = await axios.get(`${API_URL}`, { withCredentials: true })
        const trips = res.data.allUserTrips as ITrip[]
        return trips
    } catch (err) {
        console.error(err)
        throw err
    }
}