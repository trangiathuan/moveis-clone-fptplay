const Detail = () => {
    return(
        <div className="flex flex-col items-center bg-black min-h-screen text-white">
        <div>
            {/* Video Section */}
      <div className="w-full max-w-5xl relative">
        <video
          className="w-full rounded-lg"
          src="/path-to-video.mp4"
          controls
          poster="/path-to-poster.jpg"
        />
      </div>

        </div>
        
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 mt-6 px-4">
        {/* Left Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Đại Chúa Tể</h1>
          <p className="text-gray-400 text-sm mt-2">The Great Ruler</p>
          <div className="flex items-center gap-2 mt-2 text-yellow-500">
            <span> 5.0</span> {/*phần đánh giá*/}
            <span className="text-gray-400">• 2023 • T13 • 52/52 tập • Trung Quốc</span>
          </div>
          <p className="mt-4 text-gray-300 text-sm">
            Giữa thế giới vô biên, các chiều liên tục giao thoa cùng nhiều chủng tộc phát triển mạnh
            mẽ, cuộc tụ họp của những tài năng phi thường đang diễn ra...
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Thông tin phim</h2>
          <p className="text-sm text-gray-300 mt-2">Diễn viên: Sun Liang Liang, Li Shimeng, Yue Jiang, Wenxiao He</p>
          <p className="text-sm text-gray-300">Đạo diễn: Jiangping Ma</p>
          <p className="text-sm text-gray-300">Thể loại: Giả tưởng, Phiêu lưu, Hành động, Hoạt hình</p>
          
        
        </div>
      </div>
    </div>
    )
}
export default Detail;