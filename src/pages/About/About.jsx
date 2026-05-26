const About = () => {
    return (
        <section className="min-h-screen bg-slate-950 text-slate-100 py-20">
            <div className="max-w-5xl mx-auto px-6">
                <h1 className="text-4xl font-extrabold">About eTuitionBd</h1>

                <p className="mt-6 text-slate-400 leading-relaxed">
                    eTuitionBd connects students with verified tutors across
                    Bangladesh. Our mission is to make quality tutoring
                    accessible, reliable and easy to find. Tutors are verified
                    and students can browse tuitions, apply, and contact
                    educators through the platform.
                </p>

                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div>
                        <h3 className="font-bold text-xl">Our Mission</h3>
                        <p className="text-slate-400 mt-2">
                            Make tutoring accessible and trustworthy for every
                            student.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">What we offer</h3>
                        <p className="text-slate-400 mt-2">
                            Tutor profiles, tuition postings, secure messaging
                            and verified reviews.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-xl">Contact</h3>
                        <p className="text-slate-400 mt-2">
                            For partnership or support, use the contact page.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
