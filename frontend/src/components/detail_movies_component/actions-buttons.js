import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";
import axios from "axios";
import API from "../../configs/endpoint";

const ActionButtons = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { slugMovieName } = useParams(); // Lấy id phim từ URL

  useEffect(() => {
    fetchFollowStatus();
  }, [slugMovieName]);

  // Lấy trạng thái theo dõi phim
  const fetchFollowStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/api/check-follow/${slugMovieName}`, // API đúng
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
        `${API}/api/toggleFollowMovie/${slugMovieName}`,
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
    <div className="flex space-x-4">
      {/* Nút Theo dõi */}
      <button
        onClick={handleFollow}
        className="flex items-center px-4 py-2 rounded-full hover:bg-gray-200 transition"
      >
        <Heart
          className={`mr-2 ${isFollowing ? "fill-pink-500 text-pink-500" : "fill-grey text-grey"}`}
        />
        {isFollowing ? "Đã theo dõi" : "Theo dõi"}
      </button>

      {/* Nút Chia sẻ */}
      <button
        onClick={handleShare}
        className="flex items-center px-4 py-2 rounded-full hover:bg-gray-200 transition"
      >
        <Share2 className="mr-2" />
        Chia sẻ
      </button>
    </div>
  );
};

export default ActionButtons;