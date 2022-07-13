'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'post_id',
        references: {
          model: 'BlogPosts',
          key: 'id'
        },
        primaryKey: true,
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'category_id',
        references: {
          model: 'Categories',
          key: 'id'
        },
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};
