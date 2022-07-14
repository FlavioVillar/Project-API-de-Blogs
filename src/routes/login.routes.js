const express = require('express');
const loginController = require('../controllers/login.controller');
const loginMiddleware = require('../middlewares/login.middleware');

const router = express.Router();

router.post('/', loginMiddleware, loginController.signIn);

module.exports = router;