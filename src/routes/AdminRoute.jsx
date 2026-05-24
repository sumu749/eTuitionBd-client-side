import { Navigate } from "react-router";
import useAdmin from "../hooks/useAdmin";
import LoadingSpinner from "../shared/LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const [isAdmin, loading] = useAdmin();

    if (loading) return <LoadingSpinner />;

    if (!isAdmin) return <Navigate to="/unauthorized" replace />;

    return children;
};

export default AdminRoute;
