import { useState, useEffect } from "react"
import { getCurrentUser, logout } from "@/api/auth"
import { useNavigate } from "react-router-dom"
import { getUserTrips } from "@/api/trip"
import { useMutation, useQuery } from "@tanstack/react-query"

interface Trip {
    id: string
    title: string
    description: string
}

const mockFetchTrips = async (): Promise<Trip[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "1", title: "Подорож до Карпат", description: "Триденна подорож в гори." },
                { id: "2", title: "Відпочинок у Львові", description: "Оглядова екскурсія містом." },
                { id: "3", title: "Літні канікули в Одесі", description: "Відпочинок біля моря." },
            ])
        }, 1000)
    })
}

const useTrips = () => {
    const [data, setData] = useState<Trip[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {                
                await getUserTrips()
                const trips = await mockFetchTrips()
                setData(trips)
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message)
                } else {
                    setError("Сталася невідома помилка під час завантаження подорожей.")
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, isLoading, error }
}

export const Home = () => {
    const navigate = useNavigate()
    
    const { data: trips, isLoading, error } = useTrips()

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: (data) => {
            console.log("Logout successful!", data);
            // window.location.reload()
        },
    })

    const { data: userData, isLoading: isLoadingUser, error: userError } = useQuery({
        queryKey: ["users"],
        queryFn: getCurrentUser,
    })
    if (isLoadingUser) {
        return <div>Завантаження користувача...</div>;
    }
    let isAuthenticated = false
    if (userError) {
        // return <div>Помилка завантаження даних користувача: {userError.message}</div>;
        isAuthenticated = false
    }

    isAuthenticated = userData?.authenticated    

    // Якщо користувач НЕ авторизований → показуємо кнопки входу/реєстрації
    if (!isAuthenticated) {
        return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Ласкаво просимо!</h1>
            <p className="text-gray-600 mb-6">Увійдіть або зареєструйтесь, щоб переглядати свої подорожі.</p>
            <div className="flex gap-4">
            <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
                Увійти
            </button>
            <button
                onClick={() => navigate('/register')}
                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
            >
                Зареєструватися
            </button>
            </div>
        </div>
        )
    }

    // Якщо є токен → показуємо подорожі
    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-gray-200"></div>
            <p className="ml-4 text-lg text-gray-700">Завантаження подорожей...</p>
        </div>
        )
    }

    if (error) {
        return (
        <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Помилка:</p>
            <p>{error}</p>
            </div>
        </div>
        )
    }

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">

        {/* Кнопка виходу */}
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors" onClick={() => logoutMutation.mutate()}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 110 2H4a3 3 0 01-3-3V5a3 3 0 013-3zm12.707 6.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H8a1 1 0 110-2h4.586l-2.293-2.293a1 1 0 011.414-1.414l4 4z" clip-rule="evenodd" />
            </svg>
            Вийти
        </button>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-300">
          <div className="flex flex-col items-start mb-4 sm:mb-0">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              Ласкаво просимо!
            </h1>
            <p className="mt-1 text-lg text-gray-600">Ваші подорожі, на відстані одного кліку.</p>
          </div>
          <button
            onClick={() => alert('Натиснута кнопка "Створити подорож"')}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Створити нову подорож
          </button>
        </header>

        {/* Trips List Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Мої подорожі</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.title}</h3>
                  <p className="text-gray-600 mb-4">{trip.description}</p>
                  <button
                    onClick={() => alert(`Перегляд подорожі: ${trip.title}`)}
                    className="w-full py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
                  >
                    Переглянути деталі
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                Наразі у вас немає запланованих подорожей.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
