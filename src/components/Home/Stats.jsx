const Stats = () => {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="stats shadow-lg w-full bg-slate-950/95 border border-slate-700/60 text-slate-100">
                    <div className="stat">
                        <div className="stat-value text-cyan-300">5K+</div>
                        <div className="stat-title text-slate-300">Tutors</div>
                    </div>
                    <div className="stat">
                        <div className="stat-value text-fuchsia-300">20K+</div>
                        <div className="stat-title text-slate-300">
                            Students
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-value text-cyan-200">15K+</div>
                        <div className="stat-title text-slate-300">
                            Tuitions Posted
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
