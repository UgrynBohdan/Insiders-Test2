import { getUserTrips } from "@/api/trip"
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