import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import API from '../../../../configs/endpoint';
import { FaEdit, FaUpload, FaCheckCircle, FaTags, FaArrowLeft } from "react-icons/fa";

const Change_Movie = () => {
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
    const [imageDimensions, setImageDimensions] = useState({ width: 128, height: 192 }); // fallback tỉ lệ ảnh 2:3
    const location = useLocation();
    const navigate = useNavigate();
    const movieData = location.state?.movie;
    const [movie, setMovie] = useState(movieData || null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (!movieData) {
            navigate('/dashboard/list-Movie');
            return;
        }

        setFormData({ ...movieData, file: null });
        setSelectedGenres(movieData.MovieGenre?.split(', ').map(g => g.trim()) || []);
        setImagePreview(movieData.MovieImagePath || null);
        fetchCategories();
    }, [movieData]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API}/get-category`);
            if (res.data.EC === 0) setCategories(res.data.Data);
        } catch (err) {
            console.error("❌ Lỗi khi tải danh mục:", err);
        }
    };

    const [formData, setFormData] = useState({
        MovieNameVietnamese: '',
        MovieNameEnglish: '',
        MovieStatus: '',
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

    const [imagePreview, setImagePreview] = useState(null);
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const fileInputRef = useRef(null);

    const handleToggleGenre = (genre) => {
        setSelectedGenres(prev =>
            prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
        );
    };

    const handleConfirmGenres = () => {
        const genreString = selectedGenres.join(', ');
        setFormData(prev => ({ ...prev, MovieGenre: genreString }));
        setShowGenreModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => {
                setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
            };
            img.src = URL.createObjectURL(file);
            setImagePreview(img.src);
            setFormData(prev => ({ ...prev, file }));
        }
    };

    const clearImage = () => {
        setImagePreview(null);
        setFormData(prev => ({ ...prev, file: null }));
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleUpdateMovie = async (e) => {
        e.preventDefault();
        if (parseInt(formData.ReleaseYear) < 2018) {
            alert("❌ Năm phát hành phải từ 2018 trở đi!");
            return;
        }

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'file') form.append(key, value);
            });
            if (formData.file) form.append('file', formData.file);

            await axios.put(`${API}/change-Movie/${movieData.MovieID}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert("✅ Cập nhật thành công!");
            navigate('/dashboard/list-Movie');
        } catch (err) {
            console.error("❌ Lỗi khi cập nhật phim:", err);
            alert("Đã có lỗi xảy ra khi cập nhật.");
        }
    };

    if (!movie) return <div>Đang tải dữ liệu phim...</div>;
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaEdit className="text-blue-500" /> Cập nhật thông tin phim
            </h2>

            <form onSubmit={handleUpdateMovie}>
                <div className="grid grid-cols-2 gap-6">
                    {/* Input fields */}
                    {[
                        { key: 'MovieNameVietnamese', label: 'Tên phim (Vietnamese)', type: 'text' },
                        { key: 'MovieNameEnglish', label: 'Tên phim (English)', type: 'text' },
                        { key: 'MovieStatus', label: 'Trạng thái phim', type: 'text' },
                        { key: 'ReleaseYear', label: 'Năm phát hành (>= 2018)', type: 'number' },
                        { key: 'AgeRestriction', label: 'Giới hạn độ tuổi', type: 'text' },
                        { key: 'NumberOfEpisodes', label: 'Số tập', type: 'number' },
                        { key: 'Country', label: 'Quốc gia', type: 'text' },
                        { key: 'SummaryTitle', label: 'Tiêu đề tóm tắt', type: 'text' },
                        { key: 'SummaryContent', label: 'Nội dung tóm tắt', type: 'textarea' },
                        { key: 'Actor', label: 'Diễn viên', type: 'text' },
                        { key: 'Director', label: 'Đạo diễn', type: 'text' }
                    ].map(({ key, label, type }) => (
                        <div key={key} className="flex flex-col col-span-1">
                            <label htmlFor={key} className="font-semibold">{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="border p-2 rounded mt-2 h-24"
                                />
                            ) : (
                                <input
                                    type={type}
                                    id={key}
                                    name={key}
                                    value={formData[key]}
                                    min={key === 'ReleaseYear' ? 2018 : undefined}
                                    onChange={handleChange}
                                    className="border p-2 rounded mt-2"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex flex-col col-span-1">
                        <label htmlFor="CategoryID" className="font-semibold">Danh mục</label>
                        <select
                            name="CategoryID"
                            value={formData.CategoryID}
                            onChange={handleChange}
                            className="border p-2 rounded mt-2"
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {categories.map(c => (
                                <option key={c.CategoryID} value={c.CategoryID}>
                                    {c.CategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Image upload */}
                {/* Chọn ảnh + Preview + Xóa ảnh */}
                <div className="mt-6">
                    <label className="block font-semibold mb-2 flex items-center gap-2">
                        <FaUpload /> Ảnh phim
                    </label>

                    <div className="flex flex-col md:flex-row items-start gap-4">
                        {/* Input file */}
                        <input
                            type="file"
                            name="file"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            accept="image/*"
                            className="block text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                border rounded-lg w-full md:w-72"
                        />

                        {/* Preview ảnh */}
                        {imagePreview && (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        width: `${Math.min(imageDimensions.width, 240)}px`,
                                        height: "auto",
                                        maxHeight: "360px",
                                        objectFit: "cover"
                                    }}
                                    className="rounded-lg shadow border"
                                />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="absolute top-1 right-1 bg-white bg-opacity-80 hover:bg-opacity-100 text-red-600 text-xs rounded-full px-2 py-0.5 shadow"
                                >
                                    ❌
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Genre modal */}
                <div className="flex flex-col mb-4 mt-6">
                    <button type="button" onClick={() => setShowGenreModal(true)} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2">
                        <FaTags /> Chọn thể loại
                    </button>
                </div>

                {showGenreModal && (
                    <Modal
                        isOpen={showGenreModal}
                        onRequestClose={() => setShowGenreModal(false)}
                        contentLabel="Chọn thể loại"
                        className="bg-white p-6 rounded shadow-lg w-full max-w-3xl mx-auto mt-20"
                        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                        <h3 className="text-xl font-bold mb-4">📂 Chọn thể loại phim</h3>
                        <div className="grid grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                            {GENRES.map((genre) => (
                                <div key={genre} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={() => handleToggleGenre(genre)}
                                    />
                                    <label htmlFor={genre} className="ml-2">{genre}</label>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={handleConfirmGenres}
                                className="bg-green-500 text-white py-2 px-4 rounded flex items-center gap-2"
                            >
                                <FaCheckCircle /> Xác nhận
                            </button>
                        </div>
                    </Modal>
                )}

                {/* Submit button */}
                <div className="mt-6 flex gap-4">
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 flex items-center gap-2"
                    >
                        <FaEdit /> Cập nhật phim
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/list-Movie')}
                        className="bg-gray-400 text-white py-2 px-6 rounded hover:bg-gray-500 flex items-center gap-2"
                    >
                        <FaArrowLeft /> Quay lại
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Change_Movie;