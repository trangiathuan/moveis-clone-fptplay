import {
    LayoutDashboard,
    Text,
    Palette,
    Image,
    Lock,
    UserPlus,
    Menu,
    ChevronRight,
    Globe,
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import Add_film from "./component-film/add-film";
import Change_film from "./component-film/change-film";
import Delete_film from "./component-film/delete-film";
import Repair_film from "./component-film/repair-film";
import { NavLink, Link } from "react-router-dom";
const Slidebar = ({ isOpen }) => {
    return (
        <aside className={`absolute top-0 left-0 h-full w-64 bg-white text-black border-r shadow-md z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="px-4 py-6 flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center gap-2 px-2 mb-8">
                        <div className="text-orange-600 text-2xl">
                            <FontAwesomeIcon icon={faDiamond} style={{ color: "#f58f00" }} />
                        </div>
                        <h1 className="text-lg font-bold">FPT PLay Admin</h1>
                    </div>

                    <nav className="space-y-6">
                        <NavLink to="/home_admin" className="bg-orange-100 text-orange-600 rounded-md px-3 py-2 flex items-center gap-2 font-medium">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </NavLink>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Movie Management</h2>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <NavLink to="/home_admin/add-film" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🎬 Thêm Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/home_admin/repair-film" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🛠️ Sửa Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/home_admin/delete-film" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🗑️ Xóa Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/home_admin/change-film" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🔄 Thay đổi Phim
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Pages</h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <Lock className="w-4 h-4" />
                                    Login
                                </li>
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <UserPlus className="w-4 h-4" />
                                    Register
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Other</h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <span className="flex items-center gap-2">
                                        <Menu className="w-4 h-4" />
                                        Menu levels
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </li>
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <Globe className="w-4 h-4" />
                                    Sample page
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </aside>
    )
}

export default Slidebar;