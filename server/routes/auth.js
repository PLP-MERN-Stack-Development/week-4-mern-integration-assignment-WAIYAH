const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  validateRegister,
  validateLogin,
  validateProfile
} = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');

// Public routes
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, upload.single('avatar'), validateProfile, updateProfile);

// Handle upload errors
router.use(handleUploadError);

module.exports = router;