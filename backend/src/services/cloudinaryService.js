const cloudinary = require('cloudinary').v2;
require('dotenv').config();



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadVideo = async (videoPath) => {
    try {
        const result = await cloudinary.uploader.upload(videoPath, {
            resource_type: 'video',
            folder: 'movies',
        });
        return result.secure_url;
    } catch (err) {
        throw new Error('Upload video thất bại: ' + err.message);
    }
}

exports.uploadImage = async (imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            resource_type: 'image',
            folder: 'images',
        });
        return result.secure_url;
    } catch (err) {
        throw new Error('Upload hình ảnh thất bại: ' + err.message);
    }
}
