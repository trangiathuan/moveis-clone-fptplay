import { useEffect, useRef, useState } from "react";
const Navbar = () => {

    const [isOpenXT, setIsOpenXemThem] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const toggleMenuXemThem = () => {
        setIsOpenXemThem(!isOpenXT);
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {

    }, []);
    return (
        <div>
            <nav className="flex bg-black w-full p-0 fixed justify-between">
                <div className="flex lg:hidden ps-5">
                    <button className="">
                        <img className="w-5 " src={require('../Asset/image-logo/menu.png')} />
                    </button>
                </div>
                <div className="ps-48 -me-40 pt-3 pb-3">
                    <img className=" flex w-32" src={require('../Asset/image-logo/logoFPT.png')} />
                </div>
                <div className="hidden lg:flex pt-7 pb-7">
                    <a href="#" className="text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600" >
                        Trang chủ
                    </a>
                    <a href="#" className="text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600" >
                        Truyền hình
                    </a>
                    <a href="#" className="text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600" >
                        Phim bộ
                    </a>
                    <a href="#" className="text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600" >
                        V.League
                    </a>
                    <a href="#" className="text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600" >
                        Anime
                    </a>
                    <div className=" relative inline-block text-left -mt-2">
                        <a
                            href="#"
                            onClick={toggleMenuXemThem}
                            className="flex text-white px-4 py-2 text-gray-300 text-base font-sans font-semibold ps-7 focus:text-white hover:text-orange-600"
                            type="button"
                        >
                            Xem thêm

                            <img className="ms-2 mt-2 w-3 h-3" src={require('../Asset/image-logo/down.png')} />

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

                <div className="flex text-white pe-48 -ms-10">
                    <a>
                        <img className="w-5 pt-8 me-5 " src={require('../Asset/image-logo/search.png')} />
                    </a>
                    <a>
                        <img className="w-5 pt-8 me-5" src={require('../Asset/image-logo/bell.png')} />
                    </a>
                    <div className="pt-5">
                        <button className="flex me-5 bg-orange-600 rounded-lg h-10 w-28">
                            <img className="ms-3 mt-2 w-5 h-5 me-3" src={require('../Asset/image-logo/wallet.png')} />
                            <span className="mt-2">
                                Mua gói
                            </span>
                        </button>
                    </div>
                    <div className="pt-5">

                        <div className="flex relative inline-block text-left ">
                            <button className="flex me-5 bg-gray-700 rounded-lg h-10 w-9"
                                onClick={toggleMenu}>
                                <img className="w-7 m-1" src={require('../Asset/image-logo/emoji.png')} />
                                <img className="ms-2 mt-3 w-4 h-4" src={require('../Asset/image-logo/down.png')} />
                            </button>

                            {isOpen && (
                                <div className="absolute bg-neutral-800 shadow-md rounded-md mt-11 w-48 -ms-32">
                                    <ul className="py-2">
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 1</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 2</a></li>
                                        <li><a href="#" className="block px-4 py-2 text-white">Option 3</a></li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </nav >
        </div >
    )
}
export default Navbar;