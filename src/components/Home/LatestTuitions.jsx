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
                            className="card bg-base-100 shadow-xl border border-slate-700/60"
                        >
                            <div className="card-body">
                                <h3 className="font-bold text-slate-100">
                                    HSC Physics Tutor
                                </h3>

                                <p className="text-slate-300">
                                    Budget: ৳8000/month
                                </p>

                                <button className="btn btn-primary">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestTuitions;
