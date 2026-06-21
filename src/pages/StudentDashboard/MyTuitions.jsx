/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import { BookOpen, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";
import api from "../../api/api";

const MyTuitions = () => {
    const { user } = useAuth();

    const {
        data = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["my-tuitions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await api.get(`/tuitions/my-tuitions/${user.email}`);
            return res.data;
        },
    });

    const [selectedTuition, setSelectedTuition] = useState(null);

    const summary = {
        total: data.length,
        approved: data.filter((item) => item.status === "approved").length,
        rejected: data.filter((item) => item.status === "rejected").length,
        pending: data.filter((item) => item.status === "pending").length,
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center py-24">
                <div className="max-w-lg rounded-4xl border border-slate-800 bg-slate-900/80 p-10 text-center shadow-2xl shadow-slate-950/40">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-cyan-500/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                        <BookOpen size={40} />
                    </div>

                    <h2 className="mt-8 text-3xl font-semibold text-white">
                        No Tuition Posts Yet
                    </h2>

                    <p className="mt-4 text-slate-400 leading-relaxed">
                        Start by posting a tuition request so tutors can apply
                        and help you achieve your goals.
                    </p>

                    <Link
                        to="/dashboard/student/post-tuition"
                        className="btn btn-primary rounded-full mt-8 px-8 py-3 inline-flex items-center gap-2"
                    >
                        <PlusCircle size={18} />
                        Post Your First Tuition
                    </Link>
                </div>
            </div>
        );
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Tuition?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#ef4444",
        });

        if (!result.isConfirmed) return;

        try {
            await api.delete(`/tuitions/${id}`);
            toast.success("Tuition deleted successfully.");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Delete failed. Please try again.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedData = {
            subject: form.subject.value,
            classLevel: form.classLevel.value,
            location: form.location.value,
            budget: Number(form.budget.value),
            description: form.description.value,
        };

        try {
            await api.patch(`/tuitions/${selectedTuition._id}`, updatedData);
            toast.success("Tuition updated successfully.");
            document.getElementById("update_modal").close();
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Update failed. Please try again.");
        }
    };

    return (
        <div className="space-y-8">
            <header className="rounded-4xl border border-slate-800 bg-slate-900/75 p-8 shadow-2xl shadow-slate-950/30">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-cyan-400">
                            My tuitions
                        </p>
                        <h1 className="mt-3 text-4xl font-semibold text-white">
                            Your tuition requests at a glance
                        </h1>
                        <p className="mt-3 text-slate-400 max-w-2xl">
                            Review, edit, or delete your posted tuitions and
                            keep track of status updates in a refined dashboard
                            experience.
                        </p>
                    </div>

                    <Link
                        to="/dashboard/student/post-tuition"
                        className="btn btn-primary rounded-full px-6 py-3"
                    >
                        <PlusCircle size={18} />
                        New Tuition Request
                    </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-4">
                    {[
                        {
                            label: "Total posts",
                            value: summary.total,
                            accent: "text-cyan-300",
                        },
                        {
                            label: "Approved",
                            value: summary.approved,
                            accent: "text-emerald-300",
                        },
                        {
                            label: "Pending",
                            value: summary.pending,
                            accent: "text-amber-300",
                        },
                        {
                            label: "Rejected",
                            value: summary.rejected,
                            accent: "text-rose-300",
                        },
                    ].map((card) => (
                        <div
                            key={card.label}
                            className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5"
                        >
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                                {card.label}
                            </p>
                            <p
                                className={`mt-4 text-3xl font-semibold ${card.accent}`}
                            >
                                {card.value}
                            </p>
                        </div>
                    ))}
                </div>
            </header>

            <section className="overflow-x-auto rounded-4xl border border-slate-800 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-white">
                            Tuition requests
                        </h2>
                        <p className="mt-2 text-slate-400">
                            Quickly compare all active tuitions and manage them
                            from one table.
                        </p>
                    </div>
                    <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                        {summary.total} items listed
                    </span>
                </div>

                <table className="min-w-full border-separate border-spacing-y-3 text-left">
                    <thead>
                        <tr className="text-sm uppercase tracking-[0.18em] text-slate-500">
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Subject</th>
                            <th className="px-4 py-3">Class</th>
                            <th className="px-4 py-3">Location</th>
                            <th className="px-4 py-3">Budget</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Posted</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((tuition, index) => (
                            <tr
                                key={tuition._id}
                                className="rounded-3xl bg-slate-950/80 shadow-sm shadow-slate-950/10"
                            >
                                <td className="px-4 py-4 align-middle text-slate-300">
                                    {index + 1}
                                </td>
                                <td className="px-4 py-4 align-middle text-white">
                                    {tuition.subject}
                                </td>
                                <td className="px-4 py-4 align-middle text-slate-300">
                                    {tuition.classLevel}
                                </td>
                                <td className="px-4 py-4 align-middle text-slate-300">
                                    {tuition.location}
                                </td>
                                <td className="px-4 py-4 align-middle text-white">
                                    ৳{tuition.budget}
                                </td>
                                <td className="px-4 py-4 align-middle">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                                            tuition.status === "approved"
                                                ? "bg-emerald-500/15 text-emerald-300"
                                                : tuition.status === "rejected"
                                                  ? "bg-rose-500/15 text-rose-300"
                                                  : "bg-amber-500/15 text-amber-300"
                                        }`}
                                    >
                                        {tuition.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 align-middle text-slate-400">
                                    {new Date(
                                        tuition.createdAt,
                                    ).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-4 align-middle text-slate-300">
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-100 transition hover:bg-cyan-500/20"
                                            onClick={() => {
                                                setSelectedTuition(tuition);
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
                                            type="button"
                                            className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100 transition hover:bg-rose-500/20"
                                            onClick={() =>
                                                handleDelete(tuition._id)
                                            }
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            <dialog id="update_modal" className="modal">
                <div className="modal-box max-w-3xl bg-slate-950 border border-slate-800">
                    <button
                        type="button"
                        onClick={() =>
                            document.getElementById("update_modal").close()
                        }
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                    >
                        ✕
                    </button>
                    <div className="mb-5">
                        <h3 className="text-2xl font-semibold text-white">
                            Update Tuition
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                            Modify tuition details and save your changes.
                        </p>
                    </div>

                    {selectedTuition && (
                        <form onSubmit={handleUpdate} className="grid gap-5">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Subject
                                    </span>
                                    <input
                                        name="subject"
                                        defaultValue={selectedTuition.subject}
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>

                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Class Level
                                    </span>
                                    <input
                                        name="classLevel"
                                        defaultValue={
                                            selectedTuition.classLevel
                                        }
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Location
                                    </span>
                                    <input
                                        name="location"
                                        defaultValue={selectedTuition.location}
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>

                                <label className="space-y-2 text-slate-200">
                                    <span className="text-sm font-medium">
                                        Budget
                                    </span>
                                    <input
                                        name="budget"
                                        type="number"
                                        defaultValue={selectedTuition.budget}
                                        className="input input-bordered w-full bg-slate-900 text-white border-slate-700"
                                    />
                                </label>
                            </div>

                            <label className="space-y-2 text-slate-200">
                                <span className="text-sm font-medium">
                                    Description
                                </span>
                                <textarea
                                    name="description"
                                    defaultValue={selectedTuition.description}
                                    rows={4}
                                    className="textarea textarea-bordered w-full bg-slate-900 text-white border-slate-700"
                                />
                            </label>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("update_modal")
                                            .close()
                                    }
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

export default MyTuitions;
