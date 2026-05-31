/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import api from "../../api/api";

const AppliedTutors = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const {
        data = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["applications", user?.email],
        enabled: !!user?.email,
        retry: false,
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const res = await api.get(`/applications/${user.email}`);
            return res.data;
        },
    });

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.patch(`/applications/${id}`, {
                status,
            });

            toast.success(
                `Application ${status === "approved" ? "approved" : "rejected"}`,
            );
            refetch();
        } catch (error) {
            toast.error(
                "Unable to update application status. Please try again.",
            );
            console.error(error);
        }
    };

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
                        "Something went wrong while fetching applications."}
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold">
                        Your Tutor Applications
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={refetch}
                    className="btn btn-outline btn-sm"
                >
                    Refresh List
                </button>
            </div>

            {data.length === 0 ? (
                <div className="rounded-2xl border border-base-300 bg-base-100  p-8 text-center">
                    <p className="text-lg font-medium">No applications found</p>
                    <p className="mt-2 text-sm ">
                        Apply to a tutor from the tuition listings to see your
                        application appear here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-base-300  bg-base-100">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-slate-500">
                                <th>Tutor</th>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Budget</th>
                                <th>Qualification</th>
                                <th>Experience</th>
                                <th>Expected Salary</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((application) => {
                                const isPending =
                                    application.status === "pending";
                                const statusClass =
                                    application.status === "approved"
                                        ? "badge badge-success"
                                        : application.status === "rejected"
                                          ? "badge badge-error"
                                          : "badge badge-warning";

                                return (
                                    <tr key={application._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={application.tutorPhoto}
                                                    alt={`${application.tutorName} profile`}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div>
                                                    <div className="font-medium">
                                                        {application.tutorName}
                                                    </div>
                                                    <div className="text-sm text-base-content/60">
                                                        Tutor ID:{" "}
                                                        {application.tutorId ||
                                                            "N/A"}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{application.tuitionSubject}</td>
                                        <td>{application.tuitionClass}</td>
                                        <td>৳ {application.tuitionBudget}</td>

                                        <td>
                                            {application.qualifications ||
                                                "Not specified"}
                                        </td>

                                        <td>
                                            {application.experience
                                                ? `${application.experience} years`
                                                : "Not specified"}
                                        </td>

                                        <td>
                                            ৳{" "}
                                            {application.expectedSalary ?? "0"}
                                        </td>

                                        <td>
                                            <span className={statusClass}>
                                                {application.status}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() =>
                                                        navigate(
                                                            `/dashboard/checkout/${application._id}`,
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-error btn-sm"
                                                    disabled={!isPending}
                                                    onClick={() =>
                                                        handleStatusUpdate(
                                                            application._id,
                                                            "rejected",
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AppliedTutors;
