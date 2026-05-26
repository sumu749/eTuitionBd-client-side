import { useNavigate, Link } from "react-router";
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
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link
                to="/"
                className="text-xl font-bold text-cyan-400 hover:text-cyan-300"
            >
                eTuitionBd
            </Link>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="text-slate-400 truncate max-w-full sm:max-w-xs">
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
