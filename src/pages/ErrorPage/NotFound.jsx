import { Link, useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-white to-gray-100 px-4">
            <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8 text-center">
                <div className="flex items-center justify-center">
                    <svg
                        className="w-24 h-24 text-blue-500"
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

                <h1 className="mt-4 text-6xl font-extrabold text-gray-800">
                    404
                </h1>
                <p className="mt-2 text-2xl font-semibold text-gray-700">
                    Whoops — Page not found
                </p>
                <p className="mt-3 text-gray-600">
                    We can't find the page you're looking for. It may have been
                    moved or removed.
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 btn btn-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label="Go to home page"
                    >
                        Home
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Go back"
                    >
                        Go Back
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    If you think this is an error, contact support.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
