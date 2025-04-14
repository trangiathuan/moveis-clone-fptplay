import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
import MovieDescription from "./movie_descriptions";
import List_movies from "./list_movies";
import API from "../../configs/endpoint";
import Video from "../public-components/video";
import Comment_movies from "./comment_movies";

const Detail = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchMoviesData();
  }, []);

  const fetchMoviesData = async () => {
    try {
      const result = await axios.get('http://localhost:8080/api/get-all-movies-new');
      if (result.data.EC === 0) {
        setMovies(result.data.Data);
      } else {
        console.warn("Dữ liệu không hợp lệ:", result.data);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API danh sách phim:", error);
    }
  };

  useEffect(() => {
    if (selectedMovie?.MovieSlug) {
      fetchEpisodesData(selectedMovie.MovieSlug);
    } else {
      setEpisodes([]);
    }
  }, [selectedMovie]);

  const fetchEpisodesData = async (slugMovieName) => {
    try {
      const result = await axios.get(`http://localhost:8080/api/get-list-movies/${slugMovieName}`);
      if (result.data.EC === 0) {
        setEpisodes(result.data.Data);
        console.log(episodes);

      } else {
        setEpisodes([]);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API tập phim:", error);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.MovieNameVietnamese.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genreFilter ? movie.MovieGenre.toLowerCase().includes(genreFilter.toLowerCase()) : true)
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📽️ Danh sách phim</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Tìm theo tên phim..."
          className="border p-2 rounded w-1/2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="🎭 Lọc theo thể loại..."
          className="border p-2 rounded w-1/2"
          onChange={(e) => setGenreFilter(e.target.value)}
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
            {filteredMovies.map(movie => (
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

      {/* Modal Chi tiết */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-600 text-xl"
              onClick={() => setSelectedMovie(null)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedMovie.MovieNameVietnamese}</h3>
            <img src={selectedMovie.MovieImagePath} alt="Ảnh phim" className="w-full h-60 object-cover rounded mb-4" />
            <p><strong>Tóm tắt:</strong> {selectedMovie.SummaryContent}</p>
            <p><strong>Thể loại:</strong> {selectedMovie.MovieGenre}</p>
            <p><strong>Đạo diễn:</strong> {selectedMovie.Director}</p>
            <p><strong>Diễn viên:</strong> {selectedMovie.Actor}</p>
            <p><strong>Tuổi giới hạn:</strong> {selectedMovie.AgeRestriction}</p>

            {/* Danh sách tập phim */}
            {episodes.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">📺 Danh sách tập phim:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto">
                  {episodes.map((ep) => (
                    <div key={ep.MovieEpisodeID} className="border rounded-lg p-3 shadow hover:shadow-md transition">
                      <div className="font-medium text-sm mb-1">🎞 Tập {ep.EpisodeNumber}</div>
                      <img src={ep.MovieImagePath} alt={`Tập ${ep.EpisodeNumber}`} className="w-full h-36 object-cover rounded mb-2" />
                      <p className="text-xs mb-2">{ep.EpisodeDescription || 'Không có mô tả'}</p>
                      <a
                        href={ep.MovieFilePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm text-blue-600 hover:underline"
                      >
                        ▶️ Xem tập này
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
