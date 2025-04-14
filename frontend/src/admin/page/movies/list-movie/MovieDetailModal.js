import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MovieDetailModal = ({ movie, onClose }) => {
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        if (movie?.Slug) {
            axios
                .get(`http://localhost:8080/api/get-list-movies/${movie.Slug}`)
                .then((res) => setEpisodes(res.data))
                .catch((err) => console.error('Lỗi khi lấy tập phim:', err));
        }
    }, [movie]);

    if (!movie) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold">×</button>

                <h2 className="text-2xl font-semibold mb-3">{movie.MovieName}</h2>
                <img src={movie.ImagePath} alt={movie.MovieName} className="w-full h-auto rounded mb-4" />

                <p><strong>Tóm tắt:</strong> {movie.Description}</p>
                <p><strong>Thể loại:</strong> {movie.Category}</p>
                <p><strong>Đạo diễn:</strong> {movie.Director}</p>
                <p><strong>Diễn viên:</strong> {movie.Cast}</p>
                <p><strong>Tuổi giới hạn:</strong> {movie.AgeLimit}</p>

                <div className="mt-5">
                    <h3 className="text-xl font-semibold mb-2">Danh sách tập phim:</h3>
                    <ul className="space-y-2 max-h-60 overflow-y-auto">
                        {episodes.map((ep) => (
                            <li key={ep.MovieEpisodeID} className="border p-2 rounded shadow">
                                <p><strong>{ep.EpisodeNumber}</strong> - {ep.EpisodeDescription || 'Không có mô tả'}</p>
                                <img src={ep.MovieImagePath} alt={ep.EpisodeNumber} className="w-40 mt-1" />
                                <a
                                    href={ep.MovieFilePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline block mt-1"
                                >
                                    Xem tập này
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailModal;
