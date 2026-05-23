import { motion } from "framer-motion";

const universities = ["BUET", "DU", "NSU", "BRAC", "CUET", "RUET"];

const TrustedUniversities = () => {
    return (
        <section className="py-12 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-3xl font-bold text-center text-slate-400 mb-8">
                    Tutors from top universities
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {universities.map((uni) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            key={uni}
                            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center"
                        >
                            <h3 className="font-semibold text-slate-200">
                                {uni}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedUniversities;
