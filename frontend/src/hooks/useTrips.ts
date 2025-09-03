import { accessCollaborate, deleteTrip, getTripDetails, getUserTrips } from "@/api/trip"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useTrips = () => {
    const { data: trips, isLoading, error, refetch } = useQuery({
        queryKey: ["userTrips"],
        queryFn: getUserTrips,
        retry: false
    })



    return {
        trips,
        isLoading: isLoading,
        error: error,
        refetchTrips: refetch
    }
    
}

export const useTrip = (tripId: string) => {
    const { data: trip, isLoading } = useQuery({
        queryKey: ["userTrips", tripId],
        queryFn: () => getTripDetails(tripId)
    })

    const { mutate: deleteTripM, isError: isMutationError, error: mutationError } = useMutation({
        mutationFn: deleteTrip
    })

    const { mutate: inviteCollaborate } = useMutation({
        mutationFn: accessCollaborate
    })
    
    return {
        trip, isLoading, isError: isMutationError, error: mutationError,
        deleteTripM, inviteCollaborate
    }
}