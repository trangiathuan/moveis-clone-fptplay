import { useState } from "react";

export default function MovieDescription({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-xl shadow-lg">
      <p>
        {isExpanded || description.length <= 40
          ? description
          : description.slice(0, 20) + "...  "}
      
          {description.length > 20 && (
            <button
              onClick={toggleExpand}
              className="mt-2 text-blue-300 hover:underline"
            >
              {isExpanded ? " Thu gọn" : " Xem thêm"}
            </button>
          )}
      </p>
    </div>
  );
}