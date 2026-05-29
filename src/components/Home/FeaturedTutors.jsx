import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/api";

const FeaturedTutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const fetchTutors = async () => {
            try {
                const res = await api.get("/public-tutors?limit=50");
                if (mounted) {
                    const users = res.data || [];
                    const sorted = users
                        .slice()
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt || 0) -
                                new Date(a.createdAt || 0),
                        );
                    setTutors(sorted.slice(0, 4));
                }
            } catch {
                if (mounted) {
                    setTutors([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        };

        fetchTutors();

        return () => {
            mounted = false;
        };
    }, []);

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
                                key={tutor.id || tutor.name}
                                className="bg-slate-900/90 border border-slate-800 rounded-4xl overflow-hidden"
                            >
                                <img
                                    src={
                                        tutor.photoURL ||
                                        tutor.image ||
                                        "https://i.pravatar.cc/300?img=65"
                                    }
                                    alt={tutor.name}
                                    className="h-72 w-full object-cover"
                                />

                                <div className="p-6">
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

                                    <p className="text-cyan-300">
                                        {tutor.subject}
                                    </p>

                                    <p className="text-slate-400 mt-1">
                                        {tutor.university}
                                    </p>

                                    <button
                                        onClick={() => navigate("/tutors")}
                                        className="btn btn-primary rounded-full mt-6 w-full"
                                    >
                                        View Profile
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedTutors;
