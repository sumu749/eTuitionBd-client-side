import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const [isStudent] = useStudent();
    const navigate = useNavigate();

    useEffect(() => {
        if (isStudent) {
            navigate("/dashboard/student");
        } else if (isTutor) {
            navigate("/dashboard/tutor");
        } else if (isAdmin) {
            navigate("/dashboard/admin");
        }
    }, [isAdmin, isTutor, isStudent, navigate]);

    return <LoadingSpinner />;
};

export default Dashboard;
