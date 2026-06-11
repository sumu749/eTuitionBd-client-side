const Privacy = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center">
                    <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm font-semibold">
                        Privacy
                    </p>
                    <h1 className="text-5xl font-extrabold">Privacy Policy</h1>
                    <p className="mt-4 text-slate-400">
                        Your privacy is important. We only collect the data
                        needed to deliver learning services.
                    </p>
                </div>

                <div className="space-y-6 rounded-4xl border border-slate-800 bg-slate-900/90 p-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Information We Collect
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            We collect profile information, email address, and
                            tuition preferences to connect students and tutors.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            How We Use It
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Data is used to personalize your account, process
                            communications, and support student-tutor matching.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Security
                        </h2>
                        <p className="mt-3 text-slate-400 leading-relaxed">
                            We protect your information with secure
                            authentication, encrypted communication, and access
                            controls.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
