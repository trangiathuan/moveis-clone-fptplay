const movieService = require('../services/movieService')
const cloudinaryService = require('../services/cloudinaryService')
const fs = require('fs');

function toSlug(str) {
    return str
        .normalize('NFD')                     // tách dấu khỏi chữ
        .replace(/[\u0300-\u036f]/g, '')      // xóa dấu
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')         // xóa ký tự đặc biệt
        .trim()
        .replace(/\s+/g, '-');                // thay khoảng trắng bằng -
}

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

exports.getBySlugMovieNameController = async (req, res) => {
    const slugMovieName = req.params.slugMovieName
    const slugEpisode = req.params.slugEpisode

    console.log('Data sent to server: params slugMovieName =', slugMovieName, '- params slugEpisode =', slugEpisode);

    const result = await movieService.getBySlugMovieNameService(slugMovieName, slugEpisode);

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
    const slugCategoryName = req.params.slugCategoryName
    console.log('Data sente Server CategoryName:', slugCategoryName);

    const result = await movieService.getByCategoryNameService(slugCategoryName);

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

exports.getListMoviesController = async (req, res) => {
    const slugMovieName = req.params.slugMovieName;
    console.log('Data sent to server: params slugMovieName =', slugMovieName);
    const result = await movieService.getListMoviesService(slugMovieName)

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

exports.deleteRoomMovieController = async (req, res) => {
    const result = await movieService.deleteRoomMovieService();

    if (result) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xóa dữ liệu thành công',
            Data: result
        })
    }
    else {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Không có dữ liệu cần xóa',
            Data: result
        })
    }
}

exports.createRoomMovieController = async (req, res) => {
    const slugMovieName = req.params.slugMovieName
    const slugEpisode = req.params.slugEpisode
    const roomId = req.params.roomId
    const host = req.body.host
    console.log('Data sent to server:', slugMovieName, '-', slugEpisode, '-', roomId, '-', host);

    const result = await movieService.createRoomMovieService(slugMovieName, slugEpisode, roomId, host)
    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Xử lý thành công',
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

exports.getMovieRoomController = async (req, res) => {
    const roomId = parseInt(req.body.roomId)

    console.log('Data sent to server: roomId =', roomId);

    const result = await movieService.getMovieRoomService(roomId)
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

exports.getCommentsController = async (req, res) => {
    const { MovieID } = req.body
    console.log('Data sent to server:', MovieID);
    const result = await movieService.getCommentsService(MovieID)
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
            EC: -1,
            Status: 'Failed',
            Message: 'Xử lý thất bại',
            Data: null
        })
    }
}

exports.createCommentsController = async (req, res) => {
    const { MovieID, contents, email } = req.body
    console.log('Data sent to server:', MovieID, '-', contents, '-', email);
    const result = await movieService.createCommentsService(MovieID, contents, email)
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

// Admin
exports.addNewMoviesController = async (req, res) => {
    const { MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear, AgeRestriction, NumberOfEpisodes, Country,
        SummaryTitle, SummaryContent, Actor, Director, MovieGenre, CategoryID } = req.body

    const SlugMovieName = toSlug(MovieNameVietnamese);
    const imageURL = req.file.path

    console.log('Image Path:', imageURL);
    console.log('Data sent to server:', req.body);

    if (imageURL) {
        const MovieImagePath = await cloudinaryService.uploadImage(imageURL)
        fs.unlink(imageURL, () => { });

        const result = await movieService.addNewMoviesService(MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear,
            AgeRestriction, NumberOfEpisodes, Country, SummaryTitle, SummaryContent, Actor, Director,
            MovieGenre, CategoryID, SlugMovieName, MovieImagePath)

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
                Message: 'Phim đã tồn tại',
                Data: null
            });
            return res.status(200).json({
                EC: -1,
                Status: 'Failed',
                Message: 'Phim đã tồn tại',
                Data: null
            })
        }
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Không có hình ảnh',
            MovieImagePath: null
        })
    }

}

