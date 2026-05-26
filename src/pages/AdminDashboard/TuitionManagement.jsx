/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { BookOpen } from "lucide-react";

const TuitionManagement = () => {
    const {
        data: tuitions = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["admin-tuitions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/tuitions");
            return res.data;
        },
    });

    const handleStatusChange = async (id, status) => {
        try {
            await axiosSecure.patch(`/tuitions/status/${id}`, {
                status,
            });

            toast.success(`Tuition ${status} successfully`);

            refetch();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black">Tuition Management</h1>

                    <p className="text-slate-400 mt-2">
                        Review and moderate tuition posts
                    </p>
                </div>

                <div className="stats bg-slate-900 border border-slate-800">
                    <div className="stat">
                        <div className="stat-figure text-cyan-400">
                            <BookOpen />
                        </div>

                        <div className="stat-title text-slate-400">
                            Total Posts
                        </div>

                        <div className="stat-value text-cyan-300">
                            {tuitions.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="text-slate-400">
                                <th>Student</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Location</th>
                                <th>Budget</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tuitions.map((tuition) => (
                                <tr key={tuition._id}>
                                    <td>{tuition.studentName}</td>

                                    <td>{tuition.subject}</td>

                                    <td>{tuition.classLevel}</td>

                                    <td>{tuition.location}</td>

                                    <td>৳ {tuition.budget}</td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                tuition.status === "approved"
                                                    ? "badge-success"
                                                    : tuition.status ===
                                                        "rejected"
                                                      ? "badge-error"
                                                      : "badge-warning"
                                            }`}
                                        >
                                            {tuition.status}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="flex gap-2">
                                            <button
                                                disabled={
                                                    tuition.status ===
                                                    "approved"
                                                }
                                                onClick={() =>
                                                    handleStatusChange(
                                                        tuition._id,
                                                        "approved",
                                                    )
                                                }
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                disabled={
                                                    tuition.status ===
                                                    "rejected"
                                                }
                                                onClick={() =>
                                                    handleStatusChange(
                                                        tuition._id,
                                                        "rejected",
                                                    )
                                                }
                                                className="btn btn-error btn-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TuitionManagement;
