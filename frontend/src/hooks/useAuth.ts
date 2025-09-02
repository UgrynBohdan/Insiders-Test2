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
        retry: false, // не повторювати запит якщо 401
    })

    // ✅ Мутація для виходу
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: async () => {
        // Чистимо кеш користувача
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] })
            queryClient.clear()
            navigate("/login")
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
