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
        <div className="relative min-h-screen bg-white overflow-x-hidden">
            {/* Sidebar */}
            <div className="flex">
                <Slidebar isOpen={sidebarOpen} />

                {/* Main content */}
                <div className={`flex-1 flex flex-col min-h-screen ${sidebarOpen ? "ml-64" : ""}`}>
                    <Header onToggleSidebar={toggleSidebar} />

                    {/* Content area with padding-bottom to avoid overlapping footer */}
                    <main className="flex-grow p-4 bg-gray-50 text-black pb-24">
                        {isAtHomeAdminRoot && (
                            <div className="mb-4 text-lg font-bold text-blue-600">
                                chỗ admin nè cu
                            </div>
                        )}
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Footer overlays full width, ignoring sidebar */}
            {/* <footer className="absolute bottom-0 left-0 w-full bg-black text-white z-50">
                <Footer />
            </footer> */}
        </div>

    )
}
export default Home_Admin;