import { Outlet } from "react-router";
import Sidebar from "../components/DashBoard/Sidebar";
import DashboardNavbar from "../components/DashBoard/DashboardNavbar";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <DashboardNavbar />

            <div className="flex">
                <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-64px)]">
                    <Sidebar />
                </aside>

                <main className="flex-1 p-8 bg-slate-950">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
