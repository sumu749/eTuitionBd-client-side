import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import TutorDashboard from "../pages/TutorDashboard/TutorDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import DashboardLayout from "../layouts/DashboardLayout";

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
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "student",
                element: <StudentDashboard />,
            },
            {
                path: "tutor",
                element: <TutorDashboard />,
            },
            {
                path: "admin",
                element: <AdminDashboard />,
            },
        ],
    },
]);
