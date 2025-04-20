import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../../configs/endpoint";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners";


const AddEpisodeMovie = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const MovieID = useParams(17);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState({
        EpisodeNumber: '',
        EpisodeDescription: '',
        video: null,
        image: null
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('image', file);

        setFormData(prev => ({ ...prev, image: file }))
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        console.log('vidoe', file);
        setFormData(prev => ({ ...prev, video: file }))
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newState = { ...prev, [name]: value };
            return newState;
        });

    }

    const validateForm = () => {
        if (!formData.EpisodeNumber.trim()) {
            toast.error("Chưa nhập tập phim");
            return false;
        }
        return true;
    };

    const addEpisodeMovie = async () => {
        if (!validateForm()) {
            return
        }
        setLoading(true);
        const payload = new FormData();
        for (let key in formData) {
            if (formData[key] !== null) {
                payload.append(key, formData[key]);
            }
        }
        const res = await axios.post(`${API}/add-episode-movies/${MovieID}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.EC === 0) {
            toast.success("Thêm tập phim thành công!");
            setFormData({
                EpisodeNumber: '',
                EpisodeDescription: '',
                video: null,
                image: null
            })
            clearImage();
            clearVideo();
            setLoading(false)
        } else {
            toast.warning(res.data.Message)
            setLoading(false)
        }
    }


    const clearImage = () => {
        setImagePreview(null);
    };

    const clearVideo = () => {
        setVideoPreview(null);
    };
    console.log(formData);

    return (
        <div className="mx-auto my-10 border rounded-lg p-9 shadow-md w-[900px]">
            <ToastContainer />
            {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                    <ClipLoader size={50} color="#f97316" loading={true} />
                </div>
            )}
            <div className="p-0">
                <div className="mb-5">
                    <p className="text-xl font-medium pb-0 mx-10">Thêm tập phim</p>
                </div>
                <div className="flex justify-between mx-10">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-medium">Tập phim</p>
                            <input
                                type="text"
                                name="EpisodeNumber"
                                value={formData.EpisodeNumber}
                                onChange={handleChange}
                                placeholder="Nhập tập phim VD: Tập 1"
                                className="border border-gray-300 rounded-lg h-10 w-96 outline-none ps-2"
                            />
                        </div>


                        <div className="space-y-2">
                            <p className="font-medium">Tóm tắt nội dung</p>
                            <textarea
                                type="text"
                                name="EpisodeDescription"
                                value={formData.EpisodeDescription}
                                onChange={handleChange}
                                placeholder="Tóm tắt nội dung tập phim" className="border rounded-lg h-48 w-96 outline-none p-2" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Thêm ảnh */}
                        <div className="space-y-2">
                            <p className="font-medium">Thêm ảnh</p>
                            {!imagePreview ? (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-80 h-10 text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-lg file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-blue-50 file:text-blue-700
                                                file:h-10
                                                hover:file:bg-blue-100
                                                border rounded-lg"
                                />
                            ) : (
                                <div>
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mt-2 rounded-lg w-80 h-56 object-cover"
                                    />
                                    <button
                                        onClick={clearImage}
                                        className="mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                                    >
                                        ❌ Xóa
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Thêm video */}
                        <div className="space-y-2">
                            <p className="font-medium">Thêm phim</p>
                            {!videoPreview ? (
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleVideoChange}
                                    className="block w-80 h-10 text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-lg file:border-0
                             file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100
                             border rounded-lg"
                                />
                            ) : (
                                <div>
                                    <video
                                        src={videoPreview}
                                        controls
                                        className="mt-0 rounded-lg w-80 h-52 object-cover"
                                    />
                                    <button
                                        onClick={clearVideo}
                                        className="mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm rounded hover:bg-red-200"
                                    >
                                        ❌ Xóa
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-right me-10">
                    <button onClick={addEpisodeMovie} className="bg-orange-500 text-white w-20 h-8 rounded-lg mt-5 ">Thêm</button>
                </div>
            </div>
        </div>
    );
};

export default AddEpisodeMovie;
