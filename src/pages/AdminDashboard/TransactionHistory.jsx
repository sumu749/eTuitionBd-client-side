import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";

const TransactionHistory = () => {
    const { data = [] } = useQuery({
        queryKey: ["transactions"],
        queryFn: async () => {
            const res = await axiosSecure.get("/transactions");

            return res.data;
        },
    });

    return (
        <div className="bg-slate-900 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">Recent Transactions</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-slate-400">
                            <th>Student</th>
                            <th>Tutor</th>
                            <th>Amount</th>
                            <th>Transaction ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((trx) => (
                            <tr key={trx._id}>
                                <td>{trx.studentName}</td>

                                <td>{trx.tutorName}</td>

                                <td>৳ {trx.amount}</td>

                                <td>{trx.transactionId}</td>

                                <td>
                                    <span className="badge badge-success">
                                        {trx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransactionHistory;
