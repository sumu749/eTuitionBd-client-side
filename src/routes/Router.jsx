import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import NotFound from "../pages/ErrorPage/NotFound";
import StudentDashboard from "../pages/StudentDashboard/StudentDashboard";
import TutorDashboard from "../pages/TutorDashboard/TutorDashboard";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import Dashboard from "../pages/Dashboard/Dashboard";
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
import Tuitions from "../pages/Tuitions/Tuitions";
import TuitionDetails from "../pages/Tuitions/TuitionDetails";
import FindTutors from "../pages/Tutors/FindTutors";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import MyApplications from "../pages/TutorDashboard/MyApplications";
import OngoingApplications from "../pages/TutorDashboard/OngoingApplications";
import Revenue from "../pages/TutorDashboard/Revenue";
import UserManagement from "../pages/AdminDashboard/UserManagement";
import TuitionManagement from "../pages/AdminDashboard/TuitionManagement";
import AdminAnalytics from "../pages/AdminDashboard/AdminAnalytics";
import Checkout from "../pages/Checkout/Checkout";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentDetails from "../pages/StudentDashboard/PaymentDetails";

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
            {
                path: "tuitions",
                element: <Tuitions />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "tutors",
                element: <FindTutors />,
            },
            {
                path: "tuitions/:id",
                element: <TuitionDetails />,
            },
            {
                path: "*",
                element: <NotFound />,
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
                index: true,
                element: <Dashboard />,
            },
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
                path: "payment-details/:id",
                element: (
                    <StudentRoute>
                        <PaymentDetails />
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
                path: "checkout/:id",
                element: (
                    <StudentRoute>
                        <Checkout />
                    </StudentRoute>
                ),
            },
            {
                path: "payment-success",
                element: (
                    <PrivateRoute>
                        <PaymentSuccess />
                    </PrivateRoute>
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
                path: "tutor/applications",
                element: (
                    <TutorRoute>
                        <MyApplications />
                    </TutorRoute>
                ),
            },
            {
                path: "/dashboard/tutor/ongoing",
                element: (
                    <TutorRoute>
                        <OngoingApplications />
                    </TutorRoute>
                ),
            },
            {
                path: "/dashboard/tutor/revenue",
                element: (
                    <TutorRoute>
                        <Revenue />
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
            {
                path: "admin/users",
                element: (
                    <AdminRoute>
                        <UserManagement />
                    </AdminRoute>
                ),
            },

            {
                path: "admin/tuitions",
                element: (
                    <AdminRoute>
                        <TuitionManagement />
                    </AdminRoute>
                ),
            },
            {
                path: "admin/analytics",
                element: (
                    <AdminRoute>
                        <AdminAnalytics />
                    </AdminRoute>
                ),
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
