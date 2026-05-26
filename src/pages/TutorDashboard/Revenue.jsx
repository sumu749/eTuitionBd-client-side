import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import RevenueChart from "../../components/Charts/RevenueChart";
import { Wallet, Banknote } from "lucide-react";

const Revenue = () => {
    const { user } = useAuth();

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ["revenue", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/revenue/${user.email}`);

            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const totalRevenue = transactions.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
    );

    return (
        <div className="space-y-8">
            {/* Header */}

            <div>
                <h1 className="text-3xl font-black">Revenue Dashboard</h1>

                <p className="text-slate-400 mt-2">
                    Track your earnings and completed payments.
                </p>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-2 gap-6">
                <div className="stat bg-slate-900 border border-slate-800 rounded-3xl">
                    <div className="stat-figure text-green-400">
                        <Wallet />
                    </div>

                    <div className="stat-title">Total Revenue</div>

                    <div className="stat-value text-green-400">
                        ৳ {totalRevenue.toLocaleString()}
                    </div>
                </div>

                <div className="stat bg-slate-900 border border-slate-800 rounded-3xl">
                    <div className="stat-figure text-cyan-400">
                        <Banknote />
                    </div>

                    <div className="stat-title">Transactions</div>

                    <div className="stat-value text-cyan-400">
                        {transactions.length}
                    </div>
                </div>
            </div>

            {/* Chart */}

            <RevenueChart transactions={transactions} />

            {/* Table */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold">Revenue History</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Student</th>
                                <th>Tuition</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>
                                        {new Date(
                                            transaction.paymentDate,
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>{transaction.studentName}</td>

                                    <td>{transaction.tuitionTitle}</td>

                                    <td className="text-green-400 font-semibold">
                                        ৳ {transaction.amount}
                                    </td>

                                    <td>
                                        <span className="badge badge-success">
                                            {transaction.status}
                                        </span>
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

export default Revenue;
