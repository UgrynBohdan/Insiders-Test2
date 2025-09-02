import { useState, useEffect } from 'react'

interface Trip {
    id: string
    title: string
    description: string
}

const mockFetchTrips = async (): Promise<Trip[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'Подорож до Карпат', description: 'Триденна подорож в гори.' },
                { id: '2', title: 'Відпочинок у Львові', description: 'Оглядова екскурсія містом.' },
                { id: '3', title: 'Літні канікули в Одесі', description: 'Відпочинок біля моря.' },
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
                const trips = await mockFetchTrips()
                setData(trips)
            } catch (err) {
                if (err instanceof Error) {
                  setError(err.message)
                } else {
                  setError('Сталася невідома помилка під час завантаження подорожей.')
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
    const userName = 'Іван' // Mock user name
    const { data: trips, isLoading, error } = useTrips()

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
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-300">
                <div className="flex flex-col items-start mb-4 sm:mb-0">
                    <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                      Ласкаво просимо, {userName}!
                    </h1>
                    <p className="mt-1 text-lg text-gray-600">
                        Ваші подорожі, на відстані одного кліку.
                    </p>
                </div>
                <button
                    onClick={() => alert('Натиснута кнопка "Створити подорож"')}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all duration-300"
                >
                    Створити нову подорож
                </button>
            </header>

            {/* Trips List Section */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Мої подорожі
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.length > 0 ? (
                      trips.map(trip => (
                          <div key={trip.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                              <h3 className="text-xl font-semibold text-gray-800 mb-2">{trip.title}</h3>
                              <p className="text-gray-600 mb-4">{trip.description}</p>
                              <button onClick={() => alert(`Натиснута кнопка "Переглянути" для подорожі: ${trip.title}`)}
                              className="w-full py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
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
