const userService = require('../services/userService')
const cloudinaryService = require('../services/cloudinaryService')
const fs = require('fs');


exports.isAdminController = async (req, res) => {
    return res.status(200).json({
        EC: 0,
        Status: 1,
        Message: 'CHÀO MỪNG BẠN ĐẾN VỚI GIAO DIỆN DÀNH CHO QUẢN TRỊ VIÊN'
    })

}

exports.getAllUsersController = async (req, res) => {
    const result = await userService.getAllUsersService()
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Xử lý thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Xử lý thất bại'
        })
    }
}

exports.getUserByIdController = async (req, res) => {
    const { userId } = req.body
    console.log(req.body);

    const result = await userService.getUserByIdService(userId)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Xử lý thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Xử lý thất bại'
        })
    }
}

exports.createUserController = async (req, res) => {
    const { email, name, role } = req.body
    console.log(req.body);

    const result = await userService.createUserService(email, name, role)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Tạo tài khoản thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Email đã tồn tại'
        })
    }
}

exports.updateUserController = async (req, res) => {
    const { id, email, name, avatarUrl, role } = req.body
    console.log(req.body);

    const result = await userService.updateUserService(id, email, name, avatarUrl, role)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Cập nhật tài khoản thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Cập nhật tài khoản thất bại'
        })
    }
}

exports.updateUserClientController = async (req, res) => {
    const { id, name, email, role } = req.body
    console.log(req.body);
    let fileImage;
    let avatarUrl;
    if (req.file) {
        fileImage = req.file.path
        avatarUrl = await cloudinaryService.uploadImage(fileImage)
        fs.unlink(fileImage, () => { });
    } else {
        const res = await userService.getUserByIdService(id)
        avatarUrl = res[0].avatarUrl
    }

    console.log(avatarUrl);

    const result = await userService.updateUserService(id, email, name, avatarUrl, role)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Cập nhật tài khoản thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Cập nhật tài khoản thất bại'
        })
    }
}

exports.deleteUserController = async (req, res) => {
    const { id } = req.body
    console.log(req.body);

    const result = await userService.deleteUserService(id)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Xóa tài khoản thành công',
            Data: result
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Xóa tài khoản thất bại'
        })
    }
}

exports.checkFollowMovieController = async (req, res) => {
    const slugMovieName = req.params.slugMovieName
    const userID = req.user.id
    console.log('Data sent to server: slugMovieName =', slugMovieName, ' - ', 'userID =', userID);
    const result = await userService.checkFollowMovieService(slugMovieName, userID)

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 1,
            Message: 'Đã theo dõi phim'
        })
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 0,
            Message: 'Chưa theo dõi phim'
        })
    }
}

exports.toggleFollowMovieController = async (req, res) => {
    const slugMovieName = req.params.slugMovieName
    const userID = req.user.id
    console.log('Data sent to server: slugMovieName =', slugMovieName, ' - ', 'userID =', userID);
    const result = await userService.toggleFollowMovieService(slugMovieName, userID)

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Theo dõi phim thành công'
        })
    } else {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Bỏ theo dõi phim thành công'
        })
    }
}

exports.getFollowingMoviesListController = async (req, res) => {
    const userId = req.user.id
    console.log('Data sent to server: userId =', userId);

    const result = await userService.getFollowingMoviesListService(userId)

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Danh sách theo dõi phim rỗng',
            Data: null
        })
    }
}

