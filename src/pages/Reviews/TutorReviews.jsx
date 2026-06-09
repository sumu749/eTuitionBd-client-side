import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import useAuth from "../../hooks/useAuth";
import useStudent from "../../hooks/useStudent";
import toast from "react-hot-toast";
import api from "../../api/api";

const TutorReviews = ({ tutorEmail }) => {
    const { user } = useAuth();
    const [isStudent, roleLoading] = useStudent();
    const navigate = useNavigate();

    const [rating, setRating] = useState(5);

    const [review, setReview] = useState("");

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ["reviews", tutorEmail],

        queryFn: async () => {
            const res = await api.get(`/reviews/${tutorEmail}`);

            return res.data;
        },
    });

    const handleReview = async (e) => {
        e.preventDefault();

        if (!user?.email || !isStudent) {
            toast.error("Only logged-in students can submit reviews.");
            return;
        }

        if (!review.trim()) {
            toast.error("Please enter your review before submitting.");
            return;
        }

        try {
            const reviewData = {
                tutorEmail,
                studentEmail: user.email,
                studentName: user.displayName,
                studentPhoto: user.photoURL,
                rating,
                review,
                createdAt: new Date(),
            };

            await api.post("/reviews", reviewData);

            toast.success("Review added successfully.");

            setReview("");

            refetch();
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                    "Failed to add review. Please try again later.",
            );
        }
    };

    const average =
        reviews.reduce((sum, item) => sum + Number(item.rating), 0) /
            reviews.length || 0;

    return (
        <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl">
                <h2 className="text-2xl font-bold">Tutor Reviews</h2>

                <p className="mt-2 text-yellow-400">
                    Average Rating:
                    {average.toFixed(1)} ⭐
                </p>

                {roleLoading ? (
                    <p className="mt-6 text-slate-400">
                        Checking review permission...
                    </p>
                ) : user?.email && isStudent ? (
                    <form onSubmit={handleReview} className="space-y-4 mt-6">
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="select select-bordered w-full bg-black"
                        >
                            <option value="5">5 Star</option>
                            <option value="4">4 Star</option>
                            <option value="3">3 Star</option>
                            <option value="2">2 Star</option>
                            <option value="1">1 Star</option>
                        </select>

                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Write review..."
                            className="textarea textarea-bordered w-full bg-black"
                        />

                        <button type="submit" className="btn btn-primary">
                            Submit Review
                        </button>
                    </form>
                ) : (
                    <div className="mt-6 rounded-3xl border border-slate-700 bg-slate-950 p-6">
                        <p className="text-slate-300 mb-4">
                            Only registered students may submit tutor reviews.
                        </p>
                        {!user?.email ? (
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="btn btn-primary"
                            >
                                Log in to review
                            </button>
                        ) : (
                            <p className="text-slate-400">
                                Please use a student account to leave a review.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {reviews.map((item) => (
                    <div
                        key={item._id}
                        className="bg-slate-900 p-5 rounded-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={item.studentPhoto}
                                className="w-12 h-12 rounded-full"
                            />

                            <div>
                                <h3 className="font-bold">
                                    {item.studentName}
                                </h3>

                                <p className="text-yellow-400">
                                    {item.rating} ⭐
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 text-slate-300">{item.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutorReviews;
