import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import api from "../../api/api";

const TutorReviews = ({ tutorEmail }) => {
    const { user } = useAuth();

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

            toast.success("Review Added");

            setReview("");

            refetch();
        } catch (error) {
            console.log(error);

            toast.error("Failed to add review");
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

                <form onSubmit={handleReview} className="space-y-4 mt-6">
                    <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
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

                    <button className="btn btn-primary">Submit Review</button>
                </form>
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
