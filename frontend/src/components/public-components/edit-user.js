import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../configs/endpoint";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const EditUser = () => {
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState();

    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token) || null;
    let userId = decoded.id

    useEffect(() => {
        getUserById()
    }, [])

    const getUserById = async () => {
        const res = await axios.post(`${API}/getUserById`, { userId })
        setEmail(res.data.Data[0].email)
        setName(res.data.Data[0].name)
        setRole(res.data.Data[0].role)
        setId(res.data.Data[0].id)
        setPreviewURL(res.data.Data[0].avatarUrl)
    }


    // Xử lý khi chọn ảnh mới
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    // Gửi cập nhật thông tin lên server
    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }
        formData.append("id", id);
        formData.append("email", email);
        formData.append("name", name);
        formData.append("role", role);

        try {
            setLoading(true);
            const res = await axios.put(`${API}/updateUser-client`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.data.EC === 0) {
                toast.success(res.data.Message);

                // ✅ Cập nhật lại state bằng dữ liệu mới trả về từ BE
                const updatedUser = res.data.Data[0];
                setName(updatedUser.name);
                setEmail(updatedUser.email);
                setRole(updatedUser.role);
                setPreviewURL(updatedUser.avatarUrl); // avatar mới (nếu có)
            } else {
                toast.error(res.data.Message || "Cập nhật thất bại");
            }
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            toast.error("Cập nhật thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-black">
            <ToastContainer />
            <div className="min-h-screen text-white flex items-center justify-center px-9">
                <div className="p-10 rounded-2xl shadow-lg w-full max-w-lg">
                    <h2 className="text-5xl font-bold mb-6 text-center">Chỉnh sửa hồ sơ</h2>
                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <label htmlFor="avatar" className="relative inline-block">
                                <img
                                    src={
                                        previewURL
                                            ? previewURL
                                            : require("../../asset/image-logo/default-1.png")
                                    }
                                    alt="Avatar"
                                    className="w-36 h-32 rounded-2xl object-cover cursor-pointer m-4"
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-5 right-5 p-1 bg-white rounded-full"
                                    onClick={() => document.getElementById("avatar").click()}
                                >
                                    <img
                                        src={require("../../asset/image-logo/edit_black.png")}
                                        alt="Edit"
                                        className="w-6 h-6"
                                    />
                                </button>
                            </label>

                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-400">Nhập tên của bạn</p>
                            <input
                                type="text"
                                className="w-full p-3 rounded-lg bg-neutral-700 text-white"
                                placeholder="Tên người dùng"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex flex-grow justify-left gap-x-1">
                            <button
                                type="button"
                                className="w-1/2 py-3 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition"
                                onClick={() => window.history.back()}
                            >
                                Hủy
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-1/2 py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-500 transition"
                            >
                                {loading ? "Đang cập nhật..." : "Cập nhật"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
