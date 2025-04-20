import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Delete_Movie = ({ movie, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const fakeMovie = {
        MovieNameVietnamese: 'Đất Rừng Phương Nam',
        NumberOfEpisodes: 10,
        Director: 'Nguyễn Quang Dũng',
        Actor: 'Trấn Thành, Hữu Khang',
        file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReAl3M4O1Lf-8kK3tOfhWW6A50lrj7GHyufw&s'
    };

    const handleDeleteClick = () => {
        setShowConfirm(true);
        setInputValue('');
        setError('');
    };

    const handleConfirm = () => {
        if (inputValue.trim() === fakeMovie.MovieNameVietnamese) {
            // chỉ hiển thị lỗi UI, không xử lý gì hết
            setShowConfirm(false);
        } else {
            setError('⚠️ Cần nhập đúng thông tin');
        }
    };
    return (
        <div className="flex gap-6 p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg mt-10 relative">
            {/* Bên trái */}
            <div className="flex-1 flex flex-col gap-3 items-start">
                <img
                    src={fakeMovie.file}
                    alt={fakeMovie.MovieNameVietnamese}
                    className="w-full h-60 object-cover rounded-xl"
                />
                <h2 className="text-xl font-bold">{fakeMovie.MovieNameVietnamese}</h2>
                <p><strong>Số tập:</strong> {fakeMovie.NumberOfEpisodes}</p>
                <p><strong>Đạo diễn:</strong> {fakeMovie.Director}</p>
                <p><strong>Diễn viên:</strong> {fakeMovie.Actor}</p>
            </div>

            {/* Bên phải */}
            <div className="flex flex-col justify-center items-center gap-4">
                <button
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                    onClick={handleDeleteClick}
                >
                    <Trash2 className="w-5 h-5" />
                    Xoá phim
                </button>

                {/* Confirm Dialog */}
                <AnimatePresence>
                    {showConfirm && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-2xl z-50 border border-gray-200"
                        >
                            <h3 className="text-lg font-semibold mb-4">Xác nhận xoá phim</h3>
                            <p className="mb-2">Bạn có chắc muốn xóa phim <strong>{fakeMovie.MovieNameVietnamese}</strong>?</p>
                            <p className="text-sm text-gray-500 mb-3">Nhập chính xác tên phim để xác nhận:</p>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setError('');
                                }}
                                placeholder={`Nhập "${fakeMovie.MovieNameVietnamese}"`}
                                className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400"
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-black"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                >
                                    Xác nhận xoá
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Delete_Movie;