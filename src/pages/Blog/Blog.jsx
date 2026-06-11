import { Link } from "react-router";

const Blog = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm font-semibold">
                        Resources
                    </p>
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Latest Insights for Students & Tutors
                    </h1>
                    <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                        Explore guides, study tips, and tutoring best practices
                        to help you succeed.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {[
                        {
                            title: "How to choose the right tutor",
                            category: "Student Guide",
                            summary:
                                "Learn the 5 questions to ask before hiring a tutor and build a study plan that works.",
                        },
                        {
                            title: "Maximizing your tuition profile",
                            category: "Tutor Tips",
                            summary:
                                "Discover how to present your skills, set rates, and attract high-quality tuition requests.",
                        },
                        {
                            title: "Balancing tuition and studies",
                            category: "Productivity",
                            summary:
                                "Use simple routines to stay organized, avoid burnout, and keep your learning on track.",
                        },
                        {
                            title: "Local tuition trends in Bangladesh",
                            category: "Market",
                            summary:
                                "Understand the most in-demand subjects and locations for tutors across the region.",
                        },
                    ].map((post, index) => (
                        <article
                            key={index}
                            className="group rounded-4xl border border-slate-800 bg-slate-900/90 p-8 transition hover:-translate-y-1 hover:border-cyan-400/40"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                                    {post.category}
                                </span>
                                <span className="text-slate-400 text-xs">
                                    5 min read
                                </span>
                            </div>
                            <h2 className="mt-6 text-2xl font-bold text-white">
                                {post.title}
                            </h2>
                            <p className="mt-4 text-slate-400 leading-relaxed">
                                {post.summary}
                            </p>
                            <Link
                                to="/blog"
                                className="mt-6 inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200"
                            >
                                Read more
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
