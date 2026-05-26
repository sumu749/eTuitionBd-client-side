/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Briefcase, CalendarDays, Users, Pencil } from "lucide-react";
import { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const MyApplications = () => {
    const { user } = useAuth();
    const [selectedApplication, setSelectedApplication] = useState(null);

    const {
        data = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["tutor-applications", user?.email],
        enabled: !!user?.email,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const email = encodeURIComponent(user.email);

            const res = await axiosSecure.get(`/tutor-applications/${email}`);

            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return (
            <div className="rounded-2xl border border-error bg-error/10 p-8 text-center">
                <h2 className="text-xl font-semibold text-error">
                    Unable to load your applications
                </h2>
                <p className="mt-2 text-sm text-base-content/70">
                    {error?.message ||
                        "Something went wrong while fetching your applications."}
                </p>
                <button
                    type="button"
                    onClick={refetch}
                    className="btn btn-outline btn-error btn-sm mt-4"
                >
                    Retry
                </button>
            </div>
        );
    }

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/applications/${id}`);

            toast.success("Application Deleted");

            refetch();
        } catch {
            toast.error("Delete Failed");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedApplication = {
            qualifications: form.qualifications.value,
            experience: Number(form.experience.value),
            expectedSalary: Number(form.expectedSalary.value),
        };

        try {
            await axiosSecure.patch(
                `/applications/${selectedApplication._id}`,
                updatedApplication,
            );

            toast.success("Application updated successfully.");
            document.getElementById("update_modal").close();
            setSelectedApplication(null);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Update failed. Please try again.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-cyan-400">
                            Tutor applications
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold text-white">
                            Your submitted offers
                        </h1>
                        <p className="mt-3 text-slate-400 max-w-2xl">
                            Review all the tuition applications you have
                            submitted and monitor their status directly from
                            your dashboard.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/tuitions" className="btn btn-primary btn-sm">
                            Browse Tuitions
                        </Link>
                        <button
                            type="button"
                            onClick={refetch}
                            className="btn btn-outline btn-sm"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Total applications
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {data.length}
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-600/15 text-cyan-300">
                            <Briefcase size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        All tuition applications that you have sent to students.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Pending review
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {
                                    data.filter(
                                        (item) => item.status === "pending",
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fuchsia-500/15 text-fuchsia-300">
                            <CalendarDays size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Applications still waiting on student response.
                    </p>
                </article>

                <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                                Approved offers
                            </p>
                            <p className="mt-4 text-3xl font-semibold text-white">
                                {
                                    data.filter(
                                        (item) => item.status === "approved",
                                    ).length
                                }
                            </p>
                        </div>
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
                            <Users size={26} />
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                        Applications the student has approved for tutoring.
                    </p>
                </article>
            </div>

            {data.length === 0 ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        No applications found
                    </h2>
                    <p className="mt-3 text-slate-400">
                        Start applying to tuition listings to see your
                        submissions here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-slate-950/20">
                    <table className="table w-full text-left">
                        <thead>
                            <tr className="text-slate-400">
                                <th>Student</th>
                                <th>Tuition</th>
                                <th>Class</th>
                                <th>Budget</th>
                                <th>Expected</th>
                                <th>Status</th>
                                <th>Applied</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((application) => {
                                const statusClass =
                                    application.status === "approved"
                                        ? "badge badge-success"
                                        : application.status === "rejected"
                                          ? "badge badge-error"
                                          : "badge badge-warning";

                                return (
                                    <tr
                                        key={application._id}
                                        className="border-b border-slate-800/70"
                                    >
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <span className="font-medium text-white">
                                                    {application.studentEmail ||
                                                        "Unknown"}
                                                </span>
                                                <span className="text-sm text-slate-500">
                                                    {application.studentName ||
                                                        "Student"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="text-slate-200">
                                            {application.tuitionSubject ||
                                                "N/A"}
                                        </td>
                                        <td className="text-slate-200">
                                            {application.tuitionClass || "N/A"}
                                        </td>
                                        <td className="text-slate-200">
                                            ৳ {application.tuitionBudget ?? "0"}
                                        </td>
                                        <td className="text-slate-200">
                                            ৳{" "}
                                            {application.expectedSalary ?? "0"}
                                        </td>
                                        <td>
                                            <span className={statusClass}>
                                                {application.status}
                                            </span>
                                        </td>
                                        <td className="text-slate-400">
                                            {application.appliedAt
                                                ? new Date(
                                                      application.appliedAt,
                                                  ).toLocaleDateString()
                                                : "—"}
                                        </td>
                                        <td>
                                            {application.status ===
                                                "pending" && (
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        className="btn btn-ghost btn-sm"
                                                        onClick={() => {
                                                            setSelectedApplication(
                                                                application,
                                                            );
                                                            document
                                                                .getElementById(
                                                                    "update_modal",
                                                                )
                                                                .showModal();
                                                        }}
                                                    >
                                                        <Pencil size={14} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                application._id,
                                                            )
                                                        }
                                                        className="btn btn-error btn-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <dialog id="update_modal" className="modal">
                <div className="modal-box max-w-3xl bg-slate-950 border border-slate-800">
                    <button
                        type="button"
                        onClick={() => {
                            document.getElementById("update_modal").close();
                            setSelectedApplication(null);
                        }}
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                    >
                        ✕
                    </button>

                    <div className="mb-5">
                        <h3 className="text-2xl font-semibold text-white">
                            Edit Pending Application
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                            Update your application details before the student
                            reviews it.
                        </p>
                    </div>

                    {selectedApplication && (
                        <form onSubmit={handleUpdate} className="grid gap-5">
                            <label className="space-y-2 text-slate-200">
                                <span className="text-sm font-medium">
                                    Qualifications
                                </span>
                                <textarea
                                    name="qualifications"
                                    defaultValue={
                                        selectedApplication.qualifications || ""
                                    }
                                    rows={4}
                                    className="textarea textarea-bordered w-full bg-slate-900 text-white border-slate-700"
                                />
                            </label>

                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Experience (Years)
                                    </span>
                                    <input
                                        name="experience"
                                        type="number"
                                        min="0"
                                        defaultValue={
                                            selectedApplication.experience ?? ""
                                        }
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>
                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Expected Salary
                                    </span>
                                    <input
                                        name="expectedSalary"
                                        type="number"
                                        min="0"
                                        defaultValue={
                                            selectedApplication.expectedSalary ??
                                            ""
                                        }
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        document
                                            .getElementById("update_modal")
                                            .close();
                                        setSelectedApplication(null);
                                    }}
                                    className="btn btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default MyApplications;
