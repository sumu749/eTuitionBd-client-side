import { CheckCircle, Receipt } from "lucide-react";
import { Link } from "react-router";

const PaymentSuccess = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-4xl p-10 text-center">
                <div className="flex justify-center">
                    <CheckCircle size={90} className="text-green-400" />
                </div>

                <h1 className="text-4xl font-black mt-6 text-white">
                    Payment Successful
                </h1>

                <p className="text-slate-400 mt-4">
                    Your payment has been completed successfully. The
                    transaction has been recorded and the tutor booking process
                    is now confirmed.
                </p>

                <div className="mt-8 bg-slate-950 border border-slate-800 rounded-3xl p-6">
                    <div className="flex items-center justify-center gap-2 text-cyan-300">
                        <Receipt size={20} />
                        <span className="font-semibold">Payment Recorded</span>
                    </div>

                    <p className="text-slate-400 mt-3">
                        You can view this transaction anytime from your Payment
                        History page.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                    <Link
                        to="/dashboard/student/payments"
                        className="btn btn-primary"
                    >
                        View Payments
                    </Link>

                    <Link to="/dashboard/student" className="btn btn-outline">
                        Back to Dashboard
                    </Link>
                </div>

                <div className="mt-8 text-slate-500 text-sm">
                    Thank you for using eTuitionBd.
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
