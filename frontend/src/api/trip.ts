import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL + "/trips"

interface ITrip {

}

export async function getUserTrips() {
    try {
        const res = await axios.get(`${API_URL}`, { withCredentials: true })
        console.log(res)
    } catch (err) {
        console.error(err)
    }
}