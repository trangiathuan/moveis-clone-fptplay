const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const authUser = require('../middleware/authUser')
const authAdmin = require('../middleware/authAdmin')

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

router.get('/check-follow/:slugMovieName', authUser, userController.checkFollowMovieController);
router.get('/toggleFollowMovie/:slugMovieName', authUser, userController.toggleFollowMovieController);
router.get('/getFollowingMoviesList', authUser, userController.getFollowingMoviesListController);
router.get('/getAllUsers', userController.getAllUsersController);
router.post('/getUserById', userController.getUserByIdController);
router.post('/createUser', authAdmin, userController.createUserController);
router.put('/updateUser-admin', userController.updateUserController);
router.delete('/deleteUser', authAdmin, userController.deleteUserController);
router.get('/isAdmin', authAdmin, userController.isAdminController);

router.put('/updateUser-client', upload.single('avatar'), userController.updateUserClientController);






module.exports = router;