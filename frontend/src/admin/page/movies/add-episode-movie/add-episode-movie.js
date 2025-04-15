import React, { useState } from "react";

const AddEpisodeMovie = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const clearImage = () => {
        setImagePreview(null);
    };

    const clearVideo = () => {
        setVideoPreview(null);
    };

    return (
        <div className="mx-auto my-10 border rounded-lg p-9 shadow-md w-[1000px]">
            <div className="p-0">
                <div className="mb-5">
                    <p className="text-xl font-bold pb-0 ">Thêm tập phim</p>
                </div>
                <div className="flex justify-between mx-20">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <p className="font-bold">Tập phim</p>
                            <input
                                placeholder="Nhập tập phim VD: Tập 1"
                                className="border border-gray-300 rounded-lg h-10 w-96 outline-none ps-2"
                            />
                        </div>


                        <div className="space-y-2">
                            <p className="font-bold">Tóm tắt nội dung</p>
                            <textarea placeholder="Tóm tắt nội dung tập phim" className="border rounded-lg h-48 w-96 outline-none p-2" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Thêm ảnh */}
                        <div className="space-y-2">
                            <p className="font-bold">Thêm ảnh</p>
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
                            <p className="font-bold">Thêm phim</p>
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
                <div className="text-right me-20">
                    <button className="bg-orange-500 text-white w-20 h-8 rounded-lg mt-5 ">Thêm</button>
                </div>
            </div>
        </div>
    );
};

export default AddEpisodeMovie;
