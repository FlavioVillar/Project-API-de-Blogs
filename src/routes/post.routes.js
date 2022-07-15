const express = require('express');
const postController = require('../controllers/post.controller');

const validationToken = require('../middlewares/validationToken.middleware');
const validationPost = require('../middlewares/post.middleware');

const router = express.Router();

router.post('/', validationToken, validationPost, postController.createPostWithUser);

module.exports = router;