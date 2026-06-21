import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import api from "../../api/api";

const CheckoutForm = ({ application }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState("");

    const amount = Number(application?.expectedSalary || 0);

    useEffect(() => {
        if (!amount) return;

        const createPaymentIntent = async () => {
            try {
                const res = await api.post("/create-payment-intent", {
                    amount,
                });

                setClientSecret(res.data.clientSecret);
            } catch (error) {
                console.log(error);
                toast.error("Failed to initialize payment");
            }
        };

        createPaymentIntent();
    }, [amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);

        if (!card) return;

        setProcessing(true);
        setCardError("");

        try {
            const { error } = await stripe.createPaymentMethod({
                type: "card",
                card,
            });

            if (error) {
                setCardError(error.message);
                setProcessing(false);
                return;
            }

            const { paymentIntent, error: confirmError } =
                await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card,
                        billing_details: {
                            name: user?.displayName || "Student",
                            email: user?.email,
                        },
                    },
                });

            if (confirmError) {
                setCardError(confirmError.message);
                setProcessing(false);
                return;
            }

            if (paymentIntent.status === "succeeded") {
                const transactionData = {
                    studentEmail: user.email,
                    studentName: user.displayName,

                    tutorName: application.tutorName,
                    tutorEmail: application.tutorEmail,

                    tuitionId: application.tuitionId,
                    applicationId: application._id,
                    tuitionTitle: application.subject || "Tuition Session",

                    amount,

                    transactionId: paymentIntent.id,

                    status: "completed",

                    paymentDate: new Date(),
                };

                await api.post("/payments/transactions", transactionData);

                toast.success("Payment Successful");

                navigate(`/dashboard/payment-success?trx=${paymentIntent.id}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Payment failed");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-5 border border-slate-700 rounded-2xl bg-slate-950">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#ffffff",
                                "::placeholder": {
                                    color: "#94a3b8",
                                },
                            },
                            invalid: {
                                color: "#ef4444",
                            },
                        },
                    }}
                />
            </div>

            {cardError && <p className="text-red-400 text-sm">{cardError}</p>}

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="btn btn-primary w-full"
            >
                {processing ? "Processing..." : `Pay ৳${amount}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
