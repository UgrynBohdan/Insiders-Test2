import { getUserTrips } from "@/api/trip"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useTrips = () => {
    const { data: trips, isLoading, error } = useQuery({
        queryKey: ["userTrips"],
        queryFn: getUserTrips,
        retry: false
    })

    return {
        trips

    }
    
}