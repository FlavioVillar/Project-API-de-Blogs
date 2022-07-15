const express = require('express');
const postController = require('../controllers/post.controller');

const validationToken = require('../middlewares/validationToken.middleware');
const { validationPost, validationPostByUser } = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', validationToken, validationPost, postController.createPostWithUser);
router.get('/', validationToken, postController.getAllPosts);
router.get('/:id', validationToken, postController.getPostById);
router.put('/:id', validationToken, validationPostByUser, postController.updatePost);

module.exports = router;