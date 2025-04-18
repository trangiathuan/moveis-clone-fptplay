import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios';
import 'swiper/css/pagination';
import API from '../../configs/endpoint';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        fetchSearchData();
    }, []);

    const fetchSearchData = async () => {
        try {
            const result = await axios.get(`${API}/get-all-movies-new`);
            if (result.data.EC === 0) {
                setEpisodes(result.data.Data);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setSearchResults([]);
        } else {
            const filtered = episodes.filter((item) =>
                item.MovieNameVietnamese.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filtered);
        }
    };

    return (
        <div className="p-5 text-white">
            {/* Thanh tìm kiếm */}
            <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
                <div className="relative w-full max-w-6xl bg-stone-800 p-4 rounded-lg flex items-center h-13">
                    <img className="w-5 h-5 ml-3" src={require("../../asset/image-logo/search.png")} alt="Tìm kiếm" />
                    <input
                        type="text"
                        className="flex-grow px-3 bg-stone-800 text-white border-none outline-none"
                        placeholder="Nhập tên phim, kênh, sự kiện..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {searchTerm && (
                        <div className="absolute top-full left-0 w-full bg-stone-800 mt-2 rounded-lg z-50 max-h-80 overflow-y-auto">
                            {searchResults.length > 0 ? (
                                searchResults.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-2 hover:bg-stone-700 cursor-pointer">
                                        <a
                                            key={index}
                                            href={`/detail/${item.SlugMovieName}`}
                                            className="flex items-center gap-4 p-2 hover:bg-stone-700 cursor-pointer"
                                        >
                                            <img src={item.MovieImagePath} alt={item.MovieNameVietnamese} className="w-16 h-10 object-cover rounded" />
                                            <div>
                                                <p className="text-white font-semibold text-sm">{item.MovieNameVietnamese}</p>
                                                <p className="text-gray-400 text-xs">
                                                    {item.ReleaseYear} · {item.NumberOfEpisodes} tập · {item.Country}
                                                </p>
                                            </div>
                                        </a>

                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 p-4 text-sm">Không tìm thấy kết quả.</div>
                            )}
                        </div>
                    )}
                    <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">
                        Tìm kiếm
                    </button>
                </div>
            </div>

            {/* Xu hướng gần đây & Tìm kiếm hàng đầu */}
            <div className="flex flex-wrap justify-between mt-10 max-w-6xl w-full mx-auto">
                {/* Tìm kiếm hàng đầu */}
                <div className="w-full sm:w-1/2 p-2">
                    <h2 className="text-xl font-bold mb-4">Tìm kiếm hàng đầu</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "dưa hấu lấp lánh", "đại chiến titan phần 1", "thanh",
                            "soi sáng cho em", "one punch man nhất quyền nhân phần 2",
                            "nhà gia tiên", "hoa nhung", "hồ sơ trinh sát iii", "one",
                            "frieren pháp sư tiễn táng"
                        ].map((tag, idx) => (
                            <span key={idx} className="bg-gray-700 px-3 py-2 rounded-full text-sm cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Xu hướng gần đây */}
                <div className="w-full sm:w-1/2 p-2">
                    <h2 className="text-xl font-bold mb-4">Xu hướng gần đây</h2>
                    <div className="flex flex-col gap-4">
                        {episodes.map((episode) => (
                            <div key={episode.MovieID} className="flex items-center gap-4">
                                <a href={`/detail/${episode.SlugMovieName}`}>
                                    <img
                                        className="w-[170px] h-[100px] rounded-lg object-cover"
                                        src={episode.MovieImagePath}
                                        alt={episode.MovieNameVietnamese}
                                    />
                                </a>
                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">{episode.MovieNameVietnamese}</p>
                                    <p className="text-gray-400 text-sm">
                                        {episode.ReleaseYear} · {episode.AgeRestriction} · {episode.NumberOfEpisodes} tập · {episode.Country}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Search;
