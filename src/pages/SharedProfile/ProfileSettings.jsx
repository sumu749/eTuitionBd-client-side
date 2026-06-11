/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    User,
    Image,
    CheckCircle2,
    Phone,
    MapPin,
    BookOpen,
    GraduationCap,
    Wallet,
    AlignLeft,
    Tag,
    Loader2,
    Save,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import api from "../../api/api";

const FieldWrapper = ({ label, error, children }) => (
    <label className="block space-y-2 text-slate-200">
        <span className="text-sm font-medium">{label}</span>
        {children}
        {error && <p className="text-xs text-rose-400">{error}</p>}
    </label>
);

const inputCls =
    "input input-bordered w-full bg-slate-900 text-white border-slate-700 focus:border-cyan-500 transition-colors";
const textareaCls =
    "textarea textarea-bordered w-full bg-slate-900 text-white border-slate-700 focus:border-cyan-500 transition-colors";

const ProfileSettings = () => {
    const { user, updateUserProfile } = useAuth();
    const { role } = useRole();
    const [saving, setSaving] = useState(false);
    const [dbProfile, setDbProfile] = useState(null);
    const defaultAvatar = "https://i.pravatar.cc/300?img=65";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm();

    useEffect(() => {
        if (!user?.email) return;
        api.get(`/users/${encodeURIComponent(user.email)}`)
            .then((res) => setDbProfile(res.data))
            .catch(() => {});
    }, [user?.email]);

    useEffect(() => {
        if (!user) return;
        reset({
            name: user.displayName || "",
            photo: user.photoURL || "",
            phone: dbProfile?.phone || "",
            location: dbProfile?.location || "",
            subject: dbProfile?.subject || "",
            university: dbProfile?.university || "",
            bio: dbProfile?.bio || "",
            salary: dbProfile?.salary || "",
            skills: Array.isArray(dbProfile?.skills)
                ? dbProfile.skills.join(", ")
                : dbProfile?.skills || "",
        });
    }, [user, dbProfile, reset]);

    const onSubmit = async (data) => {
        if (!data.name?.trim()) {
            toast.error("Name is required");
            return;
        }
        setSaving(true);
        try {
            await updateUserProfile(data.name.trim(), data.photo?.trim() || "");

            const mongoPayload = {
                name: data.name.trim(),
                photoURL: data.photo?.trim() || "",
                phone: data.phone?.trim() || "",
                location: data.location?.trim() || "",
            };

            if (role === "tutor") {
                mongoPayload.subject = data.subject?.trim() || "";
                mongoPayload.university = data.university?.trim() || "";
                mongoPayload.bio = data.bio?.trim() || "";
                mongoPayload.salary = data.salary ? Number(data.salary) : null;
                mongoPayload.skills = data.skills
                    ? data.skills
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean)
                    : [];
            }

            await api.patch(
                `/users/profile/${encodeURIComponent(user.email)}`,
                mongoPayload,
            );

            const updated = await api.get(
                `/users/${encodeURIComponent(user.email)}`,
            );
            setDbProfile(updated.data);
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "Unable to update profile.",
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="py-6">
            <div className="mx-auto w-full max-w-5xl">
                {/* Header */}
                <div className="rounded-4xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl mb-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                                Profile Settings
                            </p>
                            <h1 className="mt-3 text-3xl font-semibold text-white">
                                Update your account
                            </h1>
                            <p className="mt-2 text-slate-400 max-w-xl">
                                {role === "tutor"
                                    ? "Keep your tutor profile complete so students can find and trust you."
                                    : "Keep your display name and contact details up to date."}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 rounded-3xl bg-slate-950 border border-slate-800 p-4 shrink-0">
                            <div className="h-20 w-20 rounded-3xl bg-slate-800 ring-2 ring-cyan-500/30 overflow-hidden flex items-center justify-center">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src =
                                                defaultAvatar;
                                        }}
                                    />
                                ) : (
                                    <User size={32} className="text-cyan-300" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm text-slate-400">
                                    Signed in as
                                </p>
                                <p className="font-semibold text-white truncate max-w-45">
                                    {user?.email}
                                </p>
                                <span
                                    className={`mt-1 inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full
                                    ${
                                        role === "admin"
                                            ? "bg-rose-500/20 text-rose-300"
                                            : role === "tutor"
                                              ? "bg-fuchsia-500/20 text-fuchsia-300"
                                              : "bg-cyan-500/20 text-cyan-300"
                                    }`}
                                >
                                    {role || "user"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form + Summary */}
                <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 mb-4">
                                    Basic Info
                                </h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <FieldWrapper
                                        label="Display Name"
                                        error={errors.name?.message}
                                    >
                                        <div className="relative">
                                            <User
                                                size={16}
                                                className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Full name"
                                                {...register("name", {
                                                    required:
                                                        "Name is required",
                                                })}
                                                className={`${inputCls} pl-9`}
                                            />
                                        </div>
                                    </FieldWrapper>
                                    <FieldWrapper label="Phone Number">
                                        <div className="relative">
                                            <Phone
                                                size={16}
                                                className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                            />
                                            <input
                                                type="tel"
                                                placeholder="+880..."
                                                {...register("phone")}
                                                className={`${inputCls} pl-9`}
                                            />
                                        </div>
                                    </FieldWrapper>
                                </div>
                            </div>

                            <FieldWrapper label="Photo URL">
                                <div className="relative">
                                    <Image
                                        size={16}
                                        className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                    />
                                    <input
                                        type="url"
                                        placeholder="https://example.com/avatar.jpg"
                                        {...register("photo")}
                                        className={`${inputCls} pl-9`}
                                    />
                                </div>
                            </FieldWrapper>

                            <FieldWrapper label="Location">
                                <div className="relative">
                                    <MapPin
                                        size={16}
                                        className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="e.g. Dhaka, Rajshahi"
                                        {...register("location")}
                                        className={`${inputCls} pl-9`}
                                    />
                                </div>
                            </FieldWrapper>

                            {role === "tutor" && (
                                <>
                                    <hr className="border-slate-800" />
                                    <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                                        Tutor Profile
                                    </h2>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <FieldWrapper label="Primary Subject">
                                            <div className="relative">
                                                <BookOpen
                                                    size={16}
                                                    className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. Mathematics"
                                                    {...register("subject")}
                                                    className={`${inputCls} pl-9`}
                                                />
                                            </div>
                                        </FieldWrapper>
                                        <FieldWrapper label="University / Institution">
                                            <div className="relative">
                                                <GraduationCap
                                                    size={16}
                                                    className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. BUET, DU"
                                                    {...register("university")}
                                                    className={`${inputCls} pl-9`}
                                                />
                                            </div>
                                        </FieldWrapper>
                                    </div>
                                    <FieldWrapper label="Hourly Rate (৳)">
                                        <div className="relative">
                                            <Wallet
                                                size={16}
                                                className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                placeholder="e.g. 500"
                                                {...register("salary")}
                                                className={`${inputCls} pl-9`}
                                            />
                                        </div>
                                    </FieldWrapper>
                                    <FieldWrapper label="Skills / Subjects (comma-separated)">
                                        <div className="relative">
                                            <Tag
                                                size={16}
                                                className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Mathematics, Physics, English"
                                                {...register("skills")}
                                                className={`${inputCls} pl-9`}
                                            />
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Shown as badges on your tutor
                                            profile page.
                                        </p>
                                    </FieldWrapper>
                                    <FieldWrapper label="Bio">
                                        <div className="relative">
                                            <AlignLeft
                                                size={16}
                                                className="absolute left-3 top-3.25 text-slate-500 pointer-events-none"
                                            />
                                            <textarea
                                                rows={4}
                                                placeholder="Tell students about your teaching style…"
                                                {...register("bio")}
                                                className={`${textareaCls} pl-9`}
                                            />
                                        </div>
                                    </FieldWrapper>
                                </>
                            )}

                            <button
                                type="submit"
                                disabled={saving || !isDirty}
                                className="btn btn-primary w-full gap-2"
                            >
                                {saving ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Summary panel */}
                    <div className="space-y-4">
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <CheckCircle2
                                    size={18}
                                    className="text-cyan-300"
                                />
                                <h2 className="font-semibold text-white">
                                    Current Profile
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {[
                                    {
                                        label: "Name",
                                        value: user?.displayName || "Not set",
                                    },
                                    {
                                        label: "Email",
                                        value: user?.email || "—",
                                    },
                                    {
                                        label: "Phone",
                                        value: dbProfile?.phone || "Not set",
                                    },
                                    {
                                        label: "Location",
                                        value: dbProfile?.location || "Not set",
                                    },
                                    ...(role === "tutor"
                                        ? [
                                              {
                                                  label: "Subject",
                                                  value:
                                                      dbProfile?.subject ||
                                                      "Not set",
                                              },
                                              {
                                                  label: "University",
                                                  value:
                                                      dbProfile?.university ||
                                                      "Not set",
                                              },
                                              {
                                                  label: "Rate",
                                                  value: dbProfile?.salary
                                                      ? `৳ ${dbProfile.salary}/hr`
                                                      : "Not set",
                                              },
                                          ]
                                        : []),
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-2xl bg-slate-950/60 border border-slate-800 px-4 py-3"
                                    >
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-200 break-all">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {role === "tutor" && (
                            <div className="rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-5">
                                <p className="text-sm font-medium text-fuchsia-300 mb-1">
                                    Complete your profile
                                </p>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Tutors with a photo, subject, university,
                                    bio, and skills receive up to 3× more
                                    student inquiries.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
