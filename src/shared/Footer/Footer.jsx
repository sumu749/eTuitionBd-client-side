import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content mt-24">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <div>
                        <h2 className="text-3xl font-bold">eTuitionBd</h2>

                        <p className="mt-4 text-sm opacity-80">
                            Connecting students and expert tutors through a
                            trusted platform.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <FaFacebook />
                            <FaLinkedin />
                            <FaInstagram />
                            <FaGithub />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Platform</h3>

                        <ul className="space-y-3 mt-4">
                            <li>Find Tutors</li>
                            <li>Post Tuition</li>
                            <li>Become Tutor</li>
                            <li>Pricing</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Company</h3>

                        <ul className="space-y-3 mt-4">
                            <li>About</li>
                            <li>Contact</li>
                            <li>Careers</li>
                            <li>Blog</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg">Stay Updated</h3>

                        <p className="mt-4 text-sm">
                            Get updates on new tutors and tuition opportunities.
                        </p>

                        <div className="mt-4 flex gap-2">
                            <input
                                type="email"
                                placeholder="Email"
                                className="input input-bordered flex-1"
                            />

                            <button className="btn btn-primary">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p>© 2026 TutorLink. All rights reserved.</p>

                    <div className="flex gap-5">
                        <span>Privacy</span>
                        <span>Terms</span>
                        <span>Cookies</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
