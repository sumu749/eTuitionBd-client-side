import { motion } from "framer-motion";
import { Search, MessageCircle, GraduationCap } from "lucide-react";

const steps = [
    {
        id: 1,
        title: "Find The Right Tutor",
        description:
            "Browse verified tutors by subject, class level, location, and budget.",
        icon: Search,
        color: "text-cyan-300",
    },
    {
        id: 2,
        title: "Connect Instantly",
        description:
            "Chat with tutors, compare profiles, and choose the best match.",
        icon: MessageCircle,
        color: "text-fuchsia-300",
    },
    {
        id: 3,
        title: "Start Learning",
        description:
            "Schedule sessions and begin your learning journey with confidence.",
        icon: GraduationCap,
        color: "text-cyan-300",
    },
];

const HowItWorks = () => {
    return (
        <section className="pt-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <span className="badge badge-primary">Simple Process</span>

                    <h2 className="text-4xl md:text-5xl font-black text-slate-100 mt-5">
                        How It Works
                    </h2>

                    <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                        Get connected with the perfect tutor in just a few
                        simple steps.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    {steps.map((step) => {
                        const Icon = step.icon;

                        return (
                            <motion.div
                                key={step.id}
                                whileHover={{
                                    y: -10,
                                }}
                                className="
                                    bg-slate-900/90
                                    border border-slate-800
                                    rounded-4xl
                                    p-8
                                    relative
                                    overflow-hidden
                                "
                            >
                                <div
                                    className="
                                    absolute top-0 right-0
                                    w-32 h-32
                                    bg-cyan-500/5
                                    blur-3xl
                                    rounded-full
                                "
                                />

                                <div
                                    className="
                                    w-16 h-16
                                    rounded-2xl
                                    bg-slate-800
                                    flex items-center justify-center
                                "
                                >
                                    <Icon size={28} className={step.color} />
                                </div>

                                <span
                                    className="
                                    text-6xl
                                    font-black
                                    text-slate-800
                                    block mt-8
                                "
                                >
                                    0{step.id}
                                </span>

                                <h3
                                    className="
                                    text-xl
                                    font-bold
                                    text-slate-100
                                    mt-2
                                "
                                >
                                    {step.title}
                                </h3>

                                <p
                                    className="
                                    text-slate-400
                                    mt-4
                                    leading-relaxed
                                "
                                >
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
