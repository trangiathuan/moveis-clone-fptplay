const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')
const authAdmin = require('../middleware/authAdmin')

router.get('/get-category', categoryController.getCategoryController);
router.post('/create-category', authAdmin, categoryController.createCategoryController);
router.put('/update-category', authAdmin, categoryController.updateCategoryController);
router.delete('/delete-category', authAdmin, categoryController.deleteCategoryController);








module.exports = router;