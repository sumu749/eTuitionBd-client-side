import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import TutorDashboard from "../pages/TutorDashboard/TutorDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "unauthorized",
                element: <Unauthorized />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "student",
                element: (
                    <StudentRoute>
                        <StudentDashboard />
                    </StudentRoute>
                ),
            },
            {
                path: "tutor",
                element: (
                    <TutorRoute>
                        <TutorDashboard />
                    </TutorRoute>
                ),
            },
            {
                path: "admin",
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                ),
            },
        ],
    },
]);
