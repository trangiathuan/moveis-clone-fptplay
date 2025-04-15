const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin')

router.get('/check-follow/:slugMovieName', authUser, userController.checkFollowMovieController);
router.get('/toggleFollowMovie/:slugMovieName', authUser, userController.toggleFollowMovieController);
router.get('/getFollowingMoviesList', authUser, userController.getFollowingMoviesListController);
router.get('/getAllUsers', userController.getAllUsersController);
router.post('/createUser', authAdmin, userController.createUserController);
router.put('/updateUser', userController.updateUserController);
router.delete('/deleteUser', authAdmin, userController.deleteUserController);
router.get('/isAdmin', authAdmin, userController.isAdminController);





module.exports = router;