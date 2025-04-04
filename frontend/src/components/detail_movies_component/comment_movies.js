import { useState } from "react";

const Comment_movies = () => {
    // Sửa lỗi typo: Giả sử màu nền mong muốn là gray-900
    const commentBgClass = "bg-gray-900"; // Hoặc dùng trực tiếp 'bg-gray-900'

    return (
        // max-w-6xl và mx-auto giúp giới hạn chiều rộng và căn giữa trên màn hình lớn
        <div className="max-w-6xl mx-auto bg-black text-white">

            {/* Phần tiêu đề */}
            <div className="px-4 pt-4">
                <h2 className="text-lg font-bold mb-2">Bình luận (15)</h2>
            </div>

            {/* Phần nhập bình luận - Responsive */}
            {/* - flex-col: Xếp dọc mặc định (cho mobile)
              - sm:flex-row: Chuyển sang xếp ngang từ breakpoint 'sm' (640px) trở lên
              - gap-3: Khoảng cách khi xếp dọc
              - sm:gap-6: Khoảng cách khi xếp ngang
            */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4 px-4">
                <input
                    type="text"
                    placeholder="Viết bình luận..."
                    // flex-1 hoạt động tốt khi là sm:flex-row
                    // Khi là flex-col, input sẽ chiếm đủ rộng
                    className="flex-1 bg-gray-800 text-white border-none p-2 rounded"
                />
                <button
                    // w-full: Chiếm toàn bộ chiều rộng khi xếp dọc (mobile)
                    // sm:w-auto: Chiều rộng tự động khi xếp ngang (sm trở lên)
                    className="w-full sm:w-auto bg-blue-500 text-white py-2 px-3 rounded font-bold hover:bg-blue-700 transition-colors duration-200" // Thêm hiệu ứng chuyển màu mượt hơn
                >
                    Gửi
                </button>
            </div>

            {/* Phần danh sách bình luận */}
            <div className="space-y-4 px-4 pb-4">
                {[...Array(5)].map((_, index) => (
                    // Sử dụng class nền đã sửa lỗi typo
                    <div key={index} className={`${commentBgClass} p-3 rounded-lg`}>
                        <p className="text-sm text-gray-400">***990 • 2 năm</p>
                        <p className="mt-1">Bình luận mẫu {index + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Comment_movies;