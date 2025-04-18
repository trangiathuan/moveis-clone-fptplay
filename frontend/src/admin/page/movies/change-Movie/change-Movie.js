import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import axios from "axios";
import API from '../../../../configs/endpoint';
import { FaEdit, FaUpload, FaCheckCircle, FaTags, FaArrowLeft } from "react-icons/fa";

const Change_Movie = () => {
    const GENRES = ["Seinen", "Ác Quỷ", "Âm Nhạc", "Anime", "Bạo Lực", "Bí Ẩn", "Bí ẩn - Siêu nhiên", "Cars", "Cartoon", "CGDCT", "Chiến Tranh", "CN Animation", "Cổ Trang", "Dementia", "Dị Giới", "Drama", "Du Hành Thời Gian", "Ecchi", "Game", "Gây cấn", "Giả Tưởng", "Gia Đình", "Hài Hước", "Haiten", "Hành Động", "Harem", "Hình Sự", "Hoán Đổi Giới Tính", "Hoạt Hình", "Học Đường", "Hồi hộp", "Huyền Ảo", "Huyền Huyễn", "Isekai", "Josei", "Khoa Học", "Kids", "Kiếm Hiệp", "Kinh Dị", "Lãng mạn", "Lịch Sử", "Live Action", "Ma Cà Rồng", "Mecha", "Movie & OVA", "Mystery", "Ninja", "ONA", "Parody", "Phép Thuật", "Phiêu Lưu", "Police", "Quân Đội", "Samurai", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Siêu Năng Lực", "Siêu Nhiên", "Special", "Tài liệu", "Tâm Lý", "Thần Thoại", "Thế Giới Song Song", "Thể Thao", "Thriller", "Tiên Hiệp", "Tiểu Thuyết", "Tình Cảm", "Tình Tay Ba", "Tình Yêu", "Tokusatsu", "Tragedy", "Trailer", "Trinh Thám", "Truyền Hình", "TV Show", "Viễn Tây", "Viễn Tưởng", "Võ Thuật", "Vũ Trụ", "Yaoi", "Yuri", "Đời Thường"];

    const [imageDimensions, setImageDimensions] = useState({ width: 128, height: 192 });
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
        setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
    };

    const handleConfirmGenres = () => {
        const genreString = selectedGenres.join(', ');
        setFormData(prev => ({ ...prev, MovieGenre: genreString }));
        setShowGenreModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const img = new Image();
            img.onload = () => setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
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
            <form onSubmit={handleUpdateMovie} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Tên phim (Tiếng Việt)</label>
                    <input type="text" name="MovieNameVietnamese" value={formData.MovieNameVietnamese} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" required />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Tên phim (Tiếng Anh)</label>
                    <input type="text" name="MovieNameEnglish" value={formData.MovieNameEnglish} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Số tập</label>
                    <input type="text" name="NumberOfEpisodes" value={formData.NumberOfEpisodes} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" required />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Trạng thái phim</label>
                    <select name="MovieStatus" value={formData.MovieStatus} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none">
                        <option value="">Chọn trạng thái phim</option>
                        <option value="New">Mới</option>
                        <option value="Ongoing">Đang phát</option>
                        <option value="Completed">Hoàn thành</option>
                    </select>
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Giới hạn độ tuổi</label>
                    <select name="AgeRestriction" value={formData.AgeRestriction} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none">
                        <option value=''>Không giới hạn</option>
                        <option value='T12'>12+</option>
                        <option value='T14'>14+</option>
                        <option value='T16'>16+</option>
                        <option value='T18'>18+</option>
                    </select>
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Quốc gia</label>
                    <input type="text" name="Country" value={formData.Country} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Đạo diễn</label>
                    <input type="text" name="Director" value={formData.Director} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Diễn viên</label>
                    <input type="text" name="Actor" value={formData.Actor} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" />
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Danh mục</label>
                    <select name="CategoryID" value={formData.CategoryID} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none">
                        <option value=''>Chọn danh mục phim</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.CategoryID}>{category.CategoryName}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-1 space-y-1 pt-0">
                    <label className="block font-medium">Năm phát hành</label>
                    <select name="ReleaseYear" value={formData.ReleaseYear} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" required>
                        <option value="">Chọn năm phát hành</option>
                        {Array.from({ length: 2025 - 2018 + 1 }, (_, i) => 2018 + i).map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Thể loại</label>
                    <div className="flex gap-2 items-center">
                        <input type="text" name="MovieGenre" value={formData.MovieGenre} readOnly className="border p-2 rounded-lg w-full bg-gray-100 cursor-not-allowed outline-none" />
                        <button type="button" onClick={() => setShowGenreModal(true)} className="bg-blue-500 text-white px-3 py-1 h-10 rounded-lg hover:bg-blue-600">Chọn</button>
                    </div>
                </div>
                <div className="col-span-1 space-y-1">
                    <label className="block font-medium">Hình ảnh phim</label>
                    {!imagePreview ? (
                        <input
                            type="file"
                            name="file"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="block w-full h-10 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 file:h-10 hover:file:bg-blue-100 border rounded-lg"
                            accept="image/*"
                        />
                    ) : (
                        <div>
                            <img src={imagePreview} alt="Preview" className="mt-2 rounded-lg w-full h-56 object-cover" />
                            <button type="button" onClick={clearImage} className="mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200">❌ Xóa ảnh</button>
                        </div>
                    )}
                </div>
                <div className="col-span-1 space-y-1 md:col-span-2">
                    <label className="block font-medium">Tiêu đề tóm tắt</label>
                    <input type="text" name="SummaryTitle" value={formData.SummaryTitle} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" />
                </div>
                <div className="col-span-1 space-y-1 md:col-span-2">
                    <label className="block font-medium">Nội dung tóm tắt</label>
                    <textarea name="SummaryContent" value={formData.SummaryContent} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" rows={4} />
                </div>
                <div className="md:col-span-2 text-right">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Lưu thay đổi</button>
                </div>
            </form>

            {/* Modal chọn thể loại */}
            <Modal isOpen={showGenreModal} onRequestClose={() => setShowGenreModal(false)} className="bg-white p-6 max-w-2xl mx-auto mt-24 rounded-lg shadow-md outline-none">
                <h3 className="text-xl font-semibold mb-4">Chọn thể loại</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {GENRES.map((genre, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input type="checkbox" checked={selectedGenres.includes(genre)} onChange={() => handleToggleGenre(genre)} />
                            {genre}
                        </label>
                    ))}
                </div>
                <div className="mt-4 text-right">
                    <button onClick={() => setShowGenreModal(false)} className="mr-3 px-4 py-2 text-gray-600 hover:underline">Hủy</button>
                    <button onClick={handleConfirmGenres} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Xác nhận</button>
                </div>
            </Modal>
        </div>
    )
}

export default Change_Movie;