/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { getSavedBookmarks, toggleBookmark } from "../../utils/bookmarkUtils";
import TutorCard from "../../components/Tutor/TutorCard";

const FindTutors = () => {
    const [tutors, setTutors] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: savedBookmarks = { tutors: [] } } = useQuery({
        queryKey: ["saved-bookmarks", user?.email],
        enabled: !!user?.email,
        queryFn: async () => getSavedBookmarks(user.email),
        initialData: { tutors: [], tuitions: [] },
    });

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            try {
                const [tRes, roleRes] = await Promise.all([
                    api.get("/public-tutors"),
                    user?.email
                        ? api.get(
                              `/users/role/${encodeURIComponent(user.email)}`,
                          )
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

    const bookmarkedTutorIds =
        savedBookmarks?.tutors?.map((bookmark) => bookmark.id) || [];

    const handleBookmark = async (tutor) => {
        if (!user?.email) {
            toast("Login to save bookmarks", { duration: 3000 });
            navigate("/login");
            return;
        }

        try {
            const saved = await toggleBookmark("tutor", tutor, user.email);
            await queryClient.invalidateQueries([
                "saved-bookmarks",
                user.email,
            ]);
            toast.success(saved ? "Tutor saved" : "Tutor removed");
        } catch (error) {
            console.error(error);
            toast.error("Unable to update bookmark. Please try again.");
        }
    };

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
                        <TutorCard
                            key={tutor._id || tutor.id || tutor.name}
                            tutor={tutor}
                            isBookmarked={bookmarkedTutorIds.includes(
                                tutor._id || tutor.id,
                            )}
                            onBookmark={handleBookmark}
                            showBookmark={userRole === "student"}
                            userRole={userRole}
                            user={user}
                            onViewDetails={(t) =>
                                navigate(`/tutors/${t._id || t.id || ""}`)
                            }
                            onMyProfile={() => navigate("/dashboard/tutor")}
                            onViewProfile={(t) =>
                                navigate(`/tutors/${t._id || t.id || ""}`)
                            }
                            onMessage={() => {
                                toast("Message feature coming soon!", {
                                    duration: 3000,
                                });
                            }}
                            onLoginToApply={() => navigate("/login")}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FindTutors;
