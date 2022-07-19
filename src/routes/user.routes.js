const express = require('express');
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');
const validationToken = require('../middlewares/validationToken.middleware');

const router = express.Router();

router.post('/', userMiddleware, userController.createUser);
router.get('/', validationToken, userController.getAllUsers);
router.get('/:id', validationToken, userController.getUserById);
router.delete('/me', validationToken, userController.deleteUser);

module.exports = router;