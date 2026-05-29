import { useEffect, useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import api from "../../api/api";
import { Star } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";

const FindTutors = () => {
    const [tutors, setTutors] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const [tRes, roleRes] = await Promise.all([
                    api.get("/public-tutors"),
                    user?.email
                        ? axiosSecure.get(`/users/role/${user.email}`)
                        : Promise.resolve({ data: {} }),
                ]);

                if (mounted) {
                    setTutors(tRes.data || []);
                    setUserRole(roleRes?.data?.role || null);
                }
            } catch {
                if (mounted) {
                    setTutors([]);
                    setUserRole(null);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        load();

        return () => (mounted = false);
    }, [user]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-slate-100">Find Tutors</h1>

            <p className="text-slate-400 mt-2">
                Browse and connect with verified tutors.
            </p>

            {loading ? (
                <div className="mt-10 text-center text-slate-400">
                    Loading tutors from the database...
                </div>
            ) : tutors.length === 0 ? (
                <div className="mt-10 text-center text-slate-400">
                    No tutors found in the database.
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {tutors.map((tutor) => (
                        <div
                            key={tutor.id || tutor.name}
                            className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden"
                        >
                            <img
                                src={
                                    tutor.photoURL ||
                                    tutor.image ||
                                    "https://i.pravatar.cc/300?img=65"
                                }
                                alt={tutor.name}
                                className="h-56 w-full object-cover"
                            />

                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Star
                                        size={16}
                                        className="fill-yellow-400 text-yellow-400"
                                    />
                                    <span className="text-slate-300">
                                        4.9 Rating
                                    </span>
                                </div>

                                <h3 className="font-bold text-xl text-slate-100">
                                    {tutor.name}
                                </h3>
                                <p className="text-cyan-300">{tutor.subject}</p>
                                <p className="text-slate-400 mt-1">
                                    {tutor.university}
                                </p>

                                <div className="mt-4 flex gap-2">
                                    {userRole === "student" ? (
                                        <>
                                            <button className="btn btn-primary rounded-full flex-1">
                                                Apply
                                            </button>
                                            <Link
                                                to={`/tutors/${tutor._id || tutor.id || ""}`}
                                                className="btn btn-primary rounded-full"
                                            >
                                                View Details
                                            </Link>
                                        </>
                                    ) : userRole === "tutor" ? (
                                        <>
                                            <button
                                                className="btn btn-primary rounded-full flex-1"
                                                onClick={() =>
                                                    navigate("/dashboard/tutor")
                                                }
                                            >
                                                My Profile
                                            </button>
                                            <button
                                                className="btn btn-outline rounded-full"
                                                onClick={() =>
                                                    navigate(
                                                        `/tutors/${tutor.id || ""}`,
                                                    )
                                                }
                                            >
                                                View
                                            </button>
                                        </>
                                    ) : user ? (
                                        <>
                                            <button
                                                className="btn btn-primary rounded-full flex-1"
                                                onClick={() =>
                                                    navigate(
                                                        `/tutors/${tutor.id || ""}`,
                                                    )
                                                }
                                            >
                                                View Profile
                                            </button>
                                            <button className="btn btn-outline rounded-full">
                                                Message
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary rounded-full flex-1"
                                                onClick={() =>
                                                    navigate("/login")
                                                }
                                            >
                                                Login to apply
                                            </button>
                                            <button
                                                className="btn btn-outline rounded-full"
                                                onClick={() =>
                                                    navigate("/register")
                                                }
                                            >
                                                Register
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindTutors;
