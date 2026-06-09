/* eslint-disable indent */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../api/api";
import TutorCard from "../Tutor/TutorCard";
import {
    getSavedBookmarks,
    addBookmark,
    removeBookmark,
} from "../../utils/bookmarkUtils";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const FeaturedTutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bookmarkedTutors, setBookmarkedTutors] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const fetchTutors = async () => {
            try {
                const [tRes, roleRes] = await Promise.all([
                    api.get("/public-tutors?limit=50"),
                    user?.email
                        ? api.get(
                              `/users/role/${encodeURIComponent(user.email)}`,
                          )
                        : Promise.resolve({ data: {} }),
                ]);
                if (mounted) {
                    const users = tRes.data || [];
                    const sorted = users
                        .slice()
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt || 0) -
                                new Date(a.createdAt || 0),
                        );
                    setTutors(sorted.slice(0, 4));
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

        fetchTutors();

        return () => {
            mounted = false;
        };
    }, [user]);

    useEffect(() => {
        if (user?.email) {
            const saved = getSavedBookmarks(user.email);
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBookmarkedTutors(saved.tutors || []);
        }
    }, [user?.email]);

    const handleBookmark = (tutor) => {
        if (!user?.email) {
            toast("Login to save bookmarks", { duration: 3000 });
            navigate("/login");
            return;
        }

        const isBookmarked = bookmarkedTutors.some((t) => t.id === tutor._id);
        if (isBookmarked) {
            removeBookmark("tutor", tutor._id, user.email);
        } else {
            addBookmark("tutor", tutor, user.email);
        }

        const saved = getSavedBookmarks(user.email);
        setBookmarkedTutors(saved.tutors || []);
        toast.success(
            isBookmarked ? "Tutor removed from bookmarks" : "Tutor saved!",
        );
    };

    return (
        <section className="pt-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-black text-center text-slate-100">
                    Featured Tutors
                </h2>

                <p className="text-center text-slate-400 mt-4">
                    Top rated educators from leading universities
                </p>

                {loading ? (
                    <div className="mt-10 text-center text-slate-400">
                        Loading featured tutors from the database...
                    </div>
                ) : tutors.length === 0 ? (
                    <div className="mt-10 text-center text-slate-400">
                        No featured tutors found in the database.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
                        {tutors.map((tutor) => (
                            <motion.div
                                whileHover={{ y: -10 }}
                                key={tutor._id || tutor.name}
                            >
                                <TutorCard
                                    tutor={tutor}
                                    isBookmarked={bookmarkedTutors.some(
                                        (t) => t.id === tutor._id,
                                    )}
                                    onBookmark={handleBookmark}
                                    showBookmark={userRole === "student"}
                                    userRole={userRole}
                                    user={user}
                                    onViewDetails={(t) =>
                                        navigate(`/tutor-details/${t._id}`)
                                    }
                                    onMyProfile={() =>
                                        navigate("/dashboard/tutor")
                                    }
                                    onViewProfile={(t) =>
                                        navigate(`/tutor-details/${t._id}`)
                                    }
                                    onMessage={() => {
                                        toast("Message feature coming soon!", {
                                            duration: 3000,
                                        });
                                    }}
                                    onLoginToApply={() => navigate("/login")}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedTutors;
