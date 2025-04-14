const userService = require('../services/userService')

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

