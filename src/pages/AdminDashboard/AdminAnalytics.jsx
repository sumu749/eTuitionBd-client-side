import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import UserRoleChart from "../../components/Charts/UserRoleChart";
import RevenueChart from "../../components/Charts/RevenueChart";
import TransactionHistory from "./TransactionHistory";
import TuitionChart from "../../components/Charts/TuitionChart";
import api from "../../api/api";

const AdminAnalytics = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await api.get("/admin-stats");
            return res.data;
        },
    });

    const { data: tuitions = [] } = useQuery({
        queryKey: ["all-tuitions"],
        queryFn: async () => {
            const res = await api.get("/tuitions");
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="grid md:grid-cols-3 gap-6">
            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Total Users</div>
                <div className="stat-value text-cyan-300">
                    {data?.totalUsers}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Students</div>
                <div className="stat-value text-green-400">
                    {data?.totalStudents}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Tutors</div>
                <div className="stat-value text-yellow-400">
                    {data?.totalTutors}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Admins</div>
                <div className="stat-value text-purple-400">
                    {data?.totalAdmins}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Tuitions</div>
                <div className="stat-value text-pink-400">
                    {data?.totalTuitions}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl">
                <div className="stat-title text-slate-400">Applications</div>
                <div className="stat-value text-orange-400">
                    {data?.totalApplications}
                </div>
            </div>

            <div className="stat bg-slate-900 rounded-3xl md:col-span-3">
                <div className="stat-title text-slate-400">Total Revenue</div>
                <div className="stat-value text-emerald-400">
                    ৳ {data?.totalRevenue}
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
                <UserRoleChart stats={data} />
                <RevenueChart stats={data} />
            </div>
            <div className="mt-6">
                <TuitionChart tuitions={tuitions} />
            </div>

            <TransactionHistory />
        </div>
    );
};

export default AdminAnalytics;
