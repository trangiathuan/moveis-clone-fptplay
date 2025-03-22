import { useState } from "react";
import {  Star } from "lucide-react";
const Star_comp = () =>{
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const handleRatingClick = (star) => {
        setRating((prevRating) => (prevRating === star ? 0 : star));
      };
    return(
        <div className="flex items-center mt-2 text-sm text-gray-400">
                <div className="flex items-center bg-gray-700 px-2 py-1 rounded-full">
                  <Star className="text-orange-400 fill-orange-400 w-4 h-4 mr-1" />
                  <span className="text-white font-bold">5.0</span>
                  <span className="text-gray-400 text-xs ml-1">(3)</span>
                </div>
              {/* Star Rating System */}
              <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer ${star <= (hoverRating || rating) ? "fill-orange-400 text-orange-400" : "text-gray-500"}`}
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                  />
                  ))}
              </div>
          </div>
    )
}
export default Star_comp;