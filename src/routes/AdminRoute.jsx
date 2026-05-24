import { Navigate } from "react-router";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
    const [isAdmin, loading] = useAdmin();

    if (loading) return null;

    if (!isAdmin) return <Navigate to="/dashboard" replace />;

    return children;
};

export default AdminRoute;
