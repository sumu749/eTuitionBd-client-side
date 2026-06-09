/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";
import { User, Mail, Lock, Image } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // Firebase User Create
            const result = await createUser(data.email, data.password);

            // Firebase Profile Update
            await updateUserProfile(data.name, data.photo || "");

            // Save User To MongoDB
            await api.post("/users", {
                name: data.name,
                email: data.email,
                phone: data.phone,
                photoURL: data.photo || "",
                role: data.role,
                createdAt: new Date(),
            });

            // Generate JWT using Firebase token
            const firebaseToken = await result.user.getIdToken();
            const jwtRes = await api.post(
                "/jwt",
                {},
                {
                    headers: {
                        authorization: `Bearer ${firebaseToken}`,
                    },
                },
            );

            // Store JWT
            localStorage.setItem("access-token", jwtRes.data.token);

            toast.success("Account created successfully");

            navigate("/");
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Registration Failed";
            console.error("Registration error:", error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="bg-slate-900/90 border border-slate-800 rounded-4xl p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-slate-100">
                            Create Account
                        </h1>

                        <p className="text-slate-400 mt-3">
                            Join eTuitionBd today
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5 mt-8"
                    >
                        <div className="relative">
                            <User className="absolute left-4 top-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Full name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="input w-full pl-11 bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                            {errors.name && (
                                <p className="text-xs text-rose-400 mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Mail className="absolute left-4 top-4 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email address"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email",
                                    },
                                })}
                                className="input w-full pl-11 bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                            {errors.email && (
                                <p className="text-xs text-rose-400 mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="input w-full bg-slate-950 border border-slate-700 text-slate-100"
                            />

                            {errors.phone && (
                                <p className="text-xs text-rose-400 mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Image className="absolute left-4 top-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Photo URL (optional)"
                                {...register("photo")}
                                className="input w-full pl-11 bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                        </div>

                        <div>
                            <select
                                {...register("role")}
                                className="select select-bordered w-full bg-slate-950 border-slate-700 text-slate-100"
                            >
                                <option value="student">Student</option>
                                <option value="tutor">Tutor</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                                        message:
                                            "Must contain uppercase and lowercase letter",
                                    },
                                })}
                                className="input w-full pl-11 bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                            {errors.password && (
                                <p className="text-xs text-rose-400 mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-4 text-slate-500" />
                            <input
                                type="password"
                                placeholder="Confirm password"
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Passwords do not match",
                                })}
                                className="input w-full pl-11 bg-slate-950 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                            />
                            {errors.confirmPassword && (
                                <p className="text-xs text-rose-400 mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full rounded-full"
                        >
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    <p className="text-center text-slate-400 mt-6">
                        Already have an account?
                        <Link to="/login" className="text-cyan-300 ml-2">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
