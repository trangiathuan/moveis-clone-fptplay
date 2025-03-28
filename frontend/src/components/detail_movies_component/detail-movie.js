import React, { useEffect, useState } from "react";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
import MovieDescription from "./movie_descriptions";
const Detail = ({ movieId }) => {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/get-by-movieID/1`);
        const result = await response.json();
        if (result.EC === 0 && result.Data.length > 0) {
          setMovieData(result.Data[0]);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (!movieData) {
    return <div className="text-white">Loading...</div>;
  }
    return(
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
    
    <div className="mt-2 text-sm text-gray-400">
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

    <div>{movieData.SummaryTitle}</div>

    <p className="mt-4 text-gray-300 text-sm">
        <MovieDescription description={movieData.SummaryContent}/>
    </p>
  </div>

  {/* Right Section */}
  <div className="p-8 rounded-lg gray-800">
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
  </div>
    )
}
export default Detail;