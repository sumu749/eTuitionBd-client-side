import { Link, useNavigate } from "react-router";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginUser, googleLogin } = useAuth();
    const navigate = useNavigate();

    const loginEmail = async (email) => {
        const jwtRes = await api.post("/jwt", { email });
        localStorage.setItem("access-token", jwtRes.data.token);
    };

    const redirectByRole = async (email) => {
        try {
            const res = await api.get(`/users/role/${email}`);

            const role = res.data.role;

            if (role === "student") {
                navigate("/dashboard/student");
            } else if (role === "tutor") {
                navigate("/dashboard/tutor");
            } else if (role === "admin") {
                navigate("/dashboard/admin");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            navigate("/");
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const userCredential = await loginUser(email, password);
            await loginEmail(userCredential.user.email);
            toast.success("Login successful!");

            await redirectByRole(userCredential.user.email);
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                error.message ||
                "Login failed";
            console.error("Login error:", error);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);

        try {
            const result = await googleLogin();

            const user = result.user;

            // Check user exists in DB
            const existingUser = await api.get(`/users/${user.email}`);

            // If not exists, create
            if (!existingUser.data) {
                await api.post("/users", {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phone: "",
                    role: "student",
                    createdAt: new Date(),
                });
            }

            // Generate JWT
            await loginEmail(user.email);

            // Redirect
            await redirectByRole(user.email);

            // create jwt
            await loginEmail(user.email);

            toast.success("Login successful!");

            await redirectByRole(user.email);
        } catch (error) {
            toast.error(error.message || "Google login failed");
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
                            Welcome Back
                        </h1>

                        <p className="text-slate-400 mt-3">
                            Login to continue learning
                        </p>
                    </div>

                    <form
                        className="mt-8 space-y-5"
                        onSubmit={handleEmailLogin}
                    >
                        <div>
                            <label className="text-slate-300">Email</label>

                            <div className="mt-2 relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-4 text-slate-500"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="
                                    input
                                    w-full
                                    pl-11
                                    bg-slate-950
                                    border-slate-700
                                    text-slate-100
                                    placeholder:text-slate-500
                                    "
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-slate-300">Password</label>

                            <div className="mt-2 relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-4 text-slate-500"
                                />

                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="
                                    input
                                    w-full
                                    pl-11
                                    bg-slate-950
                                    border-slate-700
                                    text-slate-100
                                    placeholder:text-slate-500
                                    "
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                            btn
                            btn-primary
                            w-full
                            rounded-full
                            "
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="divider text-slate-500">OR</div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="
                        btn
                        w-full
                        bg-slate-800
                        border-slate-700
                        text-slate-100
                        hover:bg-slate-700
                        "
                    >
                        {loading ? "Signing in..." : "Continue with Google"}
                    </button>

                    <p className="text-center text-slate-400 mt-6">
                        Don't have an account?
                        <Link to="/register" className="text-cyan-300 ml-2">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
