const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authUser = require('../middleware/authUser')

router.get('/check-follow/:slugMovieName', authUser, userController.checkFollowMovieController);
router.get('/toggleFollowMovie/:slugMovieName', authUser, userController.toggleFollowMovieController);
router.get('/getFollowingMoviesList', authUser, userController.getFollowingMoviesListController);

module.exports = router;