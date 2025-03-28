const userService = require('../services/userService')
exports.checkFollowMovieController = async (req, res) => {
    const movieID = req.params.movieID
    const userID = req.user.id
    console.log('Data sent to server: movieID =', movieID, ' - ', 'userID =', userID);
    const result = await userService.checkFollowMovieService(movieID, userID)

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
    const movieID = req.params.movieID
    const userID = req.user.id
    console.log('Data sent to server: movieID =', movieID, ' - ', 'userID =', userID);
    const result = await userService.toggleFollowMovieService(movieID, userID)

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