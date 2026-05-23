import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CTASection = () => {
    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div
                    className="
                    relative
                    overflow-hidden
                    rounded-[40px]
                    p-10 md:p-20
                    bg-linear-to-r from-slate-950 via-slate-900 to-cyan-950
                    border border-slate-700/60
                "
                >
                    {/* Background Glow */}
                    <div
                        className="
                        absolute -top-20 left-1/2
                        -translate-x-1/2
                        w-125
                        h-96
                        bg-cyan-400/10
                        blur-3xl
                        rounded-full
                    "
                    />

                    <div className="relative text-center">
                        <h2
                            className="
                            text-4xl md:text-6xl
                            font-black
                            text-slate-100
                        "
                        >
                            Ready To Find
                            <br />
                            <span className="bg-linear-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                                Your Perfect Tutor?
                            </span>
                        </h2>

                        <p
                            className="
                            mt-6
                            text-lg
                            text-slate-300/80
                            max-w-2xl
                            mx-auto
                        "
                        >
                            Join thousands of students and tutors already using
                            the platform to achieve better learning outcomes.
                        </p>

                        <div
                            className="
                            flex flex-wrap
                            justify-center
                            gap-4
                            mt-10
                        "
                        >
                            <Link
                                to="/register"
                                className="
                                btn
                                btn-primary
                                rounded-full
                                px-8
                            "
                            >
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/tutors"
                                className="
                                btn
                                btn-outline
                                border-cyan-300
                                text-cyan-300
                                hover:bg-slate-900/90
                                rounded-full
                                px-8
                            "
                            >
                                Browse Tutors
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
