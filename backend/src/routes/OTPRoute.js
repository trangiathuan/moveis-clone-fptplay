const express = require('express');
const router = express.Router();
const OTPController = require('../controllers/OPTController')

router.post('/send-otp', OTPController.sendOTPController);
router.post('/verify-otp', OTPController.verifyOTPController);

module.exports = router;