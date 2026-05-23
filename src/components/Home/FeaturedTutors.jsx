const FeaturedTutors = () => {
    return (
        <section className="pt-20 text-slate-100">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-slate-100">
                    Featured Tutors
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="card bg-base-100 shadow-xl border border-slate-700/60"
                        >
                            <div className="card-body items-center text-center">
                                <div className="avatar">
                                    <div className="w-20 rounded-full">
                                        <img
                                            src="https://i.pravatar.cc/150"
                                            alt=""
                                        />
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-100">
                                    Sarah Ahmed
                                </h3>

                                <p className="text-slate-300">Math Tutor</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedTutors;
