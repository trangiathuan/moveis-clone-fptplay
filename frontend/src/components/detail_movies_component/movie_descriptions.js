import { useState } from "react";

export default function MovieDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = "Giữa thế giới vô biên, các chiều liên tục giao thoa cùng nhiều chủng tộc phát triển mạnh mẽ, cuộc tụ họp của những tài năng phi thường đang diễn ra. Có một thiếu niên bước lên từ nơi thấp kém, trong cõi trời đất vô tận này, tạo nên truyền kỳ vạn người mong cầu, theo đuổi con đường thống trị tối cao. Cuộc chiến giữa đêm đen và ánh sáng, hành trình tìm về bản ngã thiện lương của Đại Chúa Tể cũng bắt đầu từ đây.";
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-xl shadow-lg">
      <p>{isExpanded ? text : text.slice(0, 150) + "..."}
      <button
        onClick={toggleExpand}
        className="mt-2 text-blue-300 hover:underline"
      >
        {isExpanded ? "Thu gọn" : "Xem thêm"}
      </button>
      </p>
    </div>
  );
}