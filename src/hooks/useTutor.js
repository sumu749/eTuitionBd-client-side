import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import api from "../api/api";

const useTutor = () => {
    const { user, loading: authLoading } = useAuth();
    const [isTutor, setIsTutor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (!user?.email) {
                setIsTutor(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await api.get(`/users/role/${user.email}`);
                setIsTutor(res.data?.role === "tutor");
            } catch (err) {
                console.error("useTutor error:", err);
                setIsTutor(false);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [user]);

    return [isTutor, loading || authLoading];
};

export default useTutor;
