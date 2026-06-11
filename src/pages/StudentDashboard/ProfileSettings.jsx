import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Image, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const ProfileSettings = () => {
    const { user, updateUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const defaultAvatar = "https://i.pravatar.cc/300?img=65";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            photo: user?.photoURL || "",
        },
    });

    useEffect(() => {
        reset({
            name: user?.displayName || "",
            photo: user?.photoURL || "",
        });
    }, [user, reset]);

    const onSubmit = async (data) => {
        if (!data.name.trim()) {
            toast.error("Name is required");
            return;
        }

        setLoading(true);

        try {
            await updateUserProfile(data.name.trim(), data.photo.trim() || "");
            toast.success("Profile updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Unable to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] py-10">
            <div className="mx-auto w-full max-w-5xl px-4">
                <div className="rounded-4xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/40">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                                Profile Settings
                            </p>
                            <h1 className="mt-4 text-3xl font-black text-white">
                                Update your account information
                            </h1>
                            <p className="mt-3 text-slate-400 max-w-2xl">
                                Keep your display name and profile picture
                                current so tutors and students can recognize you
                                on the platform.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 rounded-3xl bg-slate-950 p-4">
                            <div className="avatar">
                                <div className="h-20 w-20 rounded-3xl bg-slate-800 ring ring-cyan-500/30 overflow-hidden">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="h-full w-full object-cover"
                                            loading="lazy"
                                            onError={(event) => {
                                                event.currentTarget.onerror =
                                                    null;
                                                event.currentTarget.src =
                                                    defaultAvatar;
                                            }}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-cyan-300">
                                            <User size={32} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    Signed in as
                                </p>
                                <p className="text-base font-semibold text-white">
                                    {user?.email || "No email available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                        <div className="rounded-3xl bg-slate-950 p-8 border border-slate-800">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="label">
                                        <span className="label-text text-slate-300">
                                            Full Name
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                            className="input w-full pl-11 bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-rose-400">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text text-slate-300">
                                            Photo URL
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <Image className="pointer-events-none absolute left-4 top-4 text-slate-500" />
                                        <input
                                            type="url"
                                            placeholder="https://example.com/avatar.jpg"
                                            {...register("photo")}
                                            className="input w-full pl-11 bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-500"
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Add a profile picture that appears on
                                        tutor and student listings.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-primary w-full py-4 text-lg font-semibold"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-8">
                            <div className="flex items-center gap-3 text-cyan-300">
                                <CheckCircle2 />
                                <h2 className="text-xl font-semibold text-white">
                                    Quick profile summary
                                </h2>
                            </div>

                            <div className="mt-6 space-y-4 text-slate-300">
                                <div className="rounded-3xl bg-slate-900 p-4">
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                                        Current Name
                                    </p>
                                    <p className="mt-2 text-lg font-semibold text-white">
                                        {user?.displayName || "Not set"}
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-slate-900 p-4">
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                                        Current Photo URL
                                    </p>
                                    <p className="mt-2 break-all text-sm text-slate-300">
                                        {user?.photoURL || "No photo set"}
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-slate-900 p-4">
                                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                                        Account ID
                                    </p>
                                    <p className="mt-2 text-sm text-slate-300 break-all">
                                        {user?.uid || "Unavailable"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
