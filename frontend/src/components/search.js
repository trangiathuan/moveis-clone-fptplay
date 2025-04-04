import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        alert(`Tìm kiếm: ${searchTerm}`);
    };

    return (
        <div className="p-5 text-white">
            {/* Thanh tìm kiếm */}
            <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
                <div className="relative w-full max-w-6xl bg-stone-800 p-4 rounded-lg flex items-center h-13">
                    <img className="w-5 h-5 ml-3" src={require("../asset/image-logo/search.png")} alt="Tìm kiếm" />
                    <input
                        type="text"
                        className="flex-grow px-3  bg-stone-800 text-white border-none outline-none"
                        placeholder="Nhập tên phim, kênh, sự kiện..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {/* Xu hướng gần đây & Tìm kiếm hàng đầu */}
            <div className="flex flex-wrap justify-between mt-10 max-w-6xl w-full mx-auto">
                {/* Xu hướng gần đây */}
                <div className="w-full sm:w-1/2 p-2 ">
                    <h2 className="text-xl font-bold mb-4">Xu hướng gần đây</h2>
                    <Swiper spaceBetween={10} slidesPerView={1} className="w-full">
                        <SwiperSlide>
                            <div className="flex items-center gap-y-4 gap-x-4 mt-4">
                                <img className="w-[170px] h-[100px] rounded-lg object-cover"
                                    src={require('../asset/images-banner/narutoBanner.webp')}
                                    alt="Naruto Shippuden" />
                                <div className="flex-1 w-full">
                                    <a className="text-white text-lg font-bold">Naruto Shippuden</a>
                                    <p className="text-gray-400 text-sm">2023 · T13 · 36/36 tập · Trung Quốc</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <Swiper spaceBetween={10} slidesPerView={1} className="w-full">
                        <SwiperSlide>
                            <div className="flex items-center gap-y-4 gap-x-4 mt-4">
                                <img className="w-[170px] h-[100px] rounded-lg object-cover"
                                    src={require('../asset/images-banner/narutoBanner.webp')}
                                    alt="Naruto Shippuden" />
                                <div className="flex-1 w-full">
                                    <a className="text-white text-lg font-bold">Naruto Shippuden</a>
                                    <p className="text-gray-400 text-sm">2023 · T13 · 36/36 tập · Trung Quốc</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <Swiper spaceBetween={10} slidesPerView={1} className="w-full">
                        <SwiperSlide>
                            <div className="flex items-center gap-y-4 gap-x-4 mt-4">
                                <img className="w-[170px] h-[100px] rounded-lg object-cover"
                                    src={require('../asset/images-banner/narutoBanner.webp')}
                                    alt="Naruto Shippuden" />
                                <div className="flex-1 w-full">
                                    <a className="text-white text-lg font-bold">Naruto Shippuden</a>
                                    <p className="text-gray-400 text-sm">2023 · T13 · 36/36 tập · Trung Quốc</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <Swiper spaceBetween={10} slidesPerView={1} className="w-full">
                        <SwiperSlide>
                            <div className="flex items-center gap-y-4 gap-x-4 mt-4">
                                <img className="w-[170px] h-[100px] rounded-lg object-cover"
                                    src={require('../asset/images-banner/narutoBanner.webp')}
                                    alt="Naruto Shippuden" />
                                <div className="flex-1 w-full">
                                    <a className="text-white text-lg font-bold">Naruto Shippuden</a>
                                    <p className="text-gray-400 text-sm">2023 · T13 · 36/36 tập · Trung Quốc</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Tìm kiếm hàng đầu */}
                <div className="w-full sm:w-1/2 p-2">
                    <h2 className="text-xl font-bold mb-4">Tìm kiếm hàng đầu</h2>
                    <div className="flex flex-wrap gap-2">
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">dưa hấu lấp lánh</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">đại chiến titan phần 1</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">thanh</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">soi sáng cho em</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">one punch man nhất quyền nhân phần 2</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">nhà gia tiên</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">hoa nhung</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">hồ sơ trinh sát iii</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">one</span>
                        <span className="bg-gray-700 px-3 py-2 rounded-full text-sm">frieren pháp sư tiễn táng</span>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Search;
