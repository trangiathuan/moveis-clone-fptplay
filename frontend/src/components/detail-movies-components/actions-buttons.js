import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, MonitorPlay, Share2 } from "lucide-react";
import axios from "axios";
import API from "../../configs/endpoint";

const ActionButtons = ({ slugEpisode }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { slugMovieName } = useParams(); // Lấy id phim từ URL
  const [randomNumber, setRandomNumber] = useState(0)

  useEffect(() => {
    fetchFollowStatus();
  }, [slugMovieName]);

  useEffect(() => {
    const randomNumber = generateRandomThreeDigitNumber();
    setRandomNumber(randomNumber)
  }, []);

  // Tạo số ngẫu nhiên có 3 chữ số (từ 100 đến 999)
  const generateRandomThreeDigitNumber = () => {
    return Math.floor(Math.random() * 900) + 100;
  };

  // Lấy trạng thái theo dõi phim
  const fetchFollowStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/check-follow/${slugMovieName}`, // API đúng
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.Status === 1) {
        setIsFollowing(true); // Cập nhật trạng thái
      }
    } catch (error) {
      console.error("Lỗi khi lấy trạng thái theo dõi:", error);
    }
  };

  // Xử lý theo dõi / bỏ theo dõi
  const handleFollow = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/toggleFollowMovie/${slugMovieName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setIsFollowing(!isFollowing); // Cập nhật trạng thái theo dõi
      console.log(response.data);

    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái theo dõi:", error);
    }
  };

  // Xử lý chia sẻ
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    alert("Đã sao chép liên kết!");
  };



  return (
    <div className="flex flex-nowrap items-center gap-3">
      {/* Nút Theo dõi */}
      <button
        onClick={handleFollow}
        className="flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full transition text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
      >
        <Heart
          className={`mr-2 h-4 w-4 sm:h-5 sm:w-5 ${isFollowing ? "fill-pink-500 text-pink-500" : "fill-gray-400 text-gray-400"}`}
        />
        {isFollowing ? "Theo dõi" : "Theo dõi"}
      </button>

      {/* Nút Chia sẻ */}
      <button
        onClick={handleShare}
        className="flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full transition text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
      >
        <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        Chia sẻ
      </button>

      <a href={`/streaming/${slugMovieName}/${slugEpisode}/${randomNumber}`} className={`${slugEpisode ? 'block' : 'hidden'}`}>
        <button
          className="flex items-center px-3 sm:px-4 py-1 sm:py-2 rounded-full transition text-white text-xs sm:text-sm md:text-base whitespace-nowrap"
        >
          <MonitorPlay className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Live
        </button>
      </a>
    </div>
  );
};

export default ActionButtons;