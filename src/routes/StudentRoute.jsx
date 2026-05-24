import { Navigate } from "react-router";
import useStudent from "../hooks/useStudent";

const StudentRoute = ({ children }) => {
    const [isStudent, loading] = useStudent();

    if (loading) return null;

    if (!isStudent) return <Navigate to="/dashboard" replace />;

    return children;
};

export default StudentRoute;
