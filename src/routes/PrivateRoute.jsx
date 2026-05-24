import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <LoadingSpinner />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
