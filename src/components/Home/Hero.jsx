import { motion } from "framer-motion";
import { Search, GraduationCap, BookOpen, Users } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-900 to-cyan-950" />

            {/* Blur Circles */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/15 rounded-full blur-3xl" />

            <div className="absolute bottom-0 right-10 w-96 h-96 bg-fuchsia-400/15 rounded-full blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="badge badge-primary badge-lg mb-6">
                            🚀 Trusted by 10,000+ Students
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-100">
                            Find Verified Tutors
                            <span className="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                                {" "}
                                Across Bangladesh
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-300/80 max-w-xl">
                            Connect with verified tutors, discover tuition
                            opportunities, and achieve better academic results
                            through a trusted platform.
                        </p>

                        {/* Search Box */}
                        <div className="mt-10 bg-slate-900/80 shadow-2xl rounded-3xl p-3 flex items-center gap-3 max-w-xl border border-slate-700/60">
                            <Search className="text-cyan-300" />

                            <input
                                type="text"
                                placeholder="Search subject, class or tutor..."
                                className="flex-1 outline-none bg-transparent text-slate-100 placeholder:text-slate-500"
                            />

                            <button className="btn btn-primary rounded-2xl">
                                Search
                            </button>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="btn btn-primary btn-lg rounded-full">
                                Find Tutors
                            </button>

                            <button className="btn btn-outline btn-lg rounded-full border-cyan-300 text-cyan-300 hover:bg-slate-900/90">
                                Become a Tutor
                            </button>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
                            alt="Students"
                            className="rounded-4xl shadow-2xl"
                        />

                        {/* Floating Card 1 */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 4,
                            }}
                            className="absolute -left-10 top-12 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-slate-700/50"
                        >
                            <div className="flex items-center gap-3">
                                <GraduationCap className="text-cyan-300" />

                                <div>
                                    <h4 className="font-bold text-slate-100">
                                        Expert Tutors
                                    </h4>

                                    <p className="text-xs text-slate-400">
                                        Verified Professionals
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Card 2 */}
                        <motion.div
                            animate={{
                                y: [0, 12, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 5,
                            }}
                            className="absolute -right-8 bottom-12 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-slate-700/50"
                        >
                            <div className="flex items-center gap-3">
                                <Users className="text-fuchsia-300" />

                                <div>
                                    <h4 className="font-bold text-slate-100">
                                        20K+ Students
                                    </h4>

                                    <p className="text-xs text-slate-400">
                                        Learning Daily
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Card 3 */}
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 6,
                            }}
                            className="absolute top-1/2 right-0 bg-slate-900/90 backdrop-blur-xl rounded-3xl p-5 shadow-xl border border-slate-700/50"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="text-cyan-200" />

                                <div>
                                    <h4 className="font-bold text-slate-100">
                                        50+ Subjects
                                    </h4>

                                    <p className="text-xs text-slate-400">
                                        Available
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="flex justify-center mt-16">
                    <div className="w-full max-w-4xl px-4">
                        <div className="stats shadow-xl bg-slate-900/95 border border-slate-700/60 text-slate-100 w-full">
                            <div className="stat">
                                <div className="stat-value text-cyan-300">
                                    ⭐ 4.9
                                </div>
                                <div className="stat-title text-slate-300">
                                    Ratings
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-value text-fuchsia-300">
                                    1200+
                                </div>
                                <div className="stat-title text-slate-300">
                                    Tutors
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-value text-cyan-200">
                                    85%
                                </div>
                                <div className="stat-title text-slate-300">
                                    Success Match
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
