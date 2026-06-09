/* eslint-disable react-hooks/set-state-in-effect */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import TutorCard from "../Tutor/TutorCard";
import { getSavedBookmarks, toggleBookmark } from "../../utils/bookmarkUtils";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const FeaturedTutors = () => {
    const [userRole, setUserRole] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: savedBookmarks = { tutors: [], tuitions: [] } } = useQuery({
        queryKey: ["saved-bookmarks", user?.email],
        enabled: !!user?.email,
        queryFn: async () => getSavedBookmarks(user.email),
        initialData: { tutors: [], tuitions: [] },
    });

    const bookmarkedTutors = savedBookmarks?.tutors || [];

    const { data: tutors = [], isLoading } = useQuery({
        queryKey: ["featured-tutors"],
        staleTime: 10 * 60 * 1000,
        queryFn: async () => {
            const res = await api.get("/public-tutors?limit=50");
            const users = res.data || [];
            return users
                .slice()
                .sort(
                    (a, b) =>
                        new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
                )
                .slice(0, 4);
        },
    });

    useEffect(() => {
        if (!user) {
            setUserRole(null);
            return;
        }

        let mounted = true;

        const fetchRole = async () => {
            const roleRes = await api.get(
                `/users/role/${encodeURIComponent(user.email)}`,
            );

            if (mounted) {
                setUserRole(roleRes?.data?.role || null);
            }
        };

        fetchRole();

        return () => {
            mounted = false;
        };
    }, [user]);

    useEffect(() => {
        if (!user?.email) {
            setUserRole(null);
        }
    }, [user?.email]);

    const handleBookmark = async (tutor) => {
        if (!user?.email) {
            toast("Login to save bookmarks", { duration: 3000 });
            navigate("/login");
            return;
        }

        const isBookmarked = bookmarkedTutors.some((t) => t.id === tutor._id);

        try {
            await toggleBookmark("tutor", tutor, user.email);
            await queryClient.invalidateQueries([
                "saved-bookmarks",
                user.email,
            ]);
            toast.success(
                isBookmarked ? "Tutor removed from bookmarks" : "Tutor saved!",
            );
        } catch (error) {
            console.error(error);
            toast.error("Unable to update bookmark. Please try again.");
        }
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

                {isLoading ? (
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
