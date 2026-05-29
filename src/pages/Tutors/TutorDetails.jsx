import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Mail,
    MapPin,
    GraduationCap,
    Briefcase,
    Star,
    BookOpen,
    Bookmark,
    BookmarkMinus,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";
import api from "../../api/api";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import TutorReviews from "../Reviews/TutorReviews";
import { isBookmarked, toggleBookmark } from "../../utils/bookmarkUtils";

const TutorDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isStudent] = useStudent();
    const [, setBookmarkReload] = useState(0);

    const {
        data: tutor,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["tutor-details", id],
        queryFn: async () => {
            const res = await api.get(`/users/tutor/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const isSaved =
        user?.email && tutor
            ? isBookmarked("tutor", tutor._id || tutor.id, user.email)
            : false;

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-20">
                <div className="max-w-xl text-center bg-slate-900/95 border border-slate-800 rounded-4xl p-10">
                    <h1 className="text-4xl font-black text-white">
                        Unable to load tutor details
                    </h1>
                    <p className="mt-4 text-slate-400">
                        This tutor profile may be unavailable or requires
                        additional permissions.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/tutors"
                            className="btn btn-primary rounded-full"
                        >
                            Back to Tutors
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Hero Section */}

                <div className="bg-slate-900 border border-slate-800 rounded-4xl p-8">
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <img
                            src={tutor.photoURL}
                            alt={tutor.name}
                            className="w-44 h-44 rounded-full object-cover border-4 border-cyan-500"
                        />

                        <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-4xl font-black text-white">
                                    {tutor.name}
                                </h1>

                                <span className="badge badge-success badge-lg">
                                    Verified Tutor
                                </span>
                            </div>

                            <p className="text-cyan-300 mt-3 text-lg">
                                {tutor.subject || "All Subjects"}
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 mt-6">
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Mail className="w-5 h-5 text-cyan-400" />

                                    <span>{tutor.email}</span>
                                </div>

                                <div className="flex items-center gap-3 text-slate-300">
                                    <MapPin className="w-5 h-5 text-cyan-400" />

                                    <span>
                                        {tutor.location || "Bangladesh"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-slate-300">
                                    <GraduationCap className="w-5 h-5 text-cyan-400" />

                                    <span>
                                        {tutor.education || "Bachelor Degree"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-slate-300">
                                    <Briefcase className="w-5 h-5 text-cyan-400" />

                                    <span>
                                        {tutor.experience || "2+ Years"}{" "}
                                        Experience
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button className="btn btn-primary rounded-full">
                                    Hire This Tutor
                                </button>
                                {isStudent && (
                                    <button
                                        type="button"
                                        className={`btn btn-outline rounded-full ${
                                            isSaved ? "btn-success" : ""
                                        }`}
                                        onClick={() => {
                                            if (!user?.email) {
                                                toast(
                                                    "Login to save bookmarks",
                                                    {
                                                        duration: 3000,
                                                    },
                                                );
                                                navigate("/login");
                                                return;
                                            }

                                            const saved = toggleBookmark(
                                                "tutor",
                                                tutor,
                                                user.email,
                                            );
                                            setBookmarkReload(
                                                (prev) => prev + 1,
                                            );
                                            toast.success(
                                                saved
                                                    ? "Tutor saved"
                                                    : "Tutor removed",
                                            );
                                        }}
                                    >
                                        {isSaved ? (
                                            <>
                                                <BookmarkMinus className="w-4 h-4 mr-2" />
                                                Saved
                                            </>
                                        ) : (
                                            <>
                                                <Bookmark className="w-4 h-4 mr-2" />
                                                Save
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400">Total Students</p>

                                <h2 className="text-3xl font-black text-white mt-2">
                                    120+
                                </h2>
                            </div>

                            <BookOpen className="w-10 h-10 text-cyan-400" />
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400">Success Rate</p>

                                <h2 className="text-3xl font-black text-white mt-2">
                                    95%
                                </h2>
                            </div>

                            <Star className="w-10 h-10 text-yellow-400" />
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400">Hourly Charge</p>

                                <h2 className="text-3xl font-black text-white mt-2">
                                    ৳ {tutor.salary || 500}/hr
                                </h2>
                            </div>

                            <Briefcase className="w-10 h-10 text-emerald-400" />
                        </div>
                    </div>
                </div>

                {/* About Tutor */}

                <div className="bg-slate-900 border border-slate-800 rounded-4xl p-8">
                    <h2 className="text-3xl font-black text-white">
                        About Tutor
                    </h2>

                    <p className="text-slate-300 mt-5 leading-relaxed">
                        {tutor.bio ||
                            "Experienced tutor passionate about helping students achieve academic excellence. Specialized in concept-based teaching and personalized learning strategies."}
                    </p>
                </div>

                {/* Skills */}

                <div className="bg-slate-900 border border-slate-800 rounded-4xl p-8">
                    <h2 className="text-3xl font-black text-white mb-6">
                        Skills & Subjects
                    </h2>

                    <div className="flex flex-wrap gap-4">
                        {(
                            tutor.skills || [
                                "Mathematics",
                                "Physics",
                                "Chemistry",
                                "English",
                            ]
                        ).map((skill, index) => (
                            <span
                                key={index}
                                className="badge badge-outline badge-lg p-4"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Reviews */}

                <TutorReviews tutorEmail={tutor.email} />
            </div>
        </div>
    );
};

export default TutorDetails;
