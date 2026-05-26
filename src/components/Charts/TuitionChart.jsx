import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const TuitionChart = ({ tuitions = [] }) => {
    const approved = tuitions.filter(
        (item) => item.status === "approved",
    ).length;

    const pending = tuitions.filter((item) => item.status === "pending").length;

    const rejected = tuitions.filter(
        (item) => item.status === "rejected",
    ).length;

    const data = [
        {
            status: "Approved",
            count: approved,
        },
        {
            status: "Pending",
            count: pending,
        },
        {
            status: "Rejected",
            count: rejected,
        },
    ];

    return (
        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <h2 className="text-xl font-bold mb-6">Tuition Status</h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TuitionChart;
