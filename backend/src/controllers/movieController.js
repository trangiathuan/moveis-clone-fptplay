const movieService = require('../services/movieService')
exports.getAllMovieNewController = async (req, res) => {
    const result = await movieService.getAllMovieNewService();

    if (result) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result.recordset
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.getByMovieIDController = async (req, res) => {
    const movieID = req.params.movieID
    console.log(movieID);

    const result = await movieService.getByMovieIDService(movieID);

    if (result) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result.recordset
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.getByCategoryController = async (req, res) => {
    const { categoryName } = req.body
    console.log(categoryName);

    const result = await movieService.getByCategoryNameService(categoryName);

    if (result) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result.recordset
        })
    }
    else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}