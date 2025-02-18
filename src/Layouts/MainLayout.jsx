import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {

    return (
        <div>
            <div className="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            <div className="min-h-[calc(100vh-334px)] dark:bg-gray-900">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default MainLayout;