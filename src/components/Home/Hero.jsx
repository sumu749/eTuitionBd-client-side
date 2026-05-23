import { Search } from "lucide-react";

const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-50 via-white to-violet-50"></div>

            <div className="relative max-w-7xl mx-auto px-6 py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="badge badge-primary badge-lg">
                            Trusted by 10,000+ Students
                        </span>

                        <h1 className="text-5xl lg:text-7xl font-black mt-6 leading-tight">
                            Find Your Perfect Tutor
                            <span className="text-primary"> Today</span>
                        </h1>

                        <p className="mt-6 text-lg text-base-content/70">
                            Connect with experienced tutors, post tuition
                            opportunities, and accelerate learning.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="btn btn-primary btn-lg rounded-full">
                                Find Tutors
                            </button>

                            <button className="btn btn-outline btn-lg rounded-full">
                                Become Tutor
                            </button>
                        </div>

                        <div className="mt-10 flex items-center gap-3 bg-white p-3 rounded-2xl shadow-lg max-w-md">
                            <Search size={20} />

                            <input
                                type="text"
                                placeholder="Search subject..."
                                className="outline-none flex-1"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            alt=""
                            className="rounded-3xl shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
