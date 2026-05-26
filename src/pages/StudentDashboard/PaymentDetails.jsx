import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const PaymentDetails = () => {
    const { id } = useParams();

    const { data, isLoading } = useQuery({
        queryKey: ["payment-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/transactions/${id}`);
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                <h1 className="text-3xl font-black mb-6">Payment Details</h1>

                <div className="space-y-4">
                    <p>
                        <strong>Transaction ID:</strong> {data.transactionId}
                    </p>

                    <p>
                        <strong>Student:</strong> {data.studentEmail}
                    </p>

                    <p>
                        <strong>Tutor:</strong> {data.tutorEmail}
                    </p>

                    <p>
                        <strong>Amount:</strong> ৳ {data.amount}
                    </p>

                    <p>
                        <strong>Status:</strong> {data.status}
                    </p>

                    <p>
                        <strong>Payment Date:</strong>{" "}
                        {new Date(data.paymentDate).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
