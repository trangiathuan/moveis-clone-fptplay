const movieService = require('../services/movieService')
exports.getAllMovieNewController = async (req, res) => {
    const result = await movieService.getAllMovieNewService();

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.getByMovieEpisodeIDController = async (req, res) => {
    const movieID = req.params.movieID
    const movieEpisodeID = req.params.movieEpisodeID
    console.log('Data sent to server: params movieID:', movieID, '- params movieEpisodeID:', movieEpisodeID);

    const result = await movieService.getByEpisodeMovieIDService(movieID, movieEpisodeID);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
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
    console.log('Data sent to server: params movieID:', movieID);

    const result = await movieService.getByMovieIDService(movieID);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
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
    console.log('Data sente Server CategoryName:', categoryName);

    const result = await movieService.getByCategoryNameService(categoryName);

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}