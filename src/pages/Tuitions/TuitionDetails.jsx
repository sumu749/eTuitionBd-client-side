import { Link, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, BookmarkMinus } from "lucide-react";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

import useTutor from "../../hooks/useTutor";
import ApplyModal from "../../components/Tutor/ApplyModal";
import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";
import { isBookmarked, toggleBookmark } from "../../utils/bookmarkUtils";

const TuitionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [openModal, setOpenModal] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);
    const [, setBookmarkReload] = useState(0);
    const [isTutor] = useTutor();
    const [isStudent] = useStudent();

    const { data: tuition, isLoading } = useQuery({
        queryKey: ["tuition-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/${id}`);
            return res.data;
        },
    });

    const isSaved =
        user?.email && tuition
            ? isBookmarked("tuition", tuition._id, user.email)
            : false;

    const { data: alreadyApplied } = useQuery({
        queryKey: ["already-applied", id, user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications/${user.email}`);
            const applications = res.data || [];
            return applications.find(
                (application) => application.tuitionId === id,
            );
        },
    });

    const isApplicationSubmitted = hasApplied || !!alreadyApplied;

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-6 flex items-center justify-between">
                <Link
                    to="/tuitions"
                    className="btn btn-ghost btn-sm rounded-full"
                >
                    Back to Tuition
                </Link>
                <div className="text-sm text-slate-400">
                    Details · {tuition.subject}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-4xl p-8 shadow-lg">
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-extrabold text-white leading-tight">
                            {tuition.subject}
                        </h1>

                        <div className="flex flex-wrap gap-3 mt-4 items-center">
                            <span className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm">
                                {tuition.classLevel}
                            </span>

                            <span className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm">
                                {tuition.location}
                            </span>

                            <span className="inline-flex items-center gap-2 bg-emerald-700/10 text-emerald-300 px-3 py-1 rounded-full text-sm">
                                ৳ {tuition.budget}
                            </span>

                            <span className="ml-auto badge badge-success">
                                {tuition.status}
                            </span>
                        </div>

                        <div className="mt-6 prose prose-invert text-slate-300">
                            <h3 className="text-lg font-semibold text-white">
                                Description
                            </h3>
                            <p>{tuition.description}</p>
                        </div>
                    </div>

                    <aside className="md:col-span-1">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                            <p className="text-sm text-slate-400">
                                Offered Budget
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-white">
                                ৳ {tuition.budget}
                            </p>

                            <div className="mt-6 space-y-3">
                                {isStudent && (
                                    <button
                                        type="button"
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
                                                "tuition",
                                                tuition,
                                                user.email,
                                            );
                                            setBookmarkReload(
                                                (prev) => prev + 1,
                                            );
                                            toast.success(
                                                saved
                                                    ? "Tuition saved"
                                                    : "Tuition removed",
                                            );
                                        }}
                                        className={`btn btn-outline w-full ${
                                            isSaved ? "btn-success" : ""
                                        }`}
                                    >
                                        {isSaved ? (
                                            <>
                                                <BookmarkMinus className="w-4 h-4 mr-2" />
                                                Saved Tuition
                                            </>
                                        ) : (
                                            <>
                                                <Bookmark className="w-4 h-4 mr-2" />
                                                Save Tuition
                                            </>
                                        )}
                                    </button>
                                )}
                                {isTutor && (
                                    <button
                                        disabled={isApplicationSubmitted}
                                        onClick={() => setOpenModal(true)}
                                        className="btn btn-primary w-full"
                                    >
                                        {isApplicationSubmitted
                                            ? "Already Applied"
                                            : "Apply Now"}
                                    </button>
                                )}
                            </div>

                            <p className="mt-3 text-xs text-slate-500">
                                Applications are sent to the student for review.
                                Keep your qualifications concise and relevant.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            <ApplyModal
                tuition={tuition}
                openModal={openModal}
                setOpenModal={setOpenModal}
                onApplied={() => setHasApplied(true)}
            />
        </section>
    );
};

export default TuitionDetails;
