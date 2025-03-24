const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController')

router.get('/get-all-movies-new', movieController.getAllMovieNewController);
router.get('/get-by-movieID/:movieID', movieController.getByMovieIDController);
router.get('/get-by-categoryName', movieController.getByCategoryController);



module.exports = router;