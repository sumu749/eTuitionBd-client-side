/* eslint-disable indent */
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const RevenueChart = ({ transactions = [], stats }) => {
    const source = transactions.length ? transactions : stats?.revenue || [];

    const chartData = source.length
        ? source.map((item, index) => ({
              name: `#${index + 1}`,
              revenue: item.amount ?? item.revenue ?? 0,
          }))
        : stats?.totalRevenue != null
          ? [
                {
                    name: "Total Revenue",
                    revenue: stats.totalRevenue,
                },
            ]
          : [];

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-6">Revenue Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
