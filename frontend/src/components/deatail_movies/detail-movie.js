import { useState } from "react";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
const Detail = () => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen text-white">
      <div>
        {/* Video Section */}
        <Video_comp />
      </div>
      {/* Info Section */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 mt-6 px-4">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Đại Chúa Tể</h1>
          <p className="text-gray-400 text-sm mt-2">The Great Ruler</p>
          <Star_comp />{/* Đánh giá sản phẩm */}
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
        <div className="flex-1  p-4 rounded-lg">
          <ActionButtons />
          <div className="text-white text-sm mt-2 space-y-1">
            <div className="flex">
              <span className="font-semibold w-24">Diễn viên:</span>
              <span className="text-gray-300">Sun Lang Lang, Li Shimeng, Yue Jiang, Wenxiao He</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-24">Đạo diễn:</span>
              <span className="text-gray-300">Jianping Ma</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-24">Thể loại:</span>
              <span className="text-gray-300">Giả tưởng, Phiêu lưu, Hành động, Hoạt hình</span>
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

  )
}
export default Detail;