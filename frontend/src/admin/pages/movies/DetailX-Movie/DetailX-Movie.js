import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { toast } from 'react-toastify';
import { Trash2, Plus } from 'lucide-react';
import API from "../../../../configs/endpoint";

const DetailX_Movie = () => {
    const { slugMovieName, slugEpisode } = useParams(); // Lấy slug từ URL
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [episodes, setEpisodes] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);

    // State modal confirm delete
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [episodeToDelete, setEpisodeToDelete] = useState(null);
    const [episodeNameInput, setEpisodeNameInput] = useState("");

    useEffect(() => {
        fetchMovieDetails();
    }, [slugMovieName]);

    const fetchMovieDetails = async () => {
        try {
            const episode = slugEpisode || "tap-1";
            const res = await axios.get(`${API}/get-by-slugMovieName/${slugMovieName}/${episode}`);
            if (res.data.EC === 0) {
                const data = res.data.Data[0];
                setMovieData(data);
                fetchEpisodesData(data);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchEpisodesData = async (movie) => {
        try {
            const result = await axios.get(`${API}/get-list-movies/${slugMovieName}`);
            if (result.data.EC === 0) {
                const data = result.data.Data;
                setEpisodes(data);

                const index = data.findIndex(
                    (ep) => ep.EpisodeNumber === movie.EpisodeNumber
                );
                setInitialIndex(index >= 0 ? index : 0);
            }
        } catch (error) {
            console.error("Lỗi khi gọi API danh sách tập:", error);
        }
    };

    const handleDeleteEpisode = (episode) => {
        // Mở modal xác nhận và lưu thông tin tập phim cần xóa
        setEpisodeToDelete(episode);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (episodeNameInput !== episodeToDelete.EpisodeName) {
            toast.error("Tên tập phim không khớp! Hãy thử lại.");
            return;
        }

        try {
            const res = await axios.delete(`${API}/delete-episode/${episodeToDelete.id}`);
            if (res.data.EC === 0) {
                toast.success("Xoá tập phim thành công!");
                fetchMovieDetails();
            } else {
                toast.error(res.data.EM || "Lỗi khi xoá tập phim");
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi khi gọi API xoá tập phim");
        }

        // Đóng modal sau khi xác nhận xóa
        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    const Info = ({ label, value }) => (
        <div>
            <p className="text-gray-500">{label}:</p>
            <p className="text-lg font-medium">{value || "Đang cập nhật..."}</p>
        </div>
    );

    if (loading) return <div className="text-center text-gray-600 py-20">Đang tải dữ liệu phim...</div>;
    if (!movieData) return <div className="text-center text-red-500 py-20">Không tìm thấy dữ liệu phim.</div>;

    return (
        <div className="max-w-7xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-black">Chi Tiết Phim</h1>

            {/* Thông tin và ảnh */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
                    <Info label="Tên phim (VN)" value={movieData.MovieNameVietnamese} />
                    <Info label="Tên phim (EN)" value={movieData.MovieNameEnglish} />
                    <Info label="Trạng thái" value={movieData.MovieStatus} />
                    <Info label="Năm phát hành" value={movieData.ReleaseYear} />
                    <Info label="Giới hạn độ tuổi" value={movieData.AgeRestriction} />
                    <Info label="Số tập" value={movieData.NumberOfEpisodes} />
                    <Info label="Quốc gia" value={movieData.Country} />
                    <Info label="Thể loại" value={movieData.MovieGenre} />
                    <Info label="Đạo diễn" value={movieData.Director} />
                    <Info label="Diễn viên" value={movieData.Actor} />
                    <Info label="Danh mục" value={movieData.CategoryName} />
                    <div className="md:col-span-2">
                        <p className="text-gray-500">Tóm tắt: {movieData.SummaryTitle}</p>
                        <p className="text-base mt-1">{movieData.SummaryContent}</p>
                    </div>
                </div>

                <div className="w-full h-auto flex justify-center items-center">
                    <div className="w-full max-w-[450px] aspect-[2/3]">
                        <img
                            src={movieData.MovieImagePath}
                            alt="Poster phim"
                            className="rounded-2xl shadow-xl object-contain w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Danh sách tập phim */}
            <div className="bg-white bg-opacity-90 text-black py-4 w-full rounded-xl px-4 md:px-8 lg:px-12 shadow-lg">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-xl font-bold">Danh sách tập phim</h2>
                    <Link
                        to={`/dashboard/add-episode-movie/${movieData.MovieID}`}
                        className="flex items-center gap-1 text-blue-600 font-semibold hover:underline"
                    >
                        <Plus size={20} /> Thêm tập phim
                    </Link>
                </div>
                <div className="pt-3 relative">
                    {episodes.length > 0 && (
                        <Swiper
                            spaceBetween={12}
                            grabCursor={true}
                            initialSlide={initialIndex}
                            className="mySwiper"
                            breakpoints={{
                                1050: { slidesPerView: 5.2 },
                                850: { slidesPerView: 4.2 },
                                740: { slidesPerView: 3.5 },
                                540: { slidesPerView: 2.5 },
                                320: { slidesPerView: 1.8 },
                                200: { slidesPerView: 1 },
                            }}
                        >
                            {episodes.map((episode) => (
                                <SwiperSlide key={episode.SlugEpisode}>
                                    <div className="relative">
                                        <img
                                            className="w-[207px] h-[116px] rounded-lg object-cover"
                                            src={episode.MovieImagePath}
                                            alt={episode.EpisodeNumber}
                                        />

                                        {/* Nút xoá ở góc phải trên */}
                                        <button
                                            onClick={() => handleDeleteEpisode(episode)}
                                            className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 text-red-600 hover:text-red-800 hover:bg-opacity-100 transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        {/* Tên tập + thời lượng nằm kế nhau bên dưới */}
                                        <div className="flex justify-between items-center pt-3">
                                            <p className={`text-base font-bold ${episode.EpisodeNumber === movieData.EpisodeNumber}`}>
                                                {episode.EpisodeNumber}
                                            </p>
                                            <span className="text-sm text-gray-600">{episode.duration}</span>
                                        </div>

                                    </div>
                                </SwiperSlide>

                            ))}
                        </Swiper>
                    )}
                </div>
            </div>

            {/* Modal xác nhận xóa */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-xl w-[400px]">
                        <h3 className="text-xl font-bold text-center mb-4">Xác nhận xóa tập phim</h3>
                        <p className="text-center mb-4">Nhập tên tập phim để xác nhận xóa:</p>
                        <input
                            type="text"
                            value={episodeNameInput}
                            onChange={(e) => setEpisodeNameInput(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex justify-between">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}

export default DetailX_Movie;