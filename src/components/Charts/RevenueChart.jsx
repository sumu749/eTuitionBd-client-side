import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const RevenueChart = ({ stats }) => {
    const data = [
        {
            name: "Revenue",
            amount: stats.totalRevenue,
        },
    ];

    return (
        <div className="bg-slate-900 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4">Revenue Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
