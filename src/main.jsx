import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/Router.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />

            <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
    </React.StrictMode>,
);
