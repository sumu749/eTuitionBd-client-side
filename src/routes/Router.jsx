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
import PostTuition from "../pages/StudentDashboard/PostTuition";
import MyTuitions from "../pages/StudentDashboard/MyTuitions";
import AppliedTutors from "../pages/StudentDashboard/AppliedTutors";
import Payments from "../pages/StudentDashboard/Payments";
import ProfileSettings from "../pages/StudentDashboard/ProfileSettings";

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
                path: "student/post-tuition",
                element: (
                    <StudentRoute>
                        <PostTuition />
                    </StudentRoute>
                ),
            },
            {
                path: "student/my-tuitions",
                element: (
                    <StudentRoute>
                        <MyTuitions />
                    </StudentRoute>
                ),
            },
            {
                path: "student/applied-tutors",
                element: (
                    <StudentRoute>
                        <AppliedTutors />
                    </StudentRoute>
                ),
            },
            {
                path: "student/payments",
                element: (
                    <StudentRoute>
                        <Payments />
                    </StudentRoute>
                ),
            },
            {
                path: "student/profile",
                element: (
                    <StudentRoute>
                        <ProfileSettings />
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
