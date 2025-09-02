import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login, register, type RegisterData } from "../../api/auth"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState<RegisterData>({
        name: "",
        email: "",
        password: "",
    })

    const mutationRegister = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            console.log("Реєстрація успішна:", data)
        },
    })

    const mutationLogin = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log("Успішний логін:", data)
            navigate('/')
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        mutationRegister.mutate(form)
        mutationLogin.mutate(form)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Реєстрація</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Ім'я"
                    value={form.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={mutationRegister.isPending}
                    className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
                >
                    {mutationRegister.isPending ? "Завантаження..." : "Зареєструватися"}
                </button>
                {mutationRegister.error && <p className="text-red-500 text-sm mt-2">Помилка реєстрації. Будь ласка, спробуйте ще раз.</p>}
                {mutationLogin.error && <p className="text-red-500 text-sm mt-2">Помилка входу. Будь ласка, спробуйте ще раз.</p>}
            </form>
        </div>
    )
}
