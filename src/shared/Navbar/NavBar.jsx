/* eslint-disable indent */

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, UserCircle, Moon, Sun } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";
import useTutor from "../../hooks/useTutor";
import useAdmin from "../../hooks/useAdmin";

const NavBar = () => {
    const { user, logoutUser } = useAuth();
    const [isStudent, studentLoading] = useStudent();
    const [isTutor] = useTutor();
    const [isAdmin] = useAdmin();
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") {
            return "light";
        }
        const savedTheme = localStorage.getItem("theme");
        return (
            savedTheme ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light")
        );
    });
    const navigate = useNavigate();
    const defaultAvatar = "https://i.pravatar.cc/300?img=65";

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleThemeToggle = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("access-token");
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
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const profilePath = isStudent
        ? "/dashboard/student/profile"
        : isTutor
          ? "/dashboard/tutor/profile"
          : isAdmin
            ? "/dashboard/admin/profile"
            : "/dashboard";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/90 border-b border-slate-700/70">
            <div className="navbar max-w-7xl mx-auto px-4 py-3 gap-2">
                <div className="navbar-start lg:hidden">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost"
                            aria-label="Open navigation menu"
                        >
                            <Menu size={22} />
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-10 p-3 shadow-xl bg-slate-950/95 rounded-box w-64 text-slate-100"
                        >
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink to={link.path}>
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                            {user && (
                                <>
                                    <li className="divider" />
                                    <li>
                                        <NavLink to="/dashboard">
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={profilePath}>
                                            Profile
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="navbar-start">
                    <NavLink to="/" className="flex items-center gap-3">
                        <img
                            src="/favicon.svg"
                            alt="eTuitionBd Logo"
                            className="w-11 h-11"
                        />
                        <div>
                            <h2 className="font-extrabold text-xl tracking-tight">
                                eTuitionBd
                            </h2>
                            <p className="text-xs text-slate-400">
                                Learn Better Everyday
                            </p>
                        </div>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-2 px-1">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-cyan-300 font-semibold"
                                            : "text-slate-200 hover:text-cyan-300"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="navbar-end flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={handleThemeToggle}
                        className="btn btn-ghost btn-circle"
                        aria-label="Toggle color theme"
                    >
                        {theme === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {isStudent && !studentLoading && (
                        <NavLink
                            to="/dashboard/student/post-tuition"
                            className="btn btn-primary rounded-full hidden md:inline-flex"
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
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User avatar"
                                        className="w-11 h-11 rounded-full object-cover"
                                        loading="lazy"
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src =
                                                defaultAvatar;
                                        }}
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-slate-100">
                                        <UserCircle size={24} />
                                    </div>
                                )}
                            </label>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 p-2 shadow-xl bg-slate-950 rounded-box w-60"
                            >
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                                <li>
                                    <NavLink to={profilePath}>Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Support</NavLink>
                                </li>
                                <li className="divider" />
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
