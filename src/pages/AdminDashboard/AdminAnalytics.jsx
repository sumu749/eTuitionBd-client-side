import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const AdminAnalytics = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-cyan-300">
                    {data.totalUsers}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Students</div>
                <div className="stat-value text-green-400">
                    {data.totalStudents}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Tutors</div>
                <div className="stat-value text-yellow-400">
                    {data.totalTutors}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Admins</div>
                <div className="stat-value text-purple-400">
                    {data.totalAdmins}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Tuitions</div>
                <div className="stat-value text-pink-400">
                    {data.totalTuitions}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title">Applications</div>
                <div className="stat-value text-orange-400">
                    {data.totalApplications}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl md:col-span-3">
                <div className="stat-title">Total Revenue</div>
                <div className="stat-value text-emerald-400">
                    ৳ {data.totalRevenue}
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
