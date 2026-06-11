const Terms = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center">
                    <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm font-semibold">
                        Terms
                    </p>
                    <h1 className="text-5xl font-extrabold">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-slate-400">
                        These terms explain how you may use the eTuitionBd
                        platform.
                    </p>
                </div>

                <div className="space-y-6 rounded-4xl border border-slate-800 bg-slate-900/90 p-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Using the Platform
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            You may use this site to browse tutors, post tuition
                            requests, and manage your account.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            User Responsibilities
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Users are responsible for maintaining an accurate
                            profile and using the platform fairly.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Service Changes
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            We may update the service or terms. Continued use
                            indicates acceptance of changes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Terms;
