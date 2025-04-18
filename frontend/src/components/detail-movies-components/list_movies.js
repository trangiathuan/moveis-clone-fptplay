import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import API from '../../configs/endpoint';

const List_movies = ({ moviesData }) => {
  const { slugMovieName } = useParams();

  const [episodes, setEpisodes] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    fetchEpisodesData();
  }, [slugMovieName]);

  const fetchEpisodesData = async () => {
    try {
      const result = await axios.get(`${API}/get-list-movies/${slugMovieName}`);
      if (result.data.EC === 0) {
        const data = result.data.Data;
        setEpisodes(data);

        const index = data.findIndex(
          (ep) => ep.EpisodeNumber === moviesData.EpisodeNumber
        );
        setInitialIndex(index >= 0 ? index : 0);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="bg-black text-white py-4 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
      <h2 className="text-xl font-bold mb-2">Danh sách tập phim</h2>
      <div className="text-white pt-3 relative">
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
                  <a href={`/detail/${slugMovieName}/${episode.SlugEpisode}`}>
                    <img
                      className="w-[207px] h-[116px] rounded-lg object-cover"
                      src={episode.MovieImagePath}
                      alt={episode.EpisodeNumber}
                    />
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {episode.duration}
                    </span>
                    <p className={`pt-3 text-base font-bold text-left ${episode.EpisodeNumber === moviesData.EpisodeNumber ? 'text-orange-500' : 'text-white'}`}>
                      {episode.EpisodeNumber}
                    </p>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  )
}
export default List_movies;
