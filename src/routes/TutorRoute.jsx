import { Navigate } from "react-router";
import useTutor from "../hooks/useTutor";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

const TutorRoute = ({ children }) => {
    const [isTutor, loading] = useTutor();

    if (loading) return <LoadingSpinner />;

    if (!isTutor) return <Navigate to="/unauthorized" replace />;

    return children;
};

export default TutorRoute;
