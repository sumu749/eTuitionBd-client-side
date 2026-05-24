import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import api from "../api/api";

const useAdmin = () => {
    const { user, loading: authLoading } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (!user?.email) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await api.get(`/users/role/${user.email}`);
                setIsAdmin(res.data?.role === "admin");
            } catch (err) {
                console.error("useAdmin error:", err);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [user]);

    return [isAdmin, loading || authLoading];
};

export default useAdmin;
