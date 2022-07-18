const express = require('express');
const postController = require('../controllers/post.controller');

const validationToken = require('../middlewares/validationToken.middleware');
const {
  validationPost,
  validationUserForPut,
  validationUserForDelete,
} = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', validationToken, validationPost, postController.createPostWithUser);
router.get('/', validationToken, postController.getAllPosts);
router.get('/:id', validationToken, postController.getPostById);
router.put('/:id', validationToken, validationUserForPut, postController.updatePost);
router.delete('/:id', validationToken, validationUserForDelete, postController.deletePost);

module.exports = router;