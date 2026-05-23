import { Star } from "lucide-react";
import { motion } from "framer-motion";

const FeaturedTutors = () => {
    const tutors = [
        {
            name: "Sarah Ahmed",
            subject: "Mathematics",
            university: "BUET",
            image: "https://i.pravatar.cc/300?img=5",
        },
        {
            name: "Nafis Rahman",
            subject: "Physics",
            university: "DU",
            image: "https://i.pravatar.cc/300?img=8",
        },
        {
            name: "Tanvir Hasan",
            subject: "Chemistry",
            university: "CUET",
            image: "https://i.pravatar.cc/300?img=12",
        },
    ];
    return (
        <section className="pt-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-black text-center text-slate-100">
                    Featured Tutors
                </h2>

                <p className="text-center text-slate-400 mt-4">
                    Top rated educators from leading universities
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
                    {tutors.map((tutor) => (
                        <motion.div
                            whileHover={{ y: -10 }}
                            key={tutor.name}
                            className="bg-slate-900/90 border border-slate-800 rounded-4xl overflow-hidden"
                        >
                            <img
                                src={tutor.image}
                                alt=""
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

                                <p className="text-cyan-300">{tutor.subject}</p>

                                <p className="text-slate-400 mt-1">
                                    {tutor.university}
                                </p>

                                <button className="btn btn-primary rounded-full mt-6 w-full">
                                    View Profile
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTutors;
