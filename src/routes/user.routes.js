const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const validationToken = require('../middlewares/validationToken.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.createUser);
router.get('/', validationToken, userController.getAllUsers);

module.exports = router;