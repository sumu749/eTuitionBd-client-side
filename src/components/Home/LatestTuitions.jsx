const LatestTuitions = () => {
    return (
        <section className="pt-20 text-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-slate-100">
                    Latest Tuition Opportunities
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="bg-slate-900/90 border border-slate-800 rounded-4xl p-6"
                        >
                            <span className="badge badge-primary">Physics</span>

                            <h3 className="text-xl font-bold mt-4 text-slate-100">
                                Need HSC Physics Tutor
                            </h3>

                            <p className="text-slate-400 mt-3">
                                Location: Dhanmondi, Dhaka
                            </p>

                            <p className="text-slate-400">
                                Budget: ৳8,000 / Month
                            </p>

                            <p className="text-slate-400">
                                Class: HSC 2nd Year
                            </p>

                            <button className="btn btn-primary mt-6 rounded-full">
                                Apply Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestTuitions;
