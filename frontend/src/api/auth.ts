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
    const res = await axios.post(`${API_URL}/login`, data)
    const token = res.data.token

    // зберігаємо токен у cookie
    Cookies.set("token", token, { expires: 7 })
    return res.data
}

export async function register(data: RegisterData) {
    const res = await axios.post(`${API_URL}/register`, data)
    const token = res.data.token

    // зберігаємо токен у cookie
    Cookies.set("token", token, { expires: 7 })
    return res.data
}

export function logout() {
    Cookies.remove("token")
}
