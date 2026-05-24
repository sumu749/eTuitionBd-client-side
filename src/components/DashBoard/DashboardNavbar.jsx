import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const DashboardNavbar = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("access-token");
            toast.success("Logged out successfully");
            navigate("/login");
        } catch {
            toast.error("Logout failed");
        }
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-cyan-400">eTuitionBd</h1>

            <div className="flex items-center gap-6">
                <span className="text-slate-400">
                    Welcome, {user?.displayName || user?.email}
                </span>
                <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline btn-primary"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
