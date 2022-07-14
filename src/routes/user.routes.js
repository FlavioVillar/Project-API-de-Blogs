const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.createUser);

module.exports = router;