import axios from "axios"
import Cookies from "js-cookie"

const API_URL = import.meta.env.VITE_API_URL + "/auth"

export interface LoginData {
    email: string
    password: string
}

export interface RegisterData {
    name: string
    email: string
    password: string
}

export async function login(data: LoginData) {
    const res = await axios.post(`${API_URL}/login`, data, { withCredentials: true })

    return res.data
}

export async function register(data: RegisterData) {
    const res = await axios.post(`${API_URL}/register`, data, { withCredentials: true })
 
    return res.data
}

export async function getCurrentUser() {
    const res = await axios.get(`${API_URL}/status`, { withCredentials: true })
    return res.data
}

export async function logout() {
    const res = await axios.post(`${API_URL}/logout`, { withCredentials: true })
    return res.data
}
