import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useTrips } from "@/hooks/useTrips"
import { useNavigate } from "react-router-dom"
// import { CreateTripModal } from "./CreateTripModal"
import { Link } from "react-router-dom"

export const Home = () => {
    const { user, isLoading, isAuthenticated, logout } = useAuth()
    const { trips, isLoading: isTripsLoading, error: tripsError, refetchTrips } = useTrips()
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-xl font-semibold text-gray-700">Завантаження...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 animate-fade-in-up">Ласкаво просимо до Trip Planner!</h1>
                <p className="text-lg text-gray-600 text-center max-w-xl mb-8 animate-fade-in">Увійдіть або зареєструйтесь, щоб спланувати свою наступну пригоду.</p>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                    >
                        Увійти
                    </button>
                    <button
                        onClick={() => navigate("/register")}
                        className="px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
                    >
                        Зареєструватися
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Привіт, {user?.name || "користувач"} 👋</h1>
                <button
                    onClick={logout}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                >
                    Вийти
                </button>
            </header>

            <section className="mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Мої подорожі 🌍</h2>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow-md hover:bg-purple-700 transition-colors duration-200"
                    >
                        + Нова подорож
                    </button>
                </div>
                {isTripsLoading ? (
                    <div className="text-center text-gray-500">Завантаження подорожей...</div>
                ) : tripsError ? (
                    <div className="text-center text-red-500">Помилка завантаження подорожей: {String(tripsError)}</div>
                ) : trips?.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <Link to={`/trips/${trip._id}`} key={trip._id} className="block">
                                <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.title}</h3>
                                    <p className="text-gray-600 line-clamp-2">{trip.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white rounded-lg shadow">
                        <p className="text-gray-600 mb-4">Поки що немає подорожей. Створіть свою першу!</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-200"
                        >
                            Створити подорож
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home