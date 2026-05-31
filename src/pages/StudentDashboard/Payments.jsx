/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Receipt, Wallet } from "lucide-react";

import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";

const Payments = () => {
    const { user, loading: authLoading } = useAuth();

    const {
        data: payments = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["student-payments", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await api.get("/payments", {
                params: {
                    email: user.email,
                },
            });

            return res.data;
        },
    });

    const totalSpent = payments.reduce(
        (sum, payment) => sum + Number(payment.amount || 0),
        0,
    );

    const recentPayment = payments[0];

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    if (authLoading || isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center min-h-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-400">
                        Failed to Load Payments
                    </h2>

                    <p className="text-slate-400 mt-2">
                        Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}

            <div>
                <h1 className="text-3xl font-black">Payment History</h1>

                <p className="text-slate-400 mt-2">
                    View all your completed tuition payments and transactions.
                </p>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-3 gap-6">
                <div className="stat bg-slate-900 border border-slate-800 rounded-3xl">
                    <div className="stat-figure text-emerald-400">
                        <Wallet />
                    </div>

                    <div className="stat-title text-slate-400">Total Spent</div>

                    <div className="stat-value text-emerald-300">
                        ৳ {totalSpent.toLocaleString()}
                    </div>
                </div>

                <div className="stat bg-slate-900 border border-slate-800 rounded-3xl">
                    <div className="stat-figure text-cyan-400">
                        <Receipt />
                    </div>

                    <div className="stat-title text-slate-400">
                        Transactions
                    </div>

                    <div className="stat-value text-cyan-300">
                        {payments.length}
                    </div>
                </div>

                <div className="stat bg-slate-900 border border-slate-800 rounded-3xl">
                    <div className="stat-figure text-yellow-400">
                        <CreditCard />
                    </div>

                    <div className="stat-title text-slate-400">
                        Last Payment
                    </div>

                    <div className="text-lg font-bold text-yellow-300 mt-2">
                        {recentPayment
                            ? formatDate(recentPayment.paymentDate)
                            : "N/A"}
                    </div>
                </div>
            </div>

            {/* Table */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Transaction History</h2>
                </div>

                {payments.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-slate-400 text-lg">
                            No payment records found.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-slate-400">
                                    <th>Date</th>
                                    <th>Tutor</th>
                                    <th>Tuition</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Transaction ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment._id}>
                                        <td>
                                            {formatDate(payment.paymentDate)}
                                        </td>

                                        <td>{payment.tutorName}</td>

                                        <td>{payment.tuitionTitle}</td>

                                        <td className="font-semibold text-emerald-300">
                                            ৳{" "}
                                            {Number(
                                                payment.amount,
                                            ).toLocaleString()}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    payment.status ===
                                                    "completed"
                                                        ? "badge-success"
                                                        : payment.status ===
                                                            "pending"
                                                          ? "badge-warning"
                                                          : "badge-error"
                                                }`}
                                            >
                                                {payment.status}
                                            </span>
                                        </td>

                                        <td className="max-w-45 truncate">
                                            {payment.transactionId}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
