import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../../../configs/endpoint';
const ListMovie = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetchMoviesData();
    }, []);

    const fetchMoviesData = async () => {
        try {
            const res = await axios.get(`${API}/get-all-movies-new`);
            if (res.data.EC === 0) {
                setMovies(res.data.Data);
            }
        } catch (err) {
            console.error("Lỗi khi gọi API danh sách phim:", err);
        }
    };

    const filteredMovies = movies.filter((movie) => {
        const lowerSearch = searchTerm.toLowerCase();
        return (
            movie.MovieNameVietnamese.toLowerCase().includes(lowerSearch) ||
            movie.MovieNameEnglish.toLowerCase().includes(lowerSearch) ||
            movie.MovieGenre.toLowerCase().includes(lowerSearch) ||
            movie.Country.toLowerCase().includes(lowerSearch) ||
            movie.ReleaseYear.toString().includes(lowerSearch) ||
            movie.NumberOfEpisodes.toString().includes(lowerSearch)
        );
    });
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
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
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Tên phim</th>
                            <th className="border px-4 py-2">Tên tiếng Anh</th>
                            <th className="border px-4 py-2">Thể loại</th>
                            <th className="border px-4 py-2">Quốc gia</th>
                            <th className="border px-4 py-2">Số tập</th>
                            <th className="border px-4 py-2">Năm</th>
                            <th className="border px-4 py-2">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map((movie) => (
                            <tr key={movie.MovieID} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{movie.MovieNameVietnamese}</td>
                                <td className="border px-4 py-2">{movie.MovieNameEnglish}</td>
                                <td className="border px-4 py-2">{movie.MovieGenre}</td>
                                <td className="border px-4 py-2">{movie.Country}</td>
                                <td className="border px-4 py-2">{movie.NumberOfEpisodes}</td>
                                <td className="border px-4 py-2">{movie.ReleaseYear}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-500 underline"
                                        onClick={() => setSelectedMovie(movie)}
                                    >
                                        Xem
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
        </div>
    );
}
export default ListMovie;