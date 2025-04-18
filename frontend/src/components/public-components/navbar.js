import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const [isOpenXT, setIsOpenXemThem] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLogin = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const [userAvatar, setUserAvatar] = useState(null);//test dùng avatar người dùng

    const handleLogout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setUserAvatar(decoded.avatarUrl); // 👈 chính xác
        }
    }, []);

    return (
        <div>
            <nav className="flex bg-black w-full sm:w-full fixed z-30 items-center">
                <div className="flex mx-auto ">
                    <div className="flex sm:flex lg:hidden pt-5 pb-4 ps-0 pe-5 ">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <img className="w-7" src={require('../../asset/image-logo/menu.png')} />
                        </button>
                    </div>

                    <div className="flex pt-3 pb-4 sm:pb-4 xl:pe-36 sm:ps-4 sm:pe-72 lg:pe-56 ps-7 pe-10">
                        <a href="/">
                            <img className="w-32 max-w-full" src={require('../../asset/image-logo/logoFPT.png')} />
                        </a>
                    </div>

                    <div className="hidden lg:flex pt-7 pb-5 space-x-5">
                        <a href="/" className="text-stone-400 text-base font-sans font-semibold focus:text-white hover:text-orange-600">Trang chủ</a>
                        <a href="#" className="text-stone-400 text-base font-sans font-semibold focus:text-white hover:text-orange-600">Phim lẻ</a>
                        <a href="#" className="text-stone-400 text-base font-sans font-semibold focus:text-white hover:text-orange-600">Phim bộ</a>
                        <a href="#" className="text-stone-400 text-base font-sans font-semibold focus:text-white hover:text-orange-600">Anime</a>

                        <a
                            href="#"
                            onClick={() => setIsOpenXemThem(!isOpenXT)}
                            className="flex text-stone-400 text-base font-sans font-semibold focus:text-white hover:text-orange-600"
                        >
                            Xem thêm
                            <img className="ms-2 mt-2 w-3 h-3" src={require('../../asset/image-logo/down.png')} />
                        </a>
                        <div className="relative inline-block mt-7">

                            {isOpenXT && (
                                <div className="absolute bg-neutral-800 shadow-md rounded-md -ms-16 w-32">
                                    <ul className="py-2">
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 1</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 2</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 3</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex text-white xl:ps-36 sm:ps-0 sm:pe-0">
                        <a href="/search">
                            <img className="hidden xl:flex w-5 pt-8 me-5" src={require('../../asset/image-logo/search.png')} />
                        </a>
                        <a>
                            <img className="hidden xl:flex w-5 pt-8 me-5" src={require('../../asset/image-logo/bell.png')} />
                        </a>
                        <div className="pt-5 hidden sm:block">
                            <button className="flex me-5 bg-orange-600 rounded-lg h-10 w-28 justify-between">
                                <img className="w-9 h-8 ps-3 pt-2" src={require('../../asset/image-logo/wallet.png')} />
                                <a href="/buypackage" className="pt-2 pe-3">Mua gói</a>
                            </button>
                        </div>

                        <div className="pt-5">
                            <div className="flex relative inline-block text-left">
                                {isLogin ? (
                                    <div>
                                        <button className="flex me-5 bg-gray-700 rounded-lg h-10 w-10" onClick={() => setIsOpen(!isOpen)}>
                                            <img
                                                className="w-full h-full object-cover border border-white rounded-md"
                                                src={userAvatar || require('../../asset/image-logo/emoji.png')}
                                                alt="User Avatar"
                                            />
                                            <img className="ms-2 mt-3 w-4 h-4" src={require('../../asset/image-logo/down.png')} />
                                        </button>
                                        {isOpen && (
                                            <div className="absolute bg-neutral-800 shadow-md rounded-md mt-2 w-48 -ms-32">
                                                <ul className="py-2">
                                                    <li><a href="/following-movies-list" className="block px-4 py-2 text-white hover:text-orange-600">Phim đang theo dõi</a></li>
                                                    <li><a href="/joim-room" className="block px-4 py-2 text-white hover:text-orange-600">Phòng xem phim</a></li>
                                                    <li><a onClick={handleLogout} className="block px-4 py-2 text-white hover:text-orange-600">
                                                        <button>Đăng xuất</button>
                                                    </a></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-2 hover:text-orange-600 font-bold">
                                        <a href="/login">Đăng nhập</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {isMenuOpen && (
                <div className="lg:hidden bg-black text-white p-5 mt-16 fixed w-full top-0 left-0 z-30">
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
