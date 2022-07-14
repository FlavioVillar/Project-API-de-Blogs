const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(201).json(category);
};

const getAllCategories = async (req, res) => {
  const categories = await categoryService.getAllCategories();
  res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAllCategories,
};