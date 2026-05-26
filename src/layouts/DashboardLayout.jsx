import { Outlet } from "react-router";
import Sidebar from "../components/DashBoard/Sidebar";
import DashboardNavbar from "../components/DashBoard/DashboardNavbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <DashboardNavbar />

            <div className="flex flex-col lg:flex-row">
                <aside className="w-full lg:w-64 bg-slate-900 border-r border-slate-800 lg:min-h-[calc(100vh-64px)]">
                    <Sidebar />
                </aside>

                <main className="flex-1 p-6 lg:p-8 bg-slate-950">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
