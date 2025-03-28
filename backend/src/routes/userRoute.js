const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authUser = require('../middleware/authUser')

router.get('/check-follow/:slugMovieName', authUser, userController.checkFollowMovieController);
router.get('/toggleFollowMovie/:slugMovieName', authUser, userController.toggleFollowMovieController);

module.exports = router;