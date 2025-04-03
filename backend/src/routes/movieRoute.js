const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

router.get('/get-all-movies-new', movieController.getAllMovieNewController);
router.get('/get-by-slugMovieName/:slugMovieName/:slugEpisode?', movieController.getBySlugMovieNameController);
router.get('/get-by-categoryName/:slugCategoryName', movieController.getByCategoryController);
router.get('/get-list-Movies/:slugMovieName', movieController.getListMoviesController);



module.exports = router;