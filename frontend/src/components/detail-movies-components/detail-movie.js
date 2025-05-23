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
  const [movieData, setMovieData] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const { slugMovieName, slugEpisode } = useParams(); // Lấy slug từ URL

  useEffect(() => {
    fetchMovieData();
  }, [slugEpisode]);

  const fetchMovieData = async () => {
    try {
      const episode = slugEpisode || "tap-1";
      const result = await axios.get(
        `${API}/get-by-slugMovieName/${slugMovieName}/${episode}`
      );
      if (result.data.EC === 0) {
        console.log(result.data);
        setMovieData(result.data.Data[0]);
        setVideoSrc(result.data.Data[0].MovieFilePath);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  if (!movieData) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center bg-black min-h-screen text-white pt-24">
      {/* Container chính */}
      <div className="w-full max-w-7xl px-4 md:px-8 lg:px-12">
        {/* Video */}
        <div className="w-full">
          <Video videoSrc={videoSrc} />
        </div>

        {/* Thông tin phim */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 px-4 md:px-8">
          {/* Bên trái */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold">{movieData.MovieNameVietnamese} - {movieData.EpisodeNumber}</h1>
            <p className="text-white text-base font-bold pt-2 pb-2">
              {movieData.MovieNameEnglish}
            </p>
            <Star_comp />

            <div className="mt-3 text-sm text-white">
              <span className="text-red-500 text-base font-bold">
                {movieData.MovieStatus}
              </span>
              {movieData.ReleaseYear && (
                <>
                  <span className="mx-2 text-neutral-400">•</span>
                  <span>{movieData.ReleaseYear}</span>
                </>
              )}
              <span className="mx-2 text-neutral-400">•</span>
              <span>{movieData.AgeRestriction}</span>
              <span className="mx-2 text-neutral-400">•</span>
              <span>{movieData.NumberOfEpisodes}</span>
              <span className="mx-2 text-neutral-400">•</span>
              <span>{movieData.Country}</span>
            </div>

            <div className="mt-3 font-semibold">{movieData.SummaryTitle}</div>
            <div className="mt-4 text-gray-300 text-base">
              <MovieDescription description={movieData.SummaryContent} />
            </div>
          </div>

          {/* Bên phải */}
          <div className="p-0 rounded-lg">
            {/* Nút hành động */}
            <div className="flex flex-wrap items-center -ms-4 gap-4 text-white text-sm">
              <ActionButtons slugEpisode={movieData.SlugEpisode} />
            </div>

            {/* Chi tiết phim */}
            <div className="text-white text-base mt-2 space-y-2">
              <div className="flex flex-wrap">
                <span className="font-semibold w-24">Diễn viên:</span>
                <span className="text-gray-300 flex-1">{movieData.Actor}</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-semibold w-24">Đạo diễn:</span>
                <span className="text-gray-300 flex-1">{movieData.Director}</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-semibold w-24">Thể loại:</span>
                <span className="text-gray-300 flex-1">{movieData.MovieGenre}</span>
              </div>
              <div className="flex flex-wrap">
                <span className="font-semibold w-24">Danh mục:</span>
                <span className="text-gray-300">{movieData.CategoryName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Danh sách phim */}
      <div className="w-full max-w-7xl px-2 sm:px-7 mt-5">
        <List_movies moviesData={movieData} />
      </div>
      {/* phần bình luận của phim  */}
      <div className="w-full max-w-7xl px-2 sm:px-7 mt-5"><Comment_movies moviesData={movieData} /></div>

    </div>
  );
};

export default Detail;
