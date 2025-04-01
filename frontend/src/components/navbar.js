import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpenXT, setIsOpenXemThem] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Đảm bảo rằng trạng thái này được sử dụng đúng
    const isLogin = !!localStorage.getItem('token');
    const navigate = useNavigate();
    useEffect(() => {

    }, [])

    const handleLogout = async () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    const toggleMenuXemThem = () => {
        setIsOpenXemThem(!isOpenXT);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen); // Đảm bảo rằng trạng thái được thay đổi khi nhấn vào hamburger
    };

    return (
        <div>
            <nav className="flex bg-black w-full fixed justify-between z-30">
                <div className="flex lg:hidden ps-5 pt-5">
                    <button onClick={toggleMobileMenu}>
                        <img className="w-5" src={require('../asset/image-logo/menu.png')} />
                    </button>
                </div>

                <div className="ps-5 xl:ps-44 xl:-me-40 lg:-me-20 lg:ps-24 sm:ps-28 pt-3 pb-0">
                    <img className="flex w-32" src={require('../asset/image-logo/logoFPT.png')} />
                </div>

                <div className={`hidden lg:flex pt-7 pb-5`}>
                    <a href="/" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Trang chủ</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Phim lẻ</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Phim bộ</a>
                    <a href="#" className="text-stone-400 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600">Anime</a>

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

                <div className="flex text-white pe-5 sm:pe-14  lg:pe-24 xl:pe-44">
                    <a>
                        <img className="hidden xl:flex w-5 pt-8 me-5" src={require('../asset/image-logo/search.png')} />
                    </a>
                    <a>
                        <img className=" hidden xl:flex w-5 pt-8 me-5" src={require('../asset/image-logo/bell.png')} />
                    </a>
                    <div className="pt-5 hidden sm:block ">
                        <button className="flex me-5 bg-orange-600 rounded-lg h-10 w-28 justify-between">
                            <img className="w-9 h-8 ps-3 pt-2" src={require('../asset/image-logo/wallet.png')} />
                            <a href="/buypackage" className="pt-2 pe-3">Mua gói</a>
                        </button>
                    </div>

                    <div className="pt-5">
                        <div className="flex relative inline-block text-left">
                            {isLogin ? (
                                <div>
                                    <button className="flex me-5 bg-gray-700 rounded-lg h-10 w-10" onClick={toggleMenu}>
                                        <img className="w-7 m-2" src={require('../asset/image-logo/emoji.png')} />
                                        <img className="ms-2 mt-3 w-4 h-4" src={require('../asset/image-logo/down.png')} />
                                    </button>
                                    {isOpen && (
                                        <div className="absolute bg-neutral-800 shadow-md rounded-md mt-2 w-48 -ms-32">
                                            <ul className="py-2">
                                                <li><a href="/following-movies-list" className="block px-4 py-2 text-white">Phim đang theo dõi</a></li>
                                                <li><a href="#" className="block px-4 py-2 text-white">Option 2</a></li>
                                                <li><a onClick={handleLogout} className="block px-4 py-2 text-white">
                                                    <button>Đăng xuất</button>
                                                </a></li>
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
                <div className="sm:hidden bg-black text-white p-5 pt-10 fixed">
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
