/* eslint-disable indent */
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";
import { Shield, Trash2, Users } from "lucide-react";
import api from "../../api/api";

const UserManagement = () => {
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get("/users");
            return res.data;
        },
    });

    const handleRoleChange = async (id, role) => {
        try {
            await api.patch(`/users/role/${id}`, {
                role,
            });

            toast.success("User role updated");
            refetch();
        } catch (error) {
            console.log(error);
            toast.error("Failed to update role");
        }
    };

    const handleDeleteUser = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?",
        );

        if (!confirmed) {
            return;
        }

        try {
            await api.delete(`/users/${id}`);

            toast.success("User deleted successfully");
            refetch();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete user");
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-100">
                        User Management
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage platform users, roles and permissions.
                    </p>
                </div>

                <div className="stats bg-slate-900 border border-slate-800 shadow-lg">
                    <div className="stat py-4">
                        <div className="stat-figure text-cyan-400">
                            <Users size={28} />
                        </div>

                        <div className="stat-title text-slate-400">
                            Total Users
                        </div>

                        <div className="stat-value text-cyan-300 text-3xl">
                            {users.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-slate-950 text-slate-300">
                                <th>#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Change Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-slate-800/50"
                                >
                                    <td>{index + 1}</td>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="w-12 rounded-full ring ring-cyan-500/30">
                                                    <img
                                                        src={
                                                            user.photo ||
                                                            "https://i.ibb.co/ZYW3VTp/brown-brim.png"
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-semibold text-slate-100">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="text-slate-300">
                                        {user.email}
                                    </td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                user?.role === "admin"
                                                    ? "badge-error"
                                                    : user?.role === "tutor"
                                                      ? "badge-secondary"
                                                      : "badge-primary"
                                            }`}
                                        >
                                            {user?.role}
                                        </span>
                                    </td>

                                    <td>
                                        <select
                                            defaultValue={user?.role}
                                            onChange={(e) =>
                                                handleRoleChange(
                                                    user._id,
                                                    e.target.value,
                                                )
                                            }
                                            className="
                                            select
                                            select-sm
                                            bg-slate-950
                                            border-slate-700
                                            text-slate-100
                                            "
                                        >
                                            <option value="student">
                                                Student
                                            </option>

                                            <option value="tutor">Tutor</option>

                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>

                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() =>
                                                    handleDeleteUser(user._id)
                                                }
                                                className="btn btn-sm btn-error"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h3 className="text-slate-400 text-sm">Students</h3>

                    <p className="text-3xl font-bold text-cyan-300 mt-2">
                        {
                            users.filter((user) => user?.role === "student")
                                .length
                        }
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <h3 className="text-slate-400 text-sm">Tutors</h3>

                    <p className="text-3xl font-bold text-fuchsia-300 mt-2">
                        {users.filter((user) => user?.role === "tutor").length}
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <div className="flex items-center gap-2">
                        <Shield className="text-rose-400" />

                        <h3 className="text-slate-400 text-sm">Admins</h3>
                    </div>

                    <p className="text-3xl font-bold text-rose-400 mt-2">
                        {users.filter((user) => user?.role === "admin").length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
