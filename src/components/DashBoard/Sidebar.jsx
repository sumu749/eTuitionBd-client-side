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
            {isStudent && (
                <div className="space-y-2">
                    <Link
                        to="/dashboard"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/dashboard/student/post-tuition"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student/post-tuition")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Post Tuition
                    </Link>

                    <Link
                        to="/dashboard/student/my-tuitions"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student/my-tuitions")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        My Tuitions
                    </Link>

                    <Link
                        to="/dashboard/student/applied-tutors"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student/applied-tutors")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Applied Tutors
                    </Link>

                    <Link
                        to="/dashboard/student/payments"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student/payments")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Payments
                    </Link>

                    <Link
                        to="/dashboard/student/profile"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/student/profile")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Profile Settings
                    </Link>
                </div>
            )}

            {isTutor && (
                <div className="space-y-2">
                    <Link
                        to="/dashboard"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/tutor")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Tutor
                    </Link>
                    <Link
                        to="/dashboard/tutor/applications"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/tutor/applications")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Applications
                    </Link>
                    <Link
                        to="/dashboard/tutor/ongoing"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/tutor/ongoing")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Ongoing Sessions
                    </Link>
                    <Link
                        to="/dashboard/tutor/revenue"
                        className={`block px-4 py-2 rounded ${
                            isActive("/dashboard/tutor/revenue")
                                ? "bg-cyan-600"
                                : "hover:bg-slate-800"
                        }`}
                    >
                        Revenue
                    </Link>
                </div>
            )}

            {isAdmin && (
                <Link
                    to="/dashboard"
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
