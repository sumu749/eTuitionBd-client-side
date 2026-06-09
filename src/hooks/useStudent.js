import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import api from "../api/api";

const useStudent = () => {
    const { user, loading: authLoading } = useAuth();
    const [isStudent, setIsStudent] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            if (!user?.email) {
                setIsStudent(false);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await api.get(
                    `/users/role/${encodeURIComponent(user.email)}`,
                );
                setIsStudent(res.data?.role === "student");
            } catch (err) {
                console.error("useStudent error:", err);
                setIsStudent(false);
            } finally {
                setLoading(false);
            }
        };

        fetchRole();
    }, [user]);

    return [isStudent, loading || authLoading];
};

export default useStudent;
