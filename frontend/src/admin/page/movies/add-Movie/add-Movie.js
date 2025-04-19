import { useEffect, useRef, useState } from "react";
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
    const [movies, setMovies] = useState([]);
    const [showGenreModal, setShowGenreModal] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [categorys, setCategory] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        const res = await axios.get(`${API}/get-category`);
        if (res.data.EC === 0) {
            setCategory(res.data.Data);
        }
    };

    const handleToggleGenre = (genre) => {
        setSelectedGenres(prev => {
            const updatedGenres = prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre];

            console.log("🟨 Đã chọn thể loại:", updatedGenres);
            return updatedGenres;
        });
    };

    const handleConfirmGenres = () => {
        const genreString = selectedGenres.join(', ');
        setFormData(prev => ({ ...prev, MovieGenre: genreString }));
        setShowGenreModal(false);
        console.log("✅ Danh sách thể loại đã xác nhận:", genreString);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            const file = files[0];
            if (file) {
                setFormData(prev => ({ ...prev, file }));
                setImagePreview(URL.createObjectURL(file));
            } else {
                setFormData(prev => ({ ...prev, file: null }));
                setImagePreview(null);
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const clearImage = () => {
        setFormData(prev => ({ ...prev, file: null }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const validateForm = () => {
        const {
            MovieNameVietnamese, MovieStatus, ReleaseYear,
            NumberOfEpisodes, CategoryID, MovieGenre, file
        } = formData;

        if (!MovieNameVietnamese.trim()) {
            toast.error("Vui lòng nhập tên phim (Tiếng Việt)");
            return false;
        }

        if (!MovieStatus) {
            toast.error("Vui lòng chọn trạng thái phim");
            return false;
        }

        if (!ReleaseYear || Number(ReleaseYear) < 1990) {
            toast.error("Năm phát hành phải từ 1990 trở đi");
            return false;
        }

        if (!NumberOfEpisodes.trim()) {
            toast.error("Vui lòng nhập số tập");
            return false;
        }

        if (!CategoryID) {
            toast.error("Vui lòng chọn danh mục phim");
            return false;
        }

        if (!MovieGenre.trim()) {
            toast.error("Vui lòng chọn thể loại phim");
            return false;
        }

        if (!file) {
            toast.error("Vui lòng chọn hình ảnh phim");
            return false;
        }

        return true;
    };

    const resetForm = () => {
        setFormData({
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
        setImagePreview(null);
        fileInputRef.current.value = null;
        setSelectedGenres([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = new FormData();
        for (let key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
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
                toast.success("🎉 Thêm phim thành công!");
                setMovies(prev => [...prev, formData]);
                resetForm();
            } else {
                toast.warn(res.data.Message || "Lỗi không xác định");
            }
        } catch (error) {
            console.error("Lỗi gửi API thêm phim:", error);
            toast.error("Lỗi khi thêm phim");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="p-5 mx-28 mt-10 bg-white rounded-lg-lg shadow-md relative">
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                    <ClipLoader size={50} color="#f97316" loading={true} />
                </div>
            )}

            <h2 className="text-2xl font-bold mb-4 mx-5">🎬 Thêm phim mới</h2>

            {/* --- FORM --- */}
            <div className="mx-5">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        <select type="text" name="AgeRestriction" value={formData.AgeRestriction} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none">
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
                        <select type="text" name="CategoryID" value={formData.CategoryID} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none">
                            <option value=''>Chọn danh mục phim</option>
                            {categorys.map((category, index) => (
                                <option key={index} value={category.CategoryID}>{category.CategoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 space-y-1 pt-0">
                        <label className="block font-medium">Năm phát hành</label>
                        <select name="ReleaseYear" value={formData.ReleaseYear} onChange={handleChange} className="border p-2 rounded-lg w-full outline-none" required>
                            <option value="">Chọn năm phát hành</option>
                            {Array.from({ length: 2025 - 1998 + 1 }, (_, i) => 1998 + i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-span-1 space-y-1">
                        <label className="block font-medium">Thể loại</label>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                name="MovieGenre"
                                value={formData.MovieGenre}
                                readOnly
                                className="border p-2 rounded-lg w-full bg-gray-100 cursor-not-allowed outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    console.log("📝 Mở modal chọn thể loại...");
                                    setShowGenreModal(true);
                                }}
                                className="bg-blue-500 text-white px-3 py-1 h-10 rounded-lg hover:bg-blue-600"
                            >
                                Chọn
                            </button>
                        </div>
                    </div>

                    <div className="col-span-1 space-y-1">
                        <label className="block font-medium">Hình ảnh phim</label>
                        {!imagePreview ? (
                            <input
                                type="file"
                                name="file"
                                onChange={handleChange}
                                ref={fileInputRef}
                                className="block w-full h-10 text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                file:h-10
                                hover:file:bg-blue-100
                                border rounded-lg"
                                accept="image/*"
                            />
                        ) : (
                            <div>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="mt-2 rounded-lg w-full h-56 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={clearImage}
                                    className="mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                                >
                                    ❌ Xóa ảnh
                                </button>
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




                </form>
            </div >


            <div className="mt-6 flex justify-end">
                <button type="submit" onClick={handleSubmit} className="px-4 py-2 me-5 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    🚀 Thêm phim
                </button>
            </div>

            {/* Modal chọn thể loại */}
            <Modal
                isOpen={showGenreModal}
                onRequestClose={() => setShowGenreModal(false)}
                className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-20"
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
                    <button onClick={() => setShowGenreModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">❌ Hủy</button>
                    <button onClick={handleConfirmGenres} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">✅ Xác nhận</button>
                </div>
            </Modal>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}

export default AddMovie;