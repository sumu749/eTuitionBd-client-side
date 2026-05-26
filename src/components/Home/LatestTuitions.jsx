import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MapPin, BookOpen, Wallet } from "lucide-react";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const LatestTuitions = () => {
    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["latest-tuitions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tuitions");
            const sorted = res.data?.slice().sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return 0;
            });
            return sorted || [];
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const latest = tuitions.slice(0, 6);

    return (
        <section className="pt-20 text-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-100">
                            Latest Tuition Opportunities
                        </h2>
                        <p className="text-slate-400 mt-3 max-w-2xl">
                            Browse the most recent approved tuition requests
                            from students.
                        </p>
                    </div>
                    <Link
                        to="/tuitions"
                        className="btn btn-outline btn-sm rounded-full text-cyan-300 border-cyan-300 hover:bg-slate-900"
                    >
                        View All Tuitions
                    </Link>
                </div>

                {latest.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        No tuition opportunities are available right now.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
                        {latest.map((tuition) => (
                            <div
                                key={tuition._id}
                                className="bg-slate-900/90 border border-slate-800 rounded-4xl p-6 hover:border-cyan-400/50 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-100">
                                            {tuition.subject}
                                        </h3>
                                        <p className="text-cyan-300 mt-1">
                                            {tuition.classLevel}
                                        </p>
                                    </div>
                                    <span className="badge badge-success">
                                        Approved
                                    </span>
                                </div>

                                <p className="text-slate-400 line-clamp-3 mb-6">
                                    {tuition.description}
                                </p>

                                <div className="space-y-3 mb-6 text-slate-300">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} />
                                        {tuition.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BookOpen size={18} />
                                        {tuition.classLevel}
                                    </div>
                                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                                        <Wallet size={18} />৳ {tuition.budget}
                                    </div>
                                </div>

                                <Link
                                    to={`/tuitions/${tuition._id}`}
                                    className="btn btn-primary w-full rounded-2xl"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestTuitions;
