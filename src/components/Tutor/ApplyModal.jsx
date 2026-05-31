import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";
import toast from "react-hot-toast";

const ApplyModal = ({ tuition, openModal, setOpenModal, onApplied }) => {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const application = {
                tuitionId: tuition._id,

                studentEmail: tuition.studentEmail,
                studentName: tuition.studentName,

                tuitionSubject: tuition.subject,
                tuitionClass: tuition.classLevel,
                tuitionBudget: tuition.budget,
                tuitionLocation: tuition.location,

                tutorName: user.displayName,
                tutorEmail: user.email,
                tutorPhoto: user.photoURL,

                qualifications: data.qualifications,
                experience: Number(data.experience),
                expectedSalary: Number(data.expectedSalary),

                status: "pending",

                appliedAt: new Date(),
            };

            const res = await api.post("/applications", application);

            // log and expose server response for debugging

            console.log("Application POST response:", res);

            toast.success("Application Submitted");

            reset();
            setOpenModal(false);
            onApplied?.();
        } catch (error) {
            toast.error(error.response?.data?.message || "Application failed");
        } finally {
            setIsSubmitting(false);
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
                        className="input w-full bg-slate-950 border-slate-700 text-slate-100"
                    />

                    <input
                        value={user?.email || ""}
                        readOnly
                        className="input w-full bg-slate-950 border-slate-700 text-slate-100"
                    />

                    <textarea
                        placeholder="Qualifications"
                        {...register("qualifications", {
                            required: true,
                        })}
                        className="textarea w-full bg-slate-950 border-slate-700 text-slate-100"
                    />

                    <input
                        type="number"
                        placeholder="Experience (Years)"
                        {...register("experience", {
                            required: true,
                        })}
                        className="input w-full bg-slate-950 border-slate-700 text-slate-100"
                    />

                    <input
                        type="number"
                        placeholder="Expected Salary"
                        {...register("expectedSalary", {
                            required: true,
                        })}
                        className="input w-full bg-slate-950 border-slate-700 text-slate-100"
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setOpenModal(false)}
                            className="btn btn-outline"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Submitting..."
                                : "Submit Application"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplyModal;
