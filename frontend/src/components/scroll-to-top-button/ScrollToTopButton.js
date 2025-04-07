// src/components/ScrollToTopButton.js (hoặc vị trí bạn muốn)

import React, { useState, useEffect } from 'react';
// Import hàm cuộn mượt từ file utils
import { smoothScrollTo } from '../scroll-to-top-button/scroll'; // Điều chỉnh đường dẫn nếu cần

// Icon mũi tên lên (Bạn có thể dùng icon khác)
const ArrowUpIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
    </svg>
);


const ScrollToTopButton = () => {
    // State để kiểm soát việc hiển thị nút
    const [isVisible, setIsVisible] = useState(false);

    // Ngưỡng cuộn để nút xuất hiện (ví dụ: 300px)
    const scrollThreshold = 300;
    // Thời gian cuộn lên đầu trang (ví dụ: 1500ms = 1.5 giây cho "dịu dàng")
    const scrollDuration = 1000;

    // Hàm kiểm tra vị trí cuộn để ẩn/hiện nút
    const toggleVisibility = () => {
        if (window.scrollY > scrollThreshold) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Hàm xử lý khi nhấn nút: gọi hàm cuộn mượt lên Y = 0
    const handleScrollToTop = () => {
        smoothScrollTo(0, scrollDuration);
    };

    // Sử dụng useEffect để lắng nghe sự kiện cuộn trang
    useEffect(() => {
        // Thêm listener khi component mount
        window.addEventListener('scroll', toggleVisibility);

        // Cleanup: Gỡ bỏ listener khi component unmount để tránh leak memory
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []); // Mảng dependency rỗng đảm bảo effect chỉ chạy 1 lần

    return (
        // Container để định vị nút (fixed bottom right)
        <div className="fixed bottom-20 right-5 z-50"> {/* z-50 để đảm bảo nút nổi lên trên */}
            {/* Chỉ render nút khi isVisible là true */}
            {isVisible && (
                <button
                    type="button"
                    onClick={handleScrollToTop}
                    // Styling bằng Tailwind CSS
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow-lg transition-opacity duration-300 ease-in-out opacity-75 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" // Thêm opacity
                    aria-label="Cuộn lên đầu trang" // Hỗ trợ accessibility
                >
                    <ArrowUpIcon className="h-6 w-6" /> {/* Icon mũi tên lên */}
                </button>
            )}
        </div>
    );
};

export default ScrollToTopButton;