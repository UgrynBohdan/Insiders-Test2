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

export interface INewTrip {
    title: string
    description: string
    startDate: string
    endDate: string
}

export interface IAccessCollaborate {
    tripId: string
    invitedEmail: string
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

export async function postNewTrip(data: INewTrip) {
    try {
        const res = await axios.post(`${API_URL}`, data, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function getTripDetails(tripId: string) {
    try {
        const res = await axios.get(`${API_URL}/${tripId}`, { withCredentials: true })
        return res.data.tripInfo
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function deleteTrip(tripId: string) {
    try {
        const res = await axios.delete(`${API_URL}/${tripId}`, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function accessCollaborate(payload: IAccessCollaborate) {
    try {
        const { tripId, invitedEmail } = payload
        const res = await axios.post(`${API_URL}/${tripId}/access`, { invitedEmail }, { withCredentials: true })
        return res.data
    } catch (err) {
        console.error(err)
        throw err
    }
}