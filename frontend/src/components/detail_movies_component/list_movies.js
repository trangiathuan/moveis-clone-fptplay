import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import API from '../../configs/endpoint';

const [slugMovieName] = useParams();//lấy id từ URL
const [episodes, setEpisodes] = useState([]);
const fetchEpisodesData = async () => {
  try {
    const result = await axios.get(`${API}/get-by-slugMovieName/${slugMovieName}`);
    if (result.data.EC === 0) {
      console.log(result.data);
      setEpisodes(result.data.Data[0].MovieImagePath); // Chỉ lấy URL image
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
useEffect(() => {
  fetchEpisodesData();
}, [slugMovieName]);



const List_movies = () => {
  return (
    <div className="bg-black text-white py-4 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      <h2 className="text-xl font-bold mb-2">Danh sách</h2>
      <div className="text-white pt-3">
        <Swiper
          spaceBetween={12}
          grabCursor={true}
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
            <SwiperSlide key={episode.id}>
              <div className="ps-0">
                <a href={`/watch/${episode.id}`}>
                  <img className="w-[207px] h-[116px] rounded-lg object-cover" src={episode.thumbnail} alt={episode.title} />
                  {/* Hiển thị thời gian tập phim */}
                  <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {episode.duration}
                  </span>
                  <p className="pt-3 text-base text-left">{episode.title}</p>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default List_movies;