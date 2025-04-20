import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../../configs/endpoint';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ListMovie = () => {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [modalDelete, setModalDelete] = useState(null);
    const [verifyMovieName, setVerifyMovieName] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    useEffect(() => {
        fetchMoviesData();
        fetchCategories();
    }, []);

    const fetchMoviesData = async () => {
        try {
            const res = await axios.get(`${API}/get-all-movies-new/`);
            if (res.data.EC === 0) {
                setMovies(res.data.Data);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API danh sách phim:", err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/get-category');
            if (res.data.EC === 0) {
                setCategories(res.data.Data);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API danh mục:", err);
        }
    };

    const getCategoryName = (categoryID) => {
        const category = categories.find(cat => cat.CategoryID === categoryID);
        return category ? category.CategoryName : 'Không rõ';
    };

    const handleEdit = (movie) => {
        console.log("🔧 ID phim cần sửa:", movie.MovieID);
        navigate(`/dashboard/update-Movie/${movie.MovieID}`, { state: { movie } });
    };

    const deleteMovie = async (movieID) => {
        if (verifyMovieName === modalDelete.MovieNameVietnamese) {
            try {
                const res = await axios.delete(`${API}/delete-Movie/${movieID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data.EC === 0) {
                    toast.success(res.data.Message);
                    await fetchMoviesData();
                    setModalDelete(null);
                    setVerifyMovieName('');
                } else {
                    toast.warn(res.data.Message);
                }
            } catch (err) {
                console.error("Lỗi khi xóa phim:", err);
                toast.error("❌ Có lỗi xảy ra khi xóa phim!");
            }
        } else {
            toast.warning("⚠️ Tên phim không khớp. Vui lòng nhập chính xác.");
        }
    };

    const handleDelete = (movieID) => {
        navigate(`/dashboard/delete-movie/`);
        console.log('Xóa phim với ID:', movieID);
    };

    const filteredMovies = movies.filter((movie) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            movie.MovieNameVietnamese.toLowerCase().includes(lowerSearch) ||
            movie.MovieNameEnglish.toLowerCase().includes(lowerSearch) ||
            getCategoryName(movie.CategoryID).toLowerCase().includes(lowerSearch) ||
            movie.Country.toLowerCase().includes(lowerSearch) ||
            movie.ReleaseYear.toString().includes(lowerSearch) ||
            movie.NumberOfEpisodes.toString().includes(lowerSearch)
        );
    });
    return (
        <div className="p-6 bg-white rounded-lg shadow-md relative">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">📽️ Danh sách phim</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm phim theo mọi thông tin..."
                    className="border p-2 rounded w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-auto">
                <table className="min-w-full bg-white border text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border px-4 py-2">Tên phim</th>
                            <th className="border px-4 py-2">Danh mục</th>
                            <th className="border px-4 py-2">Số tập</th>
                            <th className="border px-4 py-2">Năm</th>
                            <th className="border px-4 py-2 text-center">Chi tiết</th>
                            <th className="border px-4 py-2 w-[240px] text-center">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map((movie) => (
                            <tr key={movie.MovieID} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{movie.MovieNameVietnamese}</td>
                                <td className="border px-4 py-2">{getCategoryName(movie.CategoryID)}</td>
                                <td className="border px-4 py-2">{movie.NumberOfEpisodes}/{movie.NumberOfEpisodes} tập</td>
                                <td className="border px-4 py-2">{movie.ReleaseYear}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 flex items-center gap-1 mx-auto"
                                        onClick={() => setSelectedMovie(movie)}
                                    >
                                        <FaEye /> Xem
                                    </button>
                                </td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-200"
                                            onClick={() => handleEdit(movie)}
                                        >
                                            <FaEdit /> Cập Nhật
                                        </button>
                                        <button
                                            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-200"
                                            onClick={() => setModalDelete(movie)}
                                        >
                                            <FaTrash /> Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal chi tiết phim */}
            {selectedMovie && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-600 text-xl"
                            onClick={() => setSelectedMovie(null)}
                        >
                            ×
                        </button>
                        <h3 className="text-xl font-bold mb-2">{selectedMovie.MovieNameVietnamese}</h3>
                        <img
                            src={selectedMovie.MovieImagePath}
                            alt="Ảnh phim"
                            className="w-full h-60 object-cover rounded mb-4"
                        />
                        <p><strong>Tóm tắt:</strong> {selectedMovie.SummaryContent}</p>
                        <p><strong>Thể loại:</strong> {selectedMovie.MovieGenre}</p>
                        <p><strong>Đạo diễn:</strong> {selectedMovie.Director}</p>
                        <p><strong>Diễn viên:</strong> {selectedMovie.Actor}</p>
                        <p><strong>Tuổi giới hạn:</strong> {selectedMovie.AgeRestriction}</p>
                    </div>
                </div>
            )}

            {/* Modal xác nhận xóa */}
            {modalDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[450px] h-[250px] rounded-lg p-7 mx-auto px-0">
                        <div className="flex justify-center">
                            <button onClick={() => setModalDelete(null)} className="fixed ms-[350px] text-xl">×</button>
                        </div>
                        <div className="flex flex-col pt-10 ps-0">
                            <p className="font-bold ps-10">
                                Xác nhận xóa phim <span className="text-red-600">{modalDelete.MovieNameVietnamese}</span>
                            </p>
                            <input
                                type="text"
                                value={verifyMovieName}
                                onChange={(e) => setVerifyMovieName(e.target.value)}
                                placeholder="Nhập lại tên phim để xác nhận"
                                className="border rounded-lg ps-1 mt-5 ms-10 h-10 w-[370px] outline-none focus:border-orange-400 focus:border-2"
                            />
                        </div>
                        <div className="pt-6 flex mx-[180px] w-full">
                            <button
                                type="submit"
                                onClick={() => {
                                    if (verifyMovieName === modalDelete.MovieNameVietnamese) {
                                        deleteMovie(modalDelete.MovieID);
                                    } else {
                                        toast.warning("⚠️ Tên phim không khớp. Vui lòng nhập chính xác.");
                                    }
                                }}
                                className="bg-red-700 rounded-lg h-9 w-20 text-white hover:bg-red-800"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default ListMovie;