const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllCategories = async (_req, res) => {
  try {
  const categories = await categoryService.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};