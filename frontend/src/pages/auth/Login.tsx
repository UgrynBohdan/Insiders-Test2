import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login, type LoginData } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState<LoginData>({ email: "", password: "" });

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log("Успішний логін:", data);
            navigate('/')
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(form);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="bg-blue-600 text-white p-2 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                    {mutation.isPending ? "Завантаження..." : "Увійти"}
                </button>
                {mutation.error && <p className="text-red-500 text-sm mt-2 text-center">Помилка входу</p>}
            </form>
        </div>
    );
}