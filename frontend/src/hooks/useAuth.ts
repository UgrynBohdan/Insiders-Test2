import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCurrentUser, logout } from "@/api/auth"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // ✅ Запит користувача
    const { data: user, isLoading, error } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser,
        retry: false,
    })

    // ✅ Мутація для виходу
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear()
            navigate("/")
        },
    })

    return {
        user,
        isLoading,
        error,
        isAuthenticated: !!user?.authenticated,
        logout: () => logoutMutation.mutate(),
        isLoggingOut: logoutMutation.isPending,
    }
}
