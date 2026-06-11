import { Outlet } from "react-router";
import NavBar from "../shared/Navbar/NavBar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
            <NavBar />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
