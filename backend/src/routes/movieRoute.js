const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

router.get('/get-all-movies-new', movieController.getAllMovieNewController);
router.get('/get-by-episode/:slugMovieName/:slugEpisode', movieController.getByEpisodeController);
router.get('/get-by-slugMovieName/:slugMovieName', movieController.getBySlugMovieNameController);

router.get('/get-by-categoryName/:slugCategoryName', movieController.getByCategoryController);



module.exports = router;