import { useState } from "react";
import Modal from 'react-modal';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ClipLoader } from "react-spinners";
import API from '../../../../configs/endpoint';
const AddMovie = () => {
    const GENRES = [
        "Seinen", "Ác Quỷ", "Âm Nhạc", "Anime", "Bạo Lực", "Bí Ẩn", "Bí ẩn - Siêu nhiên", "Cars", "Cartoon", "CGDCT",
        "Chiến Tranh", "CN Animation", "Cổ Trang", "Dementia", "Dị Giới", "Drama", "Du Hành Thời Gian", "Ecchi", "Game",
        "Gây cấn", "Giả Tưởng", "Gia Đình", "Hài Hước", "Haiten", "Hành Động", "Harem", "Hình Sự", "Hoán Đổi Giới Tính",
        "Hoạt Hình", "Học Đường", "Hồi hộp", "Huyền Ảo", "Huyền Huyễn", "Isekai", "Josei", "Khoa Học", "Kids", "Kiếm Hiệp",
        "Kinh Dị", "Lãng mạn", "Lịch Sử", "Live Action", "Ma Cà Rồng", "Mecha", "Movie & OVA", "Mystery", "Ninja", "ONA",
        "Parody", "Phép Thuật", "Phiêu Lưu", "Police", "Quân Đội", "Samurai", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai",
        "Siêu Năng Lực", "Siêu Nhiên", "Special", "Tài liệu", "Tâm Lý", "Thần Thoại", "Thế Giới Song Song", "Thể Thao",
        "Thriller", "Tiên Hiệp", "Tiểu Thuyết", "Tình Cảm", "Tình Tay Ba", "Tình Yêu", "Tokusatsu", "Tragedy", "Trailer",
        "Trinh Thám", "Truyền Hình", "TV Show", "Viễn Tây", "Viễn Tưởng", "Võ Thuật", "Vũ Trụ", "Yaoi", "Yuri", "Đời Thường"
    ];

    const [formData, setFormData] = useState({
        MovieNameVietnamese: '',
        MovieNameEnglish: '',
        MovieStatus: 'New',
        ReleaseYear: '',
        AgeRestriction: '',
        NumberOfEpisodes: '',
        Country: '',
        SummaryTitle: '',
        SummaryContent: '',
        Actor: '',
        Director: '',
        MovieGenre: '',
        CategoryID: '',
        file: null,
    });

    const [movies, setMovies] = useState([]);
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleToggleGenre = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const handleConfirmGenres = () => {
        const genreString = selectedGenres.join(', ');
        setFormData(prev => {
            const newState = { ...prev, MovieGenre: genreString };
            console.log("🎭 [MovieGenre]:", genreString);
            return newState;
        });
        alert("✅ Bạn đã chọn: " + genreString);
        setShowGenreModal(false);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            const file = files[0];
            setFormData(prev => ({ ...prev, file: file }));
            console.log(`📁 [${name}]:`, file);
        } else {
            setFormData(prev => {
                const newState = { ...prev, [name]: value };
                console.log(`✏️ [${name}]:`, value);
                return newState;
            });
        }
    };

    const validateForm = () => {
        if (!formData.MovieNameVietnamese.trim()) {
            toast.error("Tên phim (TV) không được bỏ trống");
            return false;
        }
        if (!formData.ReleaseYear || Number(formData.ReleaseYear) < 2018) {
            toast.error("Năm phát hành phải từ 2018 trở đi");
            return false;
        }
        if (isNaN(formData.NumberOfEpisodes) || formData.NumberOfEpisodes.trim() === "") {
            toast.error("Số tập phải là số");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = new FormData();
        for (let key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
                console.log(`📦 append ${key}:`, formData[key]);
            }
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await axios.post(`${API}/add-new-movies`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (res.data.EC === 0) {
                setMovies(prev => [...prev, formData]);
                toast.success("🎉 Thêm phim thành công!");
                setFormData({
                    MovieNameVietnamese: '',
                    MovieNameEnglish: '',
                    MovieStatus: 'New',
                    ReleaseYear: '',
                    AgeRestriction: '',
                    NumberOfEpisodes: '',
                    Country: '',
                    SummaryTitle: '',
                    SummaryContent: '',
                    Actor: '',
                    Director: '',
                    MovieGenre: '',
                    CategoryID: '',
                    file: null,
                });
                setSelectedGenres([]);
            } else {
                toast.error(res.data.EM || "Lỗi không xác định");
            }
        } catch (error) {
            console.error("Lỗi gửi API thêm phim:", error);
            toast.error("Lỗi khi thêm phim");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md relative">
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                    <ClipLoader size={50} color="#f97316" loading={true} />
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4">🎬 Thêm phim mới</h2>

            {/* --- FORM --- */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1">
                    <label className="block font-medium">Tên phim (TV)</label>
                    <input type="text" name="MovieNameVietnamese" value={formData.MovieNameVietnamese} onChange={handleChange} className="border p-2 rounded w-full" required />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Tên tiếng Anh</label>
                    <input type="text" name="MovieNameEnglish" value={formData.MovieNameEnglish} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Số tập</label>
                    <input type="text" name="NumberOfEpisodes" value={formData.NumberOfEpisodes} onChange={handleChange} className="border p-2 rounded w-full" required />
                </div>

                <div className="col-span-1">
                    <select name="ReleaseYear" value={formData.ReleaseYear} onChange={handleChange} className="border p-2 rounded w-full" required>
                        <option value="">-- Chọn năm phát hành --</option>
                        {Array.from({ length: 2025 - 1998 + 1 }, (_, i) => 1998 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Trạng thái phim</label>
                    <select name="MovieStatus" value={formData.MovieStatus} onChange={handleChange} className="border p-2 rounded w-full">
                        <option value="New">Mới</option>
                        <option value="Ongoing">Đang phát</option>
                        <option value="Completed">Hoàn thành</option>
                    </select>
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Giới hạn độ tuổi</label>
                    <input type="text" name="AgeRestriction" value={formData.AgeRestriction} onChange={handleChange} className="border p-2 rounded w-full" placeholder="VD: 13+, 18+" />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Quốc gia</label>
                    <input type="text" name="Country" value={formData.Country} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Đạo diễn</label>
                    <input type="text" name="Director" value={formData.Director} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Diễn viên</label>
                    <input type="text" name="Actor" value={formData.Actor} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block font-medium">Tiêu đề tóm tắt</label>
                    <input type="text" name="SummaryTitle" value={formData.SummaryTitle} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block font-medium">Nội dung tóm tắt</label>
                    <textarea name="SummaryContent" value={formData.SummaryContent} onChange={handleChange} className="border p-2 rounded w-full" rows={4} />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Mã danh mục (CategoryID)</label>
                    <input type="text" name="CategoryID" value={formData.CategoryID} onChange={handleChange} className="border p-2 rounded w-full" />
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Thể loại</label>
                    <div className="flex gap-2 items-center">
                        <input type="text" name="MovieGenre" value={formData.MovieGenre} readOnly className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed" />
                        <button type="button" onClick={() => setShowGenreModal(true)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Chọn</button>
                    </div>
                </div>

                <div className="col-span-1">
                    <label className="block font-medium">Hình ảnh phim</label>
                    <input type="file" name="file" onChange={handleChange} className="border p-2 rounded w-full" accept="image/jpeg,image/png" />
                </div>
            </form>

            <div className="mt-6 flex justify-end">
                <button type="submit" onClick={handleSubmit} className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">🚀 Thêm phim</button>
            </div>

            {/* --- GENRE MODAL --- */}
            <Modal
                isOpen={showGenreModal}
                onRequestClose={() => setShowGenreModal(false)}
                className="bg-white p-6 rounded-md shadow-xl max-w-2xl mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                ariaHideApp={false}
            >
                <h2 className="text-xl font-bold mb-4">Chọn thể loại</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
                    {GENRES.map((genre) => (
                        <label key={genre} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre)}
                                onChange={() => handleToggleGenre(genre)}
                            />
                            <span>{genre}</span>
                        </label>
                    ))}
                </div>
                <div className="mt-4 flex justify-end gap-4">
                    <button onClick={() => setShowGenreModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">❌ Hủy</button>
                    <button onClick={handleConfirmGenres} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">✅ Xác nhận</button>
                </div>
            </Modal>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default AddMovie;