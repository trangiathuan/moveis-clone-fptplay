import { useState } from "react";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
import MovieDescription from "./movie_descriptions";
const Detail = () => {
    return(
      <div className="flex flex-col items-center bg-black min-h-screen text-white">
      {/* Container để căn chỉnh video và thông tin phim */}
      <div className="w-full max-w-5xl px-2">
          {/* Video Section */}
          <Video_comp />

          <div className="grid grid-cols-3 gap-6 mt-6 px-8">
  {/* Left Section */}
  <div className="col-span-2">
    <h1 className="text-3xl font-bold">Đại Chúa Tể</h1>
    <p className="text-gray-400 text-sm mt-2">The Great Ruler</p>
    <Star_comp /> {/* Đánh giá sản phẩm */}
    
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

    <div>Bạo Lực</div>

    <p className="mt-4 text-gray-300 text-sm">
        <MovieDescription/>
    </p>
  </div>

  {/* Right Section */}
  <div className="p-8 rounded-lg gray-800">
    {/* Action Buttons */}
    <div className="flex items-center gap-6 text-white text-sm">
      <ActionButtons />
    </div>

    {/* Thông tin chi tiết */}
    <div className="text-white text-sm mt-4 space-y-1">
      <div className="flex">
        <span className="font-semibold w-24">Diễn viên:</span>
        <span className="text-gray-300 flex-1">Sun Lang Lang, Li Shimeng, Yue Jiang, Wenxiao He</span>
      </div>
      <div className="flex">
        <span className="font-semibold w-24">Đạo diễn:</span>
        <span className="text-gray-300 flex-1">Jianping Ma</span>
      </div>
      <div className="flex">
        <span className="font-semibold w-24">Thể loại:</span>
        <span className="text-gray-300 flex-1">Giả tưởng, Phiêu lưu, Hành động, Hoạt hình</span>
      </div>
      <div className="flex">
        <span className="font-semibold w-24">Danh mục:</span>
        <span className="text-gray-300">Anime</span>
        <span className="mx-1">&gt;</span>
        <span className="text-gray-300">Hành động</span>
      </div>
    </div>
  </div>
</div>
      </div>
  </div>
    )
}
export default Detail;