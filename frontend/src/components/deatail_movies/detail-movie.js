import { useState } from "react";
import Video_comp from "./video_component";
import Star_comp from "./star_comp";
import ActionButtons from "./actions-buttons";
const Detail = () => {
    return(
      <div className="flex flex-col items-center bg-black min-h-screen text-white">
      {/* Container để căn chỉnh video và thông tin phim */}
      <div className="w-full max-w-5xl px-2">
          {/* Video Section */}
          <Video_comp />

          {/* Info Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-6">
              {/* Left Section */}
              <div className="flex-1">
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
                      Giữa thế giới vô biên, các chiều liên tục giao thoa cùng nhiều chủng tộc phát triển mạnh
                      mẽ, cuộc tụ họp của những tài năng phi thường đang diễn ra...
                  </p>
              </div>

              {/* Right Section */}
              <div className="flex-1 bg-gray-800 p-4 rounded-lg">
                  <ActionButtons />
                  <p className="text-sm text-gray-300 mt-2">Diễn viên: Sun Liang Liang, Li Shimeng, Yue Jiang, Wenxiao He</p>
                  <p className="text-sm text-gray-300">Đạo diễn: Jiangping Ma</p>
                  <p className="text-sm text-gray-300">Thể loại: Giả tưởng, Phiêu lưu, Hành động, Hoạt hình</p>
                  <p className="text-sm text-gray-300">Danh mục: Anime <span>&gt;</span> Hành động</p>
              </div>
          </div>
      </div>
  </div>
    )
}
export default Detail;