const Sequelize = require('sequelize');
const { BlogPost, User } = require('../database/models');
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

module.exports = {
  createPostWithUser,
};