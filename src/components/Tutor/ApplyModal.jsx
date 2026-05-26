import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import toast from "react-hot-toast";

const ApplyModal = ({ tuition, openModal, setOpenModal }) => {
    const { user } = useAuth();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const application = {
                tuitionId: tuition._id,

                studentEmail: tuition.studentEmail,

                tutorName: user.displayName,
                tutorEmail: user.email,
                tutorPhoto: user.photoURL,

                qualifications: data.qualifications,
                experience: Number(data.experience),
                expectedSalary: Number(data.expectedSalary),

                status: "pending",
                createdAt: new Date(),
            };

            await axiosSecure.post("/applications", application);

            toast.success("Application Submitted");

            reset();
            setOpenModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Application failed");
        }
    };

    if (!openModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-xl border border-slate-800">
                <h2 className="text-2xl font-bold mb-6">Apply For Tuition</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <input
                        value={user?.displayName || ""}
                        readOnly
                        className="input w-full"
                    />

                    <input
                        value={user?.email || ""}
                        readOnly
                        className="input w-full"
                    />

                    <textarea
                        placeholder="Qualifications"
                        {...register("qualifications", {
                            required: true,
                        })}
                        className="textarea w-full"
                    />

                    <input
                        type="number"
                        placeholder="Experience (Years)"
                        {...register("experience", {
                            required: true,
                        })}
                        className="input w-full"
                    />

                    <input
                        type="number"
                        placeholder="Expected Salary"
                        {...register("expectedSalary", {
                            required: true,
                        })}
                        className="input w-full"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
