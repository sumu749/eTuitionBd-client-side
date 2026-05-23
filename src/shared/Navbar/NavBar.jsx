import { GraduationCap, UserCircle } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router";

const NavBar = () => {
    const { user, logoutUser } = useAuth();

    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            <li>
                <NavLink to="/tuitions">Tuitions</NavLink>
            </li>

            <li>
                <NavLink to="/tutors">Tutors</NavLink>
            </li>

            <li>
                <NavLink to="/about">About</NavLink>
            </li>

            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            ☰
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {links}
                        </ul>
                    </div>

                    <NavLink
                        to="/"
                        className="flex items-center gap-2 text-xl font-bold"
                    >
                        <GraduationCap size={28} />
                        <span>eTuitionBD</span>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>

                <div className="navbar-end">
                    {!user ? (
                        <div className="flex gap-2">
                            <NavLink
                                to="/login"
                                className="btn btn-outline btn-sm"
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="btn btn-primary btn-sm"
                            >
                                Register
                            </NavLink>
                        </div>
                    ) : (
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="profile"
                                        className="w-10 rounded-full"
                                    />
                                ) : (
                                    <UserCircle size={34} />
                                )}
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>

                                <li>
                                    <button onClick={logoutUser}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
