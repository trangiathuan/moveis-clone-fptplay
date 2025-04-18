const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')
const authAdmin = require('../middleware/authAdmin')

// Cấu hình multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
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
router.post('/add-new-movies', authAdmin, upload.single('file'), movieController.addNewMoviesController)
router.post('/add-episode-movies/:MovieID', authAdmin, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), movieController.addEpisodeMoviesController)
router.put('/update-movie/:MovieID', authAdmin, upload.single('file'), movieController.updateMoviesController)








module.exports = router;