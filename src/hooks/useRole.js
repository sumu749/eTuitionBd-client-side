import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import api from "../api/api";

const useRole = () => {
    const { user, loading: authLoading } = useAuth();

    const { data, isLoading } = useQuery({
        queryKey: ["user-role", user?.email],
        enabled: !!user?.email,
        staleTime: 5 * 60 * 1000,
        queryFn: async () => {
            const res = await api.get(
                `/users/role/${encodeURIComponent(user.email)}`,
            );
            return res.data?.role ?? null;
        },
    });

    return {
        role: data ?? null,
        isAdmin: data === "admin",
        isTutor: data === "tutor",
        isStudent: data === "student",
        loading: isLoading || authLoading,
    };
};

export default useRole;
