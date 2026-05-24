import React from "react";
import { Link } from "react-router";

const Unauthorized = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
                <p className="mb-6">
                    You do not have permission to view this page.
                </p>
                <Link to="/" className="btn btn-primary">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;
