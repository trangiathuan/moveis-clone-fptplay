import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
import MovieDescription from "./movie_descriptions";
import List_movies from "./list_movies";
import API from "../../configs/endpoint";
const Detail = () => {
  const [movieData, setMovieData] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const { slugMovieName } = useParams();// Lấy id từ URL

  useEffect(() => {
    fetchMovieData();
  }, [slugMovieName]);

  // Lấy dữ liệu từ API bằng Axios
  const fetchMovieData = async () => {
    try {
      const result = await axios.get(`${API}/get-by-slugMovieName/${slugMovieName}`);
      if (result.data.EC === 0) {
        console.log(result.data);
        setMovieData(result.data.Data[0]); // Cập nhật dữ liệu phim
        setVideoSrc(result.data.Data[0].MovieFilePath); // Cập nhật URL video
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  if (!movieData) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center bg-black min-h-screen text-white">
      {/* Container để căn chỉnh video và thông tin phim */}
      <div className="w-full max-w-5xl px-2">
        {/* Video Section */}
        <Video_comp />

        <div className="grid grid-cols-3 gap-6 mt-6 px-8">
          {/* Left Section */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold">{movieData.MovieNameVietnamese}</h1>
            <p className="text-gray-400 text-sm mt-2">{movieData.MovieNameEnglish}</p>
            <Star_comp /> {/* Đánh giá sản phẩm */}

            <div className="mt-2 text-sm text-gray-400 mt-3">
              <span className="text-red-400">{movieData.MovieStatus}</span>
              <span className="mx-2">•</span>
              <span>{movieData.ReleaseYear}</span>
              <span className="mx-2">•</span>
              <span>{movieData.AgeRestriction}</span>
              <span className="mx-2">•</span>
              <span>{movieData.NumberOfEpisodes}</span>
              <span className="mx-2">•</span>
              <span>{movieData.Country}</span>
            </div>
            <div className="mt-3">{movieData.SummaryTitle}</div>
            <p className="mt-4 text-gray-300 text-sm">
              <MovieDescription description={movieData.SummaryContent} />
            </p>
          </div>

          {/* Right Section */}
          <div className="p-8 rounded-lg">
            {/* Action Buttons */}
            <div className="flex items-center gap-6 text-white text-sm">
              <ActionButtons />
            </div>

            {/* Thông tin chi tiết */}
            <div className="text-white text-sm mt-4 space-y-1">
              <div className="flex">
                <span className="font-semibold w-24">Diễn viên:</span>
                <span className="text-gray-300 flex-1">{movieData.Actor}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-24">Đạo diễn:</span>
                <span className="text-gray-300 flex-1">{movieData.Director}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-24">Thể loại:</span>
                <span className="text-gray-300 flex-1">{movieData.MovieGenre}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-24">Danh mục:</span>
                <span className="text-gray-300">{movieData.CategoryName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div> {/* code danh sách movie */}
        <List_movies />
      </div>
    </div>
  )
}
export default Detail;