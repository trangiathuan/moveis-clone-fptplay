const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authUser = require('../middleware/authUser')

router.get('/check-follow/:movieID', authUser, userController.checkFollowMovieController);
router.get('/toggleFollowMovie/:movieID', authUser, userController.toggleFollowMovieController);

module.exports = router;