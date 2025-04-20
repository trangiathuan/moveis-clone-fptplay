const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const authAdmin = require('../middleware/authAdmin')

// Category
router.get('/get-category', categoryController.getCategoryController);
router.post('/create-category', authAdmin, categoryController.createCategoryController);
router.put('/update-category', authAdmin, categoryController.updateCategoryController);
router.delete('/delete-category', authAdmin, categoryController.deleteCategoryController);

// Genre
router.get('/get-genre', categoryController.getGenreController);
router.post('/create-genre', authAdmin, categoryController.createGenreController);
router.put('/update-genre', authAdmin, categoryController.updateGenreontroller);
router.delete('/delete-genre', authAdmin, categoryController.deleteGenreController);








module.exports = router;