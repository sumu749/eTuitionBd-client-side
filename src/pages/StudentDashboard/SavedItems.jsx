import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import { getSavedBookmarks, removeBookmark } from "../../utils/bookmarkUtils";

const SavedItems = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const { data: bookmarks = { tutors: [], tuitions: [] }, isLoading } =
        useQuery({
            queryKey: ["saved-bookmarks", user?.email],
            enabled: !!user?.email,
            queryFn: async () => getSavedBookmarks(user.email),
            initialData: { tutors: [], tuitions: [] },
        });

    const handleRemove = async (type, id) => {
        if (!user?.email) return;

        try {
            await removeBookmark(type, id, user.email);
            await queryClient.invalidateQueries([
                "saved-bookmarks",
                user.email,
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Saved Items
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold text-white">
                            Your bookmarked tutors and tuitions
                        </h1>
                        <p className="mt-4 text-slate-400">
                            Keep track of promising tutors and tuition listings
                            you want to revisit.
                        </p>
                    </div>
                </div>
            </div>

            <section className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">
                                Saved Tutors
                            </h2>
                            <p className="text-slate-400 mt-1">
                                Tutors you bookmarked for future contact.
                            </p>
                        </div>
                        <span className="badge badge-primary badge-lg">
                            {bookmarks.tutors.length}
                        </span>
                    </div>

                    {bookmarks.tutors.length === 0 ? (
                        <div className="text-slate-400">
                            No tutors saved yet. Browse tutors to bookmark your
                            favorites.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookmarks.tutors.map((tutor) => (
                                <div
                                    key={tutor.id}
                                    className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {tutor.name}
                                            </h3>
                                            <p className="text-cyan-300">
                                                {tutor.subject}
                                            </p>
                                            <p className="text-slate-400 mt-1">
                                                {tutor.university}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                to={`/tutors/${tutor.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Tutor
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-outline btn-sm"
                                                onClick={() =>
                                                    handleRemove(
                                                        "tutor",
                                                        tutor.id,
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
                    <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-white">
                                Saved Tuitions
                            </h2>
                            <p className="text-slate-400 mt-1">
                                Tuition posts you want to follow up on later.
                            </p>
                        </div>
                        <span className="badge badge-primary badge-lg">
                            {bookmarks.tuitions.length}
                        </span>
                    </div>

                    {bookmarks.tuitions.length === 0 ? (
                        <div className="text-slate-400">
                            No tuition posts saved yet. Browse available
                            tuitions to bookmark them.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {bookmarks.tuitions.map((tuition) => (
                                <div
                                    key={tuition.id}
                                    className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5"
                                >
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">
                                                {tuition.subject}
                                            </h3>
                                            <p className="text-cyan-300">
                                                {tuition.classLevel}
                                            </p>
                                            <p className="text-slate-400 mt-1">
                                                {tuition.location}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                to={`/tuitions/${tuition.id}`}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Tuition
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-outline btn-sm"
                                                onClick={() =>
                                                    handleRemove(
                                                        "tuition",
                                                        tuition.id,
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SavedItems;
