import { useEffect, useState } from "react";

const Navbar = () => {
    const [isOpenXT, setIsOpenXemThem] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Đảm bảo rằng trạng thái này được sử dụng đúng
    const isLogin = !!localStorage.getItem('token');

    useEffect(() => {
        // localStorage.removeItem('token')
    }, [])
    const toggleMenuXemThem = () => {
        setIsOpenXemThem(!isOpenXT);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Đảm bảo rằng trạng thái được thay đổi khi nhấn vào hamburger
    };

    const handleSubmitLogOut = async (e) => {
        e.preventDefault();
        localStorage.removeItem('token'); // Sửa remove thành removeItem
        window.location.reload(); // Tùy chọn: reload lại trang để cập nhật trạng thái đăng nhập
    };

    return (
        <div>
            <nav className="flex bg-black w-full fixed justify-between z-30">
                {/* Hamburger Menu Icon for small screens */}
                <div className="flex xl:hidden ps-5">
                    <button onClick={toggleMobileMenu}>
                        <img className="w-5" src={require('../asset/image-logo/menu.png')} />
                    </button>
                </div>

                {/* Logo */}
                <div className="ps-44 -me-40 pt-3 pb-0">
                    <img className="flex w-32" src={require('../asset/image-logo/logoFPT.png')} />
                </div>

                {/* Main Menu - Only visible on larger screens (xl and above) */}
                <div className={`hidden xl:flex pt-7 pb-5`}>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Trang chủ</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Truyền hình</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Phim bộ</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">V.League</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Anime</a>

                    {/* Dropdown menu "Xem thêm" */}
                    <div className="relative inline-block text-left -mt-2">
                        <a
                            href="#"
                            onClick={toggleMenuXemThem}
                            className="flex text-stone-400 px-4 py-2 text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600"
                        >
                            Xem thêm
                            <img className="ms-2 mt-2 w-3 h-3" src={require('../asset/image-logo/down.png')} />
                        </a>

                        {isOpenXT && (
                            <div className="absolute bg-neutral-800 shadow-md rounded-md mt-2 w-48">
                                <ul className="py-2">
                                    <li><a href="#" className="block px-4 py-2 text-white">Option 1</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-white">Option 2</a></li>
                                    <li><a href="#" className="block px-4 py-2 text-white">Option 3</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section (Icons and Buttons) */}
                <div className="flex text-white pe-44 -ms-10">
                    <a>
                        <img className="w-5 pt-8 me-5" src={require('../asset/image-logo/search.png')} />
                    </a>
                    <a>
                        <img className="w-5 pt-8 me-5" src={require('../asset/image-logo/bell.png')} />
                    </a>
                    <div className="pt-5">
                        <button className="flex me-5 bg-orange-600 rounded-lg h-10 w-28 justify-between">
                            <img className="w-9 h-8 ps-3 pt-2" src={require('../asset/image-logo/wallet.png')} />
                            <a href="/buypackage" className="pt-2 pe-3">Mua gói</a>
                        </button>
                    </div>

                    <div className="pt-5">
                        <div className="flex relative inline-block text-left">
                            {isLogin ? (
                                <div>
                                    <button className="flex me-5 bg-black" onClick={toggleMenu}>
                                        <img className="w-7 m-1" src={require('../asset/image-logo/default-1.png')} />
                                        <img className="ms-2 mt-3 w-4 h-4" src={require('../asset/image-logo/down.png')} />
                                    </button>

                                    {isOpen && (
                                        <div className="absolute bg-neutral-800 shadow-md rounded-md mt-2 w-53 -ms-32">
                                            <ul className="py-2">
                                                <li><a href="#" className="block px-4 py-2 text-white flex flex-grow w-full "><img className="w-7 m-1" src={require('../asset/image-logo/default-2.png')} />Người dùng</a></li>
                                                <li><a href="#" className="block px-4 py-2 text-white flex flex-grow"><img className="w-7 m-1" src={require('../asset/image-logo/default-3.png')} />Trẻ em</a></li>
                                                <li><a href="#" className="block px-4 py-2 text-white flex flex-grow"><img className="w-7 m-1" src={require('../asset/image-logo/default-4.png')} />Quản lý hồ sơ</a></li>
                                                <li><a href="#" className="block px-4 py-2 text-white flex flex-grow"><img className="w-7 m-1" src={require('../asset/image-logo/default-5.png')} />Tài khoản và cài đặt</a></li>
                                                <li><a href="#" className="block px-4 py-2 text-white" onClick={handleSubmitLogOut}>Đăng xuất</a></li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <a href="/login">Đăng nhập</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="xl:hidden bg-black text-white p-5">
                    <a href="#" className="block py-2">Trang chủ</a>
                    <a href="#" className="block py-2">Truyền hình</a>
                    <a href="#" className="block py-2">Phim bộ</a>
                    <a href="#" className="block py-2">V.League</a>
                    <a href="#" className="block py-2">Anime</a>
                </div>
            )}
        </div>
    );
};

export default Navbar;
