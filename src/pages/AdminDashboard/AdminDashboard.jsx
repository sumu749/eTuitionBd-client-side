/* eslint-disable indent */
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChartBar, ShieldCheck, Users, Wallet } from "lucide-react";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import api from "../../api/api";

const AdminDashboard = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await api.get("/admin-stats");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-8">
            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl w-full">
                        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                            Admin portal
                        </p>
                        <h1 className="mt-4 text-4xl font-black text-white">
                            Executive Dashboard
                        </h1>
                        <p className="mt-4 text-slate-400 leading-relaxed">
                            Monitor platform performance, revenue, and
                            moderation operations from a single control center.
                            Make data-driven decisions with fast access to
                            users, tuitions, and analytics.
                        </p>
                    </div>

                    <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-auto lg:grid-cols-2">
                        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">
                            <p className="text-sm text-slate-400">
                                Total Revenue
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-emerald-300">
                                ৳ {data?.totalRevenue ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-5">
                            <p className="text-sm text-slate-400">
                                Active Users
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-cyan-300">
                                {data?.totalUsers ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                Platform health
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                User roles
                            </h2>
                        </div>
                        <Users className="h-7 w-7 text-cyan-400" />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl bg-slate-950 p-4 text-center">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Students
                            </p>
                            <p className="mt-2 text-2xl font-bold text-green-300">
                                {data?.totalStudents ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-4 text-center">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Tutors
                            </p>
                            <p className="mt-2 text-2xl font-bold text-yellow-300">
                                {data?.totalTutors ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-4 text-center">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Admins
                            </p>
                            <p className="mt-2 text-2xl font-bold text-fuchsia-300">
                                {data?.totalAdmins ?? 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                Operations
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                Platform activity
                            </h2>
                        </div>
                        <ChartBar className="h-7 w-7 text-cyan-400" />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Tuition requests
                            </p>
                            <p className="mt-2 text-3xl font-bold text-pink-300">
                                {data?.totalTuitions ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Applications reviewed
                            </p>
                            <p className="mt-2 text-3xl font-bold text-orange-300">
                                {data?.totalApplications ?? 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                Compliance
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                Moderation tools
                            </h2>
                        </div>
                        <ShieldCheck className="h-7 w-7 text-rose-400" />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Audit ready
                            </p>
                            <p className="mt-2 text-xl font-semibold text-slate-100">
                                Full user & tuition oversight
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Secure actions
                            </p>
                            <p className="mt-2 text-xl font-semibold text-slate-100">
                                Role updates and approvals
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full lg:w-auto">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                            Quick access
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold text-white">
                            Jump to your admin tools
                        </h2>
                    </div>
                    <p className="text-slate-400 max-w-xl">
                        Use these shortcuts to navigate directly to analytics,
                        user controls, and tuition moderation.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <Link
                        to="analytics"
                        className="group block w-full rounded-3xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-cyan-400"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                    Analytics
                                </p>
                                <h3 className="mt-3 text-xl font-semibold text-white">
                                    Reports & charts
                                </h3>
                            </div>
                            <ChartBar className="h-6 w-6 text-cyan-400" />
                        </div>
                        <p className="mt-5 text-slate-400">
                            View revenue trends, user distribution, and tuition
                            performance.
                        </p>
                    </Link>

                    <Link
                        to="users"
                        className="group block w-full rounded-3xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-green-400"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                    User management
                                </p>
                                <h3 className="mt-3 text-xl font-semibold text-white">
                                    Manage accounts
                                </h3>
                            </div>
                            <Users className="h-6 w-6 text-green-400" />
                        </div>
                        <p className="mt-5 text-slate-400">
                            Approve roles, audit activity, and maintain platform
                            security.
                        </p>
                    </Link>

                    <Link
                        to="tuitions"
                        className="group block w-full rounded-3xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-rose-400"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                    Tuition control
                                </p>
                                <h3 className="mt-3 text-xl font-semibold text-white">
                                    Review posts
                                </h3>
                            </div>
                            <BookOpen className="h-6 w-6 text-rose-400" />
                        </div>
                        <p className="mt-5 text-slate-400">
                            Approve or reject tutoring requests and keep the
                            marketplace trusted.
                        </p>
                    </Link>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                Revenue snapshot
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                Monthly earnings
                            </h2>
                        </div>
                        <Wallet className="h-7 w-7 text-emerald-400" />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Total revenue
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-emerald-300">
                                ৳ {data?.totalRevenue ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Revenue per tuition
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-slate-100">
                                ৳{" "}
                                {data?.totalTuitions > 0
                                    ? Math.round(
                                          data.totalRevenue /
                                              data.totalTuitions,
                                      )
                                    : 0}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                                System summary
                            </p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">
                                Performance indicators
                            </h2>
                        </div>
                        <ShieldCheck className="h-7 w-7 text-fuchsia-400" />
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                New accounts this month
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-cyan-300">
                                {data?.newUsers ?? 0}
                            </p>
                        </div>
                        <div className="rounded-3xl bg-slate-950 p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                Pending reviews
                            </p>
                            <p className="mt-3 text-3xl font-semibold text-orange-300">
                                {data?.pendingReviews ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;
