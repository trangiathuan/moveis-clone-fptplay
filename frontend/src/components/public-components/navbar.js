import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../../configs/endpoint";
import axios from "axios";
const Navbar = () => {
    const [isOpenXT, setIsOpenXemThem] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLogin = !!localStorage.getItem('token');
    const [open, setOpen] = useState(false);
    const [movies, setMovies] = useState([]); // danh sach phim
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
            console.log("🔍 decoded token:", decoded);
            setUserAvatar(decoded.avatarUrl); // 👈 chính xác
        }
    }, []);

    const toggleMenuXemThem = () => {
        setIsOpenXemThem(!isOpenXT);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };





    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get(`${API}/get-all-movies-new`);
                if (res.data.EC === 0) {
                    // Lấy 5 phim mới nhất
                    const latestMovies = res.data.Data.slice(0, 5);
                    setMovies(latestMovies);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API phim mới:", error);
            }
        };

        fetchMovies();
    }, []);


    return (
        <div>
            <nav className="flex bg-black w-full sm:w-full fixed z-30 items-center">
                <div className="flex mx-auto ">
                    <div className="flex sm:flex lg:hidden pt-5 pb-4 ps-0 pe-5 ">
                        <button onClick={toggleMobileMenu}>
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
                            onClick={toggleMenuXemThem}
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
                        <a href="/search" className="group relative inline-block w-5 h-5 xl:flex hidden pt-8 me-5 mt-8">

                            <img
                                src={require('../../asset/image-logo/search-hover.png')}
                                className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                alt="Search"
                            />

                            <img
                                src={require('../../asset/image-logo/search-hover (1).png')}
                                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                alt="Search Hover"
                            />
                        </a>

                        <button
                            onClick={() => setOpen(!open)}
                            className="group relative inline-block w-5 h-5 xl:flex hidden pt-8 me-5 mt-8"
                        >

                            <img
                                src={require('../../asset/image-logo/icon-alarm-active-fill.png')}
                                className="absolute inset-0 transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                                alt="Search"
                            />

                            <img
                                src={require('../../asset/image-logo/icon-alarm-active-hover.png')}
                                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                                alt="Search Hover"
                            />
                            {open && (
                                <div className="absolute max-w-6xl right-0 top-12 w-[600px] bg-[#181818] rounded-lg shadow-lg z-50">
                                    <div className="py-3 text-2xl font-bold text-white border-b border-gray-700">
                                        Thông báo
                                    </div>
                                    <div>
                                        <p className="text-sm text-left ml-5" >Hôm nay</p>
                                    </div>
                                    <div className="max-h-[500px] overflow-hidden rounded-lg bg-zinc-800 m-4  divide-y divide-gray-700">
                                        <div className="max-h-[500px] overflow-y-auto rounded-lg bg-zinc-800 m-4 divide-y divide-gray-700">
                                            {movies.length > 0 ? (
                                                movies.map((movie) => (
                                                    <a
                                                        key={movie.MovieID}
                                                        href={`/detail/${movie.SlugMovieName}`}
                                                        className="flex items-start px-6 py-4 gap-5 hover:bg-gray-800 transition"
                                                    >
                                                        <img
                                                            src={movie.MovieImagePath}
                                                            alt={movie.MovieNameVietnamese}
                                                            className="w-28 h-16 object-cover rounded"
                                                        />
                                                        <div className="text-sm text-white text-left">
                                                            <p className="text-base font-semibold truncate max-w-[350px]">
                                                                🎬 {movie.MovieNameVietnamese}
                                                            </p>
                                                            <p className="text-gray-400 text-xs mt-1 truncate max-w-[400px]">
                                                                {movie.ReleaseYear} · {movie.NumberOfEpisodes} tập · {movie.Country}
                                                            </p>
                                                        </div>
                                                    </a>
                                                ))
                                            ) : (
                                                <div className="text-white text-sm p-4">Không có phim mới.</div>
                                            )}
                                        </div>



                                    </div>
                                </div>




                            )}

                        </button>

                        <div className="pt-5 hidden sm:block">
                            <button className="flex me-5 bg-orange-600 rounded-lg h-10 w-28 justify-between hover:bg-orange-500">
                                <img className="w-9 h-8 ps-3 pt-2" src={require('../../asset/image-logo/wallet.png')} />
                                <a href="/buypackage" className="pt-2 pe-3">Mua gói</a>
                            </button>
                        </div>

                        <div className="pt-5">
                            <div className="flex relative inline-block text-left">
                                {isLogin ? (
                                    <div>
                                        <button className="flex me-5 bg-gray-700 rounded-lg h-10 w-10" onClick={toggleMenu}>
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
                                                    <li><a href="/edituser" className="block px-4 py-2 text-white">Thay đổi thông tin cá nhân</a></li>
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
