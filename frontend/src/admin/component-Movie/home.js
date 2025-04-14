import Footer from "./footer";
import Header from "./header";
import Slidebar from "./slide-bar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
const Home_Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const location = useLocation();

    // Kiểm tra nếu chỉ là "/home_admin"
    const isAtHomeAdminRoot = location.pathname === "/dashboard";

    return (
        <div className="bg-white overflow-x-hidden">
            <div className="flex flex-col md:flex-row h-screen">
                <Slidebar isOpen={sidebarOpen} />
                <div className={`flex-1 min-h-screen bg-gray-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-64" : ""}`}>
                    <Header onToggleSidebar={toggleSidebar} />

                    <div className="text-black p-4">
                        {/* Nếu đang ở đúng /dashboard thì hiện dòng này */}
                        {isAtHomeAdminRoot && (
                            <div className="mb-4 text-lg font-bold text-blue-600">
                                chỗ admin nè cu
                            </div>
                        )}

                        {/* Render nội dung con */}
                        <Outlet />
                    </div>
                </div>
            </div>

            <div className="text-white">
                <Footer />
            </div>
        </div>
    )
}
export default Home_Admin;