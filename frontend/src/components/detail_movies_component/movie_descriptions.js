import { useState } from "react";

const MovieDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-xl shadow-lg">
      <p>
        {isExpanded || description.length <= 40
          ? description
          : description.slice(0, 290) + ". . ."}

        {description.length > 80 && (
          <button
            onClick={toggleExpand}
            className="text-red-600 hover:underline"
          >
            {isExpanded ? " Thu gọn" : " Xem thêm"}
          </button>
        )}
      </p>
    </div>
  );
}
export default MovieDescription