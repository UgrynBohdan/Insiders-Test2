import { useTrip } from "@/hooks/useTrips";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InviteFriendForm from "./InviteFriendForm";
import { Button } from "./ui/button";
import NewPlaceForm from "./NewPlaceForm";


function TripDetails() {
    const { tripId } = useParams()
    const navigate = useNavigate()

    const [wantToInvite, setWantToInvite] = useState(false)
    const [wantToAddPlace, setWantToAddPlace] = useState(false)

    if (!tripId) return 

    const { trip, isLoading, isError, error, deleteTripM } = useTrip(tripId)
    if (isLoading) {
        return <div>Завантаження...</div>;
    }
    if (isError) {
        return <div>Помилка: {(error as Error).message}</div>;
    }

    console.log(trip)
    
        

    if (!trip) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <p className="text-gray-600 text-lg">Подорож не знайдено.</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center grid place-items-center">
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
                
                <div className="mb-6 border">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Учасники</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {trip.collaborators.map((participant: any) => (
                            <li key={participant._id}>{participant.name}</li>
                        ))}
                    </ul>
                </div>

                <div className="mb-6 border">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Місця для цієї подорожі</h3>
                    {trip.places.length !== 0 ?
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                            {trip.places.slice().sort((a: any, b: any) => a.dayNumber - b.dayNumber).map((place: any) => (
                                <li key={place._id}>День {place.dayNumber}: {place.locationName}</li>
                            ))}
                        </ul>
                    :
                        <p>Місця відсутні</p>
                    }
                    {wantToAddPlace ?
                        <NewPlaceForm tripId={tripId} setWantToAddPlace={setWantToAddPlace} />
                    :
                        <Button className="mt-4" onClick={() => setWantToAddPlace(true)}>Додати місце для подорожі</Button>
                    }
                </div>
                
                <div className="flex justify-between space-y-4">
                <Button variant='destructive'
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
                </Button>

                <Button
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
                </Button>
                </div>

                {wantToInvite ?
                    <InviteFriendForm tripId={tripId} setWantToInvite={setWantToInvite} />
                :
                    <Button
                        onClick={() => setWantToInvite(true)}
                    >
                        Запостити друга в подорож
                    </Button>
                }
            <div>
                <Button className="mt-4"
                    onClick={() => window.history.back()}
                >
                    Назад
                </Button>
            </div>
        </div>
        </div>
    );
};

export default TripDetails;