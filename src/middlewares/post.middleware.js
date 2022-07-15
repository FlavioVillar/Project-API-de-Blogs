const postSchema = require('../schemas/post.schema');
const { Category } = require('../database/models');

const validationPost = async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const { categoryIds } = req.body;
  const getCategories = categoryIds.map(async (categoryId) => {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
  });
  await Promise.all(getCategories);
  next();
};

module.exports = validationPost;