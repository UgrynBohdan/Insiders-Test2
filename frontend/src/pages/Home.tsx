import { useAuth } from "@/hooks/useAuth"
import { useTrips } from "@/hooks/useTrips" // твій код з отриманням подорожей
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const { user, isLoading, error, isAuthenticated, logout } = useAuth()
    // const { data: trips, isLoading: isTripsLoading, error: tripsError } = useTrips()

    const { data: trips, isLoading: isTripsLoading, error: tripsError } = {
        data: [{title: 'dsdsd', id: 12, description: 'dsd'}, {title: '2', id: 2, description: '2'} ], isLoading: null, error: null
    }

    const navigate = useNavigate()

    if (isLoading) return <div>Завантаження користувача...</div>

    if (!isAuthenticated) {
        return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Ласкаво просимо!</h1>
            <p className="text-gray-600 mb-6">Увійдіть або зареєструйтесь, щоб переглядати свої подорожі.</p>
            <div className="flex gap-4">
            <button onClick={() => navigate("/login")} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700">Увійти</button>
            <button onClick={() => navigate("/register")} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700">Зареєструватися</button>
            </div>
        </div>
        )
    }

    if (isTripsLoading) return <div>Завантаження подорожей...</div>
    if (tripsError) return <div>Помилка: {String(tripsError)}</div>

    return (
        <div className="min-h-screen bg-gray-100 p-8">
        <button onClick={logout} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Вийти
        </button>

        <h1 className="text-4xl font-bold">Привіт, {user?.name || "користувач"}!</h1>

        <section>
            <h2 className="text-2xl font-bold mb-4">Мої подорожі</h2>
            {trips?.length ? (
            trips.map((trip) => (
                <div key={trip.id} className="p-4 bg-white rounded shadow">
                <h3 className="font-semibold">{trip.title}</h3>
                <p>{trip.description}</p>
                </div>
            ))
            ) : (
            <p>Немає подорожей</p>
            )}
        </section>
        </div>
    )
}

export default Home