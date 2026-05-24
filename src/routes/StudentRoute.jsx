import { Navigate } from "react-router";
import useStudent from "../hooks/useStudent";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

const StudentRoute = ({ children }) => {
    const [isStudent, loading] = useStudent();

    if (loading) return <LoadingSpinner />;

    if (!isStudent) return <Navigate to="/unauthorized" replace />;

    return children;
};

export default StudentRoute;
