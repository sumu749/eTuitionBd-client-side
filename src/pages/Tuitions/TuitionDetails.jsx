import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axiosSecure from "../../api/axiosSecure";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

import useTutor from "../../hooks/useTutor";
import ApplyModal from "../../components/Tutor/ApplyModal";

const TuitionDetails = () => {
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [isTutor] = useTutor();

    const { data: tuition, isLoading } = useQuery({
        queryKey: ["tuition-details", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tuitions/${id}`);
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="bg-slate-900 border border-slate-800 rounded-4xl p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-black">
                            {tuition.subject}
                        </h1>

                        <p className="text-cyan-300 mt-2">
                            {tuition.classLevel}
                        </p>
                    </div>

                    <div className="badge badge-success">{tuition.status}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div>
                        <h3 className="font-semibold mb-2">Location</h3>
                        <p>{tuition.location}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Budget</h3>
                        <p>৳ {tuition.budget}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-semibold mb-3">Description</h3>

                    <p className="text-slate-300">{tuition.description}</p>
                </div>

                {isTutor && (
                    <div className="mt-10">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="btn btn-primary rounded-full"
                        >
                            Apply Now
                        </button>
                    </div>
                )}
            </div>

            <ApplyModal
                tuition={tuition}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </section>
    );
};

export default TuitionDetails;
