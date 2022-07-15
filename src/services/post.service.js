const Sequelize = require('sequelize');
const { BlogPost, User, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const createPostWithUser = async ({ title, content, categoryIds, UserEmail }) => {
  const getUser = await User.findOne({ where: { email: UserEmail } });
  const t = await sequelize.transaction();
  try {
    const post = await BlogPost.create({
      title,
      content,
      userId: getUser.id,
      published: new Date('2011-08-01T19:58:00.000Z'),
      updated: new Date('2011-08-01T19:58:00.000Z'),
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
  const posts = await BlogPost.findAll(
  
    {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
        {
          model: Category,
          as: 'categories',
          attributes: ['id', 'name'],
        }],
    },
);
  return posts;
};

const getPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'displayName', 'email', 'image'],
    },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      }],
  });
  return post;
};

module.exports = {
  createPostWithUser,
  getAllPosts,
  getPostById,
};