const LatestTuitions = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">
                    Latest Tuition Opportunities
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h3 className="font-bold">HSC Physics Tutor</h3>

                                <p>Budget: ৳8000/month</p>

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
