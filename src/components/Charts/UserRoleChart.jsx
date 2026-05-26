import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const UserRoleChart = ({ stats }) => {
    const data = [
        {
            name: "Students",
            value: stats.totalStudents,
        },
        {
            name: "Tutors",
            value: stats.totalTutors,
        },
        {
            name: "Admins",
            value: stats.totalAdmins,
        },
    ];

    const COLORS = ["#22c55e", "#06b6d4", "#a855f7"];

    return (
        <div className="bg-slate-900 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4">User Distribution</h2>

            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={90}
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index]} />
                        ))}
                    </Pie>

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserRoleChart;
