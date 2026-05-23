import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Mahin Rahman",
        role: "HSC Student",
        review: "Found an amazing Physics tutor within 24 hours. The platform is simple and reliable.",
    },
    {
        name: "Tasnia Islam",
        role: "University Student",
        review: "The tutor matching process saved me so much time. Highly recommended.",
    },
    {
        name: "Rafid Hasan",
        role: "Parent",
        review: "We found a qualified Math tutor for our son. Excellent experience.",
    },
];

const Testimonials = () => {
    return (
        <section className="pt-20 bg-slate-950/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-100 mt-5">
                        What Our Users Say
                    </h2>

                    <p className="text-slate-400 mt-4">
                        Trusted by thousands of students, parents, and tutors.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            whileHover={{
                                y: -8,
                            }}
                            className="
                                bg-slate-900/90
                                border border-slate-800
                                rounded-4xl
                                p-8
                            "
                        >
                            <div className="flex gap-1 mb-5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className="
                                            text-cyan-300
                                            fill-cyan-300
                                        "
                                    />
                                ))}
                            </div>

                            <p
                                className="
                                    text-slate-300
                                    leading-relaxed
                                "
                            >
                                "{review.review}"
                            </p>

                            <div className="mt-6">
                                <h4
                                    className="
                                    font-bold
                                    text-slate-100
                                "
                                >
                                    {review.name}
                                </h4>

                                <p
                                    className="
                                    text-sm
                                    text-slate-400
                                "
                                >
                                    {review.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
