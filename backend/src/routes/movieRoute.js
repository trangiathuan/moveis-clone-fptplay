const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

// Cấu hình multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

router.get('/get-all-movies-new', movieController.getAllMovieNewController);
router.get('/get-by-slugMovieName/:slugMovieName/:slugEpisode?', movieController.getBySlugMovieNameController);
router.get('/get-by-categoryName/:slugCategoryName', movieController.getByCategoryController);
router.get('/get-list-Movies/:slugMovieName', movieController.getListMoviesController);
router.post('/createMovieRoom/:slugMovieName/:slugEpisode/:roomId', movieController.createRoomMovieController);
router.post('/deleteMovieRoom', movieController.deleteRoomMovieController);
router.post('/getMovieRoom', movieController.getMovieRoomController);
router.post('/getComments', movieController.getCommentsController);
router.post('/createComment', movieController.createCommentsController);

// Admin
router.post('/add-new-movies', upload.single('file'), movieController.addNewMoviesController)







module.exports = router;