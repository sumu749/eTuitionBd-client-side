import { Link, useLocation } from "react-router";
import useAdmin from "../../hooks/useAdmin";
import useTutor from "../../hooks/useTutor";
import useStudent from "../../hooks/useStudent";

const Sidebar = () => {
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const [isStudent] = useStudent();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="p-6 space-y-4">
            <h2 className="text-xl font-bold mb-8">Dashboard</h2>

            {isStudent && (
                <Link
                    to="/dashboard/student"
                    className={`block px-4 py-2 rounded ${
                        isActive("/dashboard/student")
                            ? "bg-cyan-600"
                            : "hover:bg-slate-800"
                    }`}
                >
                    Student
                </Link>
            )}

            {isTutor && (
                <Link
                    to="/dashboard/tutor"
                    className={`block px-4 py-2 rounded ${
                        isActive("/dashboard/tutor")
                            ? "bg-cyan-600"
                            : "hover:bg-slate-800"
                    }`}
                >
                    Tutor
                </Link>
            )}

            {isAdmin && (
                <Link
                    to="/dashboard/admin"
                    className={`block px-4 py-2 rounded ${
                        isActive("/dashboard/admin")
                            ? "bg-cyan-600"
                            : "hover:bg-slate-800"
                    }`}
                >
                    Admin
                </Link>
            )}
        </nav>
    );
};

export default Sidebar;
