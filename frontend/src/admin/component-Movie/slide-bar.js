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
    User,
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
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
                        <NavLink to="/dashboard" className="bg-orange-100 text-orange-600 rounded-md px-3 py-2 flex items-center gap-2 font-medium">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </NavLink>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Quản lý phim</h2>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <NavLink to="/dashboard/list-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🎞️ Danh sách phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🎬 Thêm phim mới
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/repair-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🛠️ Sửa Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/delete-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🗑️ Xóa Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/change-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        🔄 Thay đổi Phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-episode-movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        Menu tạm
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Người dùng</h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                                    <NavLink to='/dashboard/list-users' className='flex space-x-1 items-center'>
                                        <User className="w-4 h-4" />
                                        <p>Tài khoản</p>
                                    </NavLink>

                                </li>
                                <li>
                                    <NavLink to="/dashboard/change-Movie" className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md">
                                        ♻️👤 Thay đổi người dùng
                                    </NavLink>
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