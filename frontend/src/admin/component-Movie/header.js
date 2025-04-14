import { useState, useRef, useEffect } from 'react';
import {
    Menu, Mail, LogOut, Settings, User, CreditCard, Eye, Users, Search,
    HelpCircle, ShieldCheck, MessageSquare, History
} from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Profile');

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
        // Reset tab về Profile khi mở lại dropdown (tùy chọn)
        if (!isDropdownOpen) {
            setActiveTab('Profile');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        console.log("Logging out...");
        setDropdownOpen(false);
        // Thêm logic logout
    };
    return (
        // Header chính: sticky, shadow, background trắng, flex layout
        <header className="flex items-center justify-between px-4 py-3 shadow bg-white sticky top-0 z-30">

            {/* Phần bên trái: Nút Menu và ô Search */}
            <div className="flex items-center gap-3 flex-grow min-w-0 mr-4">
                {/* Nút bấm để toggle Sidebar */}
                <button
                    onClick={onToggleSidebar} // Prop function từ component cha
                    className="text-gray-700 hover:text-black flex-shrink-0 p-1 rounded hover:bg-neutral-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    aria-label="Toggle sidebar" // Thêm aria-label cho accessibility
                >
                    <Menu className="w-6 h-6" />
                </button>
                {/* Ô Search */}
                <div className="relative flex-grow max-w-xs sm:max-w-sm md:max-w-md">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"> {/* pointer-events-none để không chặn click vào input */}
                        <Search className="w-4 h-4" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search here…"
                        className="pl-8 pr-2 py-1 border rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                        aria-label="Search" // Thêm aria-label
                    />
                </div>
            </div>

            {/* Phần bên phải: Dropdown User */}
            <div className="relative flex-shrink-0" ref={dropdownRef}>
                {/* Nút bấm để mở/đóng Dropdown */}
                <button // Thay div bằng button để dễ focus và tốt cho accessibility
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    aria-haspopup="true" // Chỉ ra rằng nút này mở một popup (dropdown)
                    aria-expanded={isDropdownOpen} // Chỉ ra trạng thái mở/đóng của dropdown
                >
                    <Mail className="w-5 h-5 text-gray-700" aria-hidden="true" /> {/* aria-hidden vì icon chỉ mang tính trang trí */}
                    <img
                        src="https://i.pravatar.cc/30?img=1" // Nên thay bằng nguồn ảnh thật
                        alt="User Avatar" // Alt text quan trọng
                        className="w-6 h-6 rounded-full"
                    />
                    {/* Tên user, ẩn trên màn hình siêu nhỏ */}
                    <span className="hidden sm:inline text-sm font-medium text-gray-800">Stebin Ben</span>
                </button>

                {/* Dropdown Menu Content */}
                {isDropdownOpen && (
                    // Container chính của dropdown: vị trí absolute, căn phải, style
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-40 flex flex-col">
                        {/* Phần thông tin user ở đầu dropdown */}
                        <div className="p-4 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/50?img=1" // Ảnh lớn hơn
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full flex-shrink-0"
                                />
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">Stebin Ben</h4>
                                    <p className="text-xs text-gray-500 truncate">UI/UX Designer</p>
                                </div>
                                {/* Nút Logout ở góc trên (giống hình) */}
                                <button
                                    onClick={handleLogout}
                                    className="ml-auto text-gray-400 hover:text-red-600 p-1.5 rounded hover:bg-gray-100 flex-shrink-0 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-300"
                                    aria-label="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Thanh Tabs Profile/Setting */}
                        <div className="flex border-b border-gray-200 text-sm flex-shrink-0">
                            {/* Nút Tab Profile */}
                            <button
                                onClick={() => setActiveTab('Profile')}
                                className={`w-1/2 px-4 py-2 text-center font-medium focus:outline-none focus:bg-gray-50 flex items-center justify-center gap-2 ${activeTab === 'Profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                role="tab" // Thêm role cho accessibility
                                aria-selected={activeTab === 'Profile'} // Chỉ ra tab đang được chọn
                            >
                                <User className={`w-4 h-4 ${activeTab === 'Profile' ? 'text-blue-600' : 'text-gray-400'}`} aria-hidden="true" /> Profile
                            </button>
                            {/* Nút Tab Setting */}
                            <button
                                onClick={() => setActiveTab('Setting')}
                                className={`w-1/2 px-4 py-2 text-center font-medium focus:outline-none focus:bg-gray-50 flex items-center justify-center gap-2 ${activeTab === 'Setting' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
                                role="tab"
                                aria-selected={activeTab === 'Setting'}
                            >
                                <Settings className={`w-4 h-4 ${activeTab === 'Setting' ? 'text-blue-600' : 'text-gray-400'}`} aria-hidden="true" /> Setting
                            </button>
                        </div>

                        {/* Container cho nội dung trượt (Slider) */}
                        {/* overflow-hidden: Che phần nội dung bị trượt ra ngoài */}
                        <div className="overflow-hidden flex-grow" role="tabpanel"> {/* Thêm role tabpanel */}
                            {/* Container chứa các panel, di chuyển bằng transform */}
                            {/* ease-out: Hiệu ứng mượt mà hơn */}
                            {/* will-change-transform: Gợi ý tối ưu hóa cho trình duyệt */}
                            <div
                                className={`flex transition-transform duration-300 ease-out h-full will-change-transform ${activeTab === 'Profile' ? 'translate-x-0' : '-translate-x-full'
                                    }`}
                            >
                                {/* Panel Nội dung Profile */}
                                <div className="w-full flex-shrink-0 overflow-y-auto">
                                    {/* Danh sách các mục Profile */}
                                    <ul className="text-sm text-gray-700 p-1 space-y-0.5"> {/* Thêm space-y */}
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><User className="w-4 h-4 text-gray-500" aria-hidden="true" /> Edit Profile</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><Eye className="w-4 h-4 text-gray-500" aria-hidden="true" /> View Profile</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><Users className="w-4 h-4 text-gray-500" aria-hidden="true" /> Social Profile</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><CreditCard className="w-4 h-4 text-gray-500" aria-hidden="true" /> Billing</a></li>
                                        {/* Đường kẻ ngang phân cách */}
                                        <li className="border-t border-gray-100 my-1 mx-3"></li>
                                        {/* Nút Logout cuối danh sách */}
                                        <li><button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5 text-red-600"><LogOut className="w-4 h-4" aria-hidden="true" /> Logout</button></li>
                                    </ul>
                                </div>

                                {/* Panel Nội dung Setting */}
                                <div className="w-full flex-shrink-0 overflow-y-auto">
                                    {/* Danh sách các mục Setting */}
                                    <ul className="text-sm text-gray-700 p-1 space-y-0.5"> {/* Thêm space-y */}
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><HelpCircle className="w-4 h-4 text-gray-500" aria-hidden="true" /> Support</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><User className="w-4 h-4 text-gray-500" aria-hidden="true" /> Account Settings</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><ShieldCheck className="w-4 h-4 text-gray-500" aria-hidden="true" /> Privacy Center</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><MessageSquare className="w-4 h-4 text-gray-500" aria-hidden="true" /> Feedback</a></li>
                                        <li><a href="#" className="px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none rounded flex items-center gap-2.5"><History className="w-4 h-4 text-gray-500" aria-hidden="true" /> History</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;