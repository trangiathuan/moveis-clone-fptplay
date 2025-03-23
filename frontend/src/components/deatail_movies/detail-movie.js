import { useState } from "react";
import {  Star } from "lucide-react";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
const Detail = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const handleRatingClick = (star) => {
        setRating((prevRating) => (prevRating === star ? 0 : star));
      };
    return(
        <div className="flex flex-col items-center bg-black min-h-screen text-white">
        <div>
            {/* Video Section */}
            <Video_comp/>
        </div>
        {/* Info Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 mt-6 px-4">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Đại Chúa Tể</h1>
          <p className="text-gray-400 text-sm mt-2">The Great Ruler</p>
          <Star_comp/>
          <div className="mt-2 text-sm text-gray-400">
          <span className="text-red-400">MỚI</span>
          <span className="mx-2">•</span>
            <span>2023</span>
            <span className="mx-2">•</span>
            <span>T13</span>
            <span className="mx-2">•</span>
            <span>52/52 tập</span>
            <span className="mx-2">•</span>
            <span>Trung Quốc</span>
          </div>
          <div>
            Bạo Lực
          </div>
          <div>
          <p className="mt-4 text-gray-300 text-sm">
            Giữa thế giới vô biên, các chiều liên tục giao thoa cùng nhiều chủng tộc phát triển mạnh
            mẽ, cuộc tụ họp của những tài năng phi thường đang diễn ra...
          </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg">
          <div><p className="text-sm text-gray-300 mt-2">Diễn viên: Sun Liang Liang, Li Shimeng, Yue Jiang, Wenxiao He</p></div>
          <div><p className="text-sm text-gray-300">Đạo diễn: Jiangping Ma</p></div>
          <div><p className="text-sm text-gray-300">Thể loại: Giả tưởng, Phiêu lưu, Hành động, Hoạt hình</p></div>
          <div><p className="text-sm text-gray-300">Danh mục: Anime <span>&gt;</span> Hành động</p></div>
          
        
        </div>
      </div>
    </div>
    )
}
export default Detail;