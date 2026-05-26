import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MapPin, BookOpen, Wallet } from "lucide-react";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const Tuitions = () => {
    const { data: tuitions = [], isLoading } = useQuery({
        queryKey: ["approved-tuitions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/approved-tuitions");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black">
                    Available
                    <span className="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                        {" "}
                        Tuitions
                    </span>
                </h1>

                <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                    Browse approved tuition opportunities and apply as a tutor.
                </p>
            </div>

            {tuitions.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold text-slate-300">
                        No tuition available
                    </h2>

                    <p className="text-slate-500 mt-2">
                        Check back later for new opportunities.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tuitions.map((tuition) => (
                        <div
                            key={tuition._id}
                            className="
                            bg-slate-900/90
                            border border-slate-800
                            rounded-3xl
                            p-6
                            hover:border-cyan-400/50
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            "
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-100">
                                        {tuition.subject}
                                    </h2>

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

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <MapPin size={18} />
                                    {tuition.location}
                                </div>

                                <div className="flex items-center gap-2 text-slate-300">
                                    <BookOpen size={18} />
                                    {tuition.classLevel}
                                </div>

                                <div className="flex items-center gap-2 text-green-400 font-semibold">
                                    <Wallet size={18} />৳ {tuition.budget}
                                </div>
                            </div>

                            <Link
                                to={`/tuitions/${tuition._id}`}
                                className="
                                btn
                                btn-primary
                                w-full
                                rounded-2xl
                                "
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Tuitions;