exports.addEpisodeMoviesController = async (req, res) => {
    const MovieID = req.params.MovieID
    const { EpisodeNumber, EpisodeDescription } = req.body
    const SlugEpisode = toSlug(EpisodeNumber)
    const imageFile = req.files['image']?.[0].path;
    const videoFile = req.files['video']?.[0].path;
    console.log('Data sent to server:', req.body);

    if (imageFile && videoFile) {
        const MovieFilePath = await cloudinaryService.uploadVideo(videoFile)
        const MovieImagePath = await cloudinaryService.uploadImage(imageFile)
        fs.unlink(imageFile, () => { });
        fs.unlink(videoFile, () => { });

        const result = await movieService.addEpisodeMoviesService(MovieID, EpisodeNumber, EpisodeDescription, MovieFilePath, MovieImagePath, SlugEpisode)

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
                Message: 'Tập phim đã tồn tại',
                Data: null
            });
            return res.status(200).json({
                EC: -1,
                Status: 'Failed',
                Message: 'Tập phim đã tồn tại',
                Data: null
            })
        }
    } else {
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Không có file ảnh và video',
            MovieImagePath: null,
            MovieFilePath: null,
        })
    }

}

exports.updateMoviesController = async (req, res) => {
    const MovieID = req.params.MovieID
    const { MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear, AgeRestriction, NumberOfEpisodes, Country,
        SummaryTitle, SummaryContent, Actor, Director, MovieGenre, CategoryID } = req.body

    const SlugMovieName = toSlug(MovieNameVietnamese);
    let imageURL
    let MovieImagePath

    if (req.file) {
        imageURL = req.file.path
        MovieImagePath = await cloudinaryService.uploadImage(imageURL)
        fs.unlink(imageURL, () => { });
    } else {
        const res = await movieService.getMovieByMovieIDService(MovieID)
        console.log(res.MovieFilePath);
        MovieImagePath = res[0].MovieImagePath
    }

    console.log('Image Path:', imageURL);
    console.log('Data sent to server:', req.body);

    const result = await movieService.updateMoviesService(MovieID, MovieNameVietnamese, MovieNameEnglish, MovieStatus, ReleaseYear,
        AgeRestriction, NumberOfEpisodes, Country, SummaryTitle, SummaryContent, Actor, Director,
        MovieGenre, CategoryID, SlugMovieName, MovieImagePath)

    if (result && result.length > 0) {
        return res.status(200).json({
            EC: 0,
            Status: 'Success',
            Message: 'Cập nhật thành công',
            Data: result
        })
    }
    else {
        console.log({
            EC: -1,
            Status: 'Failed',
            Message: 'Cập nhật thất bại',
            Data: null
        });
        return res.status(200).json({
            EC: -1,
            Status: 'Failed',
            Message: 'Cập nhật thất bại',
            Data: null
        })
    }

}
// này t mới thêm nè, ko biết dùng được k :V 
exports.deleteMovieController = async (req, res) => {
    try {
        const { MovieID } = req.params;

        if (!MovieID) {
            return res.status(400).json({
                EC: -1,
                Status: 'Failed',
                Message: 'Thiếu MovieID',
                Data: null
            });
        }

        const result = await movieService.deleteMovieService(MovieID);

        if (result && result.length > 0) {
            return res.status(200).json({
                EC: 0,
                Status: 'Success',
                Message: 'Xóa phim thành công',
                Data: result
            });
        } else {
            return res.status(200).json({
                EC: -1,
                Status: 'Failed',
                Message: 'Không tìm thấy phim để xóa',
                Data: null
            });
        }
    } catch (error) {
        console.error('Lỗi xóa phim:', error);
        return res.status(500).json({
            EC: -1,
            Status: 'Error',
            Message: 'Đã có lỗi xảy ra khi xóa phim',
            Data: null
        });
    }
};
