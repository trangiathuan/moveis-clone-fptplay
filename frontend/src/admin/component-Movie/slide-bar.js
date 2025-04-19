import {
    LayoutDashboard,
    Film,
    PlusSquare,
    Wrench,
    Trash2,
    RefreshCcw,
    Menu,
    ChevronRight,
    Globe,
    User,
    ClipboardList,
    ClipboardMinus,
    Users,
    UserCog,
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${isActive
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "hover:bg-gray-100"
    }`;
const Slidebar = ({ isOpen }) => {

    return (
        <aside
            className={`absolute top-0 left-0 h-full w-64 bg-white text-black border-r shadow-md z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="px-4 py-6 flex flex-col justify-between h-full">
                <div>
                    <div className="flex items-center gap-2 px-2 mb-8">
                        <div className="text-orange-600 text-2xl">
                            <FontAwesomeIcon icon={faDiamond} />
                        </div>
                        <h1 className="text-lg font-bold">FPT Play Admin</h1>
                    </div>

                    <nav className="space-y-6">
                        <NavLink to="/dashboard" className={navLinkStyle}>
                            <LayoutDashboard className="w-5 h-5 text-blue-500" />
                            Dashboard
                        </NavLink>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">
                                Quản lý phim
                            </h2>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink to="/dashboard/list-Movie" className={navLinkStyle}>
                                        <Film className="w-5 h-5 text-purple-500" />
                                        Danh sách phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-Movie" className={navLinkStyle}>
                                        <PlusSquare className="w-5 h-5 text-green-500" />
                                        Thêm phim mới
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/change-Movie" className={navLinkStyle}>
                                        <Wrench className="w-5 h-5 text-yellow-500" />
                                        Sửa phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/delete-Movie" className={navLinkStyle}>
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                        Xoá phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/repair-Movie" className={navLinkStyle}>
                                        <RefreshCcw className="w-5 h-5 text-indigo-500" />
                                        Thay đổi phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/add-episode-movie"
                                        className={navLinkStyle}
                                    >
                                        <Menu className="w-5 h-5 text-pink-500" />
                                        Menu tạm
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">
                                Danh mục & Thể loại
                            </h2>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink to="/dashboard/category" className={navLinkStyle}>
                                        <ClipboardList className="w-5 h-5 text-teal-500" />
                                        Danh mục
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/movie-genre" className={navLinkStyle}>
                                        <ClipboardMinus className="w-5 h-5 text-rose-500" />
                                        Thể loại
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">
                                Người dùng
                            </h2>
                            <ul className="space-y-2">
                                <li>
                                    <NavLink to="/dashboard/list-users" className={navLinkStyle}>
                                        <Users className="w-5 h-5 text-sky-500" />
                                        Tài khoản
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/user-change" className={navLinkStyle}>
                                        <UserCog className="w-5 h-5 text-amber-500" />
                                        Thay đổi người dùng
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xs text-gray-400 uppercase px-1 mb-2">Khác</h2>
                            <ul className="space-y-2">
                                <li className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-sm">
                                    <span className="flex items-center gap-2">
                                        <Menu className="w-5 h-5 text-fuchsia-500" />
                                        Menu levels
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </li>
                                <li className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md text-sm cursor-pointer">
                                    <Globe className="w-5 h-5 text-cyan-500" />
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