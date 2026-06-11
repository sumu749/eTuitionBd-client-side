import { Link, useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 shadow-xl rounded-4xl p-10 text-center">
                <div className="flex items-center justify-center">
                    <svg
                        className="w-24 h-24 text-cyan-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            d="M21 10.5V21H3V3h11.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 3L10 14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 3l-6 18"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.2"
                        />
                    </svg>
                </div>

                <h1 className="mt-4 text-6xl font-extrabold text-white">404</h1>
                <p className="mt-2 text-2xl font-semibold text-slate-200">
                    Whoops — Page not found
                </p>
                <p className="mt-3 text-slate-400">
                    We can't find the page you're looking for. It may have been
                    moved or removed.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 btn btn-primary text-slate-950 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-300"
                        aria-label="Go to home page"
                    >
                        Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-100 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
                        aria-label="Go back"
                    >
                        Go Back
                    </button>
                </div>

                <p className="mt-6 text-sm text-slate-500">
                    If you think this is an error, visit our
                    <Link to="/contact" className="text-cyan-300 ml-1">
                        support page
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default NotFound;
