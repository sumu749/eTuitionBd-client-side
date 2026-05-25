import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosSecure from "../../api/axiosSecure";
import useAuth from "../../hooks/useAuth";

const PostTuition = () => {
    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const tuition = {
                studentName: user.displayName,

                studentEmail: user.email,

                subject: data.subject,

                classLevel: data.classLevel,

                location: data.location,

                budget: Number(data.budget),

                description: data.description,

                status: "pending",

                createdAt: new Date(),
            };

            await axiosSecure.post("/tuitions", tuition);

            toast.success("Tuition posted successfully");

            reset();
        } catch (error) {
            console.log(error);

            toast.error("Failed to post tuition");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Post New Tuition</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("subject")}
                    placeholder="Subject"
                    className="input input-bordered w-full"
                />

                <input
                    {...register("classLevel")}
                    placeholder="Class Level"
                    className="input input-bordered w-full"
                />

                <input
                    {...register("location")}
                    placeholder="Location"
                    className="input input-bordered w-full"
                />

                <input
                    type="number"
                    {...register("budget")}
                    placeholder="Budget"
                    className="input input-bordered w-full"
                />

                <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                />

                <button
                    className="
                    btn
                    btn-primary
                    "
                >
                    Post Tuition
                </button>
            </form>
        </div>
    );
};

export default PostTuition;
