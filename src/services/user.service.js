const { BlogPost, User, PostCategory } = require('../database/models');
const jwtService = require('./jwt.service');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (displayName, email, password, image) => {
  const emailExists = await User.findOne({ where: { email } });

  if (emailExists) {
    return false;
  }

  const user = await User.create({ displayName, email, password, image });
  const token = jwtService.createToken(user);
  return { token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return users;
};

const getUserById = async (userId) => {
  const user = await User.findOne(
    { where: { id: userId }, attributes: ['id', 'displayName', 'email', 'image'] },
  );
  if (!user) return false;
  return user;
};

const deleteUser = async (id) => {
  const getPost = await BlogPost.findAll({ where: { userId: id } });
  const postId = getPost.map((post) => post.id);
  
  await postId.forEach((item) => {
    PostCategory.destroy({ where: { postId: item } });
  });
  await postId.forEach((item) => {
    BlogPost.destroy({ where: { userId: item } });
  });
  const getUser = await User.findOne({ where: { id } });
  await getUser.destroy({ where: { id } });
};

module.exports = {
  getUserByEmail,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};