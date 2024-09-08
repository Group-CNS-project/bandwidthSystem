const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// Define routes
router.post('/signup', authController.signUp);
router.post('/signing', authController.signIn);


module.exports = router;
