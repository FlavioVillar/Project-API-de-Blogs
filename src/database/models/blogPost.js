'use strict';

const blogPostModel = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      
    },
    updated: {
      allowNull: false,
      type: DataTypes.DATE,      
    },
    published: {
      allowNull: false,
      type: DataTypes.DATE,    
    }
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',

    });
  }

  return BlogPost;
}

module.exports = blogPostModel;