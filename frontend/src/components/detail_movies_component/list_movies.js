// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const episodes = [
    { id: 1, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
    { id: 2, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
    { id: 3, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
    { id: 4, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
    { id: 5, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
    { id: 6, image: "https://anhnail.com/wp-content/uploads/2024/11/Hinh-gai-xinh-2k7-toc-ngan.jpg", duration: "23 phút" },
  ];
  
const List_movies = () => {
    return(
        <div className="bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách</h2>
      <div className="grid grid-cols-3 gap-4">
        {episodes.map((episodes) => (
          <div key={episodes.id} className="relative">
            <img
              src={episodes.image}
              alt={`Tập ${episodes.id}`}
              className="w-full rounded-lg"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 text-sm rounded">
              {episodes.duration}
            </div>
            <p className="text-center mt-2">Tập {episodes.id}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-4">
        <button className="bg-gray-700 px-4 py-2 rounded">1-15</button>
        <button className="bg-gray-700 px-4 py-2 rounded">16-30</button>
        <button className="bg-gray-700 px-4 py-2 rounded">31-45</button>
        <button className="bg-gray-700 px-4 py-2 rounded">Xem tất cả</button>
      </div>
    </div>
    )
}
export default List_movies;