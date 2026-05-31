import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import CheckoutForm from "./CheckoutForm";
import api from "../../api/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
    const { id } = useParams();

    const { data: application, isLoading } = useQuery({
        queryKey: ["application", id],
        queryFn: async () => {
            const res = await api.get(`/application/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
                <h2 className="text-3xl font-bold mb-6">Complete Payment</h2>

                <div className="mb-6">
                    <p>
                        <strong>Tutor:</strong> {application.tutorName}
                    </p>

                    <p>
                        <strong>Amount:</strong> ৳{application.expectedSalary}
                    </p>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm application={application} />
                </Elements>
            </div>
        </div>
    );
};

export default Checkout;
