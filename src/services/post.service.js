const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { TIMESTAMP } = require('mysql2/lib/constants/types');
const { BlogPost, User, Category, PostCategory } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const getPostObject = {
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', attributes: ['id', 'name'] },
  ],
};    

const createPostWithUser = async ({ title, content, categoryIds, UserEmail }) => {
  const getUser = await User.findOne({ where: { email: UserEmail } });
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost.create({
      title,
      content,
      userId: getUser.id,
      published: TIMESTAMP,
      updated: TIMESTAMP,
    }, { transaction: t });
    await post.setUser(getUser, { transaction: t });
    await post.setCategories(categoryIds, { transaction: t });
    await t.commit();
    return post;
  } catch (error) {
    await t.rollback();
    return error;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll(getPostObject);
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({ where: { id }, ...getPostObject });
  return post;
};

const updatePost = async (id, { title, content }) => {
  const post = await BlogPost.findByPk(id);

  await post.update({ title, content });

  const result = await getPostById(id);
  return result;
};

const deletePost = async (postId) => {
    await PostCategory.destroy({ where: { postId } });

    await BlogPost.destroy({ where: { id: postId } });
};

const searchPost = async (searchText) => {
  const posts = await BlogPost.findAll({
    where: {
    // https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
    [Op.or]: [
      { title: { [Op.like]: `%${searchText}%` } },
      { content: { [Op.like]: `%${searchText}%` } },
    ],
    },
    ...getPostObject,
});
  return posts;
};

module.exports = {
  createPostWithUser,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};