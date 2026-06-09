import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";

const Contact = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            toast.error(
                "Please complete all fields before sending your message.",
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await api.post("/contacts", form);
            toast.success(
                response.data?.message || "Your message was sent successfully.",
            );
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Contact form submission failed:", error);
            toast.error(
                error.response?.data?.message ||
                    "Unable to send your message right now. Please try again later.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-20">
            <div className="max-w-3xl mx-auto px-6">
                <h1 className="text-4xl font-extrabold">Contact Us</h1>

                <p className="text-slate-400 mt-4">
                    Have a question or need support? Send us a message and we
                    will get back to you.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input w-full bg-slate-900 border-slate-700 text-slate-100"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email address"
                        className="input w-full bg-slate-900 border-slate-700 text-slate-100"
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="textarea w-full bg-slate-900 border-slate-700 text-slate-100"
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary rounded-full"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
