import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import API from "../../../configs/endpoint";

const Profile = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const decoded = jwtDecode(token);
                const res = await axios.post(`${API}/getUserById`, { userId: decoded.id });
                if (res.data.EC === 0) {
                    setUser(res.data.Data[0]);
                }
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu người dùng:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <p className="text-center mt-10">Đang tải thông tin...</p>;

    return (
        <div className="min-h-screen text-black flex items-center justify-center px-6">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Thông tin người dùng</h2>
                <div className="flex flex-col items-center space-y-4 mb-6">
                    <img
                        src={user.avatarUrl || require("../../pages/asset/default-1.png")}
                        alt="Avatar"
                        className="w-36 h-32 rounded-2xl object-cover"
                    />
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-500 text-sm">Tên:</p>
                        <p className="font-semibold text-lg">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Email:</p>
                        <p className="font-semibold text-lg">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Vai trò:</p>
                        <p className="font-semibold text-lg capitalize">{user.role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;