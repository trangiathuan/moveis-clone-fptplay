import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddMovie = () => {
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
        MovieImagePath: '',
        CategoryID: '',
        SlugMovieName: '',
    });

    const [movies, setMovies] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.MovieNameVietnamese.trim()) {
            toast.error("Tên phim (TV) không được bỏ trống");
            return false;
        }
        if (!formData.ReleaseYear) {
            toast.error("Chưa chọn năm phát hành");
            return false;
        }
        if (isNaN(formData.NumberOfEpisodes) || formData.NumberOfEpisodes.trim() === "") {
            toast.error("Số tập phải là số");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Add movie to list
        setMovies(prev => [...prev, formData]);

        toast.success("🎉 Thêm phim thành công!");

        // Reset form
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
            MovieImagePath: '',
            CategoryID: '',
            SlugMovieName: '',
        });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">🎬 Thêm phim mới</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Cột trái */}
                <div className="flex flex-col gap-4">
                    <input type="text" name="MovieNameVietnamese" placeholder="Tên phim (Tiếng Việt)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="MovieNameEnglish" placeholder="Tên phim (Tiếng Anh)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <select name="MovieStatus" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
                        <option value="New">New</option>
                        <option value="Hot">Hot</option>
                    </select>
                    <select name="ReleaseYear" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400">
                        <option value="">-- Chọn năm phát hành --</option>
                        {Array.from({ length: 2025 - 1990 + 1 }, (_, i) => {
                            const year = 1990 + i;
                            return <option key={year} value={year}>{year}</option>
                        })}
                    </select>
                    <input type="text" name="AgeRestriction" placeholder="Giới hạn tuổi (vd: T13)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="NumberOfEpisodes" placeholder="Số tập (vd: 52/52 tập)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="Country" placeholder="Quốc gia" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>

                {/* Cột phải */}
                <div className="flex flex-col gap-4">
                    <input type="text" name="SummaryTitle" placeholder="Tiêu đề tóm tắt" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <textarea name="SummaryContent" placeholder="Nội dung tóm tắt" onChange={handleChange} rows="3"
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="Actor" placeholder="Diễn viên (phân cách bằng dấu phẩy)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="Director" placeholder="Đạo diễn" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="MovieGenre" placeholder="Thể loại (phân cách bằng dấu phẩy)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="MovieImagePath" placeholder="Đường dẫn hình ảnh" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="number" name="CategoryID" placeholder="Category ID" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                    <input type="text" name="SlugMovieName" placeholder="Slug (vd: naruto-phan-1)" onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>

                {/* Nút submit */}
                <div className="md:col-span-2 flex justify-end pt-4">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300 ease-in-out"
                    >
                        🚀 Thêm phim
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />

            {movies.length > 0 && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4">📋 Danh sách phim đã thêm</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3 border">#</th>
                                    <th className="p-3 border">Tên phim (TV)</th>
                                    <th className="p-3 border">Tên phim (EN)</th>
                                    <th className="p-3 border">Trạng thái</th>
                                    <th className="p-3 border">Năm</th>
                                    <th className="p-3 border">Giới hạn tuổi</th>
                                    <th className="p-3 border">Số tập</th>
                                    <th className="p-3 border">Quốc gia</th>
                                    <th className="p-3 border">Tóm tắt</th>
                                    <th className="p-3 border">Diễn viên</th>
                                    <th className="p-3 border">Đạo diễn</th>
                                    <th className="p-3 border">Thể loại</th>
                                    <th className="p-3 border">Hình ảnh</th>
                                    <th className="p-3 border">Category ID</th>
                                    <th className="p-3 border">Slug</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie, index) => (
                                    <tr key={index} className="hover:bg-orange-50">
                                        <td className="p-2 border align-top">{index + 1}</td>
                                        <td className="p-2 border align-top">{movie.MovieNameVietnamese}</td>
                                        <td className="p-2 border align-top">{movie.MovieNameEnglish}</td>
                                        <td className="p-2 border align-top">{movie.MovieStatus}</td>
                                        <td className="p-2 border align-top">{movie.ReleaseYear}</td>
                                        <td className="p-2 border align-top">{movie.AgeRestriction}</td>
                                        <td className="p-2 border align-top">{movie.NumberOfEpisodes}</td>
                                        <td className="p-2 border align-top">{movie.Country}</td>
                                        <td className="p-2 border align-top">
                                            <strong>{movie.SummaryTitle}</strong><br />
                                            {movie.SummaryContent}
                                        </td>
                                        <td className="p-2 border align-top">{movie.Actor}</td>
                                        <td className="p-2 border align-top">{movie.Director}</td>
                                        <td className="p-2 border align-top">{movie.MovieGenre}</td>
                                        <td className="p-2 border align-top break-all">{movie.MovieImagePath}</td>
                                        <td className="p-2 border align-top">{movie.CategoryID}</td>
                                        <td className="p-2 border align-top">{movie.SlugMovieName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    )
}

export default AddMovie;