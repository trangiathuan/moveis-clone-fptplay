import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const ActionButtons = ({ movieUrl }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  // Xử lý theo dõi
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  // Xử lý chia sẻ
  const handleShare = () => {
    navigator.clipboard.writeText(movieUrl);
    alert("Đã sao chép liên kết!");
  };

  return (
    <div className="flex space-x-4">
      {/* Nút Theo dõi */}
      <button
        onClick={handleFollow}
        className="flex items-center bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
      >
        <Heart className={`mr-2 ${isFollowing ? "fill-red-500 text-red-500" : ""}`} />
        {isFollowing ? "Đã theo dõi" : "Theo dõi"}
      </button>

      {/* Nút Chia sẻ */}
      <button
        onClick={handleShare}
        className="flex items-center bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition"
      >
        <Share2 className="mr-2" />
        Chia sẻ
      </button>
    </div>
  );
};

export default ActionButtons;