import { Navigate } from "react-router";
import useTutor from "../hooks/useTutor";

const TutorRoute = ({ children }) => {
    const [isTutor, loading] = useTutor();

    if (loading) return null;

    if (!isTutor) return <Navigate to="/dashboard" replace />;

    return children;
};

export default TutorRoute;
