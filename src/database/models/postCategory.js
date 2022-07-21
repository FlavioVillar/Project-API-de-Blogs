'use strict';

const postCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'BlogPosts',
        key: 'id'
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Categories',
        key: 'id'
      },
    },
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      as: 'categories',
    });
    
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'categoryId',
      as: 'blogPosts',
    });
 }
 
  return PostCategory;
}

module.exports = postCategoryModel;