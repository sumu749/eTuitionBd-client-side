import { Outlet } from "react-router";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen">
            <aside>Sidebar</aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
