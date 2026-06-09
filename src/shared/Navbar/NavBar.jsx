import { NavLink, useNavigate } from "react-router";
import { Menu, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";

const NavBar = () => {
    const { user, logoutUser } = useAuth();
    const [isStudent, roleLoading] = useStudent();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Find Tutors", path: "/tutors" },
        { name: "Tuitions", path: "/tuitions" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-700/70">
            <div className="navbar max-w-7xl mx-auto px-4">
                {/* Mobile */}
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost">
                            <Menu size={22} />
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-1 p-3 shadow bg-slate-950/95 rounded-box w-60 text-slate-100"
                        >
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink to={link.path}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Logo */}
                <div className="navbar-start hidden lg:flex">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img
                            src="/favicon.svg"
                            alt="eTuitionBd Logo"
                            className="w-11 h-11"
                        />

                        <div>
                            <h2 className="font-extrabold text-xl">
                                eTuitionBd
                            </h2>

                            <p className="text-xs text-base-content/60">
                                Learn Better
                            </p>
                        </div>
                    </NavLink>
                </div>

                {/* Center Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 font-semibold"
                                            : "hover:text-cyan-300"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right */}
                <div className="navbar-end gap-2">
                    {isStudent && !roleLoading && (
                        <NavLink
                            to="/dashboard/student/post-tuition"
                            className="btn btn-primary rounded-full hidden md:flex"
                        >
                            Post Tuition
                        </NavLink>
                    )}

                    {!user ? (
                        <>
                            <NavLink to="/login" className="btn btn-ghost">
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="btn btn-primary rounded-full"
                            >
                                Get Started
                            </NavLink>
                        </>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="avatar cursor-pointer"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        className="w-11 rounded-full"
                                    />
                                ) : (
                                    <UserCircle size={40} />
                                )}
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>

                                <li>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;
