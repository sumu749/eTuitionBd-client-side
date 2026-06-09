/* eslint-disable indent */
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
    Award,
    BookOpen,
    Briefcase,
    CheckCircle2,
    ChevronRight,
    GraduationCap,
    MessageCircle,
    TrendingUp,
    Users,
    Wallet,
    AlertCircle,
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from "recharts";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import api from "../../api/api";

const StatCard = ({ label, value, sub, icon: Icon, color }) => (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
        <div className="flex items-start justify-between gap-3">
            <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500">
                    {label}
                </p>
                <p className="mt-4 text-3xl font-semibold text-white">
                    {value}
                </p>
                {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
            </div>
            <div
                className={`inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-3xl ${color}`}
            >
                <Icon size={24} />
            </div>
        </div>
    </article>
);

const StatusBadge = ({ status }) => {
    const map = {
        pending: "bg-amber-500/15 text-amber-300",
        approved: "bg-emerald-500/15 text-emerald-300",
        rejected: "bg-rose-500/15 text-rose-300",
    };
    return (
        <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] ${map[status] || map.pending}`}
        >
            {status}
        </span>
    );
};

const ProfileBanner = ({ user, dbProfile }) => {
    const fields = [
        { key: "photoURL", label: "Photo" },
        { key: "subject", label: "Subject" },
        { key: "university", label: "University" },
        { key: "bio", label: "Bio" },
        { key: "location", label: "Location" },
    ];
    const missing = fields.filter((f) => {
        const val = f.key === "photoURL" ? user?.photoURL : dbProfile?.[f.key];
        return !val;
    });
    if (missing.length === 0) return null;
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-amber-500/25 bg-amber-500/8 px-6 py-4">
            <div className="flex items-start gap-3">
                <AlertCircle
                    size={18}
                    className="text-amber-400 mt-0.5 shrink-0"
                />
                <div>
                    <p className="text-sm font-medium text-amber-300">
                        Your profile is incomplete
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Missing: {missing.map((f) => f.label).join(", ")}
                    </p>
                </div>
            </div>
            <Link
                to="/dashboard/tutor/profile"
                className="btn btn-sm btn-warning rounded-full shrink-0"
            >
                Complete Profile
            </Link>
        </div>
    );
};

const TutorDashboard = () => {
    const { user } = useAuth();

    const { data: applications = [], isLoading: appLoading } = useQuery({
        queryKey: ["tutor-applications-dashboard", user?.email],
        enabled: !!user?.email,
        queryFn: async () =>
            (await api.get(`/tutor-applications/${user.email}`)).data,
    });

    const { data: ongoingTuitions = [], isLoading: ongoingLoading } = useQuery({
        queryKey: ["ongoing-tuitions", user?.email],
        enabled: !!user?.email,
        queryFn: async () =>
            (await api.get(`/ongoing-tuitions/${user.email}`)).data,
    });

    const { data: revenueTransactions = [], isLoading: revenueLoading } =
        useQuery({
            queryKey: ["revenue", user?.email],
            enabled: !!user?.email,
            queryFn: async () => (await api.get(`/revenue/${user.email}`)).data,
        });

    const { data: dbProfile } = useQuery({
        queryKey: ["db-profile", user?.email],
        enabled: !!user?.email,
        queryFn: async () =>
            (await api.get(`/users/${encodeURIComponent(user.email)}`)).data,
    });

    if (appLoading || ongoingLoading || revenueLoading)
        return <LoadingSpinner />;

    const pending = applications.filter((a) => a.status === "pending");
    const approved = applications.filter((a) => a.status === "approved");
    const rejected = applications.filter((a) => a.status === "rejected");
    const totalEarnings = revenueTransactions.reduce(
        (s, t) => s + Number(t.amount || 0),
        0,
    );

    const earningsChartData = (() => {
        const months = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = d.toLocaleString("default", {
                month: "short",
                year: "2-digit",
            });
            months[key] = 0;
        }
        revenueTransactions.forEach((t) => {
            const key = new Date(t.paymentDate).toLocaleString("default", {
                month: "short",
                year: "2-digit",
            });
            if (key in months) months[key] += Number(t.amount || 0);
        });
        return Object.entries(months).map(([name, revenue]) => ({
            name,
            revenue,
        }));
    })();

    const recentApplications = [...applications]
        .sort((a, b) => new Date(b.appliedAt || 0) - new Date(a.appliedAt || 0))
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Hero */}
            <section className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Tutor dashboard
                        </p>
                        <h1 className="mt-4 text-4xl font-semibold text-white">
                            Welcome back,{" "}
                            {user?.displayName?.split(" ")[0] || "Tutor"}.
                        </h1>
                        <p className="mt-3 text-slate-400">
                            Manage your applications, track earnings, and
                            discover new tuition opportunities.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/tuitions"
                            className="btn btn-primary rounded-full px-6"
                        >
                            Browse Tuitions
                        </Link>
                        <Link
                            to="/dashboard/tutor/applications"
                            className="btn btn-outline rounded-full px-6"
                        >
                            My Applications
                        </Link>
                    </div>
                </div>
            </section>

            {/* Profile completeness banner */}
            <ProfileBanner user={user} dbProfile={dbProfile} />

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Applications"
                    value={applications.length}
                    sub={`${pending.length} pending`}
                    icon={Users}
                    color="bg-cyan-600/15 text-cyan-300"
                />
                <StatCard
                    label="Active Offers"
                    value={pending.length}
                    sub="Awaiting student review"
                    icon={MessageCircle}
                    color="bg-fuchsia-500/15 text-fuchsia-300"
                />
                <StatCard
                    label="Ongoing Sessions"
                    value={ongoingTuitions.length}
                    sub={`${approved.length} approved total`}
                    icon={CheckCircle2}
                    color="bg-emerald-500/15 text-emerald-300"
                />
                <StatCard
                    label="Total Earnings"
                    value={`৳ ${totalEarnings.toLocaleString()}`}
                    sub={`${revenueTransactions.length} transactions`}
                    icon={Wallet}
                    color="bg-amber-500/15 text-amber-300"
                />
            </div>

            {/* Breakdown + Chart */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                    <h2 className="text-lg font-semibold text-white mb-5">
                        Application Breakdown
                    </h2>
                    <div className="space-y-3">
                        {[
                            {
                                label: "Pending",
                                count: pending.length,
                                bar: "bg-amber-400",
                            },
                            {
                                label: "Approved",
                                count: approved.length,
                                bar: "bg-emerald-400",
                            },
                            {
                                label: "Rejected",
                                count: rejected.length,
                                bar: "bg-rose-400",
                            },
                        ].map((item) => {
                            const pct = applications.length
                                ? Math.round(
                                      (item.count / applications.length) * 100,
                                  )
                                : 0;
                            return (
                                <div key={item.label}>
                                    <div className="flex justify-between text-sm mb-1.5">
                                        <span className="text-slate-300">
                                            {item.label}
                                        </span>
                                        <span className="text-slate-400">
                                            {item.count} ({pct}%)
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${item.bar} transition-all duration-500`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {applications.length === 0 && (
                        <div className="mt-6 text-center text-slate-500 text-sm">
                            No applications yet.{" "}
                            <Link
                                to="/tuitions"
                                className="text-cyan-400 underline"
                            >
                                Browse tuitions
                            </Link>
                        </div>
                    )}
                </div>

                <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-white">
                            Earnings (last 6 months)
                        </h2>
                        <TrendingUp size={18} className="text-emerald-400" />
                    </div>
                    {revenueTransactions.length === 0 ? (
                        <div className="h-40 flex items-center justify-center text-slate-500 text-sm">
                            No earnings recorded yet.
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height={160}>
                            <AreaChart data={earningsChartData}>
                                <defs>
                                    <linearGradient
                                        id="earningsGrad"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#22d3ee"
                                            stopOpacity={0.25}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#22d3ee"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        background: "#0f172a",
                                        border: "1px solid #1e293b",
                                        borderRadius: 12,
                                        color: "#e2e8f0",
                                        fontSize: 12,
                                    }}
                                    formatter={(v) => [`৳ ${v}`, "Earnings"]}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#22d3ee"
                                    strokeWidth={2}
                                    fill="url(#earningsGrad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Recent applications */}
            <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-white">
                        Recent Applications
                    </h2>
                    <Link
                        to="/dashboard/tutor/applications"
                        className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                    >
                        View all <ChevronRight size={15} />
                    </Link>
                </div>
                {recentApplications.length === 0 ? (
                    <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-10 text-center">
                        <Briefcase
                            size={36}
                            className="mx-auto text-slate-600 mb-3"
                        />
                        <p className="text-slate-400">
                            You haven't applied to any tuitions yet.
                        </p>
                        <Link
                            to="/tuitions"
                            className="btn btn-primary btn-sm rounded-full mt-4"
                        >
                            Browse Tuitions
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-xs uppercase tracking-[0.18em] text-slate-500 border-b border-slate-800">
                                    <th className="py-3 px-2 text-left font-medium">
                                        Student
                                    </th>
                                    <th className="py-3 px-2 text-left font-medium">
                                        Subject
                                    </th>
                                    <th className="py-3 px-2 text-left font-medium">
                                        Expected
                                    </th>
                                    <th className="py-3 px-2 text-left font-medium">
                                        Status
                                    </th>
                                    <th className="py-3 px-2 text-left font-medium">
                                        Applied
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentApplications.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors"
                                    >
                                        <td className="py-3 px-2 text-slate-300">
                                            {app.studentEmail || "—"}
                                        </td>
                                        <td className="py-3 px-2 text-white font-medium">
                                            {app.tuitionSubject || "N/A"}
                                        </td>
                                        <td className="py-3 px-2 text-emerald-300">
                                            ৳{" "}
                                            {app.expectedSalary?.toLocaleString() ||
                                                "0"}
                                        </td>
                                        <td className="py-3 px-2">
                                            <StatusBadge status={app.status} />
                                        </td>
                                        <td className="py-3 px-2 text-slate-400">
                                            {app.appliedAt
                                                ? new Date(
                                                      app.appliedAt,
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {/* Quick actions */}
            <section className="rounded-4xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Quick Actions
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            to: "/tuitions",
                            icon: BookOpen,
                            accent: "cyan",
                            label: "Tuition Market",
                            desc: "Browse and apply to new tuition requests.",
                        },
                        {
                            to: "/dashboard/tutor/applications",
                            icon: Users,
                            accent: "fuchsia",
                            label: "Manage Offers",
                            desc: "Review, edit, or delete your pending applications.",
                        },
                        {
                            to: "/dashboard/tutor/ongoing",
                            icon: Award,
                            accent: "emerald",
                            label: "Ongoing Classes",
                            desc: "Track your approved sessions.",
                        },
                        {
                            to: "/dashboard/tutor/revenue",
                            icon: Wallet,
                            accent: "amber",
                            label: "Revenue",
                            desc: "View your earnings and transaction history.",
                        },
                        {
                            to: "/dashboard/tutor/profile",
                            icon: GraduationCap,
                            accent: "rose",
                            label: "Profile Settings",
                            desc: "Update your tutor profile to attract more students.",
                        },
                    ].map(({ to, icon: Icon, accent, label, desc }) => {
                        const c = {
                            cyan: {
                                icon: "bg-cyan-600/10 text-cyan-300",
                                border: "hover:border-cyan-500 hover:ring-1 hover:ring-cyan-500/20",
                                text: "text-cyan-300",
                            },
                            fuchsia: {
                                icon: "bg-fuchsia-500/10 text-fuchsia-300",
                                border: "hover:border-fuchsia-500 hover:ring-1 hover:ring-fuchsia-500/20",
                                text: "text-fuchsia-300",
                            },
                            emerald: {
                                icon: "bg-emerald-500/10 text-emerald-300",
                                border: "hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500/20",
                                text: "text-emerald-300",
                            },
                            amber: {
                                icon: "bg-amber-500/10 text-amber-300",
                                border: "hover:border-amber-500 hover:ring-1 hover:ring-amber-500/20",
                                text: "text-amber-300",
                            },
                            rose: {
                                icon: "bg-rose-500/10 text-rose-300",
                                border: "hover:border-rose-500 hover:ring-1 hover:ring-rose-500/20",
                                text: "text-rose-300",
                            },
                        }[accent];
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`rounded-3xl border border-slate-800 bg-slate-950/60 p-5 text-left transition hover:-translate-y-0.5 ${c.border}`}
                            >
                                <div
                                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${c.icon}`}
                                >
                                    <Icon size={20} />
                                </div>
                                <p
                                    className={`mt-3 text-sm font-medium ${c.text}`}
                                >
                                    {label}
                                </p>
                                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                                    {desc}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default TutorDashboard;
