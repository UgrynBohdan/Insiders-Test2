import { useTrip } from "@/hooks/useTrips";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InviteFriendForm from "./InviteFriendForm";


function TripDetails() {
    const { tripId } = useParams()
    const navigate = useNavigate()

    const [wantToInvite, setWantToInvite] = useState(false)

    if (!tripId) return 

    const { trip, isLoading, isError, error, deleteTripM } = useTrip(tripId)
    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (isError) {
        return <div>Помилка: {(error as Error).message}</div>;
    }
    

    if (!trip) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-600 text-lg">Подорож не знайдено.</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{trip.title}</h1>
                
                <div className="text-gray-600 text-sm mb-6">
                <p>
                    <span className="font-semibold">Дати:</span> {trip.startDate} - {trip.endDate}
                </p>
                </div>
                
                <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Опис подорожі</h3>
                <p className="text-gray-700 leading-relaxed">
                    {trip.description}
                </p>
                </div>
                
                <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Учасники</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {trip.collaborators.map((participant: any) => (
                        <li key={participant}>{participant}</li>
                    ))}
                </ul>
                </div>
                
                <div className="flex justify-between">
                <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                    onClick={() => {
                        deleteTripM(tripId)
                        navigate(-1)
                    }}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.728-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z"
                        clip-rule="evenodd"
                        />
                    </svg>
                    Видалити
                </button>

                <button
                    className="flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                    </svg>
                    Редагувати
                </button>
                </div>

                {wantToInvite ?
                    <InviteFriendForm tripId={tripId} setWantToInvite={setWantToInvite} />
                :
                    <button
                        onClick={() => setWantToInvite(true)}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Запостити друга в подорож
                    </button>
                }

            <div className="text-center">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Назад
                </button>
            </div>
        </div>
        </div>
    );
};

export default TripDetails;