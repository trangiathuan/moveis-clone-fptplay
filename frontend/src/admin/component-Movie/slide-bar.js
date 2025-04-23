import {
    LayoutDashboard,
    Film,
    PlusSquare,
    RefreshCcw,
    Menu,
    ChevronRight,
    Globe,
    User,
    ClipboardList,
    ClipboardMinus,
    Users,
    UserCog,
    Trash,
    Hammer,
    ChevronDown
} from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${isActive
        ? "bg-orange-100 text-orange-600 font-semibold"
        : "hover:bg-gray-100"
    }`;

const Slidebar = ({ isOpen }) => {
    const [selectedMovieAction, setSelectedMovieAction] = useState(null); // "edit" | "delete"
    const [showMovieActions, setShowMovieActions] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Reset movie action buttons when not on list-Movie
        if (!location.pathname.includes("/dashboard/list-Movie")) {
            setSelectedMovieAction(null);
            setShowMovieActions(false);
        }

        // If user tries to go directly to update/delete movie page, redirect to list-Movie
        if ((location.pathname === "/dashboard/update-Movie" || location.pathname === "/dashboard/delete-Movie") && !selectedMovieAction) {
            navigate("/dashboard/list-Movie");
            setShowMovieActions(true);
        }
    }, [location.pathname]);

    const handleMovieAction = (action) => {
        // Kiểm tra nếu người dùng chưa chọn phim và đang cố gắng sửa/xóa
        if ((action === "edit" || action === "delete") && !selectedMovieAction) {

            return;
        }

        // Nếu người dùng đang chuyển sang Thêm phim mà không có lỗi chọn sửa/xóa trước đó
        if (location.pathname.includes("/dashboard/add-Movie")) {
            // Không hiển thị thông báo nếu đã thực hiện thao tác chọn sửa/xóa trước đó
            if (selectedMovieAction) {
                setSelectedMovieAction(null);
            }
        }

        setSelectedMovieAction(action);

        if (action === "edit") {
            navigate("/dashboard/update-Movie");
        } else if (action === "delete") {
            navigate("/dashboard/delete-Movie");
        }
    };


    return (
        <aside
            className={`absolute top-0 left-0 h-full w-64 bg-white text-black border-r shadow-md z-40 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
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
                                    <button
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors duration-200 hover:bg-gray-100 ${location.pathname.includes("/dashboard/list-Movie") ? "bg-orange-100 text-orange-600 font-semibold" : ""}`}
                                        onClick={() => {
                                            setShowMovieActions(!showMovieActions);
                                            navigate("/dashboard/list-Movie");
                                        }}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Film className="w-5 h-5 text-purple-500" />
                                            Danh sách phim
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${showMovieActions ? "rotate-180" : "rotate-0"}`} />
                                    </button>
                                    {showMovieActions && (
                                        <div className="pl-8 mt-2 flex flex-col gap-2">
                                            <button
                                                onClick={() => handleMovieAction("edit")}
                                                className={`text-sm px-3 py-1 rounded-md border flex items-center gap-2 transition-colors duration-200 ${selectedMovieAction === "edit"
                                                    ? "bg-orange-500 text-white border-orange-500"
                                                    : "hover:bg-orange-100 text-orange-600 border-orange-300"
                                                    }`}
                                            >
                                                <Hammer className="w-4 h-4" />
                                                Sửa phim
                                            </button>
                                            <button
                                                onClick={() => handleMovieAction("delete")}
                                                className={`text-sm px-3 py-1 rounded-md border flex items-center gap-2 transition-colors duration-200 ${selectedMovieAction === "delete"
                                                    ? "bg-orange-500 text-white border-orange-500"
                                                    : "hover:bg-orange-100 text-orange-600 border-orange-300"
                                                    }`}
                                            >
                                                <Trash className="w-4 h-4" />
                                                Xoá phim
                                            </button>
                                        </div>
                                    )}
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-Movie" className={navLinkStyle}>
                                        <PlusSquare className="w-5 h-5 text-green-500" />
                                        Thêm phim mới
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/DetailX-Movie" className={navLinkStyle}>
                                        <RefreshCcw className="w-5 h-5 text-indigo-500" />
                                        Thay đổi phim
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/add-episode-movie" className={navLinkStyle}>
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