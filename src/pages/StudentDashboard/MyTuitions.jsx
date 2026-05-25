import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { useState } from "react";

const MyTuitions = () => {
    const { user } = useAuth();

    const {
        data = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["my-tuitions", user?.email],

        enabled: !!user?.email,

        queryFn: async () => {
            const res = await axiosSecure.get(`/my-tuitions/${user.email}`);

            return res.data;
        },
    });

    const [selectedTuition, setSelectedTuition] = useState(null);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Tuition?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        });

        if (!result.isConfirmed) return;

        try {
            await axiosSecure.delete(`/tuitions/${id}`);

            toast.success("Tuition Deleted");

            refetch();
        } catch (error) {
            console.log(error);

            toast.error("Delete Failed");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedData = {
            subject: form.subject.value,

            classLevel: form.classLevel.value,

            location: form.location.value,

            budget: Number(form.budget.value),

            description: form.description.value,
        };

        try {
            await axiosSecure.patch(
                `/tuitions/${selectedTuition._id}`,
                updatedData,
            );

            toast.success("Updated Successfully");

            document.getElementById("update_modal").close();

            refetch();
        } catch (error) {
            console.log(error);

            toast.error("Update Failed");
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">My Tuitions</h1>

            <div className="overflow-x-auto ">
                <table className="table ">
                    <thead>
                        <tr className="bg-slate-800 text-slate-400">
                            <th>Subject</th>
                            <th>Class</th>
                            <th>Location</th>
                            <th>Budget</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((tuition) => (
                            <tr key={tuition._id}>
                                <td>{tuition.subject}</td>

                                <td>{tuition.classLevel}</td>

                                <td>{tuition.location}</td>

                                <td>৳{tuition.budget}</td>

                                <td>{tuition.status}</td>
                                <td className="space-x-2">
                                    <button
                                        className="btn btn-info btn-sm"
                                        onClick={() => {
                                            setSelectedTuition(tuition);
                                            document
                                                .getElementById("update_modal")
                                                .showModal();
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(tuition._id)
                                        }
                                        className="
        btn
        btn-error
        btn-sm
        "
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <dialog id="update_modal" className="modal">
                    <div className="modal-box bg-slate-900">
                        <button
                            type="button"
                            onClick={() =>
                                document.getElementById("update_modal").close()
                            }
                            className="btn btn-sm btn-circle absolute right-4 top-4"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-xl mb-5">
                            Update Tuition
                        </h3>

                        {selectedTuition && (
                            <form onSubmit={handleUpdate} className="space-y-4">
                                <input
                                    name="subject"
                                    defaultValue={selectedTuition.subject}
                                    className="
input
input-bordered
w-full
bg-slate-900
text-white
border-slate-700
"
                                />

                                <input
                                    name="classLevel"
                                    defaultValue={selectedTuition.classLevel}
                                    className="
input
input-bordered
w-full
bg-slate-900
text-white
border-slate-700
"
                                />

                                <input
                                    name="location"
                                    defaultValue={selectedTuition.location}
                                    className="
input
input-bordered
w-full
bg-slate-900
text-white
border-slate-700
"
                                />

                                <input
                                    name="budget"
                                    type="number"
                                    defaultValue={selectedTuition.budget}
                                    className="
input
input-bordered
w-full
bg-slate-900
text-white
border-slate-700
"
                                />

                                <textarea
                                    name="description"
                                    defaultValue={selectedTuition.description}
                                    className="
input
input-bordered
w-full
bg-slate-900
text-white
border-slate-700
"
                                />

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-1"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById("update_modal")
                                                .close()
                                        }
                                        className="btn btn-outline flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default MyTuitions;
