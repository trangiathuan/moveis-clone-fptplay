// movieRoutes.js

const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController')

// Route để lấy danh sách phim
router.get('/test', testController.getTest);

module.exports = router;
