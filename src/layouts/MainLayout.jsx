import { Outlet } from "react-router";
import NavBar from "../shared/Navbar/NavBar";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
