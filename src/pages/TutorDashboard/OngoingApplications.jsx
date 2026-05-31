/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";
import {
    BookOpen,
    MapPin,
    Wallet,
    CalendarDays,
    GraduationCap,
} from "lucide-react";

import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import api from "../../api/api";

const OngoingApplications = () => {
    const { user } = useAuth();

    const { data: ongoingTuitions = [], isLoading } = useQuery({
        queryKey: ["ongoing-tuitions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await api.get(`/ongoing-tuitions/${user.email}`);

            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <section className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Tutor sessions
                        </p>

                        <h1 className="mt-4 text-4xl font-semibold text-white">
                            Ongoing Tuitions
                        </h1>

                        <p className="mt-4 max-w-2xl text-slate-400">
                            Manage all your approved tuition sessions and stay
                            updated with your active teaching responsibilities.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4">
                        <p className="text-sm text-cyan-300">Active Sessions</p>

                        <h2 className="mt-2 text-3xl font-bold text-white">
                            {ongoingTuitions.length}
                        </h2>
                    </div>
                </div>
            </section>

            {/* Empty State */}
            {ongoingTuitions.length === 0 ? (
                <div className="rounded-4xl border border-slate-800 bg-slate-900/70 p-12 text-center shadow-2xl shadow-slate-950/20">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                        <GraduationCap size={40} className="text-slate-400" />
                    </div>

                    <h2 className="mt-6 text-3xl font-semibold text-white">
                        No ongoing sessions
                    </h2>

                    <p className="mx-auto mt-4 max-w-lg text-slate-400">
                        You currently do not have any approved tuition sessions.
                        Once students approve your applications, they will
                        appear here.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {ongoingTuitions.map((tuition) => (
                        <article
                            key={tuition._id}
                            className="rounded-4xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-500/40"
                        >
                            {/* Top */}
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {tuition.tuitionSubject || "Subject"}
                                    </h2>

                                    <p className="mt-2 text-cyan-300">
                                        {tuition.tuitionClass ||
                                            "Class Information"}
                                    </p>
                                </div>

                                <span className="badge badge-success badge-lg">
                                    Approved
                                </span>
                            </div>

                            {/* Info */}
                            <div className="mt-6 space-y-4">
                                {/* Student */}
                                <div className="flex items-center gap-3 text-slate-300">
                                    <BookOpen
                                        size={18}
                                        className="text-cyan-300"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Student
                                        </p>

                                        <p className="font-medium">
                                            {tuition.studentEmail}
                                        </p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-3 text-slate-300">
                                    <MapPin
                                        size={18}
                                        className="text-fuchsia-300"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Location
                                        </p>

                                        <p className="font-medium">
                                            {tuition.tuitionLocation || "N/A"}
                                        </p>
                                    </div>
                                </div>

                                {/* Salary */}
                                <div className="flex items-center gap-3 text-slate-300">
                                    <Wallet
                                        size={18}
                                        className="text-emerald-300"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Expected Salary
                                        </p>

                                        <p className="font-medium text-emerald-300">
                                            ৳ {tuition.expectedSalary}
                                        </p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-3 text-slate-300">
                                    <CalendarDays
                                        size={18}
                                        className="text-orange-300"
                                    />

                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Approved At
                                        </p>

                                        <p className="font-medium">
                                            {tuition.appliedAt
                                                ? new Date(
                                                      tuition.appliedAt,
                                                  ).toLocaleDateString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className="mt-8 border-t border-slate-800 pt-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-slate-500">
                                            Status
                                        </p>

                                        <p className="mt-1 font-medium text-emerald-300">
                                            Teaching Active
                                        </p>
                                    </div>

                                    <button className="btn btn-primary rounded-full px-5">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OngoingApplications;
