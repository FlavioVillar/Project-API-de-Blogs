const express = require('express');
const categoryController = require('../controllers/category.controller');
const validationToken = require('../middlewares/validationToken.middleware');
const categoryMiddleware = require('../middlewares/category.middleware');

const router = express.Router();

router.post('/', categoryMiddleware, validationToken, categoryController.createCategory);
router.get('/', validationToken, categoryController.getAllCategories);

module.exports = router;