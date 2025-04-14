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
            {/* Sử dụng relative để nội dung không bị đẩy */}
            <div className="relative h-screen">
                {/* Slidebar cố định */}
                <Slidebar isOpen={sidebarOpen} />

                {/* Nội dung chính */}
                <div className={`transition-all duration-300 ${sidebarOpen ? "pl-64" : "pl-0"}`}>
                    <Header onToggleSidebar={toggleSidebar} />

                    <div className="text-black p-4 min-h-[calc(100vh-4rem)]">
                        {isAtHomeAdminRoot && (
                            <div className="mb-4 text-lg font-bold text-blue-600">
                                chỗ admin nè cu
                            </div>
                        )}
                        <Outlet />
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}
export default Home_Admin;