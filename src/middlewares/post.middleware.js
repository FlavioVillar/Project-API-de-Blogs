const { getUserByToken } = require('../services/jwt.service');
const { User, BlogPost } = require('../database/models');
const { postSchema, postSchemaByUser } = require('../schemas/post.schema');
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

const validationPostByUser = async (req, res, next) => {
  const { error } = postSchemaByUser.validate(req.body);
  if (error) {
    const { message } = error;
    return res.status(400).json({ message });
  }
  const { id } = req.params;
  const { authorization } = req.headers;
  const UserEmail = await getUserByToken(authorization);
  const getUser = await User.findOne({ where: { email: UserEmail } });
  const getPost = await BlogPost.findByPk(id);
  if (getUser.id !== getPost.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = { validationPost, validationPostByUser };