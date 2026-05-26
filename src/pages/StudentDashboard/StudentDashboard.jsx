import { BookOpen, ClipboardList, Users } from "lucide-react";
import { Link } from "react-router";

const StudentDashboard = () => {
    return (
        <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Student dashboard
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold text-white">
                            Welcome back to your learning hub.
                        </h1>
                        <p className="mt-4 text-slate-400">
                            Manage your tuition requests, review application status, and discover the best tutors in one streamlined workspace.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/dashboard/student/post-tuition"
                            className="btn btn-primary rounded-full px-6 py-3"
                        >
                            Post Tuition
                        </Link>
                        <Link
                            to="/dashboard/student/my-tuitions"
                            className="btn btn-outline rounded-full px-6 py-3"
                        >
                            View My Tuitions
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Active requests
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">12</p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600/15 text-cyan-300">
                            <BookOpen size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Track your current tuition posts and review tutor responses.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Applications received
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">37</p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fuchsia-500/15 text-fuchsia-300">
                            <Users size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        See how many tutors have shown interest in your tuition requests.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Completed lessons
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">8</p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                            <ClipboardList size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Monitor your progress and stay on top of active tuition sessions.
                    </p>
                </article>
            </div>

            <section className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Quick actions
                        </h2>
                        <p className="mt-2 text-slate-400">
                            Use the dashboard shortcuts to manage your tuitions faster.
                        </p>
                    </div>
                    <Link
                        to="/dashboard/student/post-tuition"
                        className="btn btn-secondary rounded-full px-6 py-3"
                    >
                        Create New Request
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link
                        to="/dashboard/student/my-tuitions"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-cyan-500 hover:ring-1 hover:ring-cyan-500/30"
                    >
                        <p className="text-sm font-medium text-cyan-300">My Tuitions</p>
                        <p className="mt-4 text-3xl font-semibold text-white">Manage requests</p>
                        <p className="mt-3 text-sm text-slate-400">
                            Edit, review status, or delete your existing tuition posts.
                        </p>
                    </Link>

                    <Link
                        to="/dashboard/student/applied-tutors"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-fuchsia-500 hover:ring-1 hover:ring-fuchsia-500/30"
                    >
                        <p className="text-sm font-medium text-fuchsia-300">Applied Tutors</p>
                        <p className="mt-4 text-3xl font-semibold text-white">Review applicants</p>
                        <p className="mt-3 text-sm text-slate-400">
                            Check tutor applications and start chatting with qualified candidates.
                        </p>
                    </Link>

                    <Link
                        to="/dashboard/student/payments"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500/30"
                    >
                        <p className="text-sm font-medium text-emerald-300">Payments</p>
                        <p className="mt-4 text-3xl font-semibold text-white">Billing overview</p>
                        <p className="mt-3 text-sm text-slate-400">
                            Manage invoices, completed payments, and upcoming tuition fees.
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default StudentDashboard;
