import { Link } from "react-router";
import {
    Award,
    BookOpen,
    MessageCircle,
    Wallet,
    Users,
    CheckCircle2,
} from "lucide-react";

const TutorDashboard = () => {
    return (
        <div className="space-y-8">
            <section className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Tutor dashboard
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold text-white">
                            Welcome back, tutor.
                        </h1>
                        <p className="mt-4 text-slate-400">
                            Manage your applications, track earnings, and
                            discover new tuition opportunities from one
                            dashboard.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/tuitions"
                            className="btn btn-primary rounded-full px-6 py-3"
                        >
                            Browse Tuitions
                        </Link>
                        <Link
                            to="/dashboard/tutor/applications"
                            className="btn btn-outline rounded-full px-6 py-3"
                        >
                            My Applications
                        </Link>
                    </div>
                </div>
            </section>

            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Active offers
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                18
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fuchsia-500/15 text-fuchsia-300">
                            <MessageCircle size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Review ongoing tutor invitations and respond to new
                        tuition requests.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Current sessions
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                6
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                            <CheckCircle2 size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Keep track of active classes and upcoming tuition
                        sessions.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Earnings this month
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                ৳ 32,400
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600/15 text-cyan-300">
                            <Wallet size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Monitor your income and stay on top of payments from
                        completed lessons.
                    </p>
                </article>
            </div>

            <section className="rounded-4xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Quick actions
                        </h2>
                        <p className="mt-2 text-slate-400">
                            Jump to the most important tutor tools without
                            leaving your dashboard.
                        </p>
                    </div>
                    <Link
                        to="/tuitions"
                        className="btn btn-secondary rounded-full px-6 py-3"
                    >
                        Explore New Requests
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link
                        to="/tuitions"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-cyan-500 hover:ring-1 hover:ring-cyan-500/30"
                    >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-600/10 text-cyan-300">
                            <BookOpen size={22} />
                        </div>
                        <p className="mt-4 text-sm font-medium text-cyan-300">
                            Tuition Market
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                            Browse Requests
                        </p>
                        <p className="mt-3 text-sm text-slate-400">
                            View all approved tuition posts and send
                            applications quickly.
                        </p>
                    </Link>

                    <Link
                        to="/dashboard/tutor"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-fuchsia-500 hover:ring-1 hover:ring-fuchsia-500/30"
                    >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-fuchsia-500/10 text-fuchsia-300">
                            <Users size={22} />
                        </div>
                        <p className="mt-4 text-sm font-medium text-fuchsia-300">
                            Your Applications
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                            Manage Offers
                        </p>
                        <p className="mt-3 text-sm text-slate-400">
                            Review your proposals, accept new tuitions, and
                            communicate with students.
                        </p>
                    </Link>

                    <Link
                        to="/dashboard/tutor"
                        className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500/30"
                    >
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-300">
                            <Award size={22} />
                        </div>
                        <p className="mt-4 text-sm font-medium text-emerald-300">
                            Top Tutor
                        </p>
                        <p className="mt-3 text-2xl font-semibold text-white">
                            Improve Ranking
                        </p>
                        <p className="mt-3 text-sm text-slate-400">
                            Keep your profile active and earn better visibility
                            among students.
                        </p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TutorDashboard;
