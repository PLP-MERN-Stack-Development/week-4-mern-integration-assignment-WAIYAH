const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/auth');
const { validatePost } = require('../middleware/validation');
const { upload, handleUploadError } = require('../middleware/upload');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.post('/', protect, upload.single('featuredImage'), validatePost, createPost);
router.put('/:id', protect, upload.single('featuredImage'), validatePost, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, addComment);

// Handle upload errors
router.use(handleUploadError);

module.exports = router;