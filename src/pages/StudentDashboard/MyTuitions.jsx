import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosSecure";

const MyTuitions = () => {
    const { user } = useAuth();

    const { data = [], isLoading } = useQuery({
        queryKey: ["my-tuitions", user?.email],

        enabled: !!user?.email,

        queryFn: async () => {
            const res = await axiosSecure.get(`/my-tuitions/${user.email}`);

            return res.data;
        },
    });

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

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
                                <td>
                                    <button className="btn btn-error btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyTuitions;
